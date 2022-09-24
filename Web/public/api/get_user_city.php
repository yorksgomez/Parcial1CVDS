<?php

$exists = false;

require('confirm_normal.php');
require('confirm_sucursal.php');
require('confirm_admin.php');

if(!$exists)
  exit;

if(!isset($_GET_USER_CITY_PHP)) {
  $_GET_USER_CITY_PHP = 1;

  require('connect_db.php');

  $id = $_GET['user_id'];

  $mysqli = Connection::get();

  $query = "SELECT ciudades.id FROM usuarios LEFT JOIN ciudades ON usuarios.id_ciudad=ciudades.id WHERE usuarios.id=?";

  $stmt = $mysqli->prepare($query);
  $stmt->bind_param('i', $id);
  $stmt->execute();

  echo $stmt->get_result()->fetch_row()[0];
}

 ?>
