import { Component, OnInit } from '@angular/core';
import { RouteInfo } from '../interfaces';

export const ROUTES: RouteInfo[] = [
  { path: 'sign-in', title: 'Iniciar sesión', icon: 'nc-key-25', class: '' },
  { path: 'sign-up', title: 'Registrarse', icon: 'nc-simple-add', class: '' },
  { path: 'redeem', title: 'Verificar Cuenta', icon: 'nc-check-2', class: '' },
  { path: 'recover', title: 'Recuperación', icon: 'nc-refresh-69', class: '' },
];

@Component({
  selector: 'app-auth-sidebar',
  templateUrl: './auth-sidebar.component.html'
})
export class AuthSidebarComponent implements OnInit {
  public menuItems: any[];
  ngOnInit(): void {
    this.menuItems = ROUTES.filter(menuItem => menuItem)
  }

}
