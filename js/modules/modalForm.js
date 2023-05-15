import {showModalWindow, closeModalWindow} from './modal';
import {postData} from '../services/services';

function modalForm(formSelector, modal, modalWindowId) {
	const modalWindow = document.querySelector(modal);

	// Work with "form" 'Send info about user' 
	const forms = document.querySelectorAll(formSelector);
	forms.forEach(form => bindPostData(form));

	const message = {
		loading: 'img/form/spinner.svg',
		success: 'Спасибо! Скоро мы с вами свяжемся',
		error: 'Что-то пошло не так...',
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
		showModalWindow(modal, modalWindowId);
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
			closeModalWindow(modal);
			form.classList.remove('hidden');
		}, 3000);
	}

	function showModalInTheEnd() {
		if(window.pageYOffset + document.documentElement.clientHeight >= 
				document.documentElement.scrollHeight - 1) {
			showModalWindow(modal, modalWindowId);
			clearTimeout(modalWindowId);
			removeEventListener('scroll', showModalInTheEnd);
		}
	}
}

export default modalForm;
