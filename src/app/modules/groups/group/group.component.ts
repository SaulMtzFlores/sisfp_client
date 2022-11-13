import { HttpParams } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiProvider } from 'app/providers/api';
import { DefaultLoaderService } from 'app/providers/default-loader';
import { NotificationsService } from 'app/providers/notifications';
import { TokenService } from 'app/providers/token';
import { Subscription } from 'rxjs';

@Component({
  selector: 'group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  resourceName = 'groups';

  edition: boolean;
  loading:boolean = false;
  saving: boolean = false;
  deleting: boolean = false;

  modelId: any;

  listenerParams: Subscription;

  model:any;

  form: FormGroup;

  // Lists
  subjects:any;
  degrees:any;
  centers:any;

  isSubject:boolean = false;
  isDegree:boolean = false;
  hasPassword:boolean = false;


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
      await this.loadUser();
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
      await this.loadResources();
      this.form = this.buildForm();

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
      this.notif.pop('error', 'No se ha encontrado el grupo');
      this.router.navigate([`/udg/${this.resourceName}`]);
    }
  }

  private async loadUser():Promise<any>{
    try {
      const r = await this.apiProvider.get({
        url: `/users/${this.tokenService.userId()}`,
        auth: true
      });
      if(r.roleId === this.defaultLoader.idp('studentRole')){
        this.notif.pop('warning', 'Lo sentimos, no tienes permisos para acceder a esta ubicación');
        this.router.navigate([`/udg/${this.resourceName}`]);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async loadResources():Promise<any>{
    try {
      const subjects = await this.apiProvider.get({
        url: `/subjects`,
        auth:true
      });

      this.subjects = subjects.data;

      const degrees = await this.apiProvider.get({
        url: `/degrees`,
        auth: true
      });

      this.degrees = degrees.data;

      const centers = await this.apiProvider.get({
        url: `/centers`,
        auth: true
      });

      this.centers = centers.data;
    } catch (error) {
      console.log(error);
    }
  }

  buildForm():FormGroup{
    const form: FormGroup = new FormGroup({
      name: new FormControl(this.model?.name || null, Validators.nullValidator),
      hasPassword: new FormControl(this.model?.hasPassword || false, Validators.nullValidator),
      password: new FormControl(this.model?.password || null, Validators.nullValidator),
      subject: new FormControl(this.model?.subject || false, Validators.nullValidator),
      degree: new FormControl(this.model?.degree || false, Validators.nullValidator),
      referenceId: new FormControl(this.model?.referenceId || null, Validators.nullValidator),
      active: new FormControl(this.model?.active || true, Validators.nullValidator)
    });
    return form;
  }

  setModelActive(value:string){
    this.form.get('active').setValue((value === 'active') ? true:false);
  }

  setPassword(value:string){
    if(value==='yes'){
      this.hasPassword = true;
      this.form.get('hasPassword').setValue(true);
    }
    if(value==='no'){
      this.hasPassword = false;
      this.form.get('hasPassword').setValue(false);
    }
  }

  setSubjectType(value:string){
    if(value === 'subject'){
      this.form.get('subject').setValue(true);
      this.form.get('degree').setValue(false);
      this.isSubject = true;
      this.isDegree = false;
    }
    if(value === 'degree'){
      this.form.get('subject').setValue(false);
      this.form.get('degree').setValue(true);
      this.isSubject = false;
      this.isDegree = true;
    }
  }

  setReference(value:any){
    if(!value){return;}
    this.form.get('referenceId').setValue(value);
  }

  async setCenter(value:any){
    if(!value){return;}
    // Load with params

    const params:any = {
      filterCenters: value
    }

    const queryParamsString = new HttpParams({
      fromObject: params,
    }).toString();

    const subjects = await this.apiProvider.get({
      url: `/subjects?${queryParamsString}`,
      params,
      auth: true,
    });
    this.subjects = subjects.data;

    const degrees = await this.apiProvider.get({
      url: `/degrees?${queryParamsString}`,
      params,
      auth: true,
    });
    this.degrees = degrees.data;

  }

  async save(){
    try {
      const data = this.form.value;

      if(data.name === ''){this.notif.pop('error', 'El nombre es obligatorio'); return;}
      if(!data.subject && !data.degree){this.notif.pop('error', 'Definir el tipo del grupo es obligatorio'); return;}
      if(data.hasPassword && !data.password){this.notif.pop('error', 'Describa la contraseña, o defina el grupo sin contraseña'); return;}
      if(!data.referenceId){this.notif.pop('error', 'La referencia del grupo es obligatoria'); return;}

      if(this.edition){
        await this.apiProvider.put({
          url: `/${this.resourceName}/${this.modelId}`,
          data,
          auth: true
        });
        this.notif.pop('success', 'Grupo actualizado.');
        this.router.navigate([`/udg/${this.resourceName}/see/${this.modelId}`])
      }else{
        const r = await this.apiProvider.post({
          url: `/${this.resourceName}`,
          data,
          auth: true
        });
        this.notif.pop('success', 'Grupo creado.');
        this.router.navigate([`/udg/${this.resourceName}/see/${r._id}`]);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async delete(){
    if(!this.edition){
      this.notif.pop('error', 'Eliminación disponible solo durante edición de un grupo.');
    }

    await this.apiProvider.delete({
      url: `/${this.resourceName}/${this.modelId}`,
      auth: true
    });

    this.notif.pop('success', 'Grupo eliminado.');
    this.router.navigate([`/udg/${this.resourceName}`]);
  }

}
