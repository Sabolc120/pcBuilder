import { Component } from '@angular/core';
import { PcServiceService } from 'services/pc-service.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {
  constructor(private pcService: PcServiceService) {}
  testConnection(){
    this.pcService.testingConnection().subscribe(
      (resp) =>{
        console.log("Connection works? Check console");
        
      },
      (err) =>{
        console.log(err);
      }
    )
  }

}
