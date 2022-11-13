import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiProvider } from 'app/providers/api';
import { DefaultLoaderService } from 'app/providers/default-loader';
import { NotificationsService } from 'app/providers/notifications';
import { TokenService } from 'app/providers/token';

@Component({
  selector: 'subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit {

  resourceName = 'subjects';
  models:any = []
  form: FormGroup;

  paginationPage: number = 1;
  paginationPerPage: number = 5;

  loading: boolean = false;
  hideRestrictedEdits:boolean = false;


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
      console.log(this.tokenService.token);
      const r = await this.apiProvider.get({
        url: `/users/${this.tokenService.userId()}`,
        auth: true
      });
      if(r.roleId === this.defaultLoader.idp('studentRole')){
        this.hideRestrictedEdits = true;
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

}
