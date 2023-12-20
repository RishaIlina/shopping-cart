import { nanoid } from 'nanoid'

/* модалка избранное */
const modal = document.querySelector('#modal-wishlist') // получение доступа к модалке
const openModal = document.querySelector('#open-modal') // доступ к кнопке
const closeModal = document.querySelector('.close-button') // доступ к кнопке Close Modal внутри модалки

openModal.addEventListener('click', () => {
  modal.showModal()
})

closeModal.addEventListener('click', () => {
  modal.close()
})

const modalContainer = document.querySelector('.modal-container__list') // вставка добавленных в корзину эл-тов

// функция извлечения данных отдельной карточки
export function getProductInfoModal(product) {
  const imgElement = product?.querySelector('.card-image img')
  const imgSrc = imgElement ? new URL(imgElement.src).pathname : '' // для преобразования относительного пути в абсолютный

  const productInfo = {
    id: product?.dataset.cardId ?? '',
    imgSrc: imgSrc,
    name: product?.querySelector('.card-name')?.textContent ?? '',
    quantity: product?.querySelector('.card-quantity')?.textContent ?? '',
    price: product?.querySelector('.card-price')?.textContent ?? '',
  }

  addToWishlist(productInfo) // передача данных в избранное
}

// добавление товара в DOM избранного
function addToWishlist(product) {
  const modalItem = document.createElement('div')

  modalItem.classList.add('modal-item')

  modalItem.setAttribute('data-id', `${product.id}`)

  modalItem.innerHTML = `
    <div class="item-card">
      <div class="item-image">
        <img src="${product?.imgSrc}" alt="product image">
      </div>
      <div class="inline-flex flex-column">
        <h3 class="item-name">${product?.name}</h3>
        <p class="item-category">${product?.category}</p>
        <button id="close-button" class="button close-button">
          Remove
          <img src="src/images/delete-icon.svg" alt="delete-icon">
        </button>
      </div>
      <div class="inline-flex">
        <p class="item-price">${product?.price}</p>
      </div>
    </div>
  `

  modalContainer.appendChild(modalItem) // вставляем отдельную карточку в узел родителя
}
