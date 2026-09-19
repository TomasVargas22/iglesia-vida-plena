/**
 * Comunidad Cristiana Vida Plena
 * Lógica interactiva del cliente
 */

// Animaciones de scroll (AOS)
if (typeof AOS !== 'undefined') {
  AOS.init({
    duration: 800,
    easing: 'ease-out-cubic',
    once: false,
    offset: 80,
    delay: 50
  });

  window.addEventListener('load', () => AOS.refresh());
}

// Elevación de navbar al hacer scroll
const headerPill = document.querySelector('#mainHeader > div');
if (headerPill) {
  window.addEventListener('scroll', () => {
    const isScrolled = window.scrollY > 50;
    headerPill.classList.toggle('py-2', isScrolled);
    headerPill.classList.toggle('py-2.5', !isScrolled);
    headerPill.classList.toggle('border-white/30', isScrolled);
  }, { passive: true });
}

// Animación de métricas (+15 Años)
const statsElement = document.getElementById('statsRow');
if (statsElement) {
  const counters = document.querySelectorAll('.counter');
  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        counters.forEach(counter => {
          const target = +counter.getAttribute('data-target');
          let count = 0;
          const step = Math.max(1, Math.floor(target / 40));
          const timer = setInterval(() => {
            count += step;
            if (count >= target) {
              counter.textContent = target;
              clearInterval(timer);
            } else {
              counter.textContent = count;
            }
          }, 30);
        });
        observer.disconnect();
      }
    });
  }, { threshold: 0.3 });

  observer.observe(statsElement);
}

// Contadores en vivo de reuniones semanales
const SERVICES = [
  { prefix: 'culto', day: 0, hour: 10, minute: 0 },
  { prefix: 'reu',   day: 6, hour: 16, minute: 0 }
];

function getNextServiceDate(targetDay, hour, minute) {
  const now = new Date();
  const diff = (targetDay - now.getDay() + 7) % 7;
  const target = new Date(now.getFullYear(), now.getMonth(), now.getDate() + diff, hour, minute, 0);
  if (target <= now) {
    target.setDate(target.getDate() + 7);
  }
  return target;
}

function updateCountdowns() {
  const now = Date.now();
  SERVICES.forEach(({ prefix, day, hour, minute }) => {
    const diff = Math.max(0, getNextServiceDate(day, hour, minute) - now);
    const totalSecs = Math.floor(diff / 1000);

    const values = {
      Days: Math.floor(totalSecs / 86400),
      Hours: Math.floor((totalSecs % 86400) / 3600),
      Minutes: Math.floor((totalSecs % 3600) / 60),
      Seconds: totalSecs % 60
    };

    for (const [unit, val] of Object.entries(values)) {
      const el = document.getElementById(`${prefix}${unit}`);
      if (el) {
        el.textContent = `${String(val).padStart(2, '0')}${unit[0].toLowerCase()}`;
      }
    }
  });
}

// Copiar número de SINPE Móvil al portapapeles
function copySinpe() {
  navigator.clipboard.writeText('70951665').then(() => {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
  });
}

// Envío de petición de oración por WhatsApp
function sendPrayerRequest() {
  const nombre = encodeURIComponent(document.getElementById('nombre')?.value.trim() || 'Amigo/a');
  const motivo = encodeURIComponent(document.getElementById('motivo')?.value.trim() || 'Oración general');
  const detalle = encodeURIComponent(document.getElementById('detalle')?.value.trim() || '');

  if (!detalle) return;

  const message = `*Petición de Oración - Comunidad Cristiana Vida Plena*%0A%0A*Nombre:* ${nombre}%0A*Área:* ${motivo}%0A*Detalle:* ${detalle}%0A%0A_Enviado desde el sitio web oficial de Vida Plena._`;
  window.open(`https://wa.me/50670951665?text=${message}`, '_blank');
}

// Control del menú lateral en móviles
const drawerToggle = document.getElementById('drawerToggle');
const drawerClose = document.getElementById('drawerClose');
const drawerOverlay = document.getElementById('drawerOverlay');
const drawerPanel = document.getElementById('drawerPanel');

function openDrawer() {
  drawerPanel?.classList.add('active');
  drawerOverlay?.classList.add('active');
  document.body.classList.add('drawer-open');
}

function closeDrawer() {
  drawerPanel?.classList.remove('active');
  drawerOverlay?.classList.remove('active');
  document.body.classList.remove('drawer-open');
}

drawerToggle?.addEventListener('click', openDrawer);
drawerClose?.addEventListener('click', closeDrawer);
drawerOverlay?.addEventListener('click', closeDrawer);

document.querySelectorAll('.drawer-link').forEach(link => {
  link.addEventListener('click', closeDrawer);
});

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
  updateCountdowns();
  setInterval(updateCountdowns, 1000);
});
