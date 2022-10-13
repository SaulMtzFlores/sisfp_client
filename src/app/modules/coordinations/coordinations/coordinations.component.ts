import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-coordinations',
  templateUrl: './coordinations.component.html',
  styleUrls: ['./coordinations.component.scss']
})
export class CoordinationsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  gotoCoord(route: string){
    this.router.navigate([`/udg/posts/coordination/${route}`]);
  }
}
