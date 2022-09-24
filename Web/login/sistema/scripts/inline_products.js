let product_buttons = document.querySelectorAll(".product_line .product_button"),
    close_buttons = document.querySelectorAll(".product_line .close_button"),
    delete_buttons = document.querySelectorAll(".product_line .product_delete"),
    black_blur = document.getElementById('black_blur');

function openProducts(event) {
  let list = event.srcElement.parentElement.querySelector('.product_list');

  list.style.display = 'flex';
  black_blur.style.display = "block";
}

function closeProducts(event) {
  let list = event.srcElement.closest('.product_list');

  list.style.display = 'none';
  black_blur.style.display = "none";
}

function deleteProduct(event) {
  event.preventDefault();

  let id = event.srcElement.closest('.product_line').getElementsByClassName('hidden_id')[0].innerText;

  if(confirm("Está seguro de que desea eliminar el pedido?")) {
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function(e) {

        if(xhttp.readyState === 4)
          event.srcElement.closest('.product_line').remove();

    };

    xhttp.open("GET", "del_pedido.php?id_pedido=" + id);
    xhttp.send();

  }

}

for(let i = 0; i < product_buttons.length; i++) {
  product_buttons[i].addEventListener('click', openProducts);
  close_buttons[i].addEventListener('click', closeProducts);
  delete_buttons[i].addEventListener('click', deleteProduct);
}
