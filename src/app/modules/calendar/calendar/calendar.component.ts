import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiProvider } from 'app/providers/api';
import { NotificationsService } from 'app/providers/notifications';

@Component({
  selector: 'calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  models:any = [];

  paginationPage: number = 1;
  paginationPerPage: number = 5;

  loading: boolean = false;


  constructor(
    private apiProvider: ApiProvider,
    private router: Router,
    private notif: NotificationsService
  ) { }

  async ngOnInit(): Promise<any> {
    try {
      this.loading = true;
      await this.loadModel();
      this.loading = false;
    } catch (error) {
      console.log(error);
    }
  }

  async loadModel(): Promise<any>{
    try {
      this.loading = true;

      const params:any = {
        paginationPage: this.paginationPage,
        paginationPerPage: this.paginationPerPage
      }
      const queryParamsString = new HttpParams({
        fromObject: params,
      }).toString();

      const req = await this.apiProvider.get({
        url: `/posts/calendar?${queryParamsString}`,
        auth: true,
      });
      this.models = req.data;
      this.loading = false;
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

  routerGo(model:any):any{
    this.router.navigate([`udg/groups/${model.groupId}/posts/see/${model._id}`]);
  }
}
