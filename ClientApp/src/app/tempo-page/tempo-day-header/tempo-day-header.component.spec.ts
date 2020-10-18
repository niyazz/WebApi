import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TempoDayHeaderComponent } from './tempo-day-header.component';

describe('TempoDayHeaderComponent', () => {
  let component: TempoDayHeaderComponent;
  let fixture: ComponentFixture<TempoDayHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TempoDayHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TempoDayHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
