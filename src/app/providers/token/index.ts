import { Injectable } from '@angular/core';
import { LocalStorageService } from '../local-storage';
import { Token } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private _token: Token = null;

  constructor(private localStorageService: LocalStorageService) { }

  public get token(): Token{
    if(this._token){
      return this._token;
    }
    this._token = this.localStorageService.get('token');
    return this._token || null;
  }

  public set token(token: any){
    this._token = token;
    this.localStorageService.set('token', token);
    if(token === null){
      this.localStorageService.remove('token');
    }
  }

  public tokenExists(): boolean {
    this._token = this.localStorageService.get('token');
    return !!this._token;
  }

}
