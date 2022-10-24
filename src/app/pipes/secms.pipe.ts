import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'secms'
})
export class SecmsPipe implements PipeTransform {

  transform(value: string): string {
    const dateObj: Date = new Date(value);

    let seconds = dateObj.getSeconds();
    let ms = dateObj.getMilliseconds();

    return `${seconds} secs. ${ms} ms.`
  }

}
