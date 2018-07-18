import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'camelCase'})
export class CamelCasePipe implements PipeTransform {
    transform(value:string ):string {
      let regex = /\s|\-|\_|\//g;
      let m;
      let myString = value[0].toLowerCase() + value.slice(1);
      while (m = regex.exec(myString)) {
        myString = myString.slice(0,m.index) + myString[m.index + 1].toUpperCase() + myString.slice(m.index+2);
      }
      return myString.replace(/(\s|\-|\_|\/)/g, '');
    }
}
