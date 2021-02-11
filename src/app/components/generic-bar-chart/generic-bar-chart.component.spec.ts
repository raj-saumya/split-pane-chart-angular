import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericBarChartComponent } from './generic-bar-chart.component';

describe('GenericBarChartComponent', () => {
  let component: GenericBarChartComponent;
  let fixture: ComponentFixture<GenericBarChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenericBarChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
