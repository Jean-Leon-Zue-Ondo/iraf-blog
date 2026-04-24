import { Component, inject } from '@angular/core';
import { ArticlesService } from '../../services/articles.service';

@Component({
  selector: 'app-equipe',
  standalone: true,
  templateUrl: './equipe.html',
  styleUrl: './equipe.css',
})
export class EquipeComponent {
  private svc = inject(ArticlesService);
  researchers = this.svc.getResearchers();
}
