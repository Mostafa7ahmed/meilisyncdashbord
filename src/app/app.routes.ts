import { Routes } from '@angular/router';
import { LoginComponent } from './Pages/Auth/login/login.component';
import { HomeComponent } from './Pages/home/home.component';
import { RoutsComponent } from './Pages/routs/routs.component';
import { guardGuard } from './Core/Guards/guard.guard';

export const routes: Routes = [
    { path: "loghomein", component: LoginComponent },
  
    {
        path: "",
        component: RoutsComponent,
        canActivate: [guardGuard], 
        children: [
            { path: "home", component: HomeComponent }
        ]
    }
];
