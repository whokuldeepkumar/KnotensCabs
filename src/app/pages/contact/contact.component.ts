import { Component, inject, signal, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { SeoService } from '../../core/services/seo.service';
import { ContactService } from '../../core/services/contact.service';
import { NotificationService } from '../../core/services/notification.service';
import { AppValidators } from '../../core/utils/validators';
import { PageBannerComponent } from '../../shared/components/page-banner/page-banner.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, PageBannerComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit {
  private fb = inject(FormBuilder);
  private seo = inject(SeoService);
  private contactService = inject(ContactService);
  private notificationService = inject(NotificationService);

  readonly isSubmitting = signal<boolean>(false);

  readonly contactForm = this.fb.group({
    fullName: ['', [Validators.required, Validators.minLength(3)]],
    phone: ['', [Validators.required, AppValidators.indianMobile()]],
    email: ['', [Validators.required, Validators.email]],
    subject: ['General Inquiry', Validators.required],
    message: ['', [Validators.required, Validators.minLength(10)]]
  });

  ngOnInit() {
    this.seo.setPageMeta({
      title: 'Contact Us 24x7 | Knotens Cabs Jaipur Office & Hotline',
      description: 'Contact Knotens Cabs Jaipur 24x7 helpline +91 98290 12345, WhatsApp booking, and head office address in Malviya Nagar, Jaipur, Rajasthan.',
      canonicalUrl: 'https://knotens.cabs/contact'
    });
  }

  onSubmit() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      this.notificationService.error('Form Error', 'Please fill in all required contact fields correctly.');
      return;
    }

    this.isSubmitting.set(true);

    this.contactService.sendContactMessage(this.contactForm.value as any).subscribe({
      next: (res) => {
        this.isSubmitting.set(false);
        this.notificationService.success('Message Sent!', res.message);
        this.contactForm.reset({ subject: 'General Inquiry' });
      },
      error: (err) => {
        this.isSubmitting.set(false);
        this.notificationService.error('Submission Failed', 'Could not send message. Please call +91 98290 12345.');
      }
    });
  }
}
