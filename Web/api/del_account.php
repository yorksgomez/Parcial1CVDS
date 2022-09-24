<?php

$exists = false;

require('confirm_admin.php');

if(!$exists)
  exit;

if(!isset($_DEL_ACCOUNT_PHP)) {
  $_DEL_ACCOUNT_PHP = 1;

  require('connect_db.php');

  $id_usuario = $_GET['id_usuario'];

  $mysqli = Connection::get();

  $query = "DELETE FROM usuarios WHERE id=?";

  $stmt = $mysqli->prepare($query);
  $stmt->bind_param("i", $id_usuario);
  $stmt->execute();

  $stmt->close();

  unset($stmt, $mysqli);

  Connection::close();
}


 ?>
