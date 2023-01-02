'use strict';

let fitlerPopup = document.querySelector('.filterPopup');
let fitlerLabel = document.querySelector('.filterLabel');
let filterIcon = document.querySelector('.filterIcon');

fitlerLabel.addEventListener('click', function() {
    fitlerPopup.classList.toggle('hidden');
    fitlerLabel.classList.toggle('filterLabelPink');
    filterIcon.classList.toggle('filterIconPink');

    if (filterIcon.getAttribute('src') === 'images/filter.svg') {
        filterIcon.setAttribute('src', 'images/filterHover.svg')
    } else {
        filterIcon.setAttribute('src', 'images/filter.svg')
    }
});

let filterHeaders = document.querySelectorAll('.filterCategoryHeader');
filterHeaders.forEach(function(header) {
    header.addEventListener('click', function(event) {
        event.target.nextElementSibling.classList.toggle('hidden');
    })
});

let filterSizes = document.querySelector('.filterSizes');
let filterSizeWrap = document.querySelector('.filterSizeWrap');
filterSizeWrap.addEventListener('click', function() {
    filterSizes.classList.toggle('hidden');
});

const basketTotalEl = document.querySelector('.basketTotal');
const basketEl = document.querySelector('.basket');
const basketTotalValueEl = document.querySelector('.basketTotalValue');
const cartIconWrapEl = document.querySelector('.cartIconWrap span');
document.querySelector('.cartIconWrap').addEventListener('click', () => {
    basketEl.classList.toggle('hidden');
  });
  
  const basket = {};


  function addToCart(id, name, price) {
    if (!(id in basket)) {
      basket[id] = {id: id, name: name, price: price, count: 0};
    }
    basket[id].count++;
    cartIconWrapEl.textContent = Object.values(basket).reduce((acc, product) => acc + product.count, 0).toString();
    basketTotalValueEl.textContent = Object
    .values(basket)
    .reduce((acc, product) => acc + product.price * product.count, 0).toFixed(2);
    addProduct(id);
  }

  function addNewProduct(productId) {
    const productRow = `
      <div class="basketRow" data-id="${productId}">
        <div>${basket[productId].name}</div>
        <div>
          <span class="productCount">${basket[productId].count}</span> шт.
        </div>
        <div>$${basket[productId].price}</div>
        <div>
          $<span class="productTotalRow">${(basket[productId].price * basket[productId].count).toFixed(2)}</span>
        </div>
      </div>
      `;
    basketTotalEl.insertAdjacentHTML("beforebegin", productRow);
  }

  function addProduct(productId) {
    const basketRowEl = basketEl
      .querySelector(`.basketRow[data-id="${productId}"]`);
    if (!basketRowEl) {
      addNewProduct(productId);
      return;
    }
    const product = basket[productId];
    basketRowEl.querySelector('.productCount').textContent = product.count;
    basketRowEl
      .querySelector('.productTotalRow')
      .textContent = (product.price * product.count).toFixed(2);
  }
  document.querySelector('.featuredItems').addEventListener('click', event => {
    if (!event.target.closest('.addToCart')) {
      return;
    }
    const featuredItemEl = event.target.closest('.featuredItem');
    const id = +featuredItemEl.dataset.id;
    const name = featuredItemEl.dataset.name;
    const price = +featuredItemEl.dataset.price;
    addToCart(id, name, price);
  });