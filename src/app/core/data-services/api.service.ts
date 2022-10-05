import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class ApiService {
  constructor(private readonly httpClient: HttpClient) {}

  public get(url: string, options?: any): Observable<any> {
    return this.httpClient.get(url, options);
  }
}
