import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiProvider } from 'app/providers/api';
import { NotificationsService } from 'app/providers/notifications';
import { Subscription } from 'rxjs';

@Component({
  selector: 'center',
  templateUrl: './center.component.html',
  styleUrls: ['./center.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CenterComponent implements OnInit {

  edition: boolean;
  loading:boolean = false;
  saving: boolean = false;
  deleting: boolean = false;

  centerId: any;

  listenerParams: Subscription;

  model:any;

  form: FormGroup;

  // EmailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // !this.EmailPattern.test(String(data.email))

  constructor(
    private notif: NotificationsService,
    private router: Router,
    private apiProvider: ApiProvider,
    private activatedRoute: ActivatedRoute,
    private detector: ChangeDetectorRef
  ) { }

  async ngOnInit(): Promise<any> {
    try {
      this.loading = true;
      await new Promise((resolve) => {
        this.listenerParams = this.activatedRoute.params.subscribe((params) => {
          if(params.id){
            this.centerId = params.id;
            this.edition = !!params.id
          }
          return resolve(true);
        });
      });

      this.model = (this.edition) ? await this.loadModel() : {};
      this.form = this.buildCenter();

      this.loading = false;
      this.detector.detectChanges();

    } catch (error) {
      console.log(error);
    }
  }

  private async loadModel():Promise<any>{
    try {
       const r = await this.apiProvider.get({
        url: `/centers/${this.centerId}`,
        auth: true
       });
       return r;
    } catch (error) {
      console.log(error);
      this.notif.pop('error', 'No se ha encontrado el centro universitario');
      this.router.navigate([`/udg/centers`]);
    }
  }

  buildCenter():FormGroup{
    const form: FormGroup = new FormGroup({
      name: new FormControl(this.model?.name || null, Validators.required),
      acronym: new FormControl(this.model?.acronym || null, Validators.required),
      active: new FormControl(this.model?.active || true, Validators.nullValidator)
    });
    return form;
  }

  async save(){
    try {
      const data = this.form.value;

      if(data.name === ''){this.notif.pop('error', 'El nombre es obligatorio'); return;}

      if(this.edition){
        await this.apiProvider.put({
          url: `/centers/${this.centerId}`,
          data,
          auth: true
        });
        this.notif.pop('success', 'Centro universitario actualizado.');
        this.router.navigate([`/udg/centers/see/${this.centerId}`])
      }else{
        const r = await this.apiProvider.post({
          url: `/centers`,
          data,
          auth: true
        });
        this.notif.pop('success', 'Centro universitario creado.');
        this.router.navigate([`/udg/centers/see/${r._id}`]);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async delete(){
    if(!this.edition){
      this.notif.pop('error', 'Eliminación disponible solo durante edición de un centro.');
    }

    await this.apiProvider.delete({
      url: `/centers/${this.centerId}`,
      auth: true
    });

    this.notif.pop('success', 'Centro universitario eliminado.');
    this.router.navigate([`/udg/centers`]);
  }

  setModelActive(value:boolean){
    this.form.get('active').setValue(value);
  }

}
