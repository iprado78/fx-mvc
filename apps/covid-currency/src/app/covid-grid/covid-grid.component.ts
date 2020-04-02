import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'covid-covid-grid',
  templateUrl: './covid-grid.component.html',
  styleUrls: ['./covid-grid.component.css']
})
export class CovidGridComponent implements OnInit {
  columnDefs = []

  rowData = []

  constructor() { }

  ngOnInit(): void {
  }

}
