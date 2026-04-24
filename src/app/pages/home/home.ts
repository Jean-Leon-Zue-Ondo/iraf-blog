import { Component } from '@angular/core';
import { ArticleListComponent } from '../../components/article-list/article-list';
import { NewsletterCardComponent } from '../../components/newsletter-card/newsletter-card';
import { TopicsCardComponent } from '../../components/topics-card/topics-card';
import { ResearchersCardComponent } from '../../components/researchers-card/researchers-card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ArticleListComponent, NewsletterCardComponent, TopicsCardComponent, ResearchersCardComponent],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent {}
