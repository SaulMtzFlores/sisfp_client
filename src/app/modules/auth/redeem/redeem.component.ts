import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiProvider } from 'app/providers/api';
import { NotificationsService } from 'app/providers/notifications';
import { TokenService } from 'app/providers/token';

@Component({
  selector: 'app-redeem',
  templateUrl: './redeem.component.html',
  styleUrls: ['./redeem.component.scss']
})
export class RedeemComponent implements OnInit {

  form: FormGroup;
  constructor(
    private router: Router,
    private apiProvider: ApiProvider,
    private notif: NotificationsService,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null),
      code: new FormControl(null)
    })
  }

  async validate(){
    try {
      const data = this.form.value;
      const response = await this.apiProvider.post({
        url: `/auth/redeem`,
        data,
        auth: false
      });
      if(response.success){
        this.notif.pop('success', 'Tu cuenta ha sido activada exitosamente.');
        this.router.navigate([`/auth/login`]);
      }
    } catch (error) {

    }
  }

}
