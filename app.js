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
// durationMin: duración estimada de cada reunión (ajustar si cambia el horario real).
const SERVICES = [
  { prefix: 'culto', day: 0, hour: 10, minute: 0, durationMin: 120,
    idleLabel: 'Próximo Culto En:', liveLabel: '¡Culto en vivo ahora!' },
  { prefix: 'reu', day: 6, hour: 16, minute: 0, durationMin: 120,
    idleLabel: 'Próxima Reu En:', liveLabel: '¡La Reu está en vivo!' }
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
  SERVICES.forEach(({ prefix, day, hour, minute, durationMin, idleLabel, liveLabel }) => {
    const next = getNextServiceDate(day, hour, minute);

    // La ocurrencia anterior empezó exactamente 7 días antes de la próxima.
    // Si todavía no ha terminado, la reunión está sucediendo ahora mismo.
    const lastStart = new Date(next);
    lastStart.setDate(lastStart.getDate() - 7);
    const isLive = now >= lastStart.getTime() && now < lastStart.getTime() + durationMin * 60000;

    const label = document.getElementById(`${prefix}Label`);
    const timer = document.getElementById(`${prefix}Timer`);
    if (label) label.textContent = isLive ? liveLabel : idleLabel;
    if (timer) timer.hidden = isLive;
    if (isLive) return;

    const totalSecs = Math.floor(Math.max(0, next - now) / 1000);
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

// Notificación toast reutilizable (éxito o error)
let toastTimeout;
function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  const msg = document.getElementById('toastMessage');
  const icon = document.getElementById('toastIcon');
  if (!toast) return;

  if (msg) msg.textContent = message;
  if (icon) {
    const isError = type === 'error';
    icon.textContent = isError ? 'error' : 'check_circle';
    icon.classList.toggle('text-emerald-400', !isError);
    icon.classList.toggle('text-secondary-container', isError);
  }

  toast.classList.add('show');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove('show'), 3500);
}

// Copia texto al portapapeles con respaldo para navegadores sin Clipboard API
// (webviews de Instagram/Facebook, sitios sin HTTPS, navegadores antiguos).
function legacyCopy(text) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.setAttribute('readonly', '');
  ta.style.position = 'fixed';
  ta.style.opacity = '0';
  document.body.appendChild(ta);
  ta.select();
  let ok = false;
  try {
    ok = document.execCommand('copy');
  } catch (e) {
    ok = false;
  }
  ta.remove();
  return ok;
}

function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text).catch(() => {
      if (!legacyCopy(text)) throw new Error('copy-failed');
    });
  }
  return legacyCopy(text) ? Promise.resolve() : Promise.reject(new Error('copy-failed'));
}

// Copiar número de SINPE Móvil al portapapeles
function copySinpe() {
  copyText('70951665')
    .then(() => showToast('¡Número de SINPE Móvil copiado al portapapeles!'))
    .catch(() => showToast('No se pudo copiar. Anota el número: 7095-1665', 'error'));
}

// Envío de petición de oración por WhatsApp
function sendPrayerRequest() {
  const form = document.getElementById('prayerForm');
  const detalleRaw = document.getElementById('detalle')?.value.trim() || '';
  if (!detalleRaw) return;

  const nombre = encodeURIComponent(document.getElementById('nombre')?.value.trim() || 'Amigo/a');
  const motivo = encodeURIComponent(document.getElementById('motivo')?.value.trim() || 'Oración general');
  const detalle = encodeURIComponent(detalleRaw);

  const message = `*Petición de Oración - Comunidad Cristiana Vida Plena*%0A%0A*Nombre:* ${nombre}%0A*Área:* ${motivo}%0A*Detalle:* ${detalle}%0A%0A_Enviado desde el sitio web oficial de Vida Plena._`;
  const url = `https://wa.me/50670951665?text=${message}`;

  // Si el navegador bloquea la ventana emergente, abrimos WhatsApp en la misma pestaña.
  // Nota: no se usa la opción 'noopener' porque hace que window.open devuelva null siempre.
  const win = window.open(url, '_blank');
  if (!win) {
    window.location.href = url;
    return;
  }
  win.opener = null;

  form?.reset();
  showToast('¡Gracias! Abrimos WhatsApp con tu petición. Solo presiona enviar.');
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
