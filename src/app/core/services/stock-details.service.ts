import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { filter, forkJoin, map, Observable, of } from 'rxjs';
import {
  IStockDetails,
  StockDetail,
} from '../../feature/detail-view/detail-view.component';
import { ApiService } from '../data-services/api.service';
import { ISymboles } from './stock.service';

export interface ISentiment {
  resultOne: ISymboles;
  resultTwo: StockDetail[];
}

@Injectable()
export class StockDetailsService {
  configUrl = 'https://finnhub.io/api/v1/';
  token = '&token=bu4f8kn48v6uehqi3cqg';

  constructor(private readonly apiService: ApiService) {}

  getNameStock(symbol: string): Observable<ISymboles> {
    return this.apiService.get(
      this.configUrl + 'search?q=' + symbol + this.token
    );
  }

  getStockDetails(symbol: string): Observable<StockDetail[]> {
    let currentDate = new Date();
    let dateDebut = new Date(new Date().setMonth(currentDate.getMonth() - 3));
    let dateFinn = new Date(new Date().setMonth(currentDate.getMonth() - 1));

    let datee = formatDate(dateDebut, 'yyyy-MM-dd', 'en');
    let dateFin = formatDate(dateFinn, 'yyyy-MM-dd', 'en');

    return this.apiService
      .get(
        this.configUrl +
          '/stock/insider-sentiment?symbol=' +
          symbol +
          '&from=' +
          datee +
          '&to=' +
          dateFin +
          this.token
      )
      .pipe(
        map((data) => {
          let newStocks: StockDetail[] = [];
          for (let i = 0; i < 3; i++) {
            let currentDate = new Date(
              new Date().setMonth(new Date().getMonth() - 2 + i)
            );
            let newStock: StockDetail;
            newStock = data.data.find(
              (data) => data.month === currentDate.getMonth() + 1
            );
            newStock = {
              symbol: newStock?.symbol,
              year: currentDate.getFullYear(),
              month: currentDate.getMonth() + 1,
              change: newStock?.change,
              mspr: newStock?.mspr,
            };
            newStocks.push(newStock);
          }
          return newStocks;
        })
      );
  }

  getSentiment(symbol: string): Observable<ISentiment> {
    return forkJoin({
      resultOne: this.getNameStock(symbol),
      resultTwo: this.getStockDetails(symbol),
    });
  }
}
