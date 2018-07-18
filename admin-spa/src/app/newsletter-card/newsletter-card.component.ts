import { Component, OnInit } from '@angular/core';
import { NewsletterService } from '../services/newsletter.service';
import { LoaderIconComponent } from '../loader-icon/loader-icon.component';


@Component({
  selector: 'app-newsletter-card',
  templateUrl: './newsletter-card.component.html',
  styleUrls: ['./newsletter-card.component.scss']
})
export class NewsletterCardComponent implements OnInit {

  loading = true;
  totalSignups = 3;
  signups;

  constructor(private newsletterService: NewsletterService) { }

  ngOnInit() {
    this.newsletterService.awaitSignups().subscribe(d => {
      if (d !== undefined) {
        this.loading = false;
        this.signups = d;
      }
    });
  }

  showSignups(maxSignups) {
    this.totalSignups = maxSignups;
  }

}
