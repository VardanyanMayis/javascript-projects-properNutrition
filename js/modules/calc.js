function calc() {
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
}

export default calc;
