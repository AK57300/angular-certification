import { Injectable } from '@angular/core';
import { filter, Observable } from 'rxjs';
import { ApiService } from '../data-services/api.service';

@Injectable()
export class StockDetailsService {
  configUrl = 'https://finnhub.io/api/v1/';
  token = '&token=bu4f8kn48v6uehqi3cqg';

  dateToday = new Date();
  dateDebut = new Date();
  constructor(private readonly apiService: ApiService) {
    this.dateDebut.setMonth(this.dateToday.getMonth() - 3);
  }

  getNameStock(symbol: string): Observable<string> {
    return this.apiService.get(
      this.configUrl + 'search?q=' + symbol + this.token
    );
    /*.pipe(
        filter((data) => {
          console.log(data.result);
          return true;
        })
      )*/
  }

  getStockDetails(symbol: string, dateDebut: string, dateToday: string) {
    console.log(dateDebut);
    console.log(dateToday);

    return this.apiService.get(
      this.configUrl +
        '/stock/insider-sentiment?symbol=' +
        symbol +
        '&from=' +
        dateDebut +
        '&to=' +
        dateToday +
        this.token
    );
  }
}
