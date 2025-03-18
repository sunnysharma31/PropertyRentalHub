import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PropertyDetailsService } from '../shared/service/property-details.service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { UserDetailsService } from '../shared/service/userdetails.service';

@Component({
  selector: 'app-view-full-property-details',
  imports: [MatCardModule,CommonModule,ReactiveFormsModule, MatLabel, MatInputModule, MatButtonModule],
  templateUrl: './view-full-property-details.component.html',
  styleUrl: './view-full-property-details.component.scss'
})
export class ViewFullPropertyDetailsComponent implements OnInit {

  id: string | null = null;
  property: any;
  commentForm!: FormGroup;
  isAuthenticated: boolean = false;
  propertyComments: any[] = [
    {
      user: "Owner1",  
      text: "Please email for more details"
    },
    {
      user: "Renter1",  
      text: "Is this property near metro route?"
    }
  ];

  constructor(private userDetailsService: UserDetailsService, private fb: FormBuilder, private route: ActivatedRoute, private propertyList : PropertyDetailsService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      let propertyList = this.propertyList.getAllPropertyList();
      this.property = propertyList.find((val:any)=>val.id == this.id);
    });


    this.commentForm = this.fb.group({
      comment: ['', Validators.required]
    });

    this.userDetailsService.authStatus$.subscribe(status => {
      this.isAuthenticated = status;
    });

    
  }



  submitComment(): void {
    if (this.commentForm.valid) {
      const credentials:any = this.userDetailsService.getCurrentUserCredentials();
      const newComment = {
        user: credentials?.name,  
        text: this.commentForm.value.comment
      };
      this.propertyComments.push(newComment);
      this.commentForm.reset();
    }
  }
}