import { Component, inject } from '@angular/core';
import { SiteSectionsService } from '../../services/site-sections.service';

@Component({
  selector: 'app-formation-education',
  standalone: true,
  templateUrl: './formation-education.html',
  styleUrl: './formation-education.css',
})
export class FormationEducationComponent {
  private svc = inject(SiteSectionsService);
  trainings = this.svc.trainings;
}
