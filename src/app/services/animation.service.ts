import { AnimationBuilder, AnimationFactory, AnimationMetadata, useAnimation } from '@angular/animations';
import { Injectable } from '@angular/core';
import { fadeInRight, fadeOutLeft, fadeOutRight, moveFromY, pulsate, scaleIn, scaleOut } from '../../assets/animations/animations';

@Injectable({ providedIn: 'root' })

export class AnimationService {

    constructor(
        private animationBuilder: AnimationBuilder,
    ) { }

    /**
     * Uses the animationFactory to build the provided animation,
     * and then afterwards plays the animation.
     * @param elements The HTML elements that are being animated.
     * @param animation The animation being applied to the elements.
     */
    public animate(elements: HTMLCollection | HTMLElement, animation: AnimationMetadata | AnimationMetadata[]): void {
        const animationFactory: AnimationFactory = this.animationBuilder.build(animation);

        // Check if the target is a collection of HTMLElements and then run a bulk animation
        if (elements instanceof HTMLCollection) {
            const elementsArr: HTMLElement[] = Array.prototype.slice.call(elements); // Convert to array in order to use forEach()
            elementsArr.forEach((element: HTMLElement) => animationFactory.create(element).play());
        } else animationFactory.create(elements).play();
    }

    /**
     * Pulsates the elements by scaling it down and back again a couple of times.
     * @param elements The elements being animated.
     */
    public pulsate(elements: HTMLCollection | HTMLElement): void {
        this.animate(elements, pulsate);
    }

    /**
     * Moves the elements to the left while fading it out.
     * @param elements The elements being animated.
     */
    public fadeOutLeft(elements: HTMLCollection | HTMLElement): void {
        this.animate(elements, fadeOutLeft);
    }

    /**
     * Moves the elements to the right while fading it in.
     * @param elements The elements being animated.
     */
    public fadeInRight(elements: HTMLCollection | HTMLElement): void {
        this.animate(elements, fadeInRight);
    }

    /**
     * Moves the elements to the right while fading it out.
     * @param elements The elements being animated.
     */
    public fadeOutRight(elements: HTMLCollection | HTMLElement): void {
        this.animate(elements, fadeOutRight);
    }

    /**
     * Fades in the elements while caling them up to default height.
     * @param elements The elements being animated.
     */
    public scaleIn(elements: HTMLCollection | HTMLElement): void {
        this.animate(elements, scaleIn);
    }

    /**
     * Fades out the elements while caling them down in size.
     * @param elements The elements being animated.
     */
    public scaleOut(elements: HTMLCollection | HTMLElement): void {
        this.animate(elements, scaleOut);
    }

    /**
     * Moves an element from the provided 'translateTo' offset ot its current position.
     * Useful for animating list items moving when their index changes.
     * @param elements The elements being animated.
     */
    public moveFromY(elements: HTMLCollection | HTMLElement, distance: number): void {
        const moveFromYAnimation: AnimationMetadata[] = [
            useAnimation(moveFromY, {
                params: {
                    timing: '300ms',
                    moveFrom: String(distance) + '%',
                    moveFrom20: String(distance * .8) + '%',
                    moveFrom50: String(distance * .5) + '%',
                    moveFrom80: String(distance * .2) + '%',
                    scaleTo: distance < 0 ? 1.025 : 1,
                },
            }),
        ];
        const animationFactory: AnimationFactory = this.animationBuilder.build(moveFromYAnimation);
        animationFactory.create(elements).play();
    }

}
