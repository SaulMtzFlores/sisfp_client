import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiProvider } from 'app/providers/api';
import { DefaultLoaderService } from 'app/providers/default-loader';
import { NotificationsService } from 'app/providers/notifications';
import { TokenService } from 'app/providers/token';
import { Subscription } from 'rxjs';

@Component({
  selector: 'subject-view',
  templateUrl: './subject-view.component.html',
  styleUrls: ['./subject-view.component.css']
})
export class SubjectViewComponent implements OnInit {

  resourceName = 'subjects';

  loading: boolean = false;

  listenerParams: Subscription;

  modelId: any

  model: any;

  allowEdit:boolean = false;

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
            this.modelId = params.id;
          }
          return resolve(true)
        })
      });

      this.model = await this.loadModel();
      await this.loadUser();

      this.loading = false;
      this.detector.detectChanges();
    } catch (error) {
      console.log(error);
    }
  }

  ngOnDestroy(): void {
    this.listenerParams.unsubscribe();
  }

  async loadModel(): Promise<any>{
    try {
      const model = await this.apiProvider.get({
        url: `/${this.resourceName}/${this.modelId}`,
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
      console.log(this.tokenService.token);
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

}
