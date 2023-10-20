import { animate, state, style, transition, trigger } from '@angular/animations';

export const fade = trigger('fade', [
	state('void', style({ opacity: 0.1 })),
	transition(':enter', [animate(400)])
]);
