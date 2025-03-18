import { Component, OnInit } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserDetailsService } from '../shared/service/userdetails.service';
import { SnackbarService } from '../shared/service/snackbar.service';
import {MatSelectModule} from '@angular/material/select';
import { UserType } from '../shared/model/lookups.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [MatFormFieldModule, MatSelectModule, MatInputModule, MatButtonModule, ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit{

  registerForm!:FormGroup;
  userTypes = Object.values(UserType);
  
  constructor(private fb: FormBuilder, private userDetailsService: UserDetailsService
    ,private snackbarService: SnackbarService, private router: Router
  ){

  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      userType: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      let id = this.userDetailsService.getNewUserId();
      let newUser = {id:id,...this.registerForm.value};
      this.userDetailsService.registerUser(newUser);
      this.snackbarService.openSnackbar("Registration Successfull Please Login");
      this.registerForm.reset();
      this.router.navigate(['/login']);
    }
  }
}
