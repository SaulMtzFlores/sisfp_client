import { ChangeDetectorRef, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiProvider } from 'app/providers/api';
import { NotificationsService } from 'app/providers/notifications';
import { Subscription } from 'rxjs';

@Component({
  selector: 'degree',
  templateUrl: './degree.component.html',
  styleUrls: ['./degree.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DegreeComponent implements OnInit {

  resourceName = 'degrees';

  edition: boolean;
  loading:boolean = false;
  saving: boolean = false;
  deleting: boolean = false;

  modelId: any;

  listenerParams: Subscription;

  model:any;

  form: FormGroup;


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
            this.modelId = params.id;
            this.edition = !!params.id
          }
          return resolve(true);
        });
      });

      this.model = (this.edition) ? await this.loadModel() : {};
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
      this.notif.pop('error', 'No se ha encontrado la licenciatura');
      this.router.navigate([`/udg/${this.resourceName}`]);
    }
  }

  buildForm():FormGroup{
    const form: FormGroup = new FormGroup({
      name: new FormControl(this.model?.name || null, Validators.required),
      acronym: new FormControl(this.model?.acronym || null, Validators.required),
      active: new FormControl(this.model?.active || true, Validators.nullValidator)
    });
    return form;
  }

}
