import { Component } from '@angular/core';
import { PcServiceService } from 'services/pc-service.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {
  constructor(private pcService: PcServiceService) {}
  pickedType="Not yet picked"
  setValue(value: string) {
    this.pickedType = value;
  }
}
