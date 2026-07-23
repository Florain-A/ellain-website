import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  menuOpen = signal(false);

  toggleMenu() {
    this.menuOpen.update((value) => !value);
  }
  closeMenu() {
    this.menuOpen.set(false);
  }
}
//Signals are Angular's recommended reactive state mechanism for component-local state.
// For a simple menu toggle, they're cleaner than using plain booleans