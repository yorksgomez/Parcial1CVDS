<?php

  if(isset($_POST['nombre'])) {
    require('../app_constants.php');

    $params = array(
      "nombre" => $_POST['nombre'],
      "descripcion" => $_POST['descripcion'],
      "imagen" => $_FILES['imagen']['name'],
      "imagen_data" => base64_encode(file_get_contents($_FILES['imagen']['tmp_name'])),
      "categoria" => $_POST['categoria'],
      "precio" => $_POST['precio'],
      "subcategoria" => $_POST['subcategoria']
    );

    $query = http_build_query($params);

    $ch = curl_init();

    curl_setopt($ch, CURLOPT_URL, REQUEST_SERVER . "add_product.php?$credentials");
    curl_setopt($ch, CURLOPT_POST, TRUE);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $params);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    echo curl_exec($ch);

    curl_close($ch);

  }

?>
