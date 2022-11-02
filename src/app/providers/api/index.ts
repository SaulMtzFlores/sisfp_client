import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { TokenService } from '../token';
import { environment } from '../../../../src/environments/environment';
import { throwError, firstValueFrom, Observable } from 'rxjs';
import { map, catchError, first, retry } from 'rxjs/operators';
import { HttpDefaultOptions, HttpGetOptions, HttpPostOptions, HttpPutOptions, HttpRequestOptions } from './interfaces';
import { NotificationsService } from '../notifications';


@Injectable({
  providedIn: 'root'
})
export class ApiProvider {

  private _baseUrl: string;
  private _token!: string;


  constructor(private http : HttpClient,
    private router : Router,
    private notif : NotificationsService,
    private tokenService : TokenService) {
      this._baseUrl = environment.api;
      this.catchResponseError = this.catchResponseError.bind(this);
  }

  public get baseUrl(): string {
    return this._baseUrl;
  }

  public getBaseUrl(): string {
    return this._baseUrl;
  }

  public get token(): string {
    if(!this._token){
      this._token = this.tokenService.token.id;
    }
    return this._token;
  }

  public setToken(token: any): boolean {
    this._token = token;
    return true;
  }

  private getRequestOptions(options: HttpRequestOptions): any {
    let headers = (options.auth) ?
    new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': this.token
    })
    :
    new HttpHeaders({
      'Accept': 'application/json'
    });
    if(options.contentType){
      if(options.contentType === 'multipart/form-data'){
        headers = headers.append('enctype', 'multipart/form-data');
      }
    }
    return {headers, body: options.data, responseType: options.responseType || 'json', params: options.params }
  }

  public get(options: HttpGetOptions) : any {
    if (options.auth && !this.token){
      return firstValueFrom(
        new Observable((observer) => {
          observer.error(null);
          observer.complete();
        })
      );
    } else {
      const _vars = options.url.match(/{(.*?)}/g) || [];
      for(const _var of _vars){
        const _value = options.params[_var.replace(/\{|\}/gi, '')];
        options.url = options.url.replace(
          _var,
          encodeURIComponent(
            typeof _value === 'string' ? _value : JSON.stringify(_value)
          )
        );
      }
      const obs = this.http
        .get(
          !options.ignoreBase ? this.baseUrl + options.url : options.url,
          this.getRequestOptions({
            auth: options.auth,
            contentType: options.contentType,
            responseType: options.responseType,
          })
        )
        .pipe(first())
        .pipe(retry(1), catchError(this.catchResponseError));
      return firstValueFrom(obs);
    }
  }

  public post(options: HttpPostOptions): Promise<any> {
    if(options.auth && !this.token){
      return firstValueFrom(new Observable((observer) => {
        observer.error(null);
        observer.complete();
      }));
    } else {
      const requestOptions: HttpRequestOptions = { auth: options.auth };
      if(options.isFile){
        requestOptions.responseType = 'arraybuffer';
      }
      const obs = this.http
        .post(this._baseUrl + options.url, options.data, this.getRequestOptions(requestOptions))
        .pipe(first())
        .pipe(map(res => res))
        .pipe(catchError(this.catchResponseError))
      return firstValueFrom(obs);
    }
  }

  public put(options: HttpPutOptions): Promise<any> {
    if(options.auth && !this.token){
      return firstValueFrom(new Observable((observer) => {
        observer.error(null);
        observer.complete();
      }));
    } else {
      const requestOptions: HttpRequestOptions = { auth: options.auth };
      if(options.hasFiles){
        requestOptions.responseType = 'multipart/form-data';
      }
      const obs = this.http
        .post(this._baseUrl + options.url, options.data, this.getRequestOptions(requestOptions))
        .pipe(first())
        .pipe(catchError(this.catchResponseError))
      return firstValueFrom(obs);
    }
  }

  public delete(options: HttpDefaultOptions): Promise<any> {
    if(options.auth && !this.token){
      return firstValueFrom(new Observable((observer) => {
        observer.error(null);
        observer.complete();
      }));
    } else {
      const obs = this.http
        .post(this._baseUrl + options.url, this.getRequestOptions({auth: options.auth}))
        .pipe(first())
        .pipe(map(res => res))
        .pipe(catchError(this.catchResponseError));

      return firstValueFrom(obs);
    }
  }

  private catchResponseError(error: HttpErrorResponse){
    console.log('API ERROR');
    const err = { code: error.status, message: error.error.message, description: '', development: (error.error as any)};

    if(error.status === 400){
      err.description = `400. Petición incorrecta al api.`;
    } else if (error.status === 401){
      this.tokenService.token = null;
      this.router.navigate(['auth/signin']);
    } else if (error.status === 500){
      err.description = `500. Error del servidor ${err.message}`
    } else if (error.status === 505){
      err.description = `505. Error del servidor ${err.message}`
    }
    this.notif.pop('error', err.message);
    return throwError(err);
  }
}
