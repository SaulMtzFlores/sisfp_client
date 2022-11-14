import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiProvider } from '../../../providers/api';
import { DefaultLoaderService } from 'app/providers/default-loader';
import { NotificationsService } from 'app/providers/notifications';
import { TokenService } from 'app/providers/token';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  resourceName = 'groups';
  models:any = []
  form: FormGroup;
  subform: FormGroup;

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
      this.subform = new FormGroup({
        password: new FormControl(null)
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

  // TODO brecha de seguridad aquí xd debería hacerse en el server la validación del password
  async subscription(model:any){
    try {
      if(model.hasPassword && model.password !== this.subform.value.password){
        this.notif.pop('error', 'Código incorrecto.')
        return;
      }

      const s = await this.apiProvider.post({
        url: `/subscriptions`,
        data: {
          userId: this.tokenService.userId(),
          groupId: model._id
        },
        auth: true
      });

      (s) ? this.notif.pop('success', 'Te has suscrito al grupo.')
      : this.notif.pop('error', 'Algo salió mal, por favor intentalo nuevamente.')

      this.router.navigate([`/udg/${this.resourceName}`]);
    } catch (error) {
      console.log(error);
    }
  }

}
