import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from "./Pages/Auth/login/login.component";
import { HomeComponent } from "./Pages/home/home.component";
import { UserComponent } from "./Pages/Auth/user/user.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent, HomeComponent, UserComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'meilisyncdashbord';
}
