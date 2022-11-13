import { Injectable } from '@angular/core';
import { LocalStorageService } from '../local-storage';
import { Token } from './interfaces';
import jwtDecode from 'jwt-decode';

@Injectable()
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

  public userId():any {
    const token = this.localStorageService.get('token');
    if(token){
      const userId:any = jwtDecode(token);
      return userId._id;
    }else{
      return ''
    }
  }

}
