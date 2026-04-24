import { Component, inject } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { toSignal } from '@angular/core/rxjs-interop';
import { BannerComponent } from './components/banner/banner';
import { SiteHeaderComponent } from './components/site-header/site-header';
import { HeroComponent } from './components/hero/hero';
import { SiteFooterComponent } from './components/site-footer/site-footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BannerComponent, SiteHeaderComponent, HeroComponent, SiteFooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private router = inject(Router);

  isHome = toSignal(
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      map(e => (e as NavigationEnd).urlAfterRedirects === '/'),
    ),
    { initialValue: this.router.url === '/' },
  );
}
