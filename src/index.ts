import { basket, main, logo, images, about, shop, shopPage } from './elements';
import { type Status } from './type';

let cards: Status[] = [];

const basketMessage = document.createElement('div');
basketMessage.innerHTML = 'Your basket is empty';
basketMessage.classList.add('flex', 'justify-center', 'mt-[250px]', 'hidden');
document.body.append(basketMessage);

const productCard = document.createElement('div');

const cartList = document.createElement('div');
cartList.classList.add('p-4', 'hidden');
document.body.append(cartList);

let div = document.createElement('div');

div.innerHTML = `
    <div class="flex flex-col items-center">
      <h1 class="text-3xl font-bold mb-4">About Us</h1>
      <div class="mt-4 max-w-[1000px]">
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nec turpis at arcu consequat dictum. In eu euismod quam. Praesent ut finibus risus. Ut eu aliquet libero, non ornare nisl. Aenean gravida urna at ligula viverra, sed pharetra ante pharetra. Interdum et malesuada fames ac ante ipsum primis in faucibus. Quisque efficitur a mi eget hendrerit. Quisque tortor lorem, aliquet eget feugiat ac, volutpat et lorem. Integer porta luctus leo et interdum. Morbi porta diam sem, sit amet porta lectus iaculis ac.</p>
      </div>
      <img class="mt-4" src="https://demositefiles.blob.core.windows.net/images/homepage/banner/desktop.png" width="1000">
      <div class="mt-4 max-w-[1000px]">
        <p class="mt-2">Donec lacinia malesuada orci, vitae tempor tortor volutpat in. Nullam tempor ex vel eros varius bibendum. Fusce non risus ut ligula mollis molestie. Quisque vel pretium elit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nullam sed lectus luctus, auctor diam nec, varius diam. Sed id tortor at sem hendrerit aliquam.</p>
      </div>
    </div>
  `;
div.classList.add('hidden');

document.body.append(div);

function handleCartClick() {
  empty();
  
  if (cards.length === 0) {
    basketMessage.classList.remove('hidden');
  }

  renderCart();
}

function handleProductClick(e: MouseEvent) {
  empty();
  let target = e.target as HTMLImageElement;

  let title = target.nextElementSibling as HTMLSpanElement;
  let price = title.nextElementSibling as HTMLParagraphElement;

  let titleText = title.innerText;
  let priceText = Number(price.innerText.replace(/[^\d.]/g, ''));

  let imgSrc = target.src;

  main.classList.add('hidden');
  productCard.classList.add('w-full', 'flex', 'justify-center');

  productCard.innerHTML = `<div class="flex items-center justify-end">
  <img src="${imgSrc}" width="500">
  <div class="max-w-2xl mx-auto">
    <h1 class="text-3xl font-bold">${titleText}</h1>
    <p class="text-2xl font-semibold mt-2">$${priceText}</p>
        
    <div class="mt-4">
        <p class="font-semibold">Color:</p>
        <div class="mt-2 flex gap-2">
            <button class="border px-4 py-2">Black</button>
            <button class="border px-4 py-2">Green</button>
            <button class="border px-4 py-2">Pink</button>
            <button class="border px-4 py-2">Purple</button>
        </div>
    </div>

    <div class="mt-4">
        <p class="font-semibold">Size:</p>
        <div class="mt-2 flex gap-2">
            <button class="border px-4 py-2">M</button>
            <button class="border px-4 py-2">L</button>
        </div>
    </div>

    <button class="addToCart border px-6 py-2 bg-black text-white mt-4">ADD TO CART</button>

    <p class="mt-6 text-gray-600">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br> Vestibulum feugiat mi eget elit elementum, id pulvinar tellus eleifend.
    </p>
    <p class="mt-4 text-gray-600">
        Integer porttitor elit id euismod elementum. Nulla vel molestie massa, eget iaculis elit. <br> Quisque a tortor vel lectus ultricies pretium quis non purus.
    </p>
</div>
  </div>`;

  document.body.append(productCard);

  productCard.classList.remove('hidden');

  let addBtn: HTMLButtonElement = document.querySelector('.addToCart')!;

  addBtn.addEventListener('click', () => handleAddBtnClick({ name: titleText, price: priceText, imgSrc, quantity: 1 }));
}

function handleAddBtnClick(product: { name: string; price: number; imgSrc: string; quantity: number }) {
  let findProduct = cards.find(p => p.name === product.name);

  if (findProduct) {
    findProduct.quantity++;
  } else {
    cards.push({ ...product });
  }
}

function renderCart() {
  cartList.innerHTML = '';

  empty();

  if (cards.length === 0) {
    basketMessage.classList.remove('hidden');
    cartList.classList.add('hidden');
    return;
  }

  basketMessage.classList.add('hidden');
  cartList.classList.remove('hidden');

  let total = 0;

  cards.forEach((product, index) => {
    total += product.price * product.quantity;

    const item = document.createElement('div');
    item.classList.add('flex', 'items-center', 'gap-4', 'border-b', 'p-2', 'justify-center');

    item.innerHTML = `
        <img src="${product.imgSrc}" width="100" class="rounded">
        <div class="flex items-center gap-4">
          <div><h2 class="text-lg font-semibold">${product.name}</h2>
          <p class="text-gray-600">$${product.price}</p></div>
          <div class="flex items-center gap-2 mt-2">
            <button class="decrease px-2 py-1 border rounded bg-gray-200">-</button>
            <span>${product.quantity}</span>
            <button class="increase px-2 py-1 border rounded bg-gray-200">+</button>
            <button class="remove px-2 py-1 border rounded bg-red-500 text-white">Delete</button>
          </div>
        </div>
      `;

    cartList.append(item);

    item.querySelector('.increase')!.addEventListener('click', () => {
      product.quantity++;
      renderCart();
    });

    item.querySelector('.decrease')!.addEventListener('click', () => {
      if (product.quantity > 1) {
        product.quantity--;
      } else {
        cards.splice(index, 1);
      }
      renderCart();
    });

    item.querySelector('.remove')!.addEventListener('click', () => {
      cards.splice(index, 1);
      renderCart();
    });
  });

  const totalDiv = document.createElement('div');
  totalDiv.classList.add('w-full', 'text-xl', 'font-bold', 'mt-4', 'flex', 'justify-center', 'items-center');
  totalDiv.innerHTML = `Total: ${total}`;
  cartList.append(totalDiv);
}

function handleAboutUsClick(e: MouseEvent) {
  empty();
  div.classList.remove('hidden');
}

function handleShopClick() {
  empty();
  shop.classList.remove('hidden');

}

function empty() {
  main.classList.add('hidden');
  basketMessage.classList.add('hidden');
  cartList.classList.add('hidden');
  productCard.classList.add('hidden');
  div.classList.add('hidden');
  shop.classList.add('hidden');
}

shopPage.forEach(sh => sh.addEventListener('click', handleShopClick));

about.addEventListener('click', handleAboutUsClick);

images.forEach(img => img.addEventListener('click', handleProductClick));

basket.addEventListener('click', handleCartClick);

logo.addEventListener('click', () => {
  empty()
  main.classList.remove('hidden');
  productCard.innerHTML = '';
});
