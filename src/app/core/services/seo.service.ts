import { Injectable, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private titleService = inject(Title);
  private metaService = inject(Meta);
  private document = inject(DOCUMENT);

  setPageMeta(data: { title: string; description: string; keywords?: string; canonicalUrl?: string }) {
    const siteTitle = `${data.title} | Knotens Cabs Jaipur`;
    this.titleService.setTitle(siteTitle);

    this.metaService.updateTag({ name: 'description', content: data.description });
    if (data.keywords) {
      this.metaService.updateTag({ name: 'keywords', content: data.keywords });
    }

    // OpenGraph
    this.metaService.updateTag({ property: 'og:title', content: siteTitle });
    this.metaService.updateTag({ property: 'og:description', content: data.description });
    this.metaService.updateTag({ property: 'og:type', content: 'website' });

    // Canonical link tag update
    if (data.canonicalUrl) {
      let link: HTMLLinkElement | null = this.document.querySelector("link[rel='canonical']");
      if (!link) {
        link = this.document.createElement('link');
        link.setAttribute('rel', 'canonical');
        this.document.head.appendChild(link);
      }
      link.setAttribute('href', data.canonicalUrl);
    }
  }

  injectStructuredData(schemaData: object) {
    let script: HTMLScriptElement | null = this.document.querySelector("script[type='application/ld+json']");
    if (!script) {
      script = this.document.createElement('script');
      script.type = 'application/ld+json';
      this.document.head.appendChild(script);
    }
    script.text = JSON.stringify(schemaData);
  }
}
