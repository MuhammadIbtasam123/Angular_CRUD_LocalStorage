import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {  NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule,NgxSkeletonLoaderModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  articles!: any[]; // Assume articles are fetched asynchronously

  ngOnInit(): void {
    // Simulate asynchronous data fetching
    setTimeout(() => {
      this.articles = [
        { title: 'Article 1', content: 'Content for article 1' },
        { title: 'Article 2', content: 'Content for article 2' }
      ];
    }, 5000); // Simulating a delay of 2 seconds
  }
}
