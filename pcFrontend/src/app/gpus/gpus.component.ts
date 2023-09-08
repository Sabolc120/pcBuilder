import { Component, Input } from '@angular/core';
import { PcServiceService } from 'services/pc-service.service';
import { MainPageComponent } from '../main-page/main-page.component';
import { HubService } from '../hub.service';

@Component({
  selector: 'app-gpus',
  templateUrl: './gpus.component.html',
  styleUrls: ['./gpus.component.css']
})
export class GpusComponent {
  constructor(private pcService: PcServiceService,
    private hub: HubService) {}

    //The beginning of Gpu related variables
    showMyGpu = false;
    showNextSection = false;
    pickedType = this.hub.getPickedType()
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
      vram:0,
      pcie: ""
    }
  readyForMotherBoard = 'false';
  readyForPickingGpu = false;
  readyConfirmingOptions = false;
  setResolutionDemand(value: string){
    this.resolution = value;
  }
  updateReadyForGpuStageTwo(){
    this.readyForMotherBoard = 'ready'
    console.log(this.readyForMotherBoard);
    
    this.showMyGpu = true
    this.findSelectedGpus()
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
              vram: this.filteredGpuList[i].vram,
              pcie: this.filteredGpuList[i].pcie
          };
          this.hub.setPcie(this.filteredGpuList[i].pcie)
          break; // Megtaláltuk az elemet, így kilépünk a ciklusból
        }
      }
    }
}
