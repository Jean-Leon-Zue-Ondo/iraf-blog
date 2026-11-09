import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { RecherchesComponent } from './pages/recherches/recherches';
import { PublicationsComponent } from './pages/publications/publications';
import { ArticleDetailComponent } from './pages/article-detail/article-detail';
import { EquipeComponent } from './pages/equipe/equipe';
import { ContactComponent } from './pages/contact/contact';
import { PartenariatsComponent } from './pages/partenariats/partenariats';
import { ActivitesComponent } from './pages/activites/activites';
import { ActualitesComponent } from './pages/actualites/actualites';
import { FormationEducationComponent } from './pages/formation-education/formation-education';
import { ProgrammationRechercheComponent } from './pages/programmation-recherche/programmation-recherche';
import { AdminLoginComponent } from './pages/admin-login/admin-login';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '',                       component: HomeComponent },
  { path: 'recherches',             component: RecherchesComponent },
  { path: 'programmation-recherche', component: ProgrammationRechercheComponent },
  { path: 'publications',           component: PublicationsComponent },
  { path: 'publications/:id',       component: ArticleDetailComponent },
  { path: 'actualites',             component: ActualitesComponent },
  { path: 'activites',              component: ActivitesComponent },
  { path: 'formation-education',    component: FormationEducationComponent },
  { path: 'equipe',                 component: EquipeComponent },
  { path: 'partenariats',           component: PartenariatsComponent },
  { path: 'contact',                component: ContactComponent },
  { path: 'admin/login',            component: AdminLoginComponent },
  { path: 'admin',                  component: AdminDashboardComponent, canActivate: [authGuard] },
  { path: '**',                     redirectTo: '' },
];
