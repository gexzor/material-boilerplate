// tslint:disable-next-line: max-line-length
import { animate, animateChild, animation, AnimationMetadata, AnimationReferenceMetadata, group, keyframes, query, stagger, style, transition, trigger, useAnimation } from '@angular/animations';

/**
 * Reference animations that can be reused in composite animations
 */
export const pulsate: AnimationReferenceMetadata = animation([
    animate('300ms', keyframes([
        style({ transform: 'scale(1)', offset: 0 }),
        style({ transform: 'scale(1.02)', offset: .25 }),
        style({ transform: 'scale(.98)', offset: .50 }),
        style({ transform: 'scale(1)', offset: 1 }),
    ])),
]);

export const fadeInRight: AnimationReferenceMetadata = animation([
    style({ transform: 'translateX(-100%)', opacity: 0 }),
    group([
        animate('600ms ease-out', style({ transform: ' translateX(0)' })),
        animate('600ms 150ms ease-out', style({ opacity: 1 })),
    ]),
]);

export const fadeInLeft: AnimationReferenceMetadata = animation([
    style({ transform: 'translateX(100%)', opacity: 0 }),
    group([
        animate('600ms ease-out', style({ transform: 'translateX(0)' })),
        animate('600ms 150ms ease-out', style({ opacity: 1 })),
    ]),
]);

export const fadeOutLeft: AnimationReferenceMetadata = animation([
    style({ transform: 'translateX(0)', opacity: 1 }),
    animate('600ms ease-out', style({ transform: 'translateX(-100%)', opacity: 0 })),
]);

export const fadeOutRight: AnimationReferenceMetadata = animation([
    style({ transform: 'translateX(0)', opacity: 1 }),
    animate('600ms ease-out', style({ transform: ' translateX(100%)', opacity: 0 })),
]);

export const scaleIn: AnimationReferenceMetadata = animation([
    style({ transform: 'scale(.5)', opacity: 0, height: 0 }),
    animate('300ms ease-out', style({ transform: 'scale(1)', opacity: 1, height: '*' })),
]);

export const scaleOut: AnimationReferenceMetadata = animation([
    style({ transform: 'scale(1)', opacity: 1, height: '*' }),
    animate('300ms ease-out', style({ transform: 'scale(.5)', opacity: 0, height: 0 })),
]);

export const collapseOut: AnimationReferenceMetadata = animation([
    style({ transform: 'scale(1)', opacity: 1, height: '*' }),
    group([
        animate('300ms ease-out', style({ transform: 'scale(.5)', opacity: 0 })),
        animate('300ms 150ms ease-out', style({ height: 0 })),
    ]),
]);

export const moveFromY: AnimationReferenceMetadata = animation([
    animate('{{ timing }}', keyframes([
        style({ transform: 'translateY({{ moveFrom }}) scale(1)', offset: 0 }),
        style({ transform: 'translateY({{ moveFrom20 }}) scale({{ scaleTo }})', offset: .2 }),
        style({ transform: 'translateY({{ moveFrom50 }}) scale({{ scaleTo }})', offset: .5 }),
        style({ transform: 'translateY({{ moveFrom80 }}) scale({{ scaleTo }})', offset: .8 }),
        style({ transform: 'translateY(0) scale(1)', offset: 1 }),
    ])),
], { params: { timing: '300ms', moveFrom: '100%', moveFrom20: '80%', moveFrom50: '50%', moveFrom80: '20%', scaleTo: '1.025' } });


/**
 * Animations that can be composed by multiple reference animations
 */

export const staggerOnLoad: AnimationMetadata = trigger('staggerOnLoad', [
    transition('* => *', [
        query(':enter', [
            stagger(50, animateChild()),
        ], { optional: true }),
    ]),
]);

export const listAnimation: AnimationMetadata = trigger('listAnimation', [
    transition('void => *', [
        group([
            style({ opacity: 0, width: '100%', position: 'absolute' }),
            animate('300ms 150ms', style({ opacity: 1 })),
            query(':enter', [
                style({ transform: 'scale(0)', height: 0 }),
                stagger(50, animate('300ms 150ms ease-out', style({ transform: 'scale(1)', height: '*' }))),
            ], { optional: true }),
        ]),
    ]),

    transition('* => void', [
        group([
            style({ opacity: 1, width: '100%', position: 'absolute' }),
            animate('300ms', style({ opacity: 0 })),
            query(':leave', [
                style({ transform: 'scale(1)', height: '*' }),
                stagger(50, animate('300ms ease-out', style({ transform: 'scale(0)', height: 0 }))),
            ], { optional: true }),
        ]),
    ]),
]);

export const listItemAnimation: AnimationMetadata = trigger('listItemAnimation', [
    transition(':enter', useAnimation(scaleIn)),
    transition(':leave', useAnimation(collapseOut)),
]);

export const scaleInOut: AnimationMetadata = trigger('scaleInOut', [
    transition(':enter', useAnimation(scaleIn)),
    transition(':leave', useAnimation(scaleOut)),
]);

export const navigateLeft: AnimationMetadata = trigger('navigateLeft', [
    transition(':enter', [
        style({ transform: ' translateX(-100%)', opacity: 0 }),
        animate('600ms ease-out', style({ transform: ' translateX(0)', opacity: 1 })),
    ]),
    transition(':leave', [
        style({ transform: 'translateX(0)', opacity: 1 }),
        animate('600ms ease-out', style({ transform: 'translateX(100%)', opacity: 0 })),
    ]),
]);

export const navigateRight: AnimationMetadata = trigger('navigateRight', [
    transition(':enter', [
        style({ transform: ' translateX(100%)', opacity: 0 }),
        animate('600ms ease-out', style({ transform: ' translateX(0)', opacity: 1 })),
    ]),
    transition(':leave', [
        style({ transform: 'translateX(0)', opacity: 1 }),
        animate('600ms ease-out', style({ transform: 'translateX(-100%)', opacity: 0 })),
    ]),
]);

export const navigateUp: AnimationMetadata = trigger('navigateUp', [
    transition(':enter', [
        style({ transform: ' translateY(-100%)', opacity: 0 }),
        animate('600ms ease-out', style({ transform: ' translateY(0)', opacity: 1 })),
    ]),
    transition(':leave', [
        style({ transform: 'translateY(0)', opacity: 1 }),
        animate('600ms ease-out', style({ transform: 'translateY(100%)', opacity: 0 })),
    ]),
]);

export const navigateDown: AnimationMetadata = trigger('navigateDown', [
    transition(':enter', [
        style({ transform: ' translateY(100%)', opacity: 0 }),
        animate('600ms ease-out', style({ transform: ' translateY(0)', opacity: 1 })),
    ]),
    transition(':leave', [
        style({ transform: 'translateY(0)', opacity: 1 }),
        animate('600ms ease-out', style({ transform: 'translateY(-100%)', opacity: 0 })),
    ]),
]);
