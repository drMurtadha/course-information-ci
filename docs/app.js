const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#main-nav');

menuButton.addEventListener('click', () => {
  const open = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});

navigation.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navigation.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  });
});

const sections = [...document.querySelectorAll('main section[id]')];
const navLinks = [...navigation.querySelectorAll('a')];
const observer = new IntersectionObserver((entries) => {
  const visible = entries.filter((entry) => entry.isIntersecting).at(-1);
  if (!visible) return;
  navLinks.forEach((link) => link.classList.toggle('active', link.hash === `#${visible.target.id}`));
}, { rootMargin: '-25% 0px -65%' });
sections.forEach((section) => observer.observe(section));

const searchInput = document.querySelector('#course-search');
const filters = [...document.querySelectorAll('.filter')];
const cards = [...document.querySelectorAll('.course-card')];
const emptyState = document.querySelector('#empty-state');
let selectedFilter = 'all';

function filterCourses() {
  const query = searchInput.value.trim().toLowerCase();
  let visibleCount = 0;
  cards.forEach((card) => {
    const matchesLevel = selectedFilter === 'all' || card.dataset.level === selectedFilter;
    const matchesQuery = !query || card.dataset.search.includes(query);
    const visible = matchesLevel && matchesQuery;
    card.hidden = !visible;
    if (visible) visibleCount += 1;
  });
  emptyState.hidden = visibleCount > 0;
}

searchInput.addEventListener('input', filterCourses);
filters.forEach((filter) => {
  filter.addEventListener('click', () => {
    selectedFilter = filter.dataset.filter;
    filters.forEach((item) => item.classList.toggle('active', item === filter));
    filterCourses();
  });
});

const checklist = [...document.querySelectorAll('#check-grid input')];
const checkCount = document.querySelector('#check-count');
const checkBar = document.querySelector('#check-bar-fill');
const storageKey = 'utm-ci-checklist-v1';

function updateChecklist() {
  const state = checklist.map((item) => item.checked);
  const total = state.filter(Boolean).length;
  checkCount.textContent = `${total}/${checklist.length}`;
  checkBar.style.width = `${(total / checklist.length) * 100}%`;
  try { localStorage.setItem(storageKey, JSON.stringify(state)); } catch (_) {}
}

try {
  const saved = JSON.parse(localStorage.getItem(storageKey));
  if (Array.isArray(saved)) checklist.forEach((item, index) => { item.checked = Boolean(saved[index]); });
} catch (_) {}

checklist.forEach((item) => item.addEventListener('change', updateChecklist));
document.querySelector('#reset-checklist').addEventListener('click', () => {
  checklist.forEach((item) => { item.checked = false; });
  updateChecklist();
});
updateChecklist();

const ciTabs = [...document.querySelectorAll('.ci-tab')];
const ciDocuments = [...document.querySelectorAll('.ci-document')];

function showCi(courseId) {
  ciTabs.forEach((tab) => {
    const selected = tab.dataset.ci === courseId;
    tab.classList.toggle('active', selected);
    tab.setAttribute('aria-selected', String(selected));
    tab.tabIndex = selected ? 0 : -1;
  });
  ciDocuments.forEach((documentPanel) => {
    const selected = documentPanel.id === `ci-${courseId}`;
    documentPanel.hidden = !selected;
    documentPanel.classList.toggle('active', selected);
  });
}

ciTabs.forEach((tab, index) => {
  tab.addEventListener('click', () => showCi(tab.dataset.ci));
  tab.addEventListener('keydown', (event) => {
    if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    event.preventDefault();
    const direction = event.key === 'ArrowRight' ? 1 : -1;
    const nextTab = ciTabs[(index + direction + ciTabs.length) % ciTabs.length];
    showCi(nextTab.dataset.ci);
    nextTab.focus();
  });
});
showCi('mecs2313');
