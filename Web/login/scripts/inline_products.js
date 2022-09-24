let product_buttons = document.querySelectorAll(".product_line .product_button"),
    close_buttons = document.querySelectorAll(".product_line .close_button");

function openProducts(event) {
  let list = event.srcElement.parentElement.querySelector('.product_list');

  list.style.display = 'flex';
}

function closeProducts(event) {
  let list = event.srcElement.closest('.product_list');

  list.style.display = 'none';
}

for(button of product_buttons)
  button.addEventListener('click', openProducts);

for(button of close_buttons)
  button.addEventListener('click', closeProducts);
