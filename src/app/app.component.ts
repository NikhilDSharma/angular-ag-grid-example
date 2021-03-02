import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AgGridAngular } from "ag-grid-angular";
import 'ag-grid-enterprise';
import { CheckboxSelectionComponent } from 'ag-grid-community';
import { calcPossibleSecurityContexts } from '@angular/compiler/src/template_parser/binding_parser';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild("agGrid", {static:false}) agGrid:AgGridAngular;
  title = 'App';

  columnDefs = [
    {headerName:"Make", 
    field:"make" ,
    sortable:true ,
    filter:true,
    CheckboxSelection: true
  },
    {headerName:"Model", field:"model" ,sortable:true ,filter:true},
    {headerName:"Price", field:"price" ,sortable:true ,filter:true}
  ];
    rowData: any;
  constructor (private http:HttpClient) {

  }
  ngOnInit() {
    this.rowData = this.http.get('https://www.ag-grid.com/example-assets/small-row-data.json')
  }
  getSelectedRows() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data );
    const selectedDataStringPresentation = selectedData.map(node => `${node.make} ${node.model}`).join(', ');

    alert(`Selected nodes: ${selectedDataStringPresentation}`);
  }
}
