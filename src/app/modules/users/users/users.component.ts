import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'app/providers/notifications';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(
    private notif: NotificationsService
  ) { }

  ngOnInit(): void {
    this.notif.pop('success', 'eeeh', 5000);
    this.notif.pop('info', 'eyy', 5000);
    this.notif.pop('warning', 'yooo', 5000);
    this.notif.pop('error', 'erasd', 5000);
  }

}
