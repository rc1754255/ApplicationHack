import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserData } from '../challenge.interface';
import { MainService } from '../main.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public formData: UserData = {name: '', email: '', role: '--Select--'};
  public noOfUserregistered: number = 0;
  public savedUserData: UserData[] = [];
  public roles = ['--Select--', 'Employee', 'Applicant'];

  constructor(private mainService: MainService, private router: Router) { }

  ngOnInit(): void {
    this.getUserData();
  }

  register() {
    let isExist = false;
    if (this.savedUserData && this.savedUserData.length) {
      const userData = this.savedUserData.filter(user => user.email === this.formData.email);
      if (userData.length) {
        isExist = true;
      }
    }
    if (isExist) {
      alert("Email ID already Exist. Please Login or try with new EmailId.");
      this.formData = {name: '', email: '', role: '--Select--'};
      return;
    }
    this.mainService.saveUserData(this.formData).subscribe((response: any) => {
      alert('Registered Successfully');
      this.router.navigate(["login"], {
        replaceUrl: true
      });
    }, (error) => {
      // To handle error scenario.
    });
  }

  getUserData() {
    this.mainService.getUserData().subscribe((data: UserData[]) => {
      if (data && data.length) {
        this.noOfUserregistered = data.length;
        this.savedUserData = data;
      }
    }, (error) => {
      // To Handle Error scenario.
    });
  }

}
