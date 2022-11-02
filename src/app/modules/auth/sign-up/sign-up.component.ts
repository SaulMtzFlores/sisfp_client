import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiProvider } from 'app/providers/api';
import { NotificationsService } from 'app/providers/notifications';
import { TokenService } from 'app/providers/token';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  form: FormGroup;

  constructor(
    private router: Router,
    private apiProvider: ApiProvider,
    private notif: NotificationsService,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null),
      email: new FormControl(null),
      password: new FormControl(null),
    })
  }

  async register(){
    try {
      const data = this.form.value;
      const response = await this.apiProvider.post({
        url:`/users`,
        data,
        auth: false
      });
      console.log(response);
      this.notif.pop('success', 'Código de verificación enviado.');
      this.router.navigate(['/auth/redeem']);
    } catch (error) {
      console.log(error);
    }
  }

}
