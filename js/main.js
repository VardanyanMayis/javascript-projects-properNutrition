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
	}

	function setZero(num) {
		return (num < 10) ? `0${num}` : num;
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

	

	const getData = async (url) => {
		const res = await fetch(url);
		if(!res.ok) throw new Error(`Could not fetch ${url}, status ${res.status}`);
		return await res.json();
	};


	getData('db.json')
		.then(data => {
			data.menu.forEach( ({title, descr, price, img, altimg}) => {
				new FoodCard(title, descr, price, img, altimg).createElement();
			});
		});



	// Work with "form" 'Send info about user' 
	const forms = document.querySelectorAll('form');
	forms.forEach(form => bindPostData(form));

	const message = {
		loading: 'img/form/spinner.svg',
		success: 'Спасибо! Скоро мы с вами свяжемся',
		error: 'Что-то пошло не так...',
	};

	const postData = async (url, decsreption) => {
		const res = await fetch(url, {
			method: 'POST',
			body: decsreption,
			headers: {'content-type': 'application/json'},
		});

		return await res.json();
	};

	function bindPostData(form) {
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


			const data = new FormData(form);
			const jsonData = JSON.stringify(Object.fromEntries(data.entries()));

			// use Fatch Api for connaction with server
			postData('http://localhost:3000/requests', jsonData)
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

	// Slayder
	const nextSliderBtn = document.querySelector('.offer__slider-next');
	const prevSliderBtn = document.querySelector('.offer__slider-prev');
	const innerBlock = document.querySelector('.offer__slider__inner');
	const slidersOffset = document.querySelectorAll('.offer__slide');
	const slidersLength = slidersOffset.length;
	const currectNumber = document.querySelector('#current');
	const wrapper = document.querySelector('.offer__slider-wrapper');
	const dotsBlock = document.querySelector('.dots__block');
	const width = window.getComputedStyle(wrapper).width;
	let sliderIndex = 0;

	// set start values for counter
	currectNumber.textContent = setZero(sliderIndex + 1);
	document.querySelector('#total').textContent = setZero(slidersLength);
	dotsBlock.style.width = width;

	slidersOffset.forEach((item, index) => {
		item.style.minWidth = width;

		const dot = document.createElement('div');
		dot.classList.add('dot__btn');
		if(index == sliderIndex) {
			dot.classList.add('secected');
		}
		dotsBlock.append(dot);
	});

	const dots = dotsBlock.querySelectorAll('.dot__btn');
	dots.forEach((item, index) => {
		item.addEventListener('click', event => {
			event.preventDefault();
			showCurrectSlide(index);
		});
	});

	nextSliderBtn.addEventListener('click', (event) => {
		event.preventDefault();
		showCurrectSlide(sliderIndex + 1);
	});

	prevSliderBtn.addEventListener('click', (event) => {
		event.preventDefault();
		showCurrectSlide(sliderIndex - 1);
	});

	function showCurrectSlide(index) {
		if(index >= slidersLength) {
			sliderIndex = 0;
			innerBlock.style.transform = `translateX(-${0}px)`;
		} else if(index < 0) {
			sliderIndex = slidersLength - 1;
			innerBlock.style.transform = `translateX(-${parseInt(width) * (sliderIndex)}px)`;
		} else {
			sliderIndex = index;
			innerBlock.style.transform = `translateX(-${parseInt(width) * index}px)`;
		}
		currectNumber.textContent = setZero(sliderIndex + 1);
		chanjeActiveDot();
	}

	function chanjeActiveDot() {
		dots.forEach((item, index) => {
			if(index == sliderIndex) {
				item.classList.add('secected');
			} else {
				item.classList.remove('secected');
			}
		}); 
	}
	// End Slayder

	// KKal Calc

	const result = document.querySelector('.calculating__result span');
	let weigth, heigth, age, gender, BMR;

	getStorageValues();
	showStorageValues('#gender');
	showStorageValues('.calculating__choose_big');
	totalKKal();
	GetDynamicValues();
	GetStaticValues('#gender', 'calculating__choose-item_active');
	GetStaticValues('.calculating__choose_big', 'calculating__choose-item_active');

	function getStorageValues() {
		if(localStorage.getItem('gender')) {
			gender = localStorage.getItem('gender');
		} else {
			gender = document.querySelector('#gender .calculating__choose-item_active').id;
		}
			
		if(localStorage.getItem('BMR')) {
			BMR = localStorage.getItem('BMR');
		} else {
			BMR = document.querySelector('.calculating__choose_big .calculating__choose-item_active')
				.dataset['bmr'];
		}

		if(localStorage.getItem('weigth')) {
			weigth = localStorage.getItem('weigth');
			document.querySelector('#weight').value = weigth;
		}
		if(localStorage.getItem('height')) {
			heigth = localStorage.getItem('height');
			document.querySelector('#height').value = heigth;
		}
		if(localStorage.getItem('weigth')) {
			age = localStorage.getItem('age');
			document.querySelector('#age').value = age;
		}
	}

	function setStorageValues(key, value) {
		localStorage.setItem(key, value);
	}

	function totalKKal() {
		setStorageValues('gender', gender);
		setStorageValues('BMR', BMR);

		if(!(gender && BMR && weigth && heigth && age)) {
			result.textContent = '____';
			return;
		}

		let Kkal;
		if(gender == 'female') {
			Kkal = Math.round((447.6 + (9.2 * weigth) + 
				(3.1 * heigth) - (4.3 * age)) * BMR);
		} else {
			Kkal = Math.round((88.36 + (13.4 * weigth) + 
				(4.8 * heigth) - (5.7 * age)) * BMR);
		}

		if(Kkal) {
			result.textContent = Kkal;
		} else {
			result.textContent = '____';
		}
		
	}

	function showStorageValues(parentElement) {
		const valuesBtn = document.querySelectorAll(`${parentElement} div`);
		valuesBtn.forEach(item => {
			if(item.dataset['bmr']) {
				if(item.dataset['bmr'] != BMR) {
					item.classList.remove('calculating__choose-item_active');
				} else {
					item.classList.add('calculating__choose-item_active');
				}
			} else {
				if(item.id != gender) {
					item.classList.remove('calculating__choose-item_active');
				} else {
					item.classList.add('calculating__choose-item_active');
				}
			}

		});
	}

	function GetStaticValues(parentElement, selectedClass) {
		const valuesBtn = document.querySelectorAll(`${parentElement} div`);

		valuesBtn.forEach(item => {
			item.addEventListener('click', (event) => {
				event.preventDefault();
	
				valuesBtn.forEach(item => {
					item.classList.remove(selectedClass);
				});
				event.target.classList.add(selectedClass);

				if(event.target.dataset['bmr']) {
					BMR = event.target.dataset['bmr'];
				} else {
					gender = event.target.id;
				}

				totalKKal();
			});
		});
	}

	function GetDynamicValues() {
		const valueInputs = document.querySelectorAll('.calculating__choose_medium input');
		valueInputs.forEach(item => {
			item.addEventListener('input', (event) => {
				event.preventDefault();
				let value = event.target.value;
				let currect;

				if(value.match(/\D/g)) {
					event.target.style.border = '2px solid red';
					event.target.style.color = 'red';
					currect = false;
					
				} else {
					event.target.style.border = 'none';
					event.target.style.color = 'black';
					currect = true;
				}

				switch(event.target.id) {
				case 'height':
					if(currect) setStorageValues('height', value);
					heigth = value;
					break;
				case 'weight':
					if(currect) setStorageValues('weigth', value);
					weigth = value;
					break;
				case 'age':
					if(currect) setStorageValues('age', value);
					age = value;
					break;
				}

				totalKKal();
			});
		});
	}
});
