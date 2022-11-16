import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiProvider } from 'app/providers/api';
import { CloudinaryService } from 'app/providers/cloudinary';
import { DefaultLoaderService } from 'app/providers/default-loader';
import { NotificationsService } from 'app/providers/notifications';
import { TokenService } from 'app/providers/token';
import { Subscription } from 'rxjs';

@Component({
  selector: 'post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  resourceName = 'groups';
  subresourceName = 'posts';

  edition: boolean;
  loading:boolean = false;
  saving: boolean = false;
  deleting: boolean = false;

  groupId: any;
  modelId: any;

  listenerParams: Subscription;

  model:any;

  isMoment:boolean = false;

  form: FormGroup = new FormGroup({
    title: new FormControl(null, Validators.nullValidator),
    description: new FormControl(null, Validators.nullValidator),
    moment: new FormControl(false, Validators.nullValidator),
    finishAt: new FormControl(null, Validators.nullValidator),
    notifyAt: new FormControl(null, Validators.nullValidator),
  });

  centers:any

  // Cloudinary
  files: File[] = [];

  constructor(
    private cloudinary: CloudinaryService,
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
          if(params.groupId){
            this.groupId = params.groupId;
            this.modelId = params.id;
            this.edition = !!params.id
          }
          return resolve(true);
        });
      });

      this.model = (this.edition) ? await this.loadModel() : {};
      // this.form = this.buildForm();
      // await this.loadResources();

      this.loading = false;
      this.detector.detectChanges();

    } catch (error) {
      console.log(error);
    }
  }

  private async loadModel():Promise<any>{
    try {
       const r = await this.apiProvider.get({
        url: `/${this.resourceName}/${this.groupId}/${this.subresourceName}/${this.modelId}`, // TODO fix
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
      if(r.roleId === this.defaultLoader.idp('studentRole')){
        this.notif.pop('warning', 'Lo sentimos, no tienes permisos para acceder a esta ubicación');
        this.router.navigate([`/udg/${this.resourceName}`]);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async save(){
    try {
      if(this.files.length > 1){
        this.notif.pop('error', 'No tienes permitido subir más de una imagen');
        return;
      }

      const data = this.form.getRawValue();


      data['ownerId'] = this.tokenService.userId();
      data['groupId'] = this.groupId;

      data['createdAt'] = new Date();

      if(!data.moment){
        delete data.finishAt
        delete data.notifyAt
      }

      if(!data.title){this.notif.pop('error', 'El titlo es obligatorio.');return;}
      if(!data.description){this.notif.pop('error', 'La descripción es obligatoria.');return;}
      if(data.moment && !data.notifyAt){this.notif.pop('error', 'La fecha de notificación es obligatoria.');return;}
      if(data.moment && !data.finishAt){this.notif.pop('error', 'La fecha de finalización es obligatoria.');return;}

      const media = await this.upload();
      data['media'] = media;

      const r = await this.apiProvider.post({
        url: `/${this.resourceName}/${this.groupId}/${this.subresourceName}`,
        data,
        auth: true
      });
      this.notif.pop('success', 'Publicación creada.');
      this.router.navigate([`/udg/${this.resourceName}/${this.groupId}/${this.subresourceName}/see/${r._id}`]);
    } catch (error) {
      console.log(error);
    }
  }

  setPostType(value:string){
    if(value === 'permanent'){
      this.form.get('moment').setValue(false);
      this.isMoment = false;
    }
    if(value === 'temp'){
      this.form.get('moment').setValue(true);
      this.isMoment = true;
    }
  }

  async delete(){
    if(!this.edition){
      this.notif.pop('error', 'Eliminación disponible solo durante edición de una materia.');
    }

    await this.apiProvider.delete({
      url: `/${this.resourceName}/${this.modelId}`,
      auth: true
    });

    this.notif.pop('success', 'Materia eliminada.');
    this.router.navigate([`/udg/${this.resourceName}/${this.subresourceName}`]);
  }


  // Cloudinary
  onSelect(event: any) {
    this.files.push(...event.addedFiles);
  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  async upload(){
    try {
      for(let file_data of this.files){
        const data = new FormData();
        data.append('file', file_data);
        data.append('cloud_name', 'dybtlhfxu');
        data.append('upload_preset', 'f5mq6xrq');

        const response = await this.cloudinary.upload(data).toPromise();
        return response.secure_url;
      }
    } catch (error) {
      console.log(error);
    }
  }

}
