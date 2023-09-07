import { Component } from '@angular/core';
import { PcServiceService } from 'services/pc-service.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {
  constructor(private pcService: PcServiceService) {}
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
  gpuDemand = ""
  resolution=""
  readyForGpuStageTwo = false;
  filteredGpuList: any[] = []; //Array containing All the GPUS
  selectedGpuIdentifier = 0
  foundGpu={  //Array containing the filtered Gpus
    gpuIdentifier: 0,
    gpuName: "",
    passMarkScore:0,
    releaseDate:"",
    price:0,
    vram:0
  }
  readyForPickingGpu = false;
  readyConfirmingOptions = false;
  //The end of Gpu related variables
  goToCpus(){
    this.page="cpusOne"
  }
  goToCpusTwo(){
    this.page="cpusTwo"
  }
  goToGpusOne(){
    this.page="gpusOne"
    this.readyForGpuStageTwo = true;
    this.findSelectedCpu()
  }
  goToGpusTwo(){
    this.page="gpusTwo"
    this.findSelectedGpus()
  }
  //Setters begin
  setBrand(event: any) {
    const value = event.target.value;
    this.amdOrIntel = value === 'Intel';
    this.pickedBrand = true
  }
  setValue(value: string) {
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
  //Setters end
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
  //The beginning of GPU methods
  setResolutionDemand(value: string){
    this.resolution = value;
  }
  updateReadyForGpuStageTwo(){

  }
  setGpuDemand(value: string){
    this.gpuDemand = value;
    if(this.resolution!=null && this.gpuDemand !=null){
      this.readyConfirmingOptions = true;
    }
  }
  loadInOptionsGpu(){
    this.pcService.typeOfGpu(this.pickedType, this.gpuDemand, this.resolution).subscribe(
      (resp:any)=>{
        this.filteredGpuList = resp
        console.log("The query was sent successfully for the GPu filtering");
      },
      (err)=>{
        console.log("Something went wrong with querrying the Gpus");
        console.log(err);
      } 
    )
    this.readyForPickingGpu = true
  }
  findSelectedGpus(){
    console.log(this.filteredGpuList.length);
    
    for (let i = 0; i < this.filteredGpuList.length; i++) {
      if (this.filteredGpuList[i].gpuIdentifier == this.selectedGpuIdentifier) {
        console.log("Keresett ID Megtalálva(GPU)", this.selectedGpuIdentifier);
          this.foundGpu = {
              gpuIdentifier: this.filteredGpuList[i].gpuIdentifier,
              gpuName: this.filteredGpuList[i].gpuName,
              passMarkScore: this.filteredGpuList[i].passmarkScore,
              releaseDate: this.filteredGpuList[i].releaseDate,
              price: this.filteredGpuList[i].price,
              vram: this.filteredGpuList[i].vram
          };
          break; // Megtaláltuk az elemet, így kilépünk a ciklusból
        }
      }
    }
  }