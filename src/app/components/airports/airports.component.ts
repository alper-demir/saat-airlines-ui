import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NewAirportModalComponent } from '../new-airport-modal/new-airport-modal.component';
import { EditAirportModalComponent } from 'src/app/components/edit-airport-modal/edit-airport-modal.component';
@Component({
  selector: 'app-airports',
  templateUrl: './airports.component.html',
})
export class AirportsComponent implements OnInit {
  constructor(public dialog: MatDialog) { }
  title = "Airports"
  airportList: any[] = [];
  async ngOnInit(): Promise<void> {
    const response = await axios.get("http://localhost:8080/api/airports/getall");
    this.airportList = response.data;
  }

  openAddAirportModal() {
    const dialogRef = this.dialog.open(NewAirportModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openEditAirportModal(airport: any) {
    const dialogRef = this.dialog.open(EditAirportModalComponent, {
      data: airport
    });


    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}

// şehirler için liste, routetta airportları liste yap, flightta routelar liste olacak