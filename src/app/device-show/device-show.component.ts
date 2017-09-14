import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { DevicesService } from "app/shared/devices/devices.service";
import { Device } from "app/models/device";

@Component({
  selector: 'app-device-show',
  templateUrl: './device-show.component.html',
  styleUrls: ['./device-show.component.css'],
  providers: [DevicesService]
})
export class DeviceShowComponent implements OnInit {
  device: Device;

  constructor(private activeRoute: ActivatedRoute,
    private deviceService: DevicesService) {}

  ngOnInit() {
    // this.activeRoute.params
    //   .map(params => params['id'])
    //   .switchMap(id => this.deviceService.show(id))
    //   .subscribe(data => this.device = data.device);

    // this.deviceService.show(this.activeRoute.snapshot.params['id'])
    //   .subscribe(data => this.device = data.device);

    this.deviceService.show(this.activeRoute.snapshot.paramMap.get('id'))
      .subscribe(data => this.device = data.device);
  }

}
