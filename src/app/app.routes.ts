import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProjectComponent } from './pages/project/project.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
  {
    path: 'project',
    component: ProjectComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
];
