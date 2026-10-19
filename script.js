
const galleryItems = [
  {
    title: 'Ochre / Memory',
    category: 'painting',
    label: 'Painting',
    images: [
      'assets/images/hero.jpeg',
      'assets/images/center.jpeg',
      'assets/images/drawings.jpeg',
      'assets/images/entry.jpeg'
    ],
    description: 'Expressive colour and texture shaped into a bold visual story.'
  },
  {
    title: 'Signs of Place',
    category: 'branding',
    label: 'Branding',
    images: [
      'assets/images/finished.jpeg',
      'assets/images/frax.jpeg',
      'assets/images/frax2.jpeg',
      'assets/images/front.jpeg'
    ],
    description: 'Hand-finished brand language for places people remember.'
  },
  {
    title: 'Road / Rhythm',
    category: 'motorcycle',
    label: 'Motorcycle design',
    images: [
      'assets/images/hero.jpeg',
      'assets/images/location.jpeg',
      'assets/images/outside.jpeg',
      'assets/images/post.jpeg'
    ],
    description: 'Custom surface design that gives movement a distinctive identity.'
  },
  {
    title: 'The Making Room',
    category: 'studio',
    label: 'Studio',
    images: ['assets/images/drawings.jpeg'],
    description: 'A warm, practical home for ideas, tools, materials and making.'
  }
];

const $ = selector => document.querySelector(selector);
const gallery = $('#galleryGrid');
const lightbox = $('#lightbox');
const lightboxImage = $('#lightboxImages');

let currentImageIndex = 0;

function renderGallery(filter = 'all') {
  if (!gallery) return;

  gallery.innerHTML = galleryItems
    .map((item, index) => ({ item, index }))
    .filter(({ item }) => filter === 'all' || item.category === filter)
    .map(({ item, index }) => `
      <button
        class="gallery-card gallery-${index + 1}"
        type="button"
        data-index="${index}"
        aria-label="View ${item.title}"
      >
        <img
          src="${item.images[0]}"
          alt="${item.title} — ${item.label}"
          loading="lazy"
        >
        <span class="gallery-overlay">
          <small>${item.label}</small>
          <strong>${item.title}</strong>
          <i>View work ↗</i>
        </span>
      </button>
    `)
    .join('');
}

function openLightbox(projectIndex, imageIndex = 0) {
  const item = galleryItems[projectIndex];

  if (!item || !lightbox || !lightboxImage) return;

  currentImageIndex = imageIndex;
  lightbox.dataset.index = projectIndex;

  updateLightboxImage();

  const category = $('#lightboxCategory');
  const title = $('#lightboxTitle');
  const description = $('#lightboxDescription');

  if (category) category.textContent = item.label;
  if (title) title.textContent = item.title;
  if (description) description.textContent = item.description;

  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.classList.add('no-scroll');
}

function updateLightboxImage() {
  const projectIndex = Number(lightbox?.dataset.index ?? 0);
  const item = galleryItems[projectIndex];

  if (!item || !lightboxImage) return;

  lightboxImage.src = item.images[currentImageIndex];
  lightboxImage.alt = `${item.title} — image ${currentImageIndex + 1}`;
}

function closeLightbox() {
  if (!lightbox) return;

  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('no-scroll');
}

function moveLightbox(step) {
  const projectIndex = Number(lightbox?.dataset.index ?? 0);
  const item = galleryItems[projectIndex];

  if (!item || item.images.length < 2) return;

  currentImageIndex =
    (currentImageIndex + step + item.images.length) % item.images.length;

  updateLightboxImage();
}

gallery?.addEventListener('click', event => {
  const card = event.target.closest('.gallery-card');
  if (card) openLightbox(Number(card.dataset.index));
});

renderGallery();

document.querySelectorAll('.filter').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.filter').forEach(btn => {
      btn.classList.remove('active');
    });

    button.classList.add('active');
    renderGallery(button.dataset.filter || 'all');
  });
});

$('#lightboxClose')?.addEventListener('click', closeLightbox);
$('#lightboxPrev')?.addEventListener('click', () => moveLightbox(-1));
$('#lightboxNext')?.addEventListener('click', () => moveLightbox(1));

lightbox?.addEventListener('click', event => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeLightbox();

  if (lightbox?.classList.contains('open')) {
    if (event.key === 'ArrowRight') moveLightbox(1);
    if (event.key === 'ArrowLeft') moveLightbox(-1);
  }
});

// Mobile navigation
const menuToggle = $('#menuToggle');
const mainNav = $('#mainNav');

menuToggle?.addEventListener('click', () => {
  if (!mainNav) return;

  const isOpen = mainNav.classList.toggle('open');

  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute(
    'aria-label',
    isOpen ? 'Close navigation' : 'Open navigation'
  );
});

mainNav?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

// Contact form
const contactForm = $('#contactForm');

contactForm?.addEventListener('submit', event => {
  event.preventDefault();

  const status = $('#formStatus');
  if (!status) return;

  if (!contactForm.checkValidity()) {
    status.textContent =
      'Please complete your name, phone number and project details.';
    status.className = 'form-status error';
    contactForm.reportValidity();
    return;
  }

  status.textContent =
    'Thanks — your enquiry has been recorded in this page session only. Connect the form to email or WhatsApp to deliver it.';
  status.className = 'form-status success';

  // Note: this does not send the form anywhere.
  contactForm.reset();
});

// Current year
const year = $('#year');
if (year) year.textContent = new Date().getFullYear();

// Page-load animation
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

// Scroll reveal animation
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(element => {
    revealObserver.observe(element);
  });
} else {
  document.querySelectorAll('.reveal').forEach(element => {
    element.classList.add('visible');
  });
}
