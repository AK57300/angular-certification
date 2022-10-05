import { Injectable } from '@angular/core';
import { find, Observable } from 'rxjs';
import { ApiService } from '../data-services/api.service';
import { IStock } from './stock.service';

@Injectable()
export class StockDetailsService {
  configUrl = 'https://finnhub.io/api/v1/';
  token = '&token=bu4f8kn48v6uehqi3cqg';

  constructor(private readonly apiService: ApiService) {}

  getNameStock(symbol: string): Observable<string> {
    return this.apiService.get(
      this.configUrl + 'search?q=' + symbol + this.token
    );
  }
}
