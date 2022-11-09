import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationService } from './services/registration.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [RegistrationService]
})
export class CoreModule { }
