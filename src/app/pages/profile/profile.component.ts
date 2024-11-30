import { AfterViewInit, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { NavbarComponent } from "../../navbar/navbar.component";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements AfterViewInit {
  @ViewChild('iconsWrapper', { static: false }) iconsWrapper!: ElementRef;

  ngAfterViewInit(): void {
    const wrapper = this.iconsWrapper.nativeElement as HTMLElement;
    const wrapperParent = wrapper.parentElement as HTMLElement;

    // Cloner les icônes initiales pour permettre une boucle infinie
    const icons = wrapper.innerHTML;
    wrapper.innerHTML += icons;

    // Ajouter une logique de défilement infini
    let position = 0;
    const step = 1; // Vitesse du défilement en pixels
    const wrapperWidth = wrapper.scrollWidth / 2; // Largeur du premier set d'icônes

    const animate = () => {
      position -= step;

      // Réinitialiser la position pour créer un effet de boucle
      if (Math.abs(position) >= wrapperWidth) {
        position = 0;
      }

      wrapper.style.transform = `translateX(${position}px)`;

      // Boucle de l'animation
      requestAnimationFrame(animate);
    };

    // Démarrer l'animation
    animate();
  }
}