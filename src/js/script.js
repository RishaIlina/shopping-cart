import { Sidebar } from './components/sidebar'
import { nanoid } from 'nanoid'

// первый параметр - сайдбар,
// второй - кнопка по клику на которую открывается сайдбар,
// третий положение сайдбара (если не передан, то по умолчанию 'left')
const panel = new Sidebar('#sidebar', '#open-basket', 'right')
const form = document.querySelector('#productForm')
const productList = document.querySelector('.products-list') // контейнер для отрисовки товаров на главной странице
const basketItemList = document.querySelector('#basket-list') // контейнер для отрисовки товаров в корзине

// Функция для инициализации основных функций и т.д.
const init = async () => {
  window.addEventListener('DOMContentLoaded', async () => {
    await loadJSON() // функция загрузки данных

    // Обработка данных формы
    form.addEventListener('submit', (e) => {
      e.preventDefault() // иначе форма отправится синхронно. Это приведет к перезапуску страницы, а значит, метод addProduct не успеет выполниться.
      addProduct()
    })

    purchaseProduct()
    favoriteProduct()
  })
}

init()

// Функция подгрузки данных на главную страницу
async function loadJSON() {
  let html = ''

  document.querySelectorAll('.main-card').forEach((e) => e.remove()) // чтобы старые карточки не дублировались при добалении новой

  try {
    const response = await fetch('http://localhost:3000/products')
    const data = await response.json()

    if (data && Array.isArray(data)) {
      data.forEach((product) => {
        html += `
            <div class="main-card" data-card-id=${product?.id}>
              <div class="card-image">
                <img src="${product?.imgSrc}" alt="image">

                <div class="card-wishlist">
                  <div class="wishlist-rating">

                    <div class="rating-img">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M16 6.12414H9.89333L8 0L6.10667 6.12414H0L4.93333 9.90345L3.06667 16L8 12.2207L12.9333 16L11.04 9.87586L16 6.12414Z"
                          fill="#FFCE31" />
                      </svg>
                    </div>

                    <span class="rating-amount">${product?.rating}</span>
                  </div>

                  <svg class="whishlist-heart" id="favorite-${product?.whishlist}" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="m16 28c7-4.733 14-10 14-17 0-1.792-.683-3.583-2.05-4.95-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05l-2.051 2.051-2.05-2.051c-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05-1.367 1.367-2.051 3.158-2.051 4.95 0 7 7 12.267 14 17z">
                    </path>
                  </svg>
                </div>
              </div>

              <h3 class="card-name">${product?.name}</h3>

              <p class="card-quantity">${product?.quantity}</h3>

              <p class="card-price">${product?.price}</p>

              <button id="addToBasketButton" class="btn btn-primary">Добавить в корзину</button>
            </div>
          `
      })
    }
    productList.innerHTML = ''

    productList.insertAdjacentHTML('beforeend', html)
  } catch (error) {
    console.error('Ошибка загрузки данных:', error)
  }
}