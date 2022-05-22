import { Component, OnInit } from '@angular/core';
import { UserData } from './challenge.interface';
import { MainService } from './main.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'application-hack';
  public isLoggedIn: boolean = false;
  public loggedInUserData: UserData;
  constructor(private mainService: MainService) {
    sessionStorage.clear();
  }

  ngOnInit(): void {
    this.mainService.isLoggedIn$.subscribe(data => {
      if (data) {
        this.isLoggedIn = data;
        this.loggedInUserDetails();
      } else {
        this.isLoggedIn = data;
      }
    });
  }

  loggedInUserDetails() {
    const userData = JSON.parse(sessionStorage.getItem('loggedInUser'));
    if (userData) {
      this.isLoggedIn = true;
      this.loggedInUserData = userData;
    }
  }

  logout() {
    sessionStorage.clear();
    this.mainService.isLoggedIn$.next(false);
  }
}
