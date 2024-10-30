import { Routes } from '@angular/router';
import { LoginComponent } from './Pages/Auth/login/login.component';
import { RoutsComponent } from './Pages/routs/routs.component';
import { guardGuard } from './Core/Guards/guard.guard';

export const routes: Routes = [
    { path: "loghomein", component: LoginComponent },
  
    {
        path: "",
        component: RoutsComponent,
        canActivate: [guardGuard], 
        children: [
            { path: "home", title: 'Home', loadComponent:()=>import("./Pages/home/home.component") .then(m=>m.HomeComponent) },
            {path:"meilisearch" , title: 'meilisearch', loadComponent:()=>import("./Pages/mielesearch/mielesearch.component") .then(m=>m.MielesearchComponent)},
            {path:"source" , title: 'source', loadComponent:()=>import("./Pages/source/source.component") .then(m=>m.SourceComponent)},

            {path:"sync" , title: 'sync', loadComponent:()=>import("./Pages/sync/sync.component") .then(m=>m.SyncComponent)},

            {path:"user" , title: 'user', loadComponent:()=>import("./Pages/user/user.component") .then(m=>m.UserComponent)},

            {path:"" , pathMatch:"full" , redirectTo:"home"}

        ]
    }
];
