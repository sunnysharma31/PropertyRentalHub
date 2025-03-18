import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFullPropertyDetailsComponent } from './view-full-property-details.component';

describe('ViewFullPropertyDetailsComponent', () => {
  let component: ViewFullPropertyDetailsComponent;
  let fixture: ComponentFixture<ViewFullPropertyDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewFullPropertyDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewFullPropertyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
