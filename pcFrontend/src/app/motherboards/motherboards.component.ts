import { Component, OnInit } from '@angular/core';
import { PcServiceService } from 'services/pc-service.service';
import { MainPageComponent } from '../main-page/main-page.component';
import { GpusComponent } from '../gpus/gpus.component';
import { HubService } from '../hub.service';

@Component({
  selector: 'app-motherboards',
  templateUrl: './motherboards.component.html',
  styleUrls: ['./motherboards.component.css']
})
export class MotherboardsComponent {
  constructor(private pcService: PcServiceService,
    private hub: HubService) {}
    ngOnInit(): void {
      this.loadInMotherBoards();
    }
    socketNeeded = this.hub.getSocketNeeded()
    pickedType = this.hub.getPickedType()
    pcieNeeded = this.hub.getPcie()
    motherBoards: any[] = []
    selectedMotherBoardIdentifier = 0
    foundMotherboard = {
      motherBoardIdentifier: 0,
      socket: "",
      pcie: "",
      price: 0,
      name: "",
      generation:""
    }

    loadInMotherBoards(){
      console.log("Proci plat: "+this.socketNeeded);
      console.log("PCIE: "+this.pcieNeeded);
      
      

      this.pcService.typeOfMotherBoard(this.socketNeeded, this.pcieNeeded).subscribe(
        (resp:any)=>{
          this.motherBoards = resp
          console.log("The query was sent successfully for the Motherboard filtering");
        },
        (err)=>{
          console.log("Something went wrong with querrying the Motherboards");
          console.log(err);
        } 
      )
    }
    findSelectedMotherboards(){
      for (let i = 0; i < this.motherBoards.length; i++) {
        if (this.motherBoards[i].gpuIdentifier == this.selectedMotherBoardIdentifier) {
          console.log("Keresett ID Megtalálva(Motherboard)", this.selectedMotherBoardIdentifier);
            this.foundMotherboard = {
                motherBoardIdentifier: this.motherBoards[i].motherBoardId,
                socket: this.motherBoards[i].socket,
                pcie: this.motherBoards[i].pcie,
                price: this.motherBoards[i].price,
                name: this.motherBoards[i].motherBoardName,
                generation: this.motherBoards[i].generation,


            };
            this.hub.setPlatform(this.motherBoards[i].socket)
            break; // Megtaláltuk az elemet, így kilépünk a ciklusból
          }
        }
      }
}