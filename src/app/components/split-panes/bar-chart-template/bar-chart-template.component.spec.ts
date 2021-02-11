import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarChartTemplateComponent } from './bar-chart-template.component';

describe('BarChartTemplateComponent', () => {
  let component: BarChartTemplateComponent;
  let fixture: ComponentFixture<BarChartTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarChartTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarChartTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
