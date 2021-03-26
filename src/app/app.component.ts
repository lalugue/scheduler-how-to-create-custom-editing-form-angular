import { Component, HostBinding } from '@angular/core';
import notify from "devextreme/ui/notify";
import { Service, Data } from "./app.service";
import Query from "devextreme/data/query";
import { DxSchedulerComponent } from 'devextreme-angular';
import { ViewChild } from '@angular/core';
import { formatDate } from "devextreme/localization";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [Service]
})
export class AppComponent  {
  @ViewChild(DxSchedulerComponent, { static: false })
  scheduler: DxSchedulerComponent;

  data: Data[];
  currentDate: Date = new Date(2015, 4, 25);
  movieInfo: any;

  /**Custom Popup Items**/
  isCustomPopupVisible: boolean = false;
  editAppointmentData: any = {};
  rows: any;
  seats: any;
  toolbarItems: any;
  selectedRow: any;
  selectedSeat: any;

  formatDate = formatDate;

  constructor(service: Service) {
    this.data = service.getData();

    this.rows = ["A", "B", "C", "D"];
    this.seats = [1, 2, 3, 4, 5];
    this.selectedRow = "A";
    this.selectedSeat = 1;
  }

  onAppointmentFormOpening = (e) => {
    e.cancel = true;

    this.editAppointmentData = {...e.appointmentData};
    console.log(this.editAppointmentData);
    this.isCustomPopupVisible = true;
  };

  onHiding = (e) => {
    console.log(this.editAppointmentData);
    this.editAppointmentData = {};
  };

  confirmSelection = (e) => {
    notify(
      `Seat reserved: ${this.selectedRow}-${this.selectedSeat}`,
      "success",
      500
    );

    this.isCustomPopupVisible = false;
  };

  cancelSelection = (e) => {
    this.isCustomPopupVisible = false;
  };

  setSeatPrice(basePrice, row){
    let rowPrice;
    if(row == 'A')
      rowPrice = 1;
    else if(row == 'B')
      rowPrice = 2;
    else if(row == 'C')
      rowPrice = 3;
    else if(row == 'D')
      rowPrice = 4;
    
    return basePrice * rowPrice;
  }

}
