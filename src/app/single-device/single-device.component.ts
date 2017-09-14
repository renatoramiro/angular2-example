import { Component, OnInit, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Device } from "app/models/device";
import { Router } from "@angular/router";

@Component({
  selector: 'single-device',
  templateUrl: './single-device.component.html',
  styleUrls: ['./single-device.component.css'],
  providers: []
})
export class SingleDeviceComponent {
  @Input()
  device: Device;
  data: any;

  constructor(private router: Router) {
  }

  show(device) {
    this.router.navigate(['devices', device._id]);
  }
}
