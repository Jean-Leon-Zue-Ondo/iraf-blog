import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ArticlesService } from '../../services/articles.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class HeroComponent {
  private svc = inject(ArticlesService);
  stats = this.svc.getStats();
}
