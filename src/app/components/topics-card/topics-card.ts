import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ArticlesService } from '../../services/articles.service';

@Component({
  selector: 'app-topics-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './topics-card.html',
  styleUrl: './topics-card.css',
})
export class TopicsCardComponent {
  private svc = inject(ArticlesService);
  topics = this.svc.getTopics();
}
