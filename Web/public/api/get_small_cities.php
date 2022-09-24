<?php

if(!isset($_GET_SMALL_CITIES_PHP)) {
  $_GET_SMALL_CITIES_PHP = 1;

  require('connect_db.php');

  $big_city = isset($_GET['departamento']) ? $_GET['departamento'] : '';

  $mysqli = Connection::get();

  $query = "CALL obtenerMunicipiosDepartamento(?)";

  $stmt = $mysqli->prepare($query);
  $stmt->bind_param('s', $big_city);
  $stmt->execute();

  $result = $stmt->get_result()->fetch_all();

  unset($stmt, $mysqli);
  Connection::close();

  echo json_encode($result);

}


 ?>
