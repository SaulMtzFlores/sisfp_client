import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiProvider } from 'app/providers/api';
import { DefaultLoaderService } from 'app/providers/default-loader';
import { NotificationsService } from 'app/providers/notifications';
import { TokenService } from 'app/providers/token';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  resourceName = 'users';

  edition: boolean;
  loading:boolean = false;
  saving: boolean = false;
  deleting: boolean = false;

  modelId: any;

  listenerParams: Subscription;

  model:any;

  form: FormGroup;

  centers:any;
  roles:any;

  allowEdit:boolean = false;

  constructor(
    private notif: NotificationsService,
    private router: Router,
    private apiProvider: ApiProvider,
    private activatedRoute: ActivatedRoute,
    private detector: ChangeDetectorRef,
    private defaultLoader: DefaultLoaderService,
    private tokenService: TokenService
  ) { }

  async ngOnInit(): Promise<any> {
    try {
      this.loading = true;
      await new Promise((resolve) => {
        this.listenerParams = this.activatedRoute.params.subscribe((params) => {
          if(params.id){
            this.modelId = params.id;
            this.edition = !!params.id
          }
          return resolve(true);
        });
      });

      this.model = (this.edition) ? await this.loadModel() : {};
      this.form = this.buildForm();
      await this.loadUser();
      await this.loadResources();
      this.loading = false;
      this.detector.detectChanges();

    } catch (error) {
      console.log(error);
    }
  }

  private async loadModel():Promise<any>{
    try {
       const r = await this.apiProvider.get({
        url: `/${this.resourceName}/${this.modelId}`,
        auth: true
       });
       return r;
    } catch (error) {
      console.log(error);
      this.notif.pop('error', 'No se ha encontrado la materia');
      this.router.navigate([`/udg/${this.resourceName}`]);
    }
  }

  private async loadUser():Promise<any>{
    try {

      const r = await this.apiProvider.get({
        url: `/users/${this.tokenService.userId()}`,
        auth: true
      });
      if(r.roleId !== this.defaultLoader.idp('studentRole')){
        this.allowEdit = true;
       }
    } catch (error) {
      console.log(error);
    }
  }

  buildForm():FormGroup{
    const form: FormGroup = new FormGroup({
      name: new FormControl(this.model?.name, Validators.required),
      email: new FormControl({value:this.model?.email, disabled:true}, Validators.required),
      password: new FormControl(this.model?.password, Validators.required),
      roleId: new FormControl(this.model?.roleId, Validators.required),
      centerId: new FormControl(this.model?.centerId, Validators.required),
      active: new FormControl( this.model?.active, Validators.nullValidator)
    });
    return form;
  }

  async save(){
    try {
      const data = this.form.value;

      if(!data.name || !data.centerId){
        this.notif.pop('error', 'Información incorrecta. Favor de revisar el formulario.');
        return;
      }

      if(this.edition){
        await this.apiProvider.put({
          url: `/${this.resourceName}/${this.modelId}`,
          data,
          auth: true
        });
        this.notif.pop('success', 'Usuario actualizado.');
        this.router.navigate([`/udg/${this.resourceName}/see/${this.modelId}`])
      }
    } catch (error) {
      console.log(error);
    }
  }

  async delete(){
    await this.apiProvider.delete({
      url: `/${this.resourceName}/${this.modelId}`,
      auth: true
    });

    this.notif.pop('success', 'Usuario eliminado.');
    this.router.navigate([`/udg/${this.resourceName}`]);
  }

  setModelActive(value:boolean){
    this.form.get('active').setValue(value);
  }

  setCenter(value:any){
    if(!value){return;}
    this.form.get('centerId').setValue(value);
  }

  setRole(value:any){
    if(!value){return;}
    this.form.get('roleId').setValue(value);
  }

  async loadResources():Promise<any>{
    try {
      const centers = await this.apiProvider.get({
        url: `/centers`,
        auth:true
      });
      this.centers = centers.data;

      const roles = await this.apiProvider.get({
        url: `/roles`,
        auth: true
      });
      this.roles = roles.data;
    } catch (error) {
      console.log(error);
    }
  }

}
