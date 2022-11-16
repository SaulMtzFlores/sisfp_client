import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiProvider } from 'app/providers/api';
import { DefaultLoaderService } from 'app/providers/default-loader';
import { NotificationsService } from 'app/providers/notifications';
import { TokenService } from 'app/providers/token';
import { Subscription } from 'rxjs';

@Component({
  selector: 'post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.css']
})
export class PostViewComponent implements OnInit {

  resourceName = 'groups';
  subresourceName = 'posts';

  loading: boolean = false;

  listenerParams: Subscription;

  groupId: any;
  modelId: any;

  model: any;

  allowEdit:boolean = false;

  comments:any;
  form: any;

  constructor(
    private apiProvider: ApiProvider,
    private router: Router,
    private notif: NotificationsService,
    private activatedRoute: ActivatedRoute,
    private detector: ChangeDetectorRef,
    private defaultLoader: DefaultLoaderService,
    private tokenService: TokenService
  ) { }

  async ngOnInit(): Promise<any> {
    try {
      this.loading = true;
      await new Promise((resolve) => {
        this.listenerParams = this.activatedRoute.params.subscribe((params) => {
          if(params.id){
            this.groupId = params.groupId;
            this.modelId = params.id;
          }
          return resolve(true)
        })
      });

      this.model = await this.loadModel();
      await this.loadUser();
      await this.loadComments();
      this.form = new FormGroup({
        comment: new FormControl(null)
      });

      this.loading = false;
      this.detector.detectChanges();
    } catch (error) {
      console.log(error);
    }
  }

  async loadModel(): Promise<any>{
    try {
      const model = await this.apiProvider.get({
        url: `/${this.resourceName}/${this.groupId}/posts/${this.modelId}`,
        auth: true
      });
      return model;
    } catch (error) {
      console.log(error);
      this.notif.pop('error', 'Lo sentimos, el recurso solicitado no existe');
      this.router.navigate([`/udg/${this.resourceName}`]);
    }
  }

  private async loadUser():Promise<any>{
    try {

      const r = await this.apiProvider.get({
        url: `/users/${this.tokenService.userId()}`,
        auth: true
      });
      if(r.roleId !== this.defaultLoader.idp('studentRole')){
        this.allowEdit = true;
       }
    } catch (error) {
      console.log(error);
    }
  }

  private async loadComments():Promise<any>{
    try {
      const r = await this.apiProvider.get({
        url: `/posts/${this.modelId}/comments`,
        auth: true
      });

      this.comments = r.data;

    } catch (error) {

    }
  }

  async comment(){
    try {
      console.log(this.form.controls.comment.value);
      if(!this.form.controls.comment.value){
        this.notif.pop('error', 'Comentario vacío');
        return;
      }

      const data = {
        ownerId: this.tokenService.userId(),
        postId: this.modelId,
        comment: this.form.controls.comment.value,
        createdAt: new Date()
      }

      const r = await this.apiProvider.post({
        url: `/posts/${this.modelId}/comments`,
        auth: true,
        data
      });

      if(r){
        window.location.reload();
        this.notif.pop('success', 'Comentario añadido');
      }else{
        this.notif.pop('error', 'Algo salió mal, por favor intentalo nuevamente.');
      }
    } catch (error) {
      console.log(error);
    }
  }

  async deletePost(){
    const r = await this.apiProvider.delete({
      url: `/${this.resourceName}/${this.groupId}/${this.subresourceName}/${this.modelId}`,
      auth: true
    });
    if(r){
      this.notif.pop('success', 'Publicación eliminada.');
      this.router.navigate([`/udg/${this.resourceName}/${this.groupId}/${this.subresourceName}`]);
    }else{
      this.notif.pop('error', 'Algo salió mal, intentalo nuevamente.');
    }
  }
}
