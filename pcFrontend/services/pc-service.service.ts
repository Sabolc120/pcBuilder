
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
  public typeOfGpu(pcType: string, gpuDemand: string, resolution: string) {
    const params = new HttpParams()
      .set('pcType', pcType)
      .set('gpuDemand', gpuDemand)
      .set('resolution', resolution);
  
    return this.httpclient.get(this.SERVER + '/gpuInput', { params });
  }
  public typeOfMotherBoard(socket: string, pcie: string, pcType: string) {
    const params = new HttpParams()
      .set('socket', socket)
      .set('pcie', pcie)
      .set('pcType',pcType);
  
    return this.httpclient.get(this.SERVER + '/motherBoardInput', { params });
  }
}
