import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import axios from 'axios';
import { EditRouteModalComponent } from 'src/app/components/edit-route-modal/edit-route-modal.component';
import { NewRouteModalComponent } from 'src/app/components/new-route-modal/new-route-modal.component';

@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
})
export class RoutesComponent {
  constructor(public dialog: MatDialog) { }
  title = "Routes"
  routeList: any[] = [];
  async ngOnInit(): Promise<void> {
    const response = await axios.get("http://localhost:8080/api/routes/getall");
    this.routeList = response.data;
  }

  openAddRouteModal() {
    const dialogRef = this.dialog.open(NewRouteModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openEditRouteModal(route: any) {
    const dialogRef = this.dialog.open(EditRouteModalComponent, {
      data: route
    });


    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
