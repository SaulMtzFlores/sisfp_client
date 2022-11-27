import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
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

  @HostListener('click')
  @HostListener('keyup')
  onClick() {
    const data = this.form.getRawValue();

    if(data.nAAMPM === 'AM'){
      if(data.nAhour === 12){
        data.nAhour = 0;
      }
    }
    if(data.nAAMPM === 'PM'){
      if(data.nAhour !== 12){
        data.nAhour += 12;
      }
    }
    if(data.fAAMPM === 'AM'){
      if(data.fAhour === 12){
        data.fAhour = 0;
      }
    }
    if(data.fAAMPM === 'PM'){
      if(data.fAhour !== 12){
        data.fAhour += 12;
      }
    }

    if(
      typeof data.nAmonth==='number' &&
      typeof data.nAmonth==='number' &&
      typeof data.nAday==='number' &&
      typeof data.nAminute==='number' &&
      typeof data.nAhour==='number' &&
      data.nAAMPM
    ){
      this.parsedNotifyAt = `${
        (data.nAmonth < 10) ? '0'+data.nAmonth : data.nAmonth
      }/${
        (data.nAday < 10) ? '0'+data.nAday : data.nAday
      }/${data.nAyear} ${
        (data.nAhour < 10) ? '0'+data.nAhour : data.nAhour
      }:${(
        (data.nAminute < 10) ? '0'+data.nAminute : data.nAminute
      )}`;
      this.correctNA = true;
    }else{
      this.correctNA = false;
    }

    if(
      typeof data.fAmonth==='number' &&
      typeof data.fAmonth==='number' &&
      typeof data.fAday==='number' &&
      typeof data.fAminute==='number' &&
      typeof data.fAhour==='number' &&
      data.fAAMPM
    ){
      this.parsedFinishAt = `${
        (data.fAmonth < 10) ? '0'+data.fAmonth : data.fAmonth
      }/${
        (data.fAday < 10) ? '0'+data.fAday : data.fAday
      }/${data.fAyear} ${
        (data.fAhour < 10) ? '0'+data.fAhour : data.fAhour
      }:${(
        (data.fAminute < 10) ? '0'+data.fAminute : data.fAminute
      )}`;
      this.correctFA = true;
    }else{
      this.correctFA = false;
    }
  };


  parsedNotifyAt:any;
  correctNA:any;
  parsedFinishAt:any;
  correctFA:any;

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
    fAday: new FormControl(null, Validators.nullValidator),
    fAmonth: new FormControl(null, Validators.nullValidator),
    fAyear: new FormControl((new Date()).getFullYear(), Validators.nullValidator),
    fAhour: new FormControl(null, Validators.nullValidator),
    fAminute: new FormControl(null, Validators.nullValidator),
    fAAMPM: new FormControl(null, Validators.nullValidator),
    nAday: new FormControl(null, Validators.nullValidator),
    nAmonth: new FormControl(null, Validators.nullValidator),
    nAyear: new FormControl((new Date()).getFullYear(), Validators.nullValidator),
    nAhour: new FormControl(null, Validators.nullValidator),
    nAminute: new FormControl(null, Validators.nullValidator),
    nAAMPM: new FormControl(null, Validators.nullValidator),
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

      const media = await this.upload();
      data['media'] = media;

      if(data.moment && !this.correctNA){
        this.notif.pop('error', 'Fecha de notificaciones incorrecta.');
        return;
      }
      if(data.moment && !this.correctFA){
        this.notif.pop('error', 'Fecha de cierre incorrecta');
        return;
      }

      if(data.moment && this.correctNA){
        const {nAday, nAmonth, nAyear, nAhour, nAminute } = data;
        if(nAday>=1 && nAday<=31 && nAmonth >=1 && nAmonth <=12 && nAyear >= 2022 && nAyear <= 2100 && nAhour >= 1 && nAhour <= 12 && nAminute >= 0 && nAminute <=59){
          data['notifyAt'] = new Date(this.parsedNotifyAt);
        }else{
          this.notif.pop('error', 'La fecha de notificación es incorrecta.');
          return;
        }
      }

      if(data.moment && this.correctFA){
        const {fAday, fAmonth, fAyear, fAhour, fAminute } = data;
        if(fAday>=1 && fAday<=31 && fAmonth >=1 && fAmonth <=12 && fAyear >= 2022 && fAyear <= 2100 && fAhour >= 1 && fAhour <= 12 && fAminute >= 0 && fAminute <=59){
          data['finishAt'] = new Date(this.parsedFinishAt);
        }else{
          this.notif.pop('error', 'La fecha de cierre es incorrecta.');
          return;
        }
      }
      delete data['fAday'];
      delete data['fAmonth'];
      delete data['fAyear'];
      delete data['fAhour'];
      delete data['fAminute'];
      delete data['fAAMPM'];
      delete data['nAday'];
      delete data['nAmonth'];
      delete data['nAyear'];
      delete data['nAhour'];
      delete data['nAminute'];
      delete data['nAAMPM'];

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

  setnAAMPM(value){
    this.form.get('nAAMPM').setValue(value)
  }

  setfAAMPM(value){
    this.form.get('fAAMPM').setValue(value)
  }

}
