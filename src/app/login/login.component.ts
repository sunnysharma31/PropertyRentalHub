import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserDetailsService } from '../shared/service/userdetails.service';
import { SnackbarService } from '../shared/service/snackbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private userDetails: UserDetailsService
    , private snackbarService: SnackbarService, private router: Router
  ) {

  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      let isValidUser = this.userDetails.validateUser(this.loginForm.value);
      if (isValidUser) {
        this.loginForm.reset();
        this.snackbarService.openSnackbar("Login Successfull");
        this.router.navigate(['']);
      } else {
        this.snackbarService.openSnackbar("Login Failed");
      }
    }
  }


}
