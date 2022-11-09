import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';

import {AuthService} from '../../../shared/services/auth.service';
import {RegistrationService} from '../../services/registration.service';

@Component({
  selector: 'app-complete-registration',
  templateUrl: './complete-registration.component.html',
  styleUrls: ['./complete-registration.component.scss']
})
export class CompleteRegistrationComponent implements OnInit {
  confirmed = false;
  error = false;
  notEqual = false;
  uuid = '';

  model = {password: '', confirmPassword: ''};

  constructor(
      private route: ActivatedRoute, private service: RegistrationService,
      private authService: AuthService) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.uuid = params.get('uuid') || '';
    });
  }

  // tslint:disable-next-line:no-any
  onSubmit(event: any, form: any) {
    if (this.model.password !== this.model.confirmPassword) {
      this.notEqual = true;
    } else {
      this.notEqual = false;

      const icon = event.srcElement.children[1].children[0];
      icon.classList.add('fa', 'fa-spinner', 'fa-spin');

      this.service.confirmRegistration(this.uuid, this.model.password)
          .subscribe(
              resp => {
                this.confirmed = true;
                icon.classList.remove('fa', 'fa-spinner', 'fa-spin');
              },
              err => {
                this.error = true;
                icon.classList.remove('fa', 'fa-spinner', 'fa-spin');
              });
    }
  }

  // tslint:disable-next-line:no-any
  redirectToLogin(event: any) {
    this.authService.obtainAccessToken('/');
  }
}
