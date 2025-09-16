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