import { Component, Input } from '@angular/core';
import { PcServiceService } from 'services/pc-service.service';
import { GpusComponent } from '../gpus/gpus.component';
import { HubService } from '../hub.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {
  constructor(private pcService: PcServiceService,
    private hub: HubService) {
    }
  
  //The beginning of Page related and CPU Related variables
  pickedType="Not yet picked" //The picked type of the PC
  page="pcType"
  cpuType=false; //Are we on the CPU Page?
  cpuDemand="" //Low, Medium, High, Ultra?
  amdOrIntel=false; //Is the CPU Amd Or Intel? true = Intel, False = AMD
  filteredCpusList: any[] = []; //The CPUS for the list
  //Needed for continue the building options
  pickedBrand = false;
  pickedDemand = false;
  readyForStageOfCpuBrand = false;
  readyForStageOfCpuPick = false;
  readyForGpuStageOne = false;
  //Needed for continue the building options
  selectedCpuIdentifier = 0
  foundCpu={
    cpuIdentifier:0,
    cpuName:"",
    cpuCores:0,
    passMarkPoints:0,
    platform:"",
    releaseDate:"",
    cpuPriceUsd:0
  }
  //The end of Page related and CPU Related variables

  //The beginning of Gpu related variables

  readyForGpuStageTwo = false;
  readyForPickingGpu = false;
  readyConfirmingOptions = false;
  //The end of Gpu related variables
  goToCpus(){
    this.page="cpusOne"
  }
  goToCpusTwo(){
    this.page="cpusTwo"
  }
  //Setters begin
  setBrand(event: any) {
    const value = event.target.value;
    this.amdOrIntel = value === 'Intel';
    this.pickedBrand = true
  }
  setValue(value: string) {
    this.hub.setPickedType(value)
    this.pickedType = value;
    this.readyForStageOfCpuBrand = true
  }
  setCpuDemand(value: string){
    this.cpuDemand = value
    this.pickedDemand = true
  }
  updateReadyForGpuStageOne() {
    if (this.selectedCpuIdentifier) {
      this.readyForGpuStageOne = true;
    }
  }
  findSelectedCpu() {
    for (let i = 0; i < this.filteredCpusList.length; i++) {
      if (this.filteredCpusList[i].identifierCpu == this.selectedCpuIdentifier) {
        console.log("Keresett ID Megtalálva", this.selectedCpuIdentifier);
          this.foundCpu = {
              cpuIdentifier: this.filteredCpusList[i].identifierCpu,
              cpuName: this.filteredCpusList[i].cpuName,
              cpuCores: this.filteredCpusList[i].cores,
              passMarkPoints: this.filteredCpusList[i].passMarkPoints,
              platform: this.filteredCpusList[i].platform,
              releaseDate: this.filteredCpusList[i].releaseDate,
              cpuPriceUsd: this.filteredCpusList[i].cpuPriceUSD

          };
          this.hub.setSocketNeeded(this.filteredCpusList[i].platform)
          break; // Megtaláltuk az elemet, így kilépünk a ciklusból
      }
  }
}
  //This is where I need to load in the CPU Options.
  loadInOptions(){
      this.pcService.typeOfCpu(this.pickedType, this.cpuDemand, this.amdOrIntel).subscribe(
      (resp:any) =>{
        this.filteredCpusList = resp;
        console.log("The querry request was sent successfully.");
        
      },
      (err)=>{
        console.log("Something went wrong with filtering the CPUS.");
        console.log(err); 
      }
      )
      if(this.pickedBrand == true){
        this.readyForStageOfCpuPick = true;
      }
  }
  goToGpusOne(){
    this.page="gpusOne"
    this.readyForGpuStageTwo = true;
    this.findSelectedCpu()
  }
}