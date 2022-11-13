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

  centers: any;

  constructor(
    private router: Router,
    private apiProvider: ApiProvider,
    private notif: NotificationsService
  ) { }

  async ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null),
      email: new FormControl(null),
      password: new FormControl(null),
      centerId: new FormControl(null),
    });
    await this.loadResources();
  }

  async register(){
    try {
      const data = this.form.value;
      const response = await this.apiProvider.post({
        url:`/users`,
        data,
        auth: false
      });
      this.notif.pop('success', 'Código de verificación enviado.');
      this.router.navigate(['/auth/redeem']);
    } catch (error) {
      console.log(error);
    }
  }

  setCenter(value:any){
    if(!value){return;}
    this.form.get('centerId').setValue(value);
  }

  async loadResources():Promise<any>{
    try {
      const r = await this.apiProvider.get({
        url: `/centers`,
        auth:false
      });

      this.centers = r.data;
    } catch (error) {
      console.log(error);
    }
  }

}
