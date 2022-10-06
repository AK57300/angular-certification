import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { IQuote, IStockDetails, ISymboles } from '../../feature/model/model';

@Injectable()
export class ApiService {
  constructor(private readonly httpClient: HttpClient) {}

  public getQuote(url: string): Observable<IQuote> {
    return this.httpClient.get(url) as Observable<IQuote>;
  }

  public getSymbole(url: string): Observable<ISymboles> {
    return this.httpClient.get(url) as Observable<ISymboles>;
  }

  public getStockDetails(url: string): Observable<IStockDetails> {
    return this.httpClient.get(url) as Observable<IStockDetails>;
  }
}
