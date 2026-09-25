import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Article } from '../../models/article.model';

@Component({
  selector: 'app-article-mini',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './article-mini.html',
  styleUrl: './article-mini.css',
})
export class ArticleMiniComponent {
  @Input() article!: Article;
  @Input() index!: number;

  get numLabel(): string {
    return String(this.index + 1).padStart(2, '0');
  }
}
