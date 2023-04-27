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
	const modalWindow = document.querySelector('.modal');

	modalWindow.addEventListener('click', (event) => {
		if(event.target === modalWindow || 
			event.target.classList.contains('modal__close')) {
			closeModalWindow();
		}
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
	
	const modalWindowId = setTimeout(showModalWindow, 50000);
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
		constructor(title, text, price, imgHreaf, alt, toDram = false, ...classes) {
			this.title = title;
			this.text = text;
			this.price = price;
			this.imgHreaf = `${imgHreaf}`;
			this.alt = alt;
			this.classes = (classes.length > 0) ? classes : ['menu__item'];
			this.money = 'рубли';
			this.parentBox = document.querySelector('.menu__field .container');

			if(toDram) this.changeToDram();
		}

		createElement() {
			const newCard = document.createElement('div');
			this.classes.forEach(className => newCard.classList.add(className));

			newCard.innerHTML = `<img src=${this.imgHreaf} alt="${this.alt}"> \
				<h3 class="menu__item-subtitle">Меню "${this.title}"</h3> \
				<div class="menu__item-descr">${this.text}</div>\
				<div class="menu__item-divider"></div>\
				<div class="menu__item-price">\
					<div class="menu__item-cost">Цена:</div>\
					<div class="menu__item-total"><span>${this.price} </span>${this.money}/день</div>\
				</div>`;

			this.parentBox.append(newCard);
		}

		changeToDram() {
			this.price = this.price * 5;
			this.money = 'драм';
		}
	}


	// let card1Text = 'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!';
	// let card2Text = 'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!';
	// let card3Text = 'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков. ';

	// new FoodCard('Фитнес', card1Text, 229, 'vegy.jpg',
	// 	'vegy', true, 'menu__item').createElement();

	// new FoodCard('Премиум', card2Text, 550, 'elite.jpg',
	// 	'elite', true, 'menu__item').createElement();

	// new FoodCard('Постное', card3Text, 430, 'post.jpg',
	// 	'post', true, 'menu__item').createElement();

	fetch('db.json')
		.then(data => data.json())
		.then(data => {
			for(let i = 0; i < data.menu.length; i++) {
				let item = data.menu[i];
				new FoodCard(
					item.title,
					item.descr,
					item.price,
					item.img,
					item.altimg,
					item?.toDram,
				).createElement();
			}
		});


	// Work with "form" 'Send info about user' 
	const forms = document.querySelectorAll('form');
	forms.forEach(form => postData(form));

	const message = {
		loading: 'img/form/spinner.svg',
		success: 'Спасибо! Скоро мы с вами свяжемся',
		error: 'Что-то пошло не так...',
	};

	function postData(form) {
		form.addEventListener('submit', (event) => {
			event.preventDefault();

			// Delete timer for modal window
			removeEventListener('scroll', showModalInTheEnd);
			clearTimeout(modalWindowId);

			// create spinner for show Message (loading)
			const requestMessage = document.createElement('img');
			requestMessage.src = message.loading;
			requestMessage.classList.add('loading__spinner');
			form.parentElement.prepend(requestMessage);


			const postData = new FormData(form);
			// use Fatch Api for connaction with server
			fetch('server.php', {
				method: 'POST',
				body: postData,
			})
				.then(data => data.text())
				.then(data => {
					showFormMessage(message.success, true);
					console.log(data);
				})
				.catch(() => {
					showFormMessage(message.error, false);
				})
				.finally(() => {
					requestMessage.remove();
					form.reset();
				});
		});
	}

	function showFormMessage(message, success) {
		showModalWindow();
		const contant = modalWindow.querySelector('.modal__dialog');
		const form = contant.querySelector('.modal__content');
		form.classList.add('hidden');

		const showMessage = document.createElement('div');
		const answer = document.createElement('h2');
		answer.classList.add('recuest__message');
		answer.textContent = message;
		answer.style.color = (success) ? 'rgb(0, 170, 28)' : 'rgb(138, 0, 0)';

		showMessage.innerHTML = `
		<div class="modal__content">
				<div data-TelClose class="modal__close">&times;</div>
		</div>`;

		contant.append(showMessage);
		showMessage.querySelector('.modal__content').append(answer);

		setTimeout(function() {
			showMessage.remove();
			closeModalWindow();
			form.classList.remove('hidden');
		}, 3000);
	}
});
