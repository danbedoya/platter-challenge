// Platter Challenge – Vanilla JS

const PRODUCTS = [
  { id: 1, title: 'OUTSIDE VIBES T-SHIRT SUNSHINE', price: '$104.95', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', imageSecondary: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400', badgeLeft: 'BEST SELLER', badgeRight: null, rating: 5, reviewCount: '1,234' },
  { id: 2, title: 'HIKE BOTTLE OUTSIDE VIBES FOREST GREEN', price: '$104.95', image: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=400', imageSecondary: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400', badgeLeft: 'BEST SELLER', badgeRight: 'SAVE 15%', rating: 5, reviewCount: '1,234' },
  { id: 3, title: 'TRAIL RUNNER SHORTS MIDNIGHT', price: '$89.95', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400', imageSecondary: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400', badgeLeft: 'BEST SELLER', badgeRight: null, rating: 4.5, reviewCount: '456', desktopLastStarPartial: true },
  { id: 4, title: 'CAMP MUG OUTSIDE VIBES TERRA', price: '$34.95', image: 'https://images.unsplash.com/photo-1597045566677-8cf032ed6634?w=400', imageSecondary: 'https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=400', badgeLeft: null, badgeRight: 'SAVE 15%', rating: 5, reviewCount: '2,100' },
  { id: 5, title: 'SUMMIT FLEECE HOODIE SAGE', price: '$119.95', image: 'https://images.unsplash.com/photo-1584735175097-719d848f8449?w=400', imageSecondary: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400', badgeLeft: 'BEST SELLER', badgeRight: 'SAVE 15%', rating: 5, reviewCount: '678' },
  { id: 6, title: 'TREK BACKPACK 22L STORM', price: '$134.95', image: 'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=400', imageSecondary: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400', badgeLeft: 'BEST SELLER', badgeRight: null, rating: 4.5, reviewCount: '334' },
  { id: 7, title: 'OUTSIDE VIBES CAP NAVY', price: '$44.95', image: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=400', imageSecondary: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', badgeLeft: null, badgeRight: 'SAVE 15%', rating: 5, reviewCount: '567' },
  { id: 8, title: 'WATERPROOF JACKET SLATE', price: '$189.95', image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400', imageSecondary: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400', badgeLeft: 'BEST SELLER', badgeRight: null, rating: 5, reviewCount: '890' },
  { id: 9, title: 'TRAIL LEGGINGS DUSK', price: '$94.95', image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400', imageSecondary: 'https://images.unsplash.com/photo-1597045566677-8cf032ed6634?w=400', badgeLeft: 'BEST SELLER', badgeRight: 'SAVE 15%', rating: 4.5, reviewCount: '412' },
  { id: 10, title: 'FIRE PIT OUTSIDE VIBES COPPER', price: '$249.95', image: 'https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=400', imageSecondary: 'https://images.unsplash.com/photo-1584735175097-719d848f8449?w=400', badgeLeft: 'BEST SELLER', badgeRight: null, rating: 5, reviewCount: '1,023' },
];

const STAR_COUNT = 5;
const STAR_IMG = 'assets/star-01.svg';
const STAR_HALF_IMG = 'assets/star-half.svg';

function renderProducts() {
  const template = document.getElementById('product-card-template');
  const track = document.querySelector('[data-products-track]');
  if (!template || !track) return;

  const fragment = document.createDocumentFragment();
  PRODUCTS.forEach((product) => {
    const clone = template.content.cloneNode(true);
    const link = clone.querySelector('a');
    link.href = '#product-' + product.id;

    clone.querySelector('.product-card__img--primary').src = product.image;
    clone.querySelector('.product-card__img--primary').alt = product.title;
    clone.querySelector('.product-card__img--secondary').src = product.imageSecondary;
    clone.querySelector('.product-card__img--secondary').alt = product.title + ' (hover)';

    const badgeLeft = clone.querySelector('.product-card__badge--left');
    const badgeRight = clone.querySelector('.product-card__badge--right');
    if (badgeLeft) badgeLeft.textContent = product.badgeLeft || '';
    if (badgeRight) badgeRight.textContent = product.badgeRight || '';

    clone.querySelector('.product-card__title').textContent = product.title;
    clone.querySelector('.product-card__price').textContent = product.price;
    clone.querySelector('.product-card__reviews').textContent = product.reviewCount + ' Reviews';

    const ratingSr = clone.querySelector('.product-card__rating-sr');
    if (ratingSr) ratingSr.textContent = 'Rated ' + product.rating + ' out of 5 stars';

    const ratingEl = clone.querySelector('.product-card__rating');
    ratingEl.innerHTML = '';
    const fullStars = Math.floor(product.rating);
    const hasHalf = product.rating % 1 >= 0.5;
    const useHalfOnDesktop = product.desktopLastStarPartial === true && hasHalf;

    for (let i = 0; i < STAR_COUNT; i++) {
      const isFilled = i < fullStars;
      const isHalfStar = useHalfOnDesktop && i === fullStars;
      const isEmpty = !isFilled && !isHalfStar;

      if (isHalfStar) {
        const halfImg = document.createElement('img');
        halfImg.src = STAR_HALF_IMG;
        halfImg.alt = '';
        halfImg.className = 'product-card__star product-card__star--half hidden md:block';
        halfImg.setAttribute('aria-hidden', 'true');
        ratingEl.appendChild(halfImg);
        const fullImg = document.createElement('img');
        fullImg.src = STAR_IMG;
        fullImg.alt = '';
        fullImg.className = 'product-card__star md:hidden';
        fullImg.setAttribute('aria-hidden', 'true');
        ratingEl.appendChild(fullImg);
      } else {
        const starImg = document.createElement('img');
        starImg.src = STAR_IMG;
        starImg.alt = '';
        starImg.className = 'product-card__star' + (isEmpty ? ' product-card__star--empty' : '');
        starImg.setAttribute('aria-hidden', 'true');
        ratingEl.appendChild(starImg);
      }
    }

    fragment.appendChild(clone);
  });
  track.appendChild(fragment);
}

const MOBILE_MAX_WIDTH = 767;
const COLLAPSED_BUFFER_PX = 2;
const IMAGES_LOAD_WAIT_MS = 4000;

/**
 * product-list-view: mobile (grid + Show More with measured collapse) and desktop (carousel, later).
 * Collapsed height = measured (4th card bottom − wrap top + buffer). Expanded once, then button hidden.
 * Measurement is deferred until first 4 cards' images have loaded so height is correct on first paint.
 */
class ProductListView extends HTMLElement {
  constructor() {
    super();
    this._hasUserExpanded = false;
    this._resizeRAF = null;
  }

  connectedCallback() {
    this._wrap = this.querySelector('[data-grid-wrap]');
    this._btn = this.querySelector('[data-show-more]');
    this._showMoreWrap = this.querySelector('[data-show-more-wrap]');
    if (!this._wrap || !this._btn) return;

    this._boundOnClick = this._onClick.bind(this);
    this._boundResize = this._onResize.bind(this);
    this._btn.addEventListener('click', this._boundOnClick);
    window.addEventListener('resize', this._boundResize);
  }

  disconnectedCallback() {
    if (this._btn && this._boundOnClick) {
      this._btn.removeEventListener('click', this._boundOnClick);
    }
    window.removeEventListener('resize', this._boundResize);
  }

  /** Call after products are rendered. On mobile, waits for first 4 cards' images to load before measuring. */
  init() {
    if (window.innerWidth > MOBILE_MAX_WIDTH) {
      this._applyDesktop();
    } else {
      this._whenFirstFourCardsReady().then(() => this._applyCollapsed());
    }
  }

  /** Resolves when images in first 4 product cards have loaded (or timeout). Ensures layout is ready before measuring. */
  _whenFirstFourCardsReady() {
    const track = this._wrap?.querySelector('[data-products-track]');
    if (!track || track.children.length < 4) {
      return Promise.resolve();
    }
    const images = [];
    for (let i = 0; i < 4; i++) {
      const imgs = track.children[i].querySelectorAll('img');
      for (let j = 0; j < imgs.length; j++) images.push(imgs[j]);
    }
    const pending = images.filter((img) => !img.complete);
    if (pending.length === 0) return Promise.resolve();

    return Promise.race([
      Promise.all(
        pending.map(
          (img) =>
            new Promise((resolve) => {
              img.addEventListener('load', resolve, { once: true });
              img.addEventListener('error', resolve, { once: true });
            })
        )
      ),
      new Promise((resolve) => setTimeout(resolve, IMAGES_LOAD_WAIT_MS))
    ]);
  }

  _getCollapsedHeight() {
    const track = this._wrap?.querySelector('[data-products-track]');
    if (!track) return this._wrap.scrollHeight;
    const items = track.children;
    if (items.length < 4) return this._wrap.scrollHeight;
    const wrapRect = this._wrap.getBoundingClientRect();
    const fourthRect = items[3].getBoundingClientRect();
    const height = Math.ceil(fourthRect.bottom - wrapRect.top) + COLLAPSED_BUFFER_PX;
    return height;
  }

  _applyCollapsed() {
    this._wrap.classList.remove('is-expanded');
    const h = this._getCollapsedHeight();
    this._wrap.style.maxHeight = h + 'px';
    this._btn.setAttribute('aria-expanded', 'false');
    if (this._showMoreWrap) this._showMoreWrap.style.display = '';
  }

  _applyExpanded() {
    this._hasUserExpanded = true;
    this._wrap.classList.add('is-expanded');
    this._wrap.style.maxHeight = this._wrap.scrollHeight + 'px';
    this._btn.setAttribute('aria-expanded', 'true');

    const onTransitionEnd = () => {
      this._wrap.removeEventListener('transitionend', onTransitionEnd);
      this._wrap.style.maxHeight = '';
      if (this._showMoreWrap) this._showMoreWrap.style.display = 'none';
    };
    this._wrap.addEventListener('transitionend', onTransitionEnd);
  }

  _applyDesktop() {
    this._wrap.classList.remove('is-expanded');
    this._wrap.style.maxHeight = '';
    if (this._showMoreWrap) this._showMoreWrap.style.display = '';
  }

  _onClick() {
    if (this._hasUserExpanded) return;
    if (window.innerWidth > MOBILE_MAX_WIDTH) return;
    this._applyExpanded();
  }

  _onResize() {
    if (this._resizeRAF) cancelAnimationFrame(this._resizeRAF);
    this._resizeRAF = requestAnimationFrame(() => {
      this._resizeRAF = null;
      if (window.innerWidth > MOBILE_MAX_WIDTH) {
        this._applyDesktop();
      } else {
        if (this._hasUserExpanded) {
          this._wrap.classList.add('is-expanded');
          this._wrap.style.maxHeight = '';
          if (this._showMoreWrap) this._showMoreWrap.style.display = 'none';
        } else {
          this._applyCollapsed();
        }
      }
    });
  }
}
if (!customElements.get('product-list-view')) {
  customElements.define('product-list-view', ProductListView);
}

document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  document.querySelector('product-list-view')?.init?.();
});
