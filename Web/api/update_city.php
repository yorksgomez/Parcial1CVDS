<?php

$exists = false;

require('confirm_normal.php');

if(!$exists)
  exit;

if(!isset($_UPDATE_CITY_PHP)) {
  $_UPDATE_CITY_PHP = 1;

  $id_ciudad = $_GET['id_ciudad'];
  $id_usuario = $_GET['id_usuario'];

  require('connect_db.php');

  $mysqli = Connection::get();

  $query = "UPDATE usuarios SET id_ciudad=? WHERE id=?";

  $stmt = $mysqli->prepare($query);
  $stmt->bind_param('ii', $id_ciudad, $id_usuario);
  $stmt->execute();

  $stmt->close();
  unset($stmt, $mysqli);

  Connection::close();
}

?>
