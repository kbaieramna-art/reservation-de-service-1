import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicetabComponent } from './servicetab.component';

describe('ServicetabComponent', () => {
  let component: ServicetabComponent;
  let fixture: ComponentFixture<ServicetabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicetabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicetabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
