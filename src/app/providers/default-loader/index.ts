import { Injectable } from '@angular/core';
import * as data from './ids.json';

@Injectable()
export class DefaultLoaderService {

  public loadedIds: any;
  constructor() {
    this.loadedIds = JSON.parse(JSON.stringify(data));
  }

  public idp(code: string ) : string {
    return this.loadedIds[`${code}`];
  }
}
