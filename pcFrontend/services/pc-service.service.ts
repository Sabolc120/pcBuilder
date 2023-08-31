import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PcServiceService {

  constructor(private httpclient:HttpClient) { }
  SERVER = "http://localhost:8080"

  public testingConnection(){
    return this.httpclient.get(this.SERVER+'/pong')
  }
}
