import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import axios from 'axios';
import { NewFlightModalComponent } from '../new-flight-modal/new-flight-modal.component';
import { EditFlightModalComponent } from '../edit-flight-modal/edit-flight-modal.component';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
})
export class FlightsComponent implements OnInit {
  constructor(public dialog: MatDialog) { }
  title = "Flights"
  flightList: any[] = [];
  async ngOnInit(): Promise<void> {
    const response = await axios.get("http://localhost:8080/api/flights/getall");
    this.flightList = response.data;
  }

  openAddFlightModal() {
    const dialogRef = this.dialog.open(NewFlightModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openEditFlightModal(flight: any) {
    const dialogRef = this.dialog.open(EditFlightModalComponent, {
      data: flight
    });


    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
