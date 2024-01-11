import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class HttpClientService {
  constructor(
    private httpClient: HttpClient,
    @Inject('baseUrl') private baseUrl: string
  ) { }

  private CreateUrl(requestParameter: Partial<RequestParameters>) {
    let url: string = '';
    if (requestParameter.fullEndPoint) {
      url = requestParameter.fullEndPoint;
    } else {
      url = `${requestParameter.baseUrl ? requestParameter.baseUrl : this.baseUrl
        }/${requestParameter.controller}${requestParameter.action ? `/${requestParameter.action}` : ''
        }`;
    }
    return url;
  }

  get<T>(
    requestParameter: Partial<RequestParameters>,
    id?: string
  ): Observable<T> {
    // let url: string = "";
    // if (requestParameter.fullEndPoint) {
    //   url = requestParameter.fullEndPoint;
    // } else {
    //   url = `${this.CreateUrl(requestParameter)}${id ? `/${id}`:""}`;
    // }

    let url: string = `${this.CreateUrl(requestParameter)}${id ? `/${id}` : ''
      }${requestParameter.query ? `?${requestParameter.query}` : ''}`;
    return this.httpClient.get<T>(url, { headers: requestParameter.headers });
  }
  post<T>(
    requestParameter: Partial<RequestParameters>,
    body: Partial<T>
  ): Observable<T> {
    // let url: string = "";
    // if(requestParameter.fullEndPoint){
    //   url = requestParameter.fullEndPoint;
    // }else{
    //   url = `${this.CreateUrl(requestParameter)}`
    // }

    let url: string = `${this.CreateUrl(requestParameter)}${requestParameter.query ? `?${requestParameter.query}` : ''
      }`;
    return this.httpClient.post<T>(url, body, {
      headers: requestParameter.headers,
    });
  }
  put<T>(
    requestParameter: Partial<RequestParameters>,
    body: Partial<T>
  ): Observable<T> {
    let url: string = `${this.CreateUrl(requestParameter)}${requestParameter.query ? `?${requestParameter.query}` : ''
      }`;
    return this.httpClient.put<T>(url, body, {
      headers: requestParameter.headers,
    });
  }
  delete<T>(
    requestParameter: Partial<RequestParameters>,
    id: string
  ): Observable<T> {
    let url: string = `${this.CreateUrl(requestParameter)}`;
    if (requestParameter.fullEndPoint == null) url = url + '/' + id;
    if (requestParameter.query != null) {
      url = url + requestParameter.query;
    }
    return this.httpClient.delete<T>(url, {
      headers: requestParameter.headers,
    });
  }
}

export class RequestParameters {
  controller?: string;
  action?: string;
  query?: string;
  headers?: HttpHeaders;
  baseUrl?: string;
  fullEndPoint?: string;
}
