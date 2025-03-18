import { Component, OnInit } from '@angular/core';
import { PropertyDetailsService } from '../shared/service/property-details.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-property',
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatButtonModule],
  templateUrl: './search-property.component.html',
  styleUrl: './search-property.component.scss'
})
export class SearchPropertyComponent implements OnInit {
  searchForm!: FormGroup;
  properties:any = [];

  constructor(private router:Router, private fb: FormBuilder, private propertyDetailsService: PropertyDetailsService) { }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      buildingName: [''],
      streetAddress: [''],
      squareFeet: [''],
      sharedProperty: [''],
      leaseType: [''],
      furnishedStatus: [''],
      amenities: ['']
    });

    this.propertyDetailsService.getFilteredProperties().subscribe(data => {
      this.properties = data;
    });
  }

  onSearch(): void {
    this.propertyDetailsService.searchProperties(this.searchForm.value);
  }

  viewDetails(id:string=""){
    this.router.navigate([`properties/${id}`]);
  }
}
