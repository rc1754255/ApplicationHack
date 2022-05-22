import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Challenge, UserData } from './challenge.interface';


const headerOption = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class MainService {

  isLoggedIn$ = new BehaviorSubject(false);

  

  constructor(private http: HttpClient) { }

  getUserData(): Observable<Object> {
    return this.http.get(`http://localhost:3000/Users`);
  }

  saveUserData(formData: UserData): Observable<Object> {
    return this.http.post(`http://localhost:3000/Users`, formData, headerOption);
  }

  saveChallenge(formData: Challenge): Observable<Object> {
    return this.http.post(`http://localhost:3000/Challenges`, formData, headerOption);
  }

  updateChallenge(formData: Challenge): Observable<Object> {
    return this.http.put(`http://localhost:3000/Challenges/${formData.id}`, formData, headerOption);
  }

  getChallengesData(): Observable<Object> {
    return this.http.get(`http://localhost:3000/Challenges`);
  }
  
}
