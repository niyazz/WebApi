import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TempoDayComponent } from './tempo-day.component';

describe('TempoDayComponent', () => {
  let component: TempoDayComponent;
  let fixture: ComponentFixture<TempoDayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TempoDayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TempoDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
