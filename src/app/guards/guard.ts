import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ApiProvider } from 'app/providers/api';
import { NotificationsService } from 'app/providers/notifications';
import { TokenService } from 'app/providers/token';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class Guard implements CanActivate {
  noAuthRoutes = ['/auth/sign-in', '/auth/sign-up', '/auth/redeem', '/auth/recover'];

  constructor(
    private tokenProvider: TokenService,
    private apiProvider: ApiProvider,
    public router: Router,
    private notif: NotificationsService
  ){}

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
      try {
        const stateUrl = state.url.includes('?') ? state.url.split('?')[0] : state.url;
        if(!!this.noAuthRoutes.find(url => url === stateUrl ) && !this.tokenProvider.tokenExists()){ // Ruta no auth, no token, accede.
          return true;
        } else if (!!this.noAuthRoutes.find(url => url === stateUrl) && this.tokenProvider.tokenExists()){ // Ruta no auth, hay token, accede a home.
          this.router.navigate([`/udg/home`]);
          return true;
        } else if (!this.noAuthRoutes.find(url => url === stateUrl) && this.tokenProvider.tokenExists()){ // Ruta auth, hay token, verifica token
          if(!await this.validateToken(stateUrl.split('/')[1])){
            this.router.navigate(['/udg/home']);
            return false;
          }
          return true;
        } else {
          this.tokenProvider.token = null;
          this.apiProvider.setToken(null);
          this.router.navigate(['/auth/sign-in']);
          return false;
        }
      } catch (error) {
        console.log(error);
        return false;
      }
  }

  async validateToken(module:string):Promise<boolean>{
    try {
      const token:any = this.tokenProvider.token;
      const decoded:any = jwtDecode(token);

      const _user:any = await this.apiProvider.get({
        url: `/users/${decoded._id}`,
        auth: true
      });
      if(!_user){
        return false;
      }

      const _role:any = await this.apiProvider.get({
        url: `/roles/${_user.roleId}`,
        auth: true
      });
      if(_role && (_role.modules.includes(module) || _role.modules.includes('*'))){
        return true;
      }

      this.notif.pop('warning', 'Lo sentimos, no tienes acceso a esta ubicación');
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

}
