<?php

if(isset($_GET['email']) && isset($_GET['pin']) && isset($_GET['contrasena'])) {
  require('connect_db.php');

  $mysqli = Connection::get();

  $query = "UPDATE usuarios SET contrasena=? WHERE usuarios.usuario=? AND usuarios.pin=? AND TIMESTAMPDIFF(MINUTE, usuarios.creacion_pin, NOW()) < 1800";

  $stmt = $mysqli->prepare($query);
  $stmt->bind_param('sss', hash('sha256', $_GET['contrasena']), $_GET['email'], $_GET['pin']);
  $stmt->execute();

  echo $stmt->get_result()->fetch_row()[0];
}

?>
