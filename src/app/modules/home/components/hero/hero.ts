import {
  Component, AfterViewInit
} from '@angular/core';

import gsap from 'gsap';

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class HeroComponent implements AfterViewInit {

ngAfterViewInit(): void{
gsap.from('.room-image', {
  scale: 1.08,
  opacity: 0,
  duration: 2,
  ease: 'power2.out'
});

gsap.from('.subtitle', {
  y: 20,
  opacity: 0,
  duration: 0.8,
  delay: 0.5
});

gsap.from('h1', {
  y: 40,
  opacity: 0,
  duration: 1,
  delay: 0.6
});

gsap.from('.hero p', {
  y: 20,
  opacity: 0,
  duration: 0.8,
  delay: 1.0
});
  //animates fast start slow end

}
}
