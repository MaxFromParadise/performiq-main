// Menu
const burger = document.querySelector('.burger');
const menu = document.querySelector('#menu');
const menuClose = document.querySelector('.menu__close');
if (burger && menu && menuClose) {
	const toggleMenu = () => {
		burger.classList.toggle('active');
		menu.classList.toggle('show');
		document.body.classList.toggle('lock');
	};
	menuClose.addEventListener('click', toggleMenu);
	burger.addEventListener('click', toggleMenu);
}

const progressBar = document.querySelector('.progress-bar__line span');
const header = document.querySelector('.header');
const progressBarContainer = document.querySelector('.progress-bar');
if (progressBar && header && progressBarContainer) {
	let headerHeight = header?.offsetHeight || 0;
	let progressBarHeight = progressBarContainer?.offsetHeight || 0;

	const updateProgressBar = () => {
		const scrollTop = window.scrollY || document.documentElement.scrollTop;
		const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
		const scrollPercentage = (scrollTop / docHeight) * 100;
		progressBar.style.width = `${scrollPercentage}%`;
	};

	const updateMenuLinks = () => {
		const links = document.querySelectorAll('.progress-bar__link');
		const sections = document.querySelectorAll('section');
		links.forEach((link) => link.classList.remove('active'));
		sections.forEach((section) => {
			if (window.scrollY >= section.offsetTop) {
				const sectionId = section.getAttribute('id');
				const activeLink = document.querySelector(`.progress-bar__link[href="#${sectionId}"]`);
				if (activeLink) activeLink.classList.add('active');
			}
		});
	};

	const toggleHeaderProgress = () => {
		if (window.scrollY > 250) {
			header.classList.add('progress');
			document.body.style.paddingTop = `${headerHeight - progressBarHeight}px`;
		} else {
			header.classList.remove('progress');
			document.body.style.paddingTop = '0';
		}
	};

	window.addEventListener('scroll', () => {
		updateProgressBar();
		updateMenuLinks();
		toggleHeaderProgress();
	});

	document.addEventListener('DOMContentLoaded', () => {
		headerHeight = header?.offsetHeight || 0;
		progressBarHeight = progressBarContainer?.offsetHeight || 0;
	});
}
// Form validator
const form = document.querySelector('.form');
if (form) {
	const inputs = document.querySelectorAll('.form__input');
	const validateField = (input) => {
		const label = input.nextElementSibling;
		const value = input.value.trim();
		if (!value) {
			setError(input, label, 'This field is required');
			return false;
		}
		clearError(input, label);
		if (input.type === 'email' && !validateEmail(value)) {
			setError(input, label, 'Invalid email format');
			return false;
		}
		if (input.name === 'number' && !validatePhoneNumber(value)) {
			setError(input, label, 'Invalid phone number');
			return false;
		}
		return true;
	};

	form.addEventListener('submit', (e) => {
		e.preventDefault();
		const isValid = Array.from(inputs).every(validateField);
		if (isValid) form.submit();
	});

	inputs.forEach((input) => {
		input.addEventListener('input', () => validateField(input));
	});
}

function setError(input, label, message) {
	input.classList.add('error');
	if (label) {
		label.textContent = message;
		label.style.opacity = '1';
	}
}

function clearError(input, label) {
	input.classList.remove('error');
	if (label) {
		label.textContent = '';
		label.style.opacity = '0';
	}
}

function validateEmail(email) {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}

function validatePhoneNumber(number) {
	const phoneRegex = /^[+]?[\d]{3,}$/;
	return phoneRegex.test(number);
}

if (document.querySelector('.trusted-companies__slider .swiper')) {
	const swiper = new Swiper('.trusted-companies__slider .swiper', {
		// Optional parameters
		loop: true,
		speed: 4000,
		slidesPerView: 'auto',
		spaceBetween: 65,
		autoplay: {
			delay: 0,
		},
	});
}
