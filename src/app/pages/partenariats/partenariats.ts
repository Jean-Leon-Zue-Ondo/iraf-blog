import { Component, inject } from '@angular/core';
import { SiteSectionsService } from '../../services/site-sections.service';

@Component({
  selector: 'app-partenariats',
  standalone: true,
  templateUrl: './partenariats.html',
  styleUrl: './partenariats.css',
})
export class PartenariatsComponent {
  private svc = inject(SiteSectionsService);
  partnerships = this.svc.partnerships;
}
