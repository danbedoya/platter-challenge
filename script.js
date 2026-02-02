// Platter Challenge – Vanilla JS

const PRODUCTS = [
  { id: 1, title: 'OUTSIDE VIBES T-SHIRT SUNSHINE', price: '$104.95', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', imageSecondary: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400', badgeLeft: 'BEST SELLER', badgeRight: null, rating: 5, reviewCount: '1,234' },
  { id: 2, title: 'HIKE BOTTLE OUTSIDE VIBES FOREST GREEN', price: '$104.95', image: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=400', imageSecondary: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400', badgeLeft: 'BEST SELLER', badgeRight: 'SAVE 15%', badgeRightMobile: 'SAVE 15%', rating: 5, reviewCount: '1,234' },
  { id: 3, title: 'TRAIL RUNNER SHORTS MIDNIGHT', price: '$89.95', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400', imageSecondary: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400', badgeLeft: 'BEST SELLER', badgeRight: null, badgeRightMobile: 'SAVE 15%', rating: 4.5, reviewCount: '456', desktopLastStarPartial: true },
  { id: 4, title: 'CAMP MUG OUTSIDE VIBES TERRA', price: '$34.95', image: 'https://images.unsplash.com/photo-1597045566677-8cf032ed6634?w=400', imageSecondary: 'https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=400', badgeLeft: null, badgeLeftDesktop: 'BEST SELLER', badgeRight: 'SAVE 15%', badgeRightMobile: null, rating: 5, reviewCount: '2,100' },
  { id: 5, title: 'SUMMIT FLEECE HOODIE SAGE', price: '$119.95', image: 'https://images.unsplash.com/photo-1584735175097-719d848f8449?w=400', imageSecondary: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400', badgeLeft: 'BEST SELLER', badgeRight: null, rating: 5, reviewCount: '678' },
  { id: 6, title: 'TREK BACKPACK 22L STORM', price: '$134.95', image: 'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=400', imageSecondary: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400', badgeLeft: 'BEST SELLER', badgeRight: null, rating: 4.5, reviewCount: '334' },
  { id: 7, title: 'OUTSIDE VIBES CAP NAVY', price: '$44.95', image: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=400', imageSecondary: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', badgeLeft: null, badgeRight: null, rating: 5, reviewCount: '567' },
  { id: 8, title: 'WATERPROOF JACKET SLATE', price: '$189.95', image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400', imageSecondary: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400', badgeLeft: 'BEST SELLER', badgeRight: null, rating: 5, reviewCount: '890' },
  { id: 9, title: 'TRAIL LEGGINGS DUSK', price: '$94.95', image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400', imageSecondary: 'https://images.unsplash.com/photo-1597045566677-8cf032ed6634?w=400', badgeLeft: 'BEST SELLER', badgeRight: null, rating: 4.5, reviewCount: '412' },
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
  PRODUCTS.forEach((product, index) => {
    const clone = template.content.cloneNode(true);
    const link = clone.querySelector('a');
    link.href = '#product-' + product.id;

    const imgPrimary = clone.querySelector('.product-card__img--primary');
    imgPrimary.src = product.image;
    imgPrimary.alt = product.title;
    if (index < 4) {
      imgPrimary.setAttribute('fetchpriority', 'high');
    } else {
      imgPrimary.setAttribute('loading', 'lazy');
    }
    const imgSecondary = clone.querySelector('.product-card__img--secondary');
    imgSecondary.src = product.imageSecondary;
    imgSecondary.alt = product.title + ' (hover)';

    const badgeLeftMobile = clone.querySelector('.product-card__badge--left-mobile');
    const badgeLeftDesktop = clone.querySelector('.product-card__badge--left-desktop');
    const badgeRightMobile = clone.querySelector('.product-card__badge--right-mobile');
    const badgeRightDesktop = clone.querySelector('.product-card__badge--right-desktop');
    if (badgeLeftMobile) badgeLeftMobile.textContent = (product.badgeLeftMobile ?? product.badgeLeft) || '';
    if (badgeLeftDesktop) badgeLeftDesktop.textContent = (product.badgeLeftDesktop ?? product.badgeLeft) || '';
    if (badgeRightMobile) badgeRightMobile.textContent = product.badgeRightMobile || '';
    if (badgeRightDesktop) badgeRightDesktop.textContent = product.badgeRight || '';

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
const DESKTOP_MIN_WIDTH = 1280;
const MOBILE_COLLAPSED_HEIGHT_PX = 556;
const IMAGES_LOAD_WAIT_MS = 4000;

class ProductListView extends HTMLElement {
  constructor() {
    super();
    this._hasUserExpanded = false;
    this._resizeRAF = null;
  }

  connectedCallback() {
    this._wrap = this.querySelector('[data-grid-wrap]');
    this._track = this.querySelector('[data-products-track]');
    this._btn = this.querySelector('[data-show-more]');
    this._showMoreWrap = this.querySelector('[data-show-more-wrap]');
    this._scrollbarWrap = this.querySelector('[data-scrollbar-wrapper]');
    this._scrollbar = this.querySelector('[data-scrollbar]');
    this._scrollbarThumb = this.querySelector('[data-scrollbar-thumb]');
    this._scrollbarTrack = this.querySelector('[data-scrollbar-track]');
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
    this._teardownScrollbar();
  }

  init() {
    if (window.innerWidth > MOBILE_MAX_WIDTH) {
      this._applyDesktop();
      this.classList.add('is-ready');
    } else {
      this._whenFirstFourCardsReady().then(() => {
        this._applyCollapsed();
        this.classList.add('is-ready');
      });
    }
    if (window.innerWidth >= DESKTOP_MIN_WIDTH) {
      this._initScrollbar();
      setTimeout(() => this._updateScrollbar(), 100);
    }
  }

  _whenFirstFourCardsReady() {
    if (!this._track || this._track.children.length < 4) {
      return Promise.resolve();
    }
    const images = [];
    for (let i = 0; i < 4; i++) {
      const imgs = this._track.children[i].querySelectorAll('img');
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

  _applyCollapsed() {
    this._wrap.classList.remove('is-expanded');
    this._wrap.style.maxHeight = MOBILE_COLLAPSED_HEIGHT_PX + 'px';
    this._btn.setAttribute('aria-expanded', 'false');
    if (this._showMoreWrap) this._showMoreWrap.style.display = '';
  }

  _applyExpanded() {
    this._hasUserExpanded = true;
    this._wrap.classList.add('is-expanded');
    this._wrap.style.maxHeight = this._wrap.scrollHeight + 'px';
    this._btn.setAttribute('aria-expanded', 'true');
    if (this._showMoreWrap) this._showMoreWrap.style.display = 'none';

    const onTransitionEnd = () => {
      this._wrap.removeEventListener('transitionend', onTransitionEnd);
      this._wrap.style.maxHeight = '';
    };
    this._wrap.addEventListener('transitionend', onTransitionEnd);
  }

  _applyDesktop() {
    this._wrap.classList.remove('is-expanded');
    this._wrap.style.maxHeight = '';
    if (this._showMoreWrap) this._showMoreWrap.style.display = '';
    if (window.innerWidth >= DESKTOP_MIN_WIDTH) {
      this._initScrollbar();
    } else {
      this._teardownScrollbar();
    }
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
        this._teardownScrollbar();
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

  _initScrollbar() {
    if (!this._track || !this._scrollbar || !this._scrollbarThumb || !this._scrollbarTrack) return;
    if (this._scrollbarInitialized) return;
    this._scrollbarInitialized = true;

    this._boundUpdateScrollbar = () => this._updateScrollbar();
    this._boundOnScrollbarTrackClick = (e) => this._onScrollbarTrackClick(e);
    this._boundOnThumbPointerDown = (e) => this._onThumbPointerDown(e);

    this._track.addEventListener('scroll', this._boundUpdateScrollbar);
    this._scrollbarTrack.addEventListener('click', this._boundOnScrollbarTrackClick);
    this._scrollbarThumb.addEventListener('pointerdown', this._boundOnThumbPointerDown);

    window.addEventListener('resize', this._boundUpdateScrollbar);
    this._updateScrollbar();
  }

  _teardownScrollbar() {
    if (!this._scrollbarInitialized) return;
    this._scrollbarInitialized = false;

    if (this._track && this._boundUpdateScrollbar) {
      this._track.removeEventListener('scroll', this._boundUpdateScrollbar);
    }
    if (this._scrollbarTrack && this._boundOnScrollbarTrackClick) {
      this._scrollbarTrack.removeEventListener('click', this._boundOnScrollbarTrackClick);
    }
    if (this._scrollbarThumb && this._boundOnThumbPointerDown) {
      this._scrollbarThumb.removeEventListener('pointerdown', this._boundOnThumbPointerDown);
    }
    window.removeEventListener('resize', this._boundUpdateScrollbar);
  }

  _getScrollbarMetrics() {
    if (!this._track) return null;
    const scrollWidth = this._track.scrollWidth;
    const clientWidth = this._track.clientWidth;
    return { scrollWidth, clientWidth, maxScroll: scrollWidth - clientWidth };
  }

  _updateScrollbar() {
    if (!this._track || !this._scrollbar || !this._scrollbarThumb || !this._scrollbarTrack) return;
    const m = this._getScrollbarMetrics();
    if (!m || m.maxScroll <= 0) {
      if (this._scrollbarWrap) this._scrollbarWrap.style.display = 'none';
      return;
    }
    if (this._scrollbarWrap) this._scrollbarWrap.style.display = '';
    const scrollLeft = this._track.scrollLeft;
    const thumbWidthPercent = (m.clientWidth / m.scrollWidth) * 100;
    const thumbWidth = Math.max(15, Math.min(thumbWidthPercent, 75));
    const thumbPosition = (scrollLeft / m.maxScroll) * (100 - thumbWidth);
    this._scrollbarThumb.style.width = thumbWidth + '%';
    this._scrollbarThumb.style.left = thumbPosition + '%';
  }

  _onScrollbarTrackClick(e) {
    if (!this._track || e.target === this._scrollbarThumb) return;
    const m = this._getScrollbarMetrics();
    if (!m || m.maxScroll <= 0) return;
    const rect = this._scrollbarTrack.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const trackBarWidth = this._scrollbar.offsetWidth;
    this._track.scrollLeft = (x / trackBarWidth) * m.maxScroll;
  }

  _onThumbPointerDown(e) {
    e.preventDefault();
    const m = this._getScrollbarMetrics();
    if (!m || m.maxScroll <= 0) return;
    const startX = e.clientX;
    const startScrollLeft = this._track.scrollLeft;
    const trackBarWidth = this._scrollbar.offsetWidth;
    const thumbWidth = this._scrollbarThumb.offsetWidth;
    const thumbMaxLeft = trackBarWidth - thumbWidth;

    const onPointerMove = (moveE) => {
      const dx = moveE.clientX - startX;
      const scrollPerPx = m.maxScroll / thumbMaxLeft;
      const newScroll = Math.max(0, Math.min(m.maxScroll, startScrollLeft + dx * scrollPerPx));
      this._track.scrollLeft = newScroll;
    };
    const onPointerUp = () => {
      document.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerup', onPointerUp);
    };
    document.addEventListener('pointermove', onPointerMove);
    document.addEventListener('pointerup', onPointerUp);
  }
}
if (!customElements.get('product-list-view')) {
  customElements.define('product-list-view', ProductListView);
}

document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  const listView = document.querySelector('product-list-view');
  if (!listView?.init) return;

  function runInit() {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        listView.init();
      });
    });
  }

  if (window.innerWidth <= MOBILE_MAX_WIDTH) {
    if (document.readyState === 'complete') {
      setTimeout(runInit, 50);
    } else {
      window.addEventListener('load', () => setTimeout(runInit, 50), { once: true });
    }
  } else {
    runInit();
  }
});
