import { Component, OnInit } from '@angular/core';
import { RouteInfo } from '../interfaces';


export const ROUTES: RouteInfo[] = [
    { path: 'home', title: 'Inicio', icon: 'nc-sun-fog-29', class:''},
    { path: 'coordinations', title: 'Coordinaciones', icon:'nc-paper', class: '' },
    { path: 'courses', title: 'Cursos', icon: 'nc-book-bookmark', class:''},
    { path: 'centers', title: 'Centros', icon: 'nc-bank', class: '' },
    { path: 'degrees', title: 'Licenciaturas', icon: 'nc-touch-id', class: '' },
    { path: 'subjects', title: 'Materias', icon: 'nc-app', class: '' },
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
}
