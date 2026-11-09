import { Component, inject } from '@angular/core';
import { SiteSectionsService } from '../../services/site-sections.service';

@Component({
  selector: 'app-actualites',
  standalone: true,
  templateUrl: './actualites.html',
  styleUrl: './actualites.css',
})
export class ActualitesComponent {
  private svc = inject(SiteSectionsService);
  news = this.svc.news;
}
