import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

import {AuthService} from '../../services/auth.service';

// tslint:disable-next-line:no-any
declare var $: any;

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  @ViewChild('headerMenu') menu: ElementRef;
  @ViewChild('headerBlockRight') block: ElementRef;

  loggedIn = false;
  userName = 'Unknown';

  constructor(private authService: AuthService) {
    this.authService.loggedIn.subscribe((data: boolean) => {
      this.loggedIn = data;
      this.userName = authService.getUserName();
    });
  }

  ngOnInit() {}

  logout() {
    this.authService.logout();
  }

  toggleMenu() {
    $(this.menu.nativeElement).fadeToggle(200);
  }
}
