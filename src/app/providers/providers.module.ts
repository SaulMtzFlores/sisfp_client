import { NgModule } from '@angular/core';

import { TokenService } from './token';
import { DefaultLoaderService } from './default-loader';
import { LocalStorageService } from './local-storage';
import { NotificationsService } from './notifications';


export { TokenService } from './token';
export { DefaultLoaderService } from './default-loader';
export { LocalStorageService } from './local-storage';
export { NotificationsService } from './notifications';

@NgModule({
  declarations: [],
  imports: [],
  providers: [
    TokenService,
    LocalStorageService,
    DefaultLoaderService,
    NotificationsService
  ]
})
export class ProvidersModule { }
