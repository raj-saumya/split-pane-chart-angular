import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SplitPanesComponent } from './split-panes.component';

describe('SplitPanesComponent', () => {
  let component: SplitPanesComponent;
  let fixture: ComponentFixture<SplitPanesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SplitPanesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SplitPanesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
