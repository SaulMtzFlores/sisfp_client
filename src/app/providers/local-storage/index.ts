import { Injectable } from '@angular/core';
import * as SecureLS from 'secure-ls';

@Injectable()
export class LocalStorageService {

  private secure = new SecureLS({ encodingType: 'rc4', isCompression: false, encryptionSecret: '3KLJ4ajw24#$"fsfd"$.wdas'});
  constructor() { }

  public get(key:string){
    return this.secure.get(key);
  }

  public set(key:string, value: any){
    this.secure.set(key, value);
  }

  public remove(key: string){
    this.secure.remove(key);
  }

  public removeAll(){
    this.secure.removeAll();
  }

}
