import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class ApiService {

  constructor(private readonly httpClient: HttpClient) { }

  public getAll(url: string, options?: any): Observable<any> {
    return this.httpClient.get(url, options)
  }

  public get(url: string, options?: any): Observable<any> {
    return this.httpClient.get(url, options)
  }

  public post(url: string, data: any, options?: any): Observable<any> {
    return this.httpClient.post(url, data, options)
  }

  public put(url: string, data: any, options?: any): Observable<any> {
    return this.httpClient.put(url, data, options)
  }

  public delete(url: string, options?: any): Observable<any> {
    return this.httpClient.delete(url)
  }

}