import { Component } from '@angular/core';
import { ToastComponent } from "../../Components/toast/toast.component";
import { RoutsComponent } from "../routs/routs.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ToastComponent, RoutsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
