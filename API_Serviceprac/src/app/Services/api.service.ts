import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { timeout } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface ApiEndpoint {
  endpoint: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  queryParams: any = {};

  constructor(private httpClient: HttpClient,) {
    console.log(window.navigator.onLine ? 'Internet Connection Enabled' : 'Internet Connection Disabled');
  }

  /**
   * Perform a get request to the api
   */
  async GET(endpoint: string | ApiEndpoint, params: any = {}): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        this.queryParams = params;
        //console.log(ApiService.getApiUrl() + endpoint)
        let result = this.httpClient.get(ApiService.getApiUrl() + endpoint, await this.buildRequestOptions()).pipe();
        result.subscribe(async (response: any) => { resolve(response); });
      } catch (e) {
        console.log('Caught exception in GET request: ', e);
        reject(null);
        return;
      }
    });
  }

  /**
   * Perform a post request to the server.
   */
  async POST(endpoint: string | ApiEndpoint, data: any | FormData = null, isFormData: boolean = false, withTimeout = true): Promise<any> {
    return new Promise(async (resolve, reject) => {
      let result: Observable<any>;
      try {
        if (!isFormData) {
          result = await this.httpClient.post(ApiService.getApiUrl() + endpoint, JSON.stringify(data),
            await this.buildRequestOptions()).pipe();
          result.subscribe(async (response: any) => { resolve(response); return; });
        }
        else {
          result = await this.httpClient.post(ApiService.getApiUrl() + endpoint, data,
            await this.buildRequestOptions(true)).pipe();
          result.subscribe(async (response: any) => { resolve(response); return; });
        }
      } catch (e) {
        console.log('Caught exception in POST request: ', e);
        reject(null);
        return;
      }
    });
  }

  /**
   * Perform a PUT request to the server.
   */
  async PUT(endpoint: string | ApiEndpoint, data: any = null, isFormData: boolean = false, withTimeout = true): Promise<any> {
    return new Promise(async (resolve, reject) => {
      let result: Observable<any>;
      try {
        if (!isFormData) {
          result = await this.httpClient.put(ApiService.getApiUrl() + endpoint, JSON.stringify(data),
            await this.buildRequestOptions()).pipe(timeout(withTimeout ? 15000 : 60000));
          result.subscribe(async (response: any) => { resolve(response); return; });
        }
        else {
          result = await this.httpClient.put(ApiService.getApiUrl() + endpoint, data,
            await this.buildRequestOptions(true)).pipe(timeout(withTimeout ? 15000 : 60000));
          result.subscribe(async (response: any) => { resolve(response); return; });
        }
      } catch (e) {
        console.log('Caught exception in PUT request: ', e);
        reject(null);
        return;
      }
    });
  }

  /**
   * Perform a delete request to the server.
   */
  async DELETE(endpoint: string | ApiEndpoint, withTimeout = true): Promise<any> {
    return new Promise(async (resolve, reject) => {
      let result: Observable<any>;
      try {
        result = await this.httpClient.delete(ApiService.getApiUrl() + endpoint,
          await this.buildRequestOptions()).pipe(timeout(withTimeout ? 15000 : 60000));
        result.subscribe(async (response: any) => {
          resolve(response);
          return;
        });
      } catch (e) {
        console.log('Caught exception in DELETE request: ', e);
        reject(null);
        return;
      }
    });
  }

  /**
     * Perform a UPLOAD request to the server.
     */
  async UPLOAD(formData: any, version = '', endpoint = 'upload/files', withTimeout = true): Promise<any> {
    return new Promise(async (resolve, reject) => {
      let result: Observable<any>;
      try {
        result = await this.httpClient.post(ApiService.getApiUrl() + version + endpoint, formData).pipe(timeout(withTimeout ? 15000 : 60000));
        result.subscribe(async (response: any) => {
          resolve(response);
          return;
        });
      } catch (e) {
        console.log('Caught exception in UPLOAD request: ', e);
        reject(null);
        return;
      }
    });
  }

  /**
     * Perform a FILE INACTIVE request to the server.
     */
  async InActiveFiles(data: any, version = '', endpoint = 'upload/files/in-active', withTimeout = true): Promise<any> {
    return new Promise(async (resolve, reject) => {
      let result: Observable<any>;
      try {
        result = await this.httpClient.put(ApiService.getApiUrl() + version + endpoint, data).pipe(timeout(withTimeout ? 15000 : 60000));
        result.subscribe(async (response: any) => {
          resolve(response);
          return;
        });
      } catch (e) {
        console.log('Caught exception in FILE INACTIVE request: ', e);
        reject(null);
        return;
      }
    });
  }



  async IP(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        let endpoint = 'https://api.db-ip.com/v2/free/self'; //'http://ip-api.com/json/';
        let result = this.httpClient.get(endpoint).pipe();
        result.subscribe(async (response: any) => { resolve(response); });
      } catch (e) {
        console.log('Caught exception in GET-IP request: ', e);
        reject(null);
        return;
      }
    });
  }

  async loadJSON(path: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      let result: Observable<any>;
      try {
        result = await this.httpClient.get(path).pipe();
        result.subscribe(async (response: any) => { resolve(response); return; });
      } catch (e) {
        console.log('Caught exception in JSON request: ', e);
        reject(null);
        return;
      }
    });
  }

  /**
   * Genearate the request options for all httpclient call.
   */
  private async buildRequestOptions(isFormData: boolean = false) {
    let options = {
      ... !isFormData && { headers: await this.buildHeaders() },
      params: await this.buildQueryParams(),
      withCredentials: false
    };
    return options;
  }

  /**
   * Generate the headers that are required for all the requests.
   */
  private async buildHeaders() {
    let headers: { Authorization?: string, 'Content-Type'?: string } = {
      'Content-Type': ''
    };

    if (localStorage.getItem('')) {
      headers.Authorization = 'Bearer ' + localStorage.getItem('');
    }

    return new HttpHeaders(headers);
  }

  private async buildQueryParams() {
    let httpParams = new HttpParams();
    Object.keys(this.queryParams).forEach((key) => {
      httpParams = httpParams.append(key, this.queryParams[key]);
    });
    return httpParams;
  }

  /**
   * Get the api url to use through different environment strategies.
   */
  private static getApiUrl(): string {
    return '';
  }

}
