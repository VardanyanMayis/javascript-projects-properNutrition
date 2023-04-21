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
	const deadline = '2023-05-19';

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


	// "Tel Me" Model window
	const btnTellMe = document.querySelectorAll('[data-telMe]');
	const btnCloseTell = document.querySelector('[data-TelClose]');
	const modalWindow = document.querySelector('.modal');

	btnCloseTell.addEventListener('click', closeModalWindow);
	modalWindow.addEventListener('click', (event) => {
		if(event.target === modalWindow) closeModalWindow();
	});
	btnTellMe.forEach(item => {
		item.addEventListener('click', showModalWindow);
	});
	document.addEventListener('keydown', (event) => {
		// eslint-disable-next-line no-cond-assign
		if(event.code === 'Escape' && modalWindow.classList.contains('show')) {
			closeModalWindow();
		}
	});
	
	const modalWindowId = setTimeout(showModalWindow, 8000);
	window.addEventListener('scroll', showModalInTheEnd);


	function showModalInTheEnd() {
		if(window.pageYOffset + document.documentElement.clientHeight >= 
				document.documentElement.scrollHeight - 1) {
			showModalWindow();
			clearTimeout(modalWindowId);
			removeEventListener('scroll', showModalInTheEnd);
		}
	}

	function showModalWindow() {
		modalWindow.classList.remove('hidden');
		modalWindow.classList.add('show');
		document.body.style.overflow = 'hidden';
		clearTimeout(modalWindowId);
	}

	function closeModalWindow() {
		modalWindow.classList.add('hidden');
		modalWindow.classList.remove('show');
		document.body.style.overflow = '';
	}


	// class for card items
	class FoodCard {
		constructor(title, text, price, imgHreaf, alt, toDram = false) {
			this.title = title;
			this.text = text;
			this.price = price;
			this.imgHreaf = `img/tabs/${imgHreaf}`;
			this.alt = alt;
			this.money = 'рубли';
			this.parentBox = document.querySelector('.menu__field .container');

			if(toDram) this.changeToDram();
		}

		createElement() {
			const newCard = document.createElement('div');

			newCard.innerHTML = `<div class="menu__item"> \
			<img src=${this.imgHreaf} alt="${this.alt}"> \
				<h3 class="menu__item-subtitle">Меню "${this.title}"</h3> \
				<div class="menu__item-descr">${this.text}</div>\
				<div class="menu__item-divider"></div>\
				<div class="menu__item-price">\
					<div class="menu__item-cost">Цена:</div>\
					<div class="menu__item-total"><span>${this.price} </span>${this.money}/день</div>\
				</div>\
			</div>`;

			this.parentBox.append(newCard);
		}

		changeToDram() {
			this.price = this.price * 5;
			this.money = 'драм';
		}
	}


	let card1Text = 'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!';
	let card2Text = 'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!';
	let card3Text = 'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков. ';

	new FoodCard('Фитнес', card1Text, 229, 'vegy.jpg', 'vegy').createElement();
	new FoodCard('Премиум', card2Text, 550, 'elite.jpg', 'elite', true).createElement();
	new FoodCard('Постное', card3Text, 430, 'post.jpg', 'post').createElement();
});
