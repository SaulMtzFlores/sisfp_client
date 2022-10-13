import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-course-posts',
  templateUrl: './course-posts.component.html',
  styleUrls: ['./course-posts.component.scss']
})
export class CoursePostsComponent implements OnInit {

  private id: string;
  public loading: boolean;
  private listenerParams: Subscription;
  private confirmSubscription: Subscription;

  constructor(private activatedRoute: ActivatedRoute) { }

  async ngOnInit(): Promise<any> {
    this.loading = true;
    await new Promise((resolve) => {
      this.listenerParams = this.activatedRoute.params.subscribe((params) => {
        if(params.id){
          this.id = params.id;
        }
        return resolve(true);
      })
    });
    this.loading = false;
  }

  ngOnDestroy(): void {
    this.listenerParams.unsubscribe();
    this.confirmSubscription?.unsubscribe();
  }



}
