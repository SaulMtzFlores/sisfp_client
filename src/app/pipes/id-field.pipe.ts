import { Pipe, PipeTransform } from '@angular/core';
import { ApiProvider } from 'app/providers/api';

@Pipe({
  name: 'idField'
})
export class IdFieldPipe implements PipeTransform {

  constructor(
    private apiProvider: ApiProvider
  ){}
  async transform(id:string, path: string, bindLabel:string): Promise<string|void> {
    try {
      const model:any = await this.apiProvider.get({
        url: `${path}/${id}`,
        auth: true
      });
      return model[`${bindLabel}`];
    } catch (error) {
      console.log(error);
    }
  }

}
