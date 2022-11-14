import { NgModule } from '@angular/core';

import { TokenService } from './token';
import { DefaultLoaderService } from './default-loader';
import { LocalStorageService } from './local-storage';
import { NotificationsService } from './notifications';
import { CloudinaryService } from './cloudinary'

export { TokenService } from './token';
export { DefaultLoaderService } from './default-loader';
export { LocalStorageService } from './local-storage';
export { NotificationsService } from './notifications';
export { CloudinaryService } from './cloudinary';

@NgModule({
  declarations: [],
  imports: [],
  providers: [
    TokenService,
    LocalStorageService,
    DefaultLoaderService,
    NotificationsService,
    CloudinaryService
  ]
})
export class ProvidersModule { }
