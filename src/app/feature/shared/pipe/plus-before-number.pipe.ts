import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'plusBeforeNumber',
})
export class PlusBeforeNumberPipe implements PipeTransform {
  transform(num: number): string | number {
    if (num > 0) {
      return '+' + num;
    }
    return num;
  }
}
