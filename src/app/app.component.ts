import { Component } from '@angular/core';
import notify from 'devextreme/ui/notify';
import { Service, Data } from './app.service';
import { DxSchedulerComponent } from 'devextreme-angular';
import { ViewChild } from '@angular/core';
import { formatDate } from 'devextreme/localization';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [Service],
})
export class AppComponent {
  @ViewChild(DxSchedulerComponent, { static: false })
  scheduler: DxSchedulerComponent;

  data: Data[];
  currentDate: Date = new Date(2015, 4, 25);

  isCustomPopupVisible: boolean = false;
  editAppointmentData: any = {};
  rows: any;
  seats: any;  

  formatDate = formatDate;

  constructor(service: Service) {
    this.data = service.getData();
    this.rows = service.getRows();
    this.seats = service.getSeats();

    this.updateAppointment = this.updateAppointment.bind(this);
  }

  onAppointmentFormOpening(e){
    e.cancel = true;
    this.editAppointmentData = { ...e.appointmentData };    
    if(this.editAppointmentData.id){
      this.isCustomPopupVisible = true;
    }
  }

  onHiding(e){
    this.editAppointmentData = {};
  }

  updateAppointment(){
    if(this.editAppointmentData.seatRow && this.editAppointmentData.seatNumber){
      let oldAppointmentData = this.data.find(e=>e.id === this.editAppointmentData.id);
      this.scheduler.instance.updateAppointment(
        oldAppointmentData,
        this.editAppointmentData
      );    
      notify(
        'Selected seat ' +
          this.editAppointmentData.seatRow +
          this.editAppointmentData.seatNumber +
          ' for ' +
          this.editAppointmentData.text +
          '. Enjoy!'
      );
    }
    this.isCustomPopupVisible = false;
  }

  setSeatPrice(basePrice, row) {
    let rowPrice;
    if (row == 'A') rowPrice = 1;
    else if (row == 'B') rowPrice = 2;
    else if (row == 'C') rowPrice = 3;
    else if (row == 'D') rowPrice = 4;

    return basePrice * rowPrice;
  }
}
