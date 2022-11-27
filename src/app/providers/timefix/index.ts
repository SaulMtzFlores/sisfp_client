import { Injectable } from '@angular/core';
import { ApiProvider } from '../api';

@Injectable()
export class TimefixService {

  constructor(
    private apiProvider: ApiProvider
  ) { }

  async adjustTime(clientTime:any):Promise<any>{
    try {
      const request:any = await this.apiProvider.get({ url:'', auth: false });
      console.log(new Date());
      console.log(request.time);
      const serverTime:number = new Date(request.time).valueOf()
      console.log('Server Time', serverTime, '\n');

      const clientTime:number = new Date().valueOf()
      console.log('Client Time ', clientTime, '\n');

      const adjustment:number = Number(serverTime - clientTime);
      console.log('Adjustment ',adjustment, '\n');

      const adjusted:Date = new Date(clientTime + adjustment);
      console.log('Adjusted ', adjusted, '\n');

      return clientTime + adjustment;
    } catch (error) {
      console.log(error);
    }
  }
}
