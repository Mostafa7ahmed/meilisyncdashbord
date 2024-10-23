import { Component } from '@angular/core';
import { SidebarComponent } from "../../Components/Layouts/sidebar/sidebar.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-routs',
  standalone: true,
  imports: [SidebarComponent ,  RouterOutlet],
  templateUrl: './routs.component.html',
  styleUrl: './routs.component.scss'
})
export class RoutsComponent {

}
