function showModalWindow(modal, modalWindowId) {
	const modalWindow = document.querySelector(modal);

	modalWindow.classList.remove('hidden');
	modalWindow.classList.add('show');
	document.body.style.overflow = 'hidden';

	console.log(modalWindowId);
	if(modalWindowId) clearTimeout(modalWindowId);
}

function closeModalWindow(modal) {
	const modalWindow = document.querySelector(modal);

	modalWindow.classList.add('hidden');
	modalWindow.classList.remove('show');
	document.body.style.overflow = '';
}

function modal(modal, modalWindowId) {
	// "Tel Me" Model window
	const btnTellMe = document.querySelectorAll('[data-telMe]');
	const modalWindow = document.querySelector(modal);

	modalWindow.addEventListener('click', (event) => {
		if(event.target === modalWindow || 
			event.target.classList.contains('modal__close')) {
			closeModalWindow(modal);
		}
	});
	btnTellMe.forEach(item => {
		item.addEventListener('click', () => {
			showModalWindow(modal, modalWindowId);
		});
	});
	document.addEventListener('keydown', (event) => {
		// eslint-disable-next-line no-cond-assign
		if(event.code === 'Escape' && modalWindow.classList.contains('show')) {
			closeModalWindow(modal);
		}
	});
	
	window.addEventListener('scroll', showModalInTheEnd);


	function showModalInTheEnd() {
		if(window.pageYOffset + document.documentElement.clientHeight >= 
				document.documentElement.scrollHeight - 1) {
			showModalWindow(modal, modalWindowId);
			clearTimeout(modalWindowId);
			removeEventListener('scroll', showModalInTheEnd);
		}
	}
}

export default modal;
export {showModalWindow};
export {closeModalWindow};
