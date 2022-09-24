<?php

if(!isset($_GET_SUBCATEGORIAS_PHP)) {
  $_GET_SUBCATEGORIAS_PHP = 1;

  require('connect_db.php');

  $categoria = $_GET['categoria'];

  $mysqli = Connection::get();

  $query = "CALL obtenerSubcategorias(?)";

  $stmt = $mysqli->prepare($query);
  $stmt->bind_param('s', $categoria);
  $stmt->execute();

  $result = array_map(function($e) {
    return $e[0];
  }, $stmt->get_result()->fetch_all(MYSQLI_NUM));

  unset($mysqli, $stmt);
  Connection::close();

  echo json_encode($result);
}

?>
