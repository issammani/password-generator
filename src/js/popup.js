import generatePassword from './utils/generatePassword.js';
import charsets from './utils/charsets.js';

window.onload = () => {
    // Password input element
    const passwordInput = document.querySelector('#password');
    // Password settings container
    const passwordSettings = document.querySelector('.password__settings');
    // Copy to clipboard icon
    const copyIcon = document.querySelector('#copyToClipboard');
    // Refresh icon
    const refreshIcon = document.querySelector('#regeneratePassword');

    // Display charsets checkboxes
    const showCharsets = () => {
        charsets.forEach(charset => {
            passwordSettings.innerHTML += `
            <div class="checkbox__container">
                <label class="checkbox">${charset.name}
                    <input type="checkbox" checked="checked" value="${charset.name}">
                    <span class="checkmark"></span>
                </label>
            </div>`;
        });
    }

    // Copy password to clipboard
    const copyToClipboard = () => {
        passwordInput.select();
        document.execCommand('copy');
        document.getSelection().removeAllRanges();
    };

    // Display password from selected constraints
    const showPassword = () => {
         // Charsets checkboxes
        const charsetsCheckboxes = document.querySelectorAll('.password__settings .checkbox input[type="checkbox"]');
        let _checkboxes = [...charsetsCheckboxes].filter(checkbox => checkbox.checked).map(checkbox => checkbox.value);
        
        _checkboxes = charsets.filter(charset => _checkboxes.includes(charset.name))
            .map(charset => charset.charset)
            .join('');
        
        passwordInput.value = generatePassword(_checkboxes, Number(document.querySelector('#password__length__number').value));
    };

    // Render elements to DOM
    showCharsets();
    showPassword();
    

    // Event Listeners
    copyIcon.addEventListener('click', copyToClipboard);
    refreshIcon.addEventListener('click', showPassword);
    
    // Listen for password length change
    document.querySelector('#password__length__range').addEventListener('change', (ev) => {
        // Set number input to range value
        document.querySelector('#password__length__number').value = ev.target.value;
    });

    document.querySelector('#password__length__number').addEventListener('change', (ev) => {
        // Set range input to number value
        document.querySelector('#password__length__range').value = ev.target.value;
    });
    
};