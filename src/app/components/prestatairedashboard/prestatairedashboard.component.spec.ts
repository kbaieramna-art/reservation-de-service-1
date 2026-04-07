import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestatairedashboardComponent } from './prestatairedashboard.component';

describe('PrestatairedashboardComponent', () => {
  let component: PrestatairedashboardComponent;
  let fixture: ComponentFixture<PrestatairedashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrestatairedashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrestatairedashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
