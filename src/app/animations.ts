import { animate, state, style, transition, trigger } from '@angular/animations';

export const fade = trigger('fade', [
	state('void', style({ opacity: 0 })),
	transition(':enter', [animate(200)]),
	transition('* => void', [animate(2000)])
]);

export const toggleHeight = trigger('toggleHeight', [
	transition(':enter', [
		style({ height: 0, opacity: 0 }),
		animate('200ms ease')
	]),
	transition(':leave', [
		animate('200ms ease', style({ height: 0, opacity: 0 }))
	])
])
