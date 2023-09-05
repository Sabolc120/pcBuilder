import { Component } from '@angular/core';
import { PcServiceService } from 'services/pc-service.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {
  constructor(private pcService: PcServiceService) {}
  pickedType="Not yet picked" //The picked type of the PC
  pcPage=true //Are we still on the PC page?
  cpuType=false; //Are we on the CPU Page?
  cpuDemand="" //Low, Medium, High, Ultra?
  amdOrIntel=false; //Is the CPU Amd Or Intel? true = Intel, False = AMD

  //Here will be the filtered cpus
  filteredCpusList ={
    identifierCpu: 0,
    cores: 0,
    manuFacTech: "",
    cpuName: "",
    tdp: 0,
    releaseDate: 0,
    amdOrIntel: true,
    platform: "",
    passMarkPoints: 0,
    cpuPriceUSD: 0
  }

  //Setters begin
  setBrand(value:boolean){
    this.amdOrIntel = value;
  }
  setValue(value: string) {
    this.pickedType = value;
  }
  goToCpus(){
    this.pcPage = false;
    this.cpuType = true;

  }
  setCpuDemand(value: string){
    this.cpuDemand = value
  }
  //Setters end

  //This is where I need to load in the CPU Options.
  loadInOptions(){
      this.pcService.typeOfCpu(this.pickedType, this.cpuDemand, this.amdOrIntel).subscribe(
      (resp:any) =>{
        this.filteredCpusList.identifierCpu = resp.identifierCpu
        this.filteredCpusList.cores = resp.core
        this.filteredCpusList.manuFacTech = resp.manuFacTech
        this.filteredCpusList.cpuName = resp.cpuName
        this.filteredCpusList.tdp = resp.tdp
        this.filteredCpusList.releaseDate = resp.releaseDate
        this.filteredCpusList.amdOrIntel = resp.amdOrIntel
        this.filteredCpusList.platform = resp.platform
        this.filteredCpusList.passMarkPoints = resp.passMarkPoints
        this.filteredCpusList.cpuPriceUSD = resp.cpuPriceUSD
        console.log("The querry request was sent successfully.");
        
      },
      (err)=>{
        console.log("Something went wrong with filtering the CPUS.");
        console.log(err); 
      }
      )
  }
}
