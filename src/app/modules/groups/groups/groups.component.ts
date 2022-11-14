import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiProvider } from 'app/providers/api';
import { DefaultLoaderService } from 'app/providers/default-loader';
import { NotificationsService } from 'app/providers/notifications';
import { TokenService } from 'app/providers/token';

@Component({
  selector: 'groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  resourceName = 'groups';
  models:any = []
  form: FormGroup;

  paginationPage: number = 1;
  paginationPerPage: number = 5;

  loading: boolean = false;
  allowEdit:boolean = false;

  constructor(
    private apiProvider: ApiProvider,
    private router: Router,
    private notif: NotificationsService,
    private defaultLoader: DefaultLoaderService,
    private tokenService: TokenService
  ) { }

  async ngOnInit(): Promise<any> {
    try {
      this.loading = true;
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
        paginationPerPage: this.paginationPerPage,
        includeOwn: true
      }

      if(searchData.search){
        params.search = searchData.search
      }

      const queryParamsString = new HttpParams({
        fromObject: params,
      }).toString();

      const req = await this.apiProvider.get({
        url: `/${this.resourceName}?${queryParamsString}`,
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

  routerGo(edit:boolean, _id:string){
    this.router.navigate([
      (edit) ?
      `/udg/${this.resourceName}/edit/${_id}` :
      `/udg/${this.resourceName}/see/${_id}`
    ]);
  }

  seePosts(_id:string){
    this.router.navigate([`/udg/groups/${_id}/posts`])
  }

  async unsubscribe(groupId:any):Promise<any>{
    try {
      const s = await this.apiProvider.post({
        url: `/subscriptions/unsubscribe`,
        data: { userId: this.tokenService.userId(), groupId },
        auth: true
      });

      (s) ? this.notif.pop('success', 'Te has desuscrito del grupo.')
      : this.notif.pop('error', 'Algo salió mal, por favor intentalo nuevamente.')

      this.router.navigate([`/udg/home`]);
    } catch (error) {
      console.log(error);
    }
  }

}
