import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiProvider } from 'app/providers/api';
import { DefaultLoaderService } from 'app/providers/default-loader';
import { NotificationsService } from 'app/providers/notifications';
import { TokenService } from 'app/providers/token';
import { Subscription } from 'rxjs';

@Component({
  selector: 'posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  resourceName = 'groups';
  subresourceName = 'posts';
  models:any = []
  form: FormGroup;

  paginationPage: number = 1;
  paginationPerPage: number = 5;

  loading: boolean = false;
  allowEdit:boolean = false;

  groupId: any;
  listenerParams: Subscription;

  constructor(
    private apiProvider: ApiProvider,
    private router: Router,
    private notif: NotificationsService,
    private defaultLoader: DefaultLoaderService,
    private tokenService: TokenService,
    private activatedRoute: ActivatedRoute
  ) { }

  async ngOnInit(): Promise<any> {
    try {
      this.loading = true;
      await new Promise((resolve) => {
        this.listenerParams = this.activatedRoute.params.subscribe((params) => {
          if(params.groupId){
            this.groupId = params.groupId;
          }
          return resolve(true);
        });
      });

      this.form = new FormGroup({
        search: new FormControl(null),
      });
      await this.loadModel();
      await this.loadUser();
      this.loading = false;
    } catch (error) {
      console.log(error);
    }
  }

  async loadModel(): Promise<any>{
    try {
      this.loading = true;
      const searchData = this.form.value;

      const params:any = {
        paginationPage: this.paginationPage,
        paginationPerPage: this.paginationPerPage
      }

      if(searchData.search){
        params.search = searchData.search
      }

      const queryParamsString = new HttpParams({
        fromObject: params,
      }).toString();

      console.log(`/${this.resourceName}/${this.groupId}/${this.subresourceName}?${queryParamsString}`);
      const req = await this.apiProvider.get({
        url: `/${this.resourceName}/${this.groupId}/${this.subresourceName}?${queryParamsString}`,
        params,
        auth: true,
      });
      this.models = req.data;
      this.loading = false;
    } catch (error) {
      console.log(error);
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

  async search():Promise<any>{
    try {
      const searchData = this.form.value;
      if(!searchData.search){
        this.notif.pop('error', 'Búsqueda vacía.');
      }
      await this.loadModel();
    } catch (error) {
      console.log(error);
    }
  }

  async setPaginationAmount(amount:number){
    this.paginationPerPage = amount;
    await this.loadModel();
  }

  async setPaginationPage(page:number){
    if(page <= 0){
      this.notif.pop('error', 'Página negativa.');
      return;
    }
    this.paginationPage = page;
    await this.loadModel();
  }

  routerGo(_id:string){
    this.router.navigate([`/udg/${this.resourceName}/${this.groupId}/posts/see/${_id}`]);
  }

}
