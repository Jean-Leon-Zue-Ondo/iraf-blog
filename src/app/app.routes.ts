import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { RecherchesComponent } from './pages/recherches/recherches';
import { PublicationsComponent } from './pages/publications/publications';
import { ArticleDetailComponent } from './pages/article-detail/article-detail';
import { EquipeComponent } from './pages/equipe/equipe';
import { ContactComponent } from './pages/contact/contact';
import { AdminLoginComponent } from './pages/admin-login/admin-login';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '',                 component: HomeComponent },
  { path: 'recherches',       component: RecherchesComponent },
  { path: 'publications',     component: PublicationsComponent },
  { path: 'publications/:id', component: ArticleDetailComponent },
  { path: 'equipe',           component: EquipeComponent },
  { path: 'contact',          component: ContactComponent },
  { path: 'admin/login',      component: AdminLoginComponent },
  { path: 'admin',            component: AdminDashboardComponent, canActivate: [authGuard] },
  { path: '**',                redirectTo: '' },
];
