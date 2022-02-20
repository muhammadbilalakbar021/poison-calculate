import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadiooptionsComponent } from './radiooptions.component';

describe('RadiooptionsComponent', () => {
  let component: RadiooptionsComponent;
  let fixture: ComponentFixture<RadiooptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RadiooptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RadiooptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
