import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { ApiProvider } from 'app/providers/api';
import { NotificationsService } from 'app/providers/notifications';
import { TokenService } from 'app/providers/token';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

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
      password: new FormControl(null),
    })
  }

  async login(){
    try {
      const data = this.form.value;
      const response = await this.apiProvider.post({
        url: `/auth/login`,
        data,
        auth: false
      });
    console.log(response);
    if(response.token){
      this.tokenService.token = response.token;
      this.apiProvider.setToken(response.token);
      this.notif.pop('success', '¡Bienvenido(a)!');
      this.router.navigate(['/udg/home'])
    }
    } catch (error) {
      console.log(error);
    }
  }
}
