import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserData } from '../challenge.interface';
import { MainService } from '../main.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public formData: UserData = {name: '', email: '', role: ''};
  constructor(private router: Router, private mainService: MainService) { }

  ngOnInit(): void {
  }

  registration() {
    this.router.navigate(["register"], {
      replaceUrl: true
    });
  }

  login() {
    this.mainService.getUserData().subscribe((data: any) => {
      const filteredData = data.filter(user => user.email === this.formData.email);
      if (filteredData.length) {
        alert('Successfully LoggedIn..');
        sessionStorage.setItem('loggedInUser', JSON.stringify(filteredData[0]));
        this.mainService.isLoggedIn$.next(true);
        this.router.navigate([""], {
          replaceUrl: true
        });
      } else {
        alert('User not Registered.. Please Register yourself.');
        this.router.navigate(["register"], {
          replaceUrl: true
        });
      }
    });
  }

}
