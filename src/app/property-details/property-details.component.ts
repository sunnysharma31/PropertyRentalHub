import { Component, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { PropertyDetailsService } from '../shared/service/property-details.service';
import { UserDetailsService } from '../shared/service/userdetails.service';
import { SnackbarService } from '../shared/service/snackbar.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-property-details',
  imports: [MatCardModule, MatButtonModule, CommonModule],
  templateUrl: './property-details.component.html',
  styleUrl: './property-details.component.scss'
})
export class PropertyDetailsComponent implements OnInit{

  propertyList:any = [];
  carouselProperty:any = [];
  isAuthenticated: boolean = false;
  constructor(private propertyDetailsService:PropertyDetailsService, private userDetailsService:UserDetailsService,
  private snackbarService: SnackbarService, private router: Router
  ){

  }

  ngOnInit(): void {
    this.propertyList = this.propertyDetailsService.getAllPropertyList();
    this.carouselProperty = this.propertyList.slice(0,3);

    this.userDetailsService.authStatus$.subscribe(status => {
      this.isAuthenticated = status;
    });
  }

  markAsFavorite(){
    if(this.isAuthenticated){
      this.snackbarService.openSnackbar("Marked as favorite");      
    }else{
      this.snackbarService.openSnackbar("Please login");     
    }
  }

  viewDetails(id:string=""){
    this.router.navigate([`properties/${id}`]);
  }

}
