import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HubService {
    private _pickedType: string = '';
    private _platform: string = '';
    private _pcie: string = '';
    private _readyForMotherBoard: string = '';
    private _socketNeeded: string = '';
    private _pcieNeeded: string = '';
  
    // Getterek
    getPickedType(): string {
      return this._pickedType;
    }
  
    getPlatform(): string {
      return this._platform;
    }
  
    getPcie(): string {
      return this._pcie;
    }
    getSocketNeeded(): string {
      return this._socketNeeded;
    }
  
    getPcieNeeded(): string {
      return this._pcieNeeded;
    }
  
    // Setterek
    setPickedType(value: string): void {
      this._pickedType = value;
    }
  
    setPlatform(value: string): void {
      this._platform = value;
    }
  
    setPcie(value: string): void {
      this._pcie = value;
    }
  
    setReadyForMotherBoard(value: string): void {
      this._readyForMotherBoard = value;
    }
  
    setSocketNeeded(value: string): void {
      this._socketNeeded = value;
    }
  
    setPcieNeeded(value: string): void {
      this._pcieNeeded = value;
    }
  }
