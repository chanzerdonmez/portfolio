import { Component, Renderer2 } from '@angular/core';
import { NavbarComponent } from "../../navbar/navbar.component";
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RecaptchaModule } from 'ng-recaptcha';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [NavbarComponent, CommonModule, FormsModule, RecaptchaModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  from_email: string = '';
  subject: string = '';
  message: string = '';
  showSuccessMessage: boolean = false;
  showErrorMessage: boolean = false;
  captchaToken: string | null = null; // Stocke le jeton reCAPTCHA

  constructor(private renderer: Renderer2) {}


  ngOnInit(): void {
    this.loadRecaptchaScript();
  }

  onCaptchaResolved(token: string | null): void {
    this.captchaToken = token ?? ''; // Si le token est null, assigner une chaîne vide
    console.log('reCAPTCHA validé avec succès :', token);
  }

  private loadRecaptchaScript(): void {
    const script = this.renderer.createElement('script');
    script.src = 'https://www.google.com/recaptcha/api.js?render=6Le5CY4qAAAAAIjvRrpJShQBuUCMC2N2DtF_rTTe';
    script.async = true;
    script.defer = true;
    this.renderer.appendChild(document.body, script);
  }
  

  sendEmail(form: NgForm): void {
    if (form.invalid) {
      alert('Veuillez remplir tous les champs correctement.');
      return;
    }

    // Exécution de reCAPTCHA v3
    grecaptcha.ready(() => {
      grecaptcha.execute('6Le5CY4qAAAAAIjvRrpJShQBuUCMC2N2DtF_rTTe', { action: 'submit' }).then((token: string) => {
        this.captchaToken = token; // Stocke le jeton reCAPTCHA
        console.log('Token reCAPTCHA généré :', token);

        // Appeler la méthode pour envoyer l'email avec le jeton reCAPTCHA
        this.submitFormWithCaptcha(form);
      });
    });
  }

  private submitFormWithCaptcha(form: NgForm): void {
    const templateParams = {
      from_email: this.from_email,
      subject: this.subject,
      message: this.message,
      'g-recaptcha-response': this.captchaToken // Inclure le jeton dans le formulaire
    };

    emailjs.send(
      'service_5vjno94', // Remplacez par votre Service ID EmailJS
      'template_b3wtl0m', // Remplacez par votre Template ID EmailJS
      templateParams,
      'uJ9gZZCJS7HslIBD3' // Remplacez par votre clé publique EmailJS
    )
    .then(
      (result: EmailJSResponseStatus) => {
        console.log('Email envoyé : ', result.text);
        this.showSuccessMessage = true;
        this.showErrorMessage = false;
        this.resetForm(form);
      },
      (error) => {
        console.log('Erreur lors de l\'envoi de l\'email : ', error.text);
        this.showSuccessMessage = false;
        this.showErrorMessage = true;
      }
    );
  }

  closeAlert(): void {
    this.showSuccessMessage = false;
    this.showErrorMessage = false;
  }

  resetForm(form: NgForm): void {
    form.resetForm();
    this.captchaToken = null; // Réinitialise le jeton reCAPTCHA
  }
}