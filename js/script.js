const imgSrc = './images/dark_mode_25dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.png'

document.addEventListener('DOMContentLoaded', function() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    
    // Check for saved user preference
    if (localStorage.getItem('darkMode') === 'enabled') {
        body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '<span class="toggle-icon">☀️</span>';
    }
    
    // Toggle dark mode
    darkModeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
            darkModeToggle.innerHTML = '<span class="toggle-icon">☀️</span>';
        } else {
            localStorage.setItem('darkMode', 'disabled');
            // darkModeToggle.innerHTML = `<span class="toggle-icon"><img src="${imgSrc}" alt="Sun icon" /></span>`;

            darkModeToggle.innerHTML = '<span class="toggle-icon">🌙</span>';
        }
    });
});

function copyEmail() {
    const emailInput = document.getElementById("email-ifsc");
    emailInput.select();
    emailInput.setSelectionRange(0, 99999); // Para dispositivos móveis
    document.execCommand("copy");
    alert("Email copiado: " + emailInput.value);
}
                
function copyEmailP(){
    const emailInput = document.getElementById("email-personal");
    emailInput.select();
    emailInput.setSelectionRange(0, 99999);
    document.execCommand("copy");
    alert("Email copiado: " + emailInput.value);
}