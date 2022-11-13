import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiProvider } from 'app/providers/api';
import { NotificationsService } from 'app/providers/notifications';
import { Subscription } from 'rxjs';

@Component({
  selector: 'subject-view',
  templateUrl: './subject-view.component.html',
  styleUrls: ['./subject-view.component.css']
})
export class SubjectViewComponent implements OnInit {

  resourceName = 'subjects';

  loading: boolean = false;

  listenerParams: Subscription;

  modelId: any

  model: any;


  constructor(
    private apiProvider: ApiProvider,
    private router: Router,
    private notif: NotificationsService,
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
          }
          return resolve(true)
        })
      });

      this.model = await this.loadModel();

      this.loading = false;
      this.detector.detectChanges();
    } catch (error) {
      console.log(error);
    }
  }

  ngOnDestroy(): void {
    this.listenerParams.unsubscribe();
  }

  async loadModel(): Promise<any>{
    try {
      const model = await this.apiProvider.get({
        url: `/${this.resourceName}/${this.modelId}`,
        auth: true
      });
      return model;
    } catch (error) {
      console.log(error);
      this.notif.pop('error', 'Lo sentimos, el recurso solicitado no existe');
      this.router.navigate([`/udg/${this.resourceName}`]);
    }
  }

}
