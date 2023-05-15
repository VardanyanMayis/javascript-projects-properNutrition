function slayd({slayderConteyner, slayderInner, allSlayders, nextBtn, prevBtn, currect, dotsContayner}) {
	// Slayder
	const nextSliderBtn = document.querySelector(nextBtn);
	const prevSliderBtn = document.querySelector(prevBtn);
	const innerBlock = document.querySelector(slayderInner);
	const slidersOffset = document.querySelectorAll(allSlayders);
	const slidersLength = slidersOffset.length;
	const currectNumber = document.querySelector(currect);
	const wrapper = document.querySelector(slayderConteyner);
	const dotsBlock = document.querySelector(dotsContayner);
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

	function setZero(num) {
		return (num < 10) ? `0${num}` : num;
	}
	// End Slayder
}

export default slayd;
