import { Amenities, FurnishedStatus, LeaseType, SharedProperty } from '../shared/model/lookups.enum';
import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserDetailsService } from '../shared/service/userdetails.service';
import { SnackbarService } from '../shared/service/snackbar.service';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { PropertyDetailsService } from '../shared/service/property-details.service';

@Component({
  selector: 'app-add-property',
  imports: [MatCheckboxModule, MatRadioModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatButtonModule, ReactiveFormsModule, CommonModule],
  templateUrl: './add-property.component.html',
  styleUrl: './add-property.component.scss'
})
export class AddPropertyComponent implements OnInit {
  sharedProperty = Object.values(SharedProperty);
  leaseType = Object.values(LeaseType);
  furnishedStatus = Object.values(FurnishedStatus);
  amenitiesList = Object.values(Amenities);
  addPropertyForm!: FormGroup;
  imageUrl: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private userDetailsService: UserDetailsService
    , private snackbarService: SnackbarService, private router: Router,
    private propertyDetailsService: PropertyDetailsService
  ) {

  }

  ngOnInit(): void {
    this.addPropertyForm = this.fb.group({
      name: ['', [Validators.required]],
      buildingName: ['', [Validators.required]],
      streetAddress: ['', [Validators.required]],
      squareFeet: ['', [Validators.required]],
      sharedProperty: ['No'],
      leaseType: ['LongTerm'],
      furnishedStatus: ['Yes'],
      amenities: this.fb.array(this.amenitiesList.map(() => false)),
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      image: [null],
    });
  }

  get amenities(): FormArray {
    return this.addPropertyForm.get('amenities') as FormArray;
  }

  getSelectedAmenities(): string[] {
    const selectedAmenities = this.amenities.controls
      .map((control, index) => (control.value ? this.amenitiesList[index] : null))
      .filter((amenity) => amenity !== null); // Filter out null values
    return selectedAmenities;
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      const file = input.files[0];
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  saveImageToLocalStorage(image: string): void {
    localStorage.setItem('uploadedImage', image);
  }

  get checkboxes(): FormArray {
    return this.addPropertyForm.get('checkboxes') as FormArray;
  }

  onSubmit(): void {
    if (this.addPropertyForm.valid) {
      const amenities = this.getSelectedAmenities();
      const image = this.imageUrl;
      const credentials = this.userDetailsService.getCurrentUserCredentials();
      let id = this.propertyDetailsService.getNewPropertyId();
      let dataToSave = { id: id, ...this.addPropertyForm.value, amenities: amenities, image: image, ...credentials };
      this.propertyDetailsService.registerProperties(dataToSave);
      this.snackbarService.openSnackbar("Property Posted successfully");
      this.addPropertyForm.reset();
      this.imageUrl = null;
      this.selectedFile = null;
      this.router.navigate([""]);
    }
  }
}
