// Toast messages with cocky attitude
const cockyMessages = [
	{
		title: "Task Complete",
		message: "I just did in 5 seconds what would take you all day. You're welcome.",
		icon: "🚀"
	},
	{
		title: "Update Available",
		message: "Your system is out of date. Like, seriously outdated. Even my grandma has a newer version.",
		icon: "🔄"
	},
	{
		title: "Error Detected",
		message: "Found an error in your code. Don't worry, happens to beginners all the time.",
		icon: "❌"
	},
	{
		title: "File Saved",
		message: "I've saved your file. Next time try not to wait until the last minute.",
		icon: "💾"
	},
	{
		title: "Connection Lost",
		message: "WiFi dropped. Have you tried turning it off and on again? Classic solution for classics like you.",
		icon: "📶"
	},
	{
		title: "New Message",
		message: "Someone actually messaged you. Must be your lucky day.",
		icon: "✉️"
	},
	{
		title: "Battery Low",
		message: "Your battery is dying. Kind of like your productivity today.",
		icon: "🔋"
	},
	{
		title: "Download Complete",
		message: "File downloaded in record time. Your internet must be having a good day.",
		icon: "📥"
	},
	{
		title: "Account Secured",
		message: "Your account is now secure. Unlike your fashion choices.",
		icon: "🔒"
	},
	{
		title: "Settings Updated",
		message: "Settings updated to optimal. You can thank me later.",
		icon: "⚙️"
	},
	{
		title: "Upload Failed",
		message: "Your upload failed. The internet rejected your file. Can't say I blame it.",
		icon: "⚠️"
	},
	{
		title: "Package Delivered",
		message: "Your package arrived. Another thing you ordered but don't need.",
		icon: "📦"
	},
	{
		title: "Calendar Reminder",
		message: "Meeting in 5 minutes. Bet you forgot all about it.",
		icon: "📅"
	},
	{
		title: "Profile Updated",
		message: "Profile updated. The new photo can't fix everything, but it's a start.",
		icon: "👤"
	},
	{
		title: "Login Successful",
		message: "You're in! Surprised you remembered your password this time.",
		icon: "🔑"
	}
];

document.addEventListener('DOMContentLoaded', function() {
	// Elements
	const toastContainer = document.getElementById('toast-container');
	const createToastBtn = document.getElementById('create-toast');
	const clearToastsBtn = document.getElementById('clear-toasts');
	const randomStyleToggle = document.getElementById('random-style');
	const randomAnimationToggle = document.getElementById('random-animation');
	const styleOptions = document.querySelectorAll('.style-option');
	const animationOptions = document.querySelectorAll('.animation-option');

	// Variables
	let selectedStyle = "1";
	let selectedAnimation = "1";

	// Functions
	function selectStyle(style) {
		styleOptions.forEach(option => {
			if (option.dataset.style === style) {
				option.classList.add('selected');
			} else {
				option.classList.remove('selected');
			}
		});
		selectedStyle = style;
	}

	function selectAnimation(animation) {
		animationOptions.forEach(option => {
			if (option.dataset.animation === animation) {
				option.classList.add('selected');
			} else {
				option.classList.remove('selected');
			}
		});
		selectedAnimation = animation;
	}

	function getRandomStyle() {
		const styles = Array.from({length: 10}, (_, i) => (i + 1).toString());
		const randomStyle = styles[Math.floor(Math.random() * styles.length)];

		// Remove 'selected' class from all style options
		document.querySelectorAll('.style-option').forEach(option => {
			option.classList.remove('selected');
		});

		// Add 'selected' class to the randomly chosen style option
		const selectedOption = document.querySelector(`.style-option[data-style="${randomStyle}"]`);
		if (selectedOption) {
			selectedOption.classList.add('selected');
		}
		
		return randomStyle;
	}

	function getRandomAnimation() {
		const animations = Array.from({length: 10}, (_, i) => (i + 1).toString());
		const randomAnimation = animations[Math.floor(Math.random() * animations.length)];

		// Remove 'selected' class from all animation options
		document.querySelectorAll('.animation-option').forEach(option => {
			option.classList.remove('selected');
		});

		// Add 'selected' class to the randomly chosen animation option
		const selectedOption = document.querySelector(`.animation-option[data-animation="${randomAnimation}"]`);
		if (selectedOption) {
			selectedOption.classList.add('selected');
		}

		return randomAnimation;
	}

	function getRandomMessage() {
		return cockyMessages[Math.floor(Math.random() * cockyMessages.length)];
	}

	function createToast() {
		// Get style and animation
		const toastStyle = randomStyleToggle.checked ? getRandomStyle() : selectedStyle;
		const toastAnimation = randomAnimationToggle.checked ? getRandomAnimation() : selectedAnimation;

		// Get message
		const messageData = getRandomMessage();

		// Create toast element
		const toast = document.createElement('div');
		toast.className = `toast toast-style-${toastStyle} toast-animation-${toastAnimation}-in`;

		// Create toast content
		toast.innerHTML = `
                    <div class="toast-icon">${messageData.icon}</div>
                    <div class="toast-content">
                        <div class="toast-title">${messageData.title}</div>
                        <div class="toast-message">${messageData.message}</div>
                    </div>
                    <button class="toast-close">&times;</button>
                    <div class="toast-progress toast-progress-animate"></div>
                `;

		// Add toast to container
		toastContainer.appendChild(toast);

		// Set timeout for auto-removal
		const timeoutId = setTimeout(() => {
			removeToast(toast, toastAnimation);
		}, 10000);

		// Add click event for manual close
		toast.querySelector('.toast-close').addEventListener('click', () => {
			clearTimeout(timeoutId);
			removeToast(toast, toastAnimation);
		});
	}

	function removeToast(toast, animation) {
		// Add exit animation
		toast.className = toast.className.replace(`-in`, `-out`);

		// Remove from DOM after animation
		toast.addEventListener('animationend', () => {
			toast.remove();
		});
	}

	function clearAllToasts() {
		const toasts = document.querySelectorAll('.toast');
		toasts.forEach(toast => {
			const animation = toast.className.match(/toast-animation-(\d+)/)[1];
			removeToast(toast, animation);
		});
	}

	// Event Listeners
	createToastBtn.addEventListener('click', createToast);
	clearToastsBtn.addEventListener('click', clearAllToasts);

	styleOptions.forEach(option => {
		option.addEventListener('click', () => {
			selectStyle(option.dataset.style);
		});
	});

	animationOptions.forEach(option => {
		option.addEventListener('click', () => {
			selectAnimation(option.dataset.animation);
		});
	});

	styleOptions.forEach(option => {
			option.addEventListener('click', () => {
					// Uncheck the random animation toggle when a style is manually selected
					randomStyleToggle.checked = false;
			});
	});
	
	animationOptions.forEach(option => {
			option.addEventListener('click', () => {
					// Uncheck the random animation toggle when a style is manually selected
					randomAnimationToggle.checked = false;
			});
	});
	
	// Initial setup - create a default toast
	setTimeout(createToast, 500);
});