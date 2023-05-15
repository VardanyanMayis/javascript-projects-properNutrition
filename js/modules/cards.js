import { getData } from '../services/services';

function cards() {
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

	getData('db.json')
		.then(data => {
			data.menu.forEach( ({title, descr, price, img, altimg}) => {
				new FoodCard(title, descr, price, img, altimg).createElement();
			});
		});

}

export default cards;
