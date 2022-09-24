<?php

  if(!isset($_GET_SUCURSAL_PHP)) {
    $_GET_SUCURSAL_PHP = 1;

    require('connect_db.php');

    $mysqli = Connection::get();

    $query = "SELECT usuarios.nombre, usuarios.correo, usuarios.telefono FROM usuarios WHERE usuarios.tipo='sucursal'";

    $result = $mysqli->query($query);

    echo json_decode($result->fetch_all());

  }

 ?>
