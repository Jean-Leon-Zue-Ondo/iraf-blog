import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Article } from '../../models/article.model';

@Component({
  selector: 'app-article-featured',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './article-featured.html',
  styleUrl: './article-featured.css',
})
export class ArticleFeaturedComponent {
  @Input() article!: Article;
}
