
function ajustarHero() {
    const hero = document.querySelector('.hero');
    const header = document.querySelector('.header');
    
    if (hero && header) {
        // 1. Obtener la altura real de la ventana y del header
        const alturaVentana = window.innerHeight;
        const alturaHeader = header.offsetHeight;
        
        // 2. Calcular el espacio libre exacto
        const espacioDisponible = alturaVentana - alturaHeader;
        
        // 3. Aplicar las reglas al Hero
        // Le decimos: "Tu altura será exactamente el espacio que sobra"
        hero.style.minHeight = espacioDisponible + 'px';
        
        // Le decimos: "Bájate para no quedar escondido detrás del header"
        hero.style.marginTop = alturaHeader + 'px';
        
        // Esto asegura el centrado perfecto
        hero.style.display = 'flex';
        hero.style.flexDirection = 'column';
        hero.style.justifyContent = 'center';
    }
}

// Ejecutar cuando carga la página
window.addEventListener('load', ajustarHero);

// Ejecutar si el usuario cambia el tamaño de la ventana o gira el celular
window.addEventListener('resize', ajustarHero);