import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Challenge, UserData } from '../challenge.interface';
import { MainService } from '../main.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  public challengeList: Challenge[] = [];
  public isLoggedIn: boolean = false;
  public loggedInUserData: UserData;
  cols: any[];
  constructor(private mainService: MainService, private router: Router) { }

  ngOnInit(): void {

    this.mainService.isLoggedIn$.subscribe(data => {
      if (data) {
        this.isLoggedIn = data;
        const userData = JSON.parse(sessionStorage.getItem('loggedInUser'));
        if (userData) {
          this.isLoggedIn = true;
          this.loggedInUserData = userData;
        }
      } else {
        this.isLoggedIn = data;
      }
    });
    this.getChallenges();
    this.cols = [
      { field: 'title', header: 'Title', width: '10rem' },
      { field: 'description', header: 'Description', width: '20rem' },
      { field: 'feature', header: 'Feature', width: '10rem' },
      { field: 'createdBy', header: 'createdBy', width: '10rem' },
      { field: 'creationDate', header: 'Created At', width: '20rem' },
      { field: 'vote', header: 'Vote',width: '10rem' }
  ];
  }

  createChallenge() {
    if (this.isLoggedIn) {
      this.router.navigate(["createChallenge"], {
        replaceUrl: true
      });
    } else {
      alert("Please Login as Employee to Create Challenge.")
      this.router.navigate(["login"], {
        replaceUrl: true
      });
    }
  }

  getChallenges() {
    this.mainService.getChallengesData().subscribe((response: any) => {
      this.challengeList = response;
    }, (error) => {
      // To handle error.
    })
  }

  upvote(challenge: Challenge) {
    if (this.isLoggedIn && this.loggedInUserData.role.toLocaleLowerCase() === 'applicant') {
      challenge.vote = challenge.vote + 1;
      this.mainService.updateChallenge(challenge).subscribe((response: any) => {
        this.getChallenges();
      }, (error) => {
        // To handle error
      });
    } else {
      alert('Please Register/Login as Applicant to vote.');
      sessionStorage.clear();
      this.mainService.isLoggedIn$.next(false);
      this.router.navigate(["login"], {
        replaceUrl: true
      });
    }
  }

}
