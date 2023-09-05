
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PcServiceService {

  constructor(private httpclient:HttpClient) { }
  SERVER = "http://localhost:8080"

  public testingConnection(){
    return this.httpclient.get(this.SERVER+"/pong")
  }
  public typeOfCpu(pcType: string, cpuDemand: string, amdOrIntel:boolean) {
    const params = new HttpParams()
      .set('pcType', pcType)
      .set('cpuDemand', cpuDemand)
      .set('amdOrIntel', amdOrIntel);
  
    return this.httpclient.get(this.SERVER + '/cpuInput', { params });
  }
}
