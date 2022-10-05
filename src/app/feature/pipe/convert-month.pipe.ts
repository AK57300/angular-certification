import { Pipe, PipeTransform } from '@angular/core';

enum MONTH {
  JANUARY = 1,
  FEBRUARY,
  MARCH,
  APRIL,
  MAY,
  JUNE,
  JULY,
  AUGUST,
  SEPTEMBER,
  OCTOBER,
  NOVEMBER,
  DECEMBER,
}

@Pipe({
  name: 'convertMonth',
})
export class ConvertMonthPipe implements PipeTransform {
  transform(month: number): string {
    return MONTH[month];
  }
}
