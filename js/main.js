'use strict';
import tabs from './modules/tabs';
import slayd from './modules/slayd';
import modalForm from './modules/modalForm';
import modal from './modules/modal';
import cards from './modules/cards';
import timer from './modules/timerFunc';
import calc from './modules/calc';
import {showModalWindow} from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {
	const modalWindowId = setTimeout(() => {
		showModalWindow('.modal', modalWindowId); 
	}, 10000);

	tabs('.tabheader__item', '.tabheader__items', '.tabcontent', 
		'tabheader__item_active');
	modal('.modal', modalWindowId);
	modalForm('form', '.modal', modalWindowId);
	cards();
	calc();
	timer('.timer', '2023-05-19');
	slayd({
		nextBtn: '.offer__slider-next',
		prevBtn: '.offer__slider-prev',
		slayderInner: '.offer__slider__inner',
		allSlayders: '.offer__slide',
		currect: '#current',
		slayderConteyner: '.offer__slider-wrapper',
		dotsContayner: '.dots__block',
	});
});
