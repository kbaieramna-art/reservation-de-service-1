import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestatairetabComponent } from './prestatairetab.component';

describe('PrestatairetabComponent', () => {
  let component: PrestatairetabComponent;
  let fixture: ComponentFixture<PrestatairetabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrestatairetabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrestatairetabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
