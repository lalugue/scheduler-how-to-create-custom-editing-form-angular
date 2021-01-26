import { Injectable } from '@angular/core';

@Injectable()
export class AppInfoService {
  constructor() {}

  public get title() {
    return 'Scheduler Custom Appointment Form';
  }

  public get currentYear() {
    return new Date().getFullYear();
  }
}
