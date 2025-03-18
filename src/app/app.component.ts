import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { UserDetailsService } from './shared/service/userdetails.service';
import { CommonModule } from '@angular/common';
import { UserCredentials } from './shared/model/UserCredentials';
import { PropertyDetailsService } from './shared/service/property-details.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,RouterLink, MatToolbarModule, MatButtonModule, MatIconModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'PropertyRentalHub';
  isAuthenticated: boolean = false;
  isPropertyPoster: boolean = false;

  constructor(private userDetailsService: UserDetailsService, private router: Router,
    private propertyDetailsService: PropertyDetailsService
  ) {

  }

  ngOnInit(): void {
    this.propertyDetailsService.registerExistingProperties();
    this.userDetailsService.registerExistingUser();
    this.userDetailsService.authStatus$.subscribe(status => {
      this.isAuthenticated = status;
      this.isUserPropertyPoster();
    });
  }

  isUserPropertyPoster(){
    let currentUser:UserCredentials|null = this.userDetailsService.getCurrentUserCredentials();
    let currentUserType:string   = currentUser?.userType ?? "";
    this.isPropertyPoster = ['Owner', 'Broker', 'Builder'].includes(currentUserType);
  }

  logout(){
    this.userDetailsService.clearCurrentUserCredentials();
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.logout();
  }


}
