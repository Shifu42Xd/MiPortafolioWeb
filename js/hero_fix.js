// js/hero-adjust.js - Ajuste dinámico del hero

document.addEventListener('DOMContentLoaded', function() {
  const heroSection = document.querySelector('.hero-section');
  const header = document.querySelector('.header');
  
  if (!heroSection || !header) return;
  
  function adjustHero() {
    const viewportHeight = window.innerHeight;
    const headerHeight = header.offsetHeight;
    
    // Solo ajustar en móviles si es necesario
    if (window.innerWidth <= 768) {
      // Para móviles en modo paisaje
      if (window.innerHeight < 500) {
        heroSection.style.minHeight = 'auto';
        heroSection.style.paddingTop = headerHeight + 'px';
        heroSection.style.paddingBottom = '20px';
      } else {
        heroSection.style.minHeight = '90vh';
      }
    } else {
      // Para desktop
      heroSection.style.minHeight = '100vh';
      heroSection.style.paddingTop = headerHeight + 'px';
    }
  }
  
  // Ejecutar al cargar
  adjustHero();
  
  // Ejecutar al redimensionar
  window.addEventListener('resize', adjustHero);
  
  // Ejecutar después de cargar imágenes
  window.addEventListener('load', adjustHero);
});