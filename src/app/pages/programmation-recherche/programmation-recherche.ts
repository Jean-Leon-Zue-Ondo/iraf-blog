import { Component, inject } from '@angular/core';
import { SiteSectionsService } from '../../services/site-sections.service';

@Component({
  selector: 'app-programmation-recherche',
  standalone: true,
  templateUrl: './programmation-recherche.html',
  styleUrl: './programmation-recherche.css',
})
export class ProgrammationRechercheComponent {
  private svc = inject(SiteSectionsService);
  researchPrograms = this.svc.researchPrograms;
}
