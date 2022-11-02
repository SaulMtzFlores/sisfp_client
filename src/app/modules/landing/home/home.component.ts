import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'app/providers/notifications';
import { ApiProvider } from '../../../providers/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  serverDate: Date;
  clientDate: Date;
  loading: boolean = true;

  constructor(
    private notif: NotificationsService,
    private apiProvider: ApiProvider
  ) { }

  async ngOnInit(): Promise<any> {
    const request = await this.apiProvider.get({
      url: '/',
      auth: false
    });
    this.serverDate = request;
    this.clientDate = new Date();

    this.loading = false;
  }

}
