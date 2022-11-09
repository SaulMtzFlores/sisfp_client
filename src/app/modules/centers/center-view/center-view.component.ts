import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiProvider } from 'app/providers/api';
import { NotificationsService } from 'app/providers/notifications';
import { Subscription } from 'rxjs';

@Component({
  selector: 'center-view',
  templateUrl: './center-view.component.html',
  styleUrls: ['./center-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CenterViewComponent implements OnInit, OnDestroy {

  loading: boolean = false;

  listenerParams: Subscription;

  centerId: any

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
            this.centerId = params.id;
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
      const center = await this.apiProvider.get({
        url: `/centers/${this.centerId}`,
        auth: true
      });
      console.log(center);
      return center;
    } catch (error) {
      console.log(error);
      this.notif.pop('error', 'Lo sentimos, el recurso solicitado no existe');
      this.router.navigate([`/udg/centers`]);
    }
  }

}
