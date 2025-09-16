// Script principal do site
document.addEventListener('DOMContentLoaded', function() {
    console.log('Site de aviação carregado com sucesso!');
    
    // Efeito simples de rolagem suave para links internos
    const linksInternos = document.querySelectorAll('a[href^="#"]');
    
    for(const link of linksInternos) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if(targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    // Adiciona classe active ao item do menu atual
    const currentPage = location.pathname.split('/').pop();
    const menuItems = document.querySelectorAll('nav a');
    
    menuItems.forEach(item => {
        const itemPage = item.getAttribute('href').split('/').pop();
        if(currentPage === itemPage || (currentPage === '' && itemPage === 'index.html')) {
            item.classList.add('active');
        }
    });
});