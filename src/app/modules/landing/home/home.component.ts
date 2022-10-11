import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'app/providers/notifications';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private notif: NotificationsService) { }

  ngOnInit(): void {
    this.notif.pop('success', '¡Bienvenido(a)!')
  }

}
