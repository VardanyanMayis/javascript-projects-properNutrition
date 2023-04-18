'use strict';

window.addEventListener('DOMContentLoaded', () => {
	// Tabs
	const tabs = document.querySelectorAll('.tabheader__item'),
		tabsParent = document.querySelector('.tabheader__items'),
		tabsComntent = document.querySelectorAll('.tabcontent');


	function hiddenTabsContent() {
		tabsComntent.forEach(item => {
			item.classList.remove('show', 'fade');
			item.classList.add('hidden');
		});

		tabs.forEach(item => {
			item.classList.remove('tabheader__item_active');
		});
	}

	function showTabContent(index = 0) {
		tabsComntent[index].classList.remove('hidden');
		tabsComntent[index].classList.add('show', 'fade');

		tabs[index].classList.add('tabheader__item_active');
	}

	tabsParent.addEventListener('click', (event) => {
		const target = event.target;
        
		if(target && target.classList.contains('tabheader__item')) {
			tabs.forEach((item, index) => {
				if(item == target) {
					hiddenTabsContent();
					showTabContent(index);
				}
			});
		}
	});

	hiddenTabsContent();
	showTabContent();


	// Timer
	const deadline = '2023-04-25';

	function getTimeRemainder(endtime) {
		let days = 0,
			hours = 0, 
			minutes = 0, 
			seconds = 0;

		const timeMS = Date.parse(endtime) - new Date().getTime();
		if(timeMS > 0) {
			days = Math.floor(timeMS / (1000 * 60 *60 * 24));
			hours = Math.floor(timeMS / (1000 * 60 * 60) % 24);
			minutes = Math.floor(timeMS / (1000 * 60) % 60);
			seconds = Math.floor(timeMS / (1000) % 60);
		}
		return {
			'total': timeMS,
			'days': days,
			'hours': hours,
			'minutes': minutes,
			'seconds': seconds
		};
	}


	function showClock(selector, endtime) {
		const timer = document.querySelector(selector);
		const day = timer.querySelector('#days');
		const hour = timer.querySelector('#hours');
		const minut = timer.querySelector('#minutes');
		const second = timer.querySelector('#seconds');
		const timerId = setInterval(updateTimer, 1000);

		updateTimer();
		function updateTimer() {
			const time = getTimeRemainder(endtime);
			
			day.textContent = setZero(time['days']);
			hour.textContent = setZero(time['hours']);
			minut.textContent = setZero(time['minutes']);
			second.textContent = setZero(time['seconds']);

			if( time.total <= 0 ) {
				clearInterval(timerId);
				showDeadline(endtime);
			}
		}

		function setZero(num) {
			return (num < 10) ? `0${num}` : num;
		}
	}

	function showDeadline(time) {
		const deadline = new Date(time);
		const deadlineBlock = document.querySelector('.Timerdeadline');

		if((deadline.getTime() - new Date().getTime()) <= 0) {
			deadlineBlock.textContent = 'Простите но акция уже закончился';
			return;
		}

		const monthIndex = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая',
			'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];

		const day = deadlineBlock.querySelector('.day');
		const month = deadlineBlock.querySelector('.mouth');

		day.textContent = deadline.getDate();
		month.textContent = monthIndex[deadline.getMonth()];
	}


	showClock('.timer', deadline);
	showDeadline(deadline);
});
