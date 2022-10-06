import { Pipe, PipeTransform } from '@angular/core';

enum MONTH {
  January = 1,
  February,
  March,
  April,
  May,
  June,
  July,
  August,
  September,
  October,
  November,
  December,
}

@Pipe({
  name: 'convertMonth',
})
export class ConvertMonthPipe implements PipeTransform {
  transform(month: number): string {
    return MONTH[month];
  }
}
