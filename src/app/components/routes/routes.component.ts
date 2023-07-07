import { Component } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
})
export class RoutesComponent {
  title = "Routes"
  routeList: any[] = [];
  async ngOnInit(): Promise<void> {
    const response = await axios.get("http://localhost:8080/api/routes/getall");
    this.routeList = response.data;
  }
}
