import { Component, ElementRef,
  afterNextRender,
  inject,
  viewChild} from '@angular/core';
  import gsap from 'gsap';

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
  hero = viewChild<ElementRef>('heroSection');
//  hero = viewChild<ElementRef>('heroSection'); is viewchild decorator that
//  allows you to access the DOM element with the template reference variable #heroSection in your component class. It is used to get a reference to the hero section of the component's template, which can be useful for manipulating the DOM or accessing its properties.
  constructor() {
    afterNextRender(() => {

        const hero = this.hero()?.nativeElement;

        if (!hero) return;

        gsap.from(hero, {

            opacity: 0,

            duration: 1.2,

            y: 80,

            ease: "power3.out"

        });

    });}
}
