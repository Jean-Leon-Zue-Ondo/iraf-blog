import { Component, inject } from '@angular/core';
import { SiteSectionsService } from '../../services/site-sections.service';

@Component({
  selector: 'app-activites',
  standalone: true,
  templateUrl: './activites.html',
  styleUrl: './activites.css',
})
export class ActivitesComponent {
  private svc = inject(SiteSectionsService);
  activities = this.svc.activities;
}
