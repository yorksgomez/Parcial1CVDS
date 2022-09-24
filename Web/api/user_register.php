<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);

if(!isset($_REGISTER_PHP)) {
  $_REGISTER_PHP = 1;

  require('connect_db.php');

  $mysqli = Connection::get();

  $nombre = $_GET['nombre'];
  $nacimiento = $_GET['nacimiento'];
  $telefono = $_GET['telefono'];
  $usuario = $_GET['usuario'];
  $contrasena = $_GET['contrasena'];
  $id_ciudad = $_GET['id_ciudad'];

  if(isset($nombre) && isset($nacimiento) && isset($telefono) && isset($usuario) && isset($contrasena)) {

    $query = "CALL agregarUsuario(?, ?, ?, ?, FALSE, ?, ?, 'normal')";

    $stmt = $mysqli->prepare($query);
    $stmt->bind_param('sssssi', $nombre, $nacimiento, $telefono, $usuario, $contrasena, $id_ciudad);
    $stmt->execute();
    echo $mysqli->error;
    $stmt->close();
  }

  unset($mysqli);
  Connection::close();
}

?>
