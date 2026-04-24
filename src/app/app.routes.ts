import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { RecherchesComponent } from './pages/recherches/recherches';
import { PublicationsComponent } from './pages/publications/publications';
import { EquipeComponent } from './pages/equipe/equipe';
import { ContactComponent } from './pages/contact/contact';

export const routes: Routes = [
  { path: '',             component: HomeComponent },
  { path: 'recherches',   component: RecherchesComponent },
  { path: 'publications', component: PublicationsComponent },
  { path: 'equipe',       component: EquipeComponent },
  { path: 'contact',      component: ContactComponent },
  { path: '**',           redirectTo: '' },
];
