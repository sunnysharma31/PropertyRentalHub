

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UserDetailsService } from '../shared/service/userdetails.service';
import { SnackbarService } from '../shared/service/snackbar.service';
import { Router } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let userDetailsServiceMock: jasmine.SpyObj<UserDetailsService>;
  let snackbarServiceMock: jasmine.SpyObj<SnackbarService>;
  let routerMock: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    userDetailsServiceMock = jasmine.createSpyObj('UserDetailsService', ['validateUser']);
    snackbarServiceMock = jasmine.createSpyObj('SnackbarService', ['openSnackbar']);
    routerMock = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule, FormsModule],
      providers: [
        FormBuilder,
        { provide: UserDetailsService, useValue: userDetailsServiceMock },
        { provide: SnackbarService, useValue: snackbarServiceMock },
        { provide: Router, useValue: routerMock }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the LoginComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the login form with email and password fields', () => {
    expect(component.loginForm).toBeDefined();
    expect(component.loginForm.controls['email']).toBeDefined();
    expect(component.loginForm.controls['password']).toBeDefined();
  });

  it('should not submit the form if it is invalid', () => {
    component.loginForm.controls['email'].setValue('');
    component.loginForm.controls['password'].setValue('');
    spyOn(component, 'onSubmit');
    component.onSubmit();
    expect(component.onSubmit).not.toHaveBeenCalled();
    expect(snackbarServiceMock.openSnackbar).not.toHaveBeenCalled();
  });

  it('should call validateUser when the form is valid and the user exists', () => {
    component.loginForm.controls['email'].setValue('user@example.com');
    component.loginForm.controls['password'].setValue('password');
    userDetailsServiceMock.validateUser.and.returnValue(true);
    spyOn(routerMock, 'navigate');
    component.onSubmit();
    expect(userDetailsServiceMock.validateUser).toHaveBeenCalledWith({
      email: 'user@example.com',
      password: 'password'
    });
    expect(snackbarServiceMock.openSnackbar).toHaveBeenCalledWith('Login Successfull');
    expect(routerMock.navigate).toHaveBeenCalledWith(['']);
    expect(component.loginForm.reset).toHaveBeenCalled();
  });

  it('should show login failed snackbar when user does not exist', () => {
    component.loginForm.controls['email'].setValue('user@example.com');
    component.loginForm.controls['password'].setValue('password');
    userDetailsServiceMock.validateUser.and.returnValue(false);
    component.onSubmit();
    expect(snackbarServiceMock.openSnackbar).toHaveBeenCalledWith('Login Failed');
  });
});

