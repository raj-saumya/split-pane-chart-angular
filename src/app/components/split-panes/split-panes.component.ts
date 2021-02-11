import { Component, OnInit, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { BarChartTemplateComponent } from './bar-chart-template/bar-chart-template.component'
@Component({
  selector: 'app-split-panes',
  templateUrl: './split-panes.component.html',
  styleUrls: ['./split-panes.component.css']
})
export class SplitPanesComponent implements OnInit, AfterViewChecked {

  panel1: any = {};
  panel2: any = {};
  panel3: any = {};
  panel4: any = {};
  panel5: any = {};


  constructor(private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
  }

  ngAfterViewChecked(): void {

    this.panel1.height = document.getElementById('panel-1').offsetHeight;
    this.panel1.width = document.getElementById('panel-1').offsetWidth;
    this.panel1.id = 'abc';

    this.panel2.height = document.getElementById('panel-2').offsetHeight;
    this.panel2.width = document.getElementById('panel-2').offsetWidth;
    this.panel2.id = 'def';

    this.panel3.height = document.getElementById('panel-3').offsetHeight;
    this.panel3.width = document.getElementById('panel-3').offsetWidth;
    this.panel3.id = 'ghi';

    this.panel4.height = document.getElementById('panel-4').offsetHeight;
    this.panel4.width = document.getElementById('panel-4').offsetWidth;
    this.panel4.id = 'jkl';

    this.panel5.height = document.getElementById('panel-5').offsetHeight;
    this.panel5.width = document.getElementById('panel-5').offsetWidth;
    this.panel5.id = 'mno';


    this.changeDetectorRef.detectChanges();
  }

}
