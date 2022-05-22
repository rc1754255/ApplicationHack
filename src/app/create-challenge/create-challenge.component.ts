import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Challenge, UserData } from '../challenge.interface';
import { MainService } from '../main.service';

@Component({
  selector: 'app-create-challenge',
  templateUrl: './create-challenge.component.html',
  styleUrls: ['./create-challenge.component.scss']
})
export class CreateChallengeComponent implements OnInit {

  public formData: Challenge = {id: null, title: '', description: '', createdBy: '', creationDate: null, vote: 0, feature: ''};
  public savedChallengeData: Challenge[] = [];
  public isLoggedIn: boolean = false;
  public loggedInUserData: UserData;
  public features = ['Technical', 'Coding', 'Communication'];
  constructor(private mainService: MainService, private router: Router) { }

  ngOnInit(): void {
    this.getChallengeData();
    this.mainService.isLoggedIn$.subscribe(data => {
      if (data) {
        this.isLoggedIn = data;
        const userData = JSON.parse(sessionStorage.getItem('loggedInUser'));
        if (userData) {
          this.loggedInUserData = userData;
        }
      } else {
        this.isLoggedIn = data;
      }
    });
  }

  save() {
    let isExist = false;
    if (this.savedChallengeData && this.savedChallengeData.length) {
      const challengeData = this.savedChallengeData.filter(challenge => challenge.title === this.formData.title);
      if (challengeData.length) {
        isExist = true;
      }
    }
    if (isExist) {
      alert("Challenge with same title already Exist. Please try with new title.");
      this.formData = {id: null, title: '', description: '', createdBy: '', creationDate: null, vote: 0, feature: ''};
      return;
    }
    this.formData.creationDate = new Date();
    this.formData.vote = 0;
    this.formData.createdBy = this.loggedInUserData.name;
    this.mainService.saveChallenge(this.formData).subscribe((response: any) => {
      alert('Challenge created Successfully');
      this.router.navigate([""], {
        replaceUrl: true
      });
    }, (error) => {
      // To handle error scenario.
    });
  }

  getChallengeData() {
    this.mainService.getChallengesData().subscribe((data: Challenge[]) => {
      if (data && data.length) {
        this.savedChallengeData = data;
      }
    }, (error) => {
      // To Handle Error scenario.
    });
  }

}
