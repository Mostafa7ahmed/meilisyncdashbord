import { Routes } from '@angular/router';
import { LoginComponent } from './Pages/Auth/login/login.component';
import { RoutsComponent } from './Pages/routs/routs.component';
import { MielesearchComponent } from './Pages/mielesearch/mielesearch.component';
import { guardGuard } from './Core/Guards/guard.guard';
import { NotfoundComponent } from './Components/notfound/notfound.component';

export const routes: Routes = [
    { path: '', redirectTo: 'meilisearch', pathMatch: 'full' },

  { path: "login", title:"Login",component: LoginComponent },

  {
    path: "",
    canActivate: [guardGuard],
    component: RoutsComponent,
    children: [
      { path: "meilisearch", title: 'MeiliSearch', component: MielesearchComponent },
      { path: "source", title: 'Source', loadComponent: () => import('./Pages/source/source.component').then(m => m.SourceComponent) },
      { path: "sync", title: 'Sync', loadComponent: () => import('./Pages/sync/sync.component').then(m => m.SyncComponent) },
      { path: "setting", title: 'Settings', loadComponent: () => import('./Pages/role/role.component').then(m => m.RoleComponent) },
      { path: '**', component: NotfoundComponent }

    ]
  },
  { path: '**', component: NotfoundComponent }

];
