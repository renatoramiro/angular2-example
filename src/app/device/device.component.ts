import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import 'rxjs/Rx';
import { LoginService } from "app/shared/login/login.service";
import { DevicesService } from "app/shared/devices/devices.service";

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css'],
  providers: [LoginService, DevicesService]
})
export class DeviceComponent implements OnInit {

  public deviceForm: FormGroup;

  constructor(private router: Router, private loginService: LoginService,
    private service: DevicesService, private fb: FormBuilder) {
    this.deviceForm = fb.group({
      'name': [null, Validators.compose([Validators.required, Validators.minLength(3)])],
      'type': [null, Validators.required]
    });
  }

  ngOnInit() {}

  save(device) {
    if (this.validateDevice(device)) {
      this.service.save(device).subscribe(data => {
        this.router.navigate(['/devices']);
      }, this.onError);
    }
  }

  private onError(error): void {
    console.error(error);
  }

  private validateDevice(device): boolean {
    return device.name && device.type;
  }

}
