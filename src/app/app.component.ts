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
  //oldAppointmentData: any = {};
  editAppointmentData: any = {};
  rows: any;
  seats: any;
  toolbarItems: any;

  formatDate = formatDate;

  constructor(service: Service) {
    this.data = service.getData();

    this.rows = service.getRows();
    this.seats = service.getSeats();    
  }

  onAppointmentFormOpening = (e) => {
    e.cancel = true;    
    this.editAppointmentData = {...e.appointmentData};
    //this.oldAppointmentData = {...this.editAppointmentData};
    console.log(this.editAppointmentData);
    this.isCustomPopupVisible = true;
  };

  onHiding = (e) => {    
    //this.oldAppointmentData = {};
    this.editAppointmentData = {};
  };

  updateAppointment = (e) => {    
    let oldAppointmentData = this.data.find(e=>{      
      return e.id == this.editAppointmentData.id
    });    
    this.scheduler.instance.updateAppointment(oldAppointmentData, this.editAppointmentData);
    notify("Selected seat " + this.editAppointmentData.seatRow + this.editAppointmentData.seatNumber + " for " + this.editAppointmentData.text + ". Enjoy!");
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
