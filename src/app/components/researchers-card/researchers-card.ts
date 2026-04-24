import { Component, inject } from '@angular/core';
import { ArticlesService } from '../../services/articles.service';

@Component({
  selector: 'app-researchers-card',
  standalone: true,
  templateUrl: './researchers-card.html',
  styleUrl: './researchers-card.css',
})
export class ResearchersCardComponent {
  private svc = inject(ArticlesService);
  researchers = this.svc.getResearchers();
}
