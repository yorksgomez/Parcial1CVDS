<?php

  if(isset($_GET['correo'])) {
    require('../app_constants.php');

    $params = array(
      "nombre" => $_GET['nombre'],
      "usuario" => $_GET['correo'],
      "telefono" => $_GET['telefono'],
      "nacimiento" => $_GET['inicio'],
      "id_ciudad" => $_GET['municipio'],
      "contrasena" => hash('sha256', $_GET['contrasena']),
    );

    $query = http_build_query($params);

    file_get_contents(REQUEST_SERVER . "user_sucursal_register.php?" . $query . "&$credentials");

  }

?>
