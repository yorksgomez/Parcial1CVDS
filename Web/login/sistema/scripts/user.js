function deleteUser(event) {
  event.preventDefault();
  let id = event.srcElement.closest('.product_line').getElementsByClassName('hidden_id')[0].innerText;

  if(confirm("Está seguro de que desea eliminar el usuario?")) {
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function(e) {

        if(xhttp.readyState === 4)
          event.srcElement.closest('.product_line').remove();

    };

    xhttp.open("GET", "del_account.php?usuario=" + id);
    xhttp.send();

  }

}
