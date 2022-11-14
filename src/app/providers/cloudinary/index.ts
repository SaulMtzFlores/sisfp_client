import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable()
export class CloudinaryService {

  cloud_name: string = 'dybtlhfxu';

  constructor(
    private httpClient: HttpClient
  ) { }

  // .set("cloud_name", "dybtlhfxu")
  // .set("secure", true)
  // .set("upload_preset", "my_preset");

  upload(img: any): Observable<any> {
    console.log(img);
    return this.httpClient.post(`https://api.cloudinary.com/v1_1/${this.cloud_name}/image/upload`, img);
  }
}
