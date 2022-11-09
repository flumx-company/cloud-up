import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  selectedNavItem = 'home';
  showModal = false;
  loggedIn = false;
  // tslint:disable-next-line:no-any
  subscription: any;

  constructor(private route: ActivatedRoute, private authService: AuthService) {
  }

  ngOnInit() {
    this.subscription = this.authService.loggedIn.subscribe((flag: boolean) => {
      this.loggedIn = flag;
    });
  }

  ngOnDestroy() {
    console.log('ngOnDestroy')
    this.subscription.unsubscribe();
  }

  // tslint:disable-next-line:no-any
  onProfileClick(event: any) {
    console.log('onProfileClick')
    // if (this.loggedIn) {
      this.showModal = !this.showModal;
    // }
    event.stopImmediatePropagation();
  }

  onLogoutClick() {
    this.authService.logout();
    this.showModal = false;
  }

  // tslint:disable-next-line:no-any
  setTabActive(e: any) {
    this.selectedNavItem = e.srcElement.id;
  }

  isActive(id: string) {
    return location.pathname.split('/')[1] === id;//this.selectedNavItem === id;
  }

  isLoggedIn(): string {
    return this.loggedIn ? 'active' : '';
  }

  getUser(): string {
    return this.authService.getUserName();
  }
}
