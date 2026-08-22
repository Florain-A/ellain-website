import { Component, AfterViewInit } from '@angular/core';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-hero',
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class HeroComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: '+=3500', 
        scrub: 1.2,    
        pin: true
      }
    });

    // Phase 1: Background & Typography
    tl.from('.room-image', { scale: 1.05, opacity: 0, duration: 2 })
      .from('.subtitle', { y: 25, opacity: 0, duration: 1 }, '-=1.2')
      .from('.hero h1', { y: 35, opacity: 0, duration: 1.2 }, '-=0.8')
      .from('.hero p', { y: 20, opacity: 0, duration: 1 }, '-=0.6');

    // Phase 2: Structural Elements
    tl.from('.ceiling', { opacity: 0, y: -80, duration: 1.5, ease: 'power2.out' })
      .from('.curtains', { opacity: 0, y: -40, duration: 1.5, ease: 'power1.out' }, '<'); 

    // 🟢 CHANGED: Now matches your '.furniture-group' overlay class name
    tl.from('.furniture-group', { 
      opacity: 0, 
      y: 30, 
      scale: 1.03,
      duration: 1.8, 
      ease: 'power2.out' 
    }, '+=0.2'); 
  }
}
