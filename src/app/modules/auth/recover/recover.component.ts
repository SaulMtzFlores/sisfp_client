import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiProvider } from 'app/providers/api';
import { NotificationsService } from 'app/providers/notifications';
import { TokenService } from 'app/providers/token';

@Component({
  selector: 'app-recover',
  templateUrl: './recover.component.html',
  styleUrls: ['./recover.component.scss']
})
export class RecoverComponent implements OnInit {

  form: FormGroup;
  initForm: FormGroup;

  constructor(
    private router: Router,
    private apiProvider: ApiProvider,
    private notif: NotificationsService,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null),
      code: new FormControl(null),
      password: new FormControl(null)
    });
    this.initForm = new FormGroup({
      email: new FormControl(null)
    })
  }

  async sendCode(){
    try {
      const data = this.initForm.value;
      const response = await this.apiProvider.post({
        url: `/auth/recover`,
        data,
        auth: false
      });
      if(response.success){
        this.notif.pop('success', 'Código de recuperación enviado.')
      }
    } catch (error) {
      console.log(error)
    }
  }

  async redeem(){
    try {
      const data = this.form.value;
      const response = await this.apiProvider.post({
        url: `/auth/redeem`,
        data,
        auth: false
      });
      if(response.success){
        this.notif.pop('success', 'Cuenta validada exitosamente.');
      }
    } catch (error) {
      console.log(error)
    }
  }

}
