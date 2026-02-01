// Platter Challenge – Vanilla JS

const PRODUCTS = [
  { title: 'Product 1', price: '$104.95', rating: 5, reviewCount: '1,234', imagePrimary: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', imageSecondary: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400' },
  { title: 'Product 2', price: '$129.95', rating: 5, reviewCount: '892', imagePrimary: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=400', imageSecondary: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400' },
  { title: 'Product 3', price: '$149.95', rating: 4.5, reviewCount: '456', imagePrimary: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400', imageSecondary: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400' },
  { title: 'Product 4', price: '$94.95', rating: 5, reviewCount: '2,100', imagePrimary: 'https://images.unsplash.com/photo-1597045566677-8cf032ed6634?w=400', imageSecondary: 'https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=400' },
  { title: 'Product 5', price: '$119.95', rating: 5, reviewCount: '678', imagePrimary: 'https://images.unsplash.com/photo-1584735175097-719d848f8449?w=400', imageSecondary: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400' },
  { title: 'Product 6', price: '$134.95', rating: 4.5, reviewCount: '334', imagePrimary: 'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=400', imageSecondary: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400' },
  { title: 'Product 7', price: '$134.95', rating: 5, reviewCount: '567', imagePrimary: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=400', imageSecondary: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400' },
  { title: 'Product 8', price: '$89.95', rating: 5, reviewCount: '890', imagePrimary: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400', imageSecondary: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400' },
  { title: 'Product 9', price: '$159.95', rating: 4.5, reviewCount: '412', imagePrimary: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400', imageSecondary: 'https://images.unsplash.com/photo-1597045566677-8cf032ed6634?w=400' },
  { title: 'Product 10', price: '$144.95', rating: 5, reviewCount: '1,023', imagePrimary: 'https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=400', imageSecondary: 'https://images.unsplash.com/photo-1584735175097-719d848f8449?w=400' },
];

const STAR_COUNT = 5;

function renderProducts() {
  const template = document.getElementById('product-card-template');
  const track = document.querySelector('[data-products-track]');
  if (!template || !track) return;

  const fragment = document.createDocumentFragment();
  PRODUCTS.forEach((product) => {
    const clone = template.content.cloneNode(true);
    const link = clone.querySelector('a');
    link.href = '#product-' + (PRODUCTS.indexOf(product) + 1);

    clone.querySelector('.product-card__img--primary').src = product.imagePrimary;
    clone.querySelector('.product-card__img--primary').alt = product.title;
    clone.querySelector('.product-card__img--secondary').src = product.imageSecondary;
    clone.querySelector('.product-card__img--secondary').alt = product.title + ' (hover)';
    clone.querySelector('.product-card__title').textContent = product.title;
    clone.querySelector('.product-card__price').textContent = product.price;
    clone.querySelector('.product-card__reviews').textContent = product.reviewCount + ' Reviews';

    const ratingEl = clone.querySelector('.product-card__rating');
    ratingEl.innerHTML = '';
    for (let i = 0; i < STAR_COUNT; i++) {
      const star = document.createElement('span');
      star.className = i < product.rating ? 'inline-block text-black' : 'inline-block text-black opacity-35';
      star.textContent = '★';
      star.setAttribute('aria-hidden', 'true');
      ratingEl.appendChild(star);
    }

    fragment.appendChild(clone);
  });
  track.appendChild(fragment);
}

/**
 * product-list-view: one component for mobile (grid + Show More) and desktop (carousel, later).
 * This commit implements only mobile: grid + expand/collapse via Show More. Vanilla JS.
 */
class ProductListView extends HTMLElement {
  connectedCallback() {
    const wrap = this.querySelector('[data-grid-wrap]');
    const btn = this.querySelector('[data-show-more]');
    if (!wrap || !btn) return;
    this._wrap = wrap;
    this._btn = btn;
    this._boundOnClick = this._onClick.bind(this);
    btn.addEventListener('click', this._boundOnClick);
  }
  disconnectedCallback() {
    if (this._btn && this._boundOnClick) {
      this._btn.removeEventListener('click', this._boundOnClick);
    }
  }
  _onClick() {
    const wrap = this._wrap;
    const btn = this._btn;
    const isExpanded = wrap.classList.toggle('is-expanded');
    btn.setAttribute('aria-expanded', isExpanded);
    if (isExpanded) {
      wrap.style.maxHeight = wrap.scrollHeight + 'px';
    } else {
      wrap.style.maxHeight = '566px';
    }
  }
}
if (!customElements.get('product-list-view')) {
  customElements.define('product-list-view', ProductListView);
}

document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
});
