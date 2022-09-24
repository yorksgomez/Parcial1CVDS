<?php

$exists = false;

require('confirm_admin.php');

if(!$exists)
  exit;

if(!isset($_GET_SUCURSAL_PHP)) {
  $_GET_SUCURSAL_PHP = 1;

  require('connect_db.php');

  $mysqli = Connection::get();

  $query = "SELECT usuarios.nombre, usuarios.usuario, usuarios.telefono, ciudades.departamento, ciudades.municipio FROM usuarios
            LEFT JOIN ciudades ON usuarios.id_ciudad=ciudades.id
            WHERE usuarios.tipo='sucursal'";

  $result = $mysqli->query($query);

  echo json_encode($result->fetch_all());

}

 ?>
