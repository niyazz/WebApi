import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TempoRecordComponent } from './tempo-record.component';

describe('TempoRecordComponent', () => {
  let component: TempoRecordComponent;
  let fixture: ComponentFixture<TempoRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TempoRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TempoRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
