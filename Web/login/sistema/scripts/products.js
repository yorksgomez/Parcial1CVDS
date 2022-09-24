let delete_buttons = document.querySelectorAll(".product_line .product_delete");

function deleteProduct(event) {
  event.preventDefault();
  let id = event.srcElement.closest('.product_line').getElementsByClassName('hidden_id')[0].innerText;

  if(confirm("Está seguro de que desea eliminar el producto?")) {
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function(e) {

        if(xhttp.readyState === 4)
          event.srcElement.closest('.product_line').remove();

    };

    xhttp.open("GET", "del_product.php?id_producto=" + id);
    xhttp.send();

  }

}

for(let i = 0; i < delete_buttons.length; i++)
  delete_buttons[i].addEventListener('click', deleteProduct);
