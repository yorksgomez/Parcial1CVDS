<?php

if(!isset($_GET_BIG_CITIES_PHP)) {
  $_GET_BIG_CITIES_PHP = 1;

  require('connect_db.php');

  $mysqli = Connection::get();

  $query = "CALL obtenerDepartamentos()";

  $result = $mysqli->query($query)->fetch_all(MYSQLI_NUM);

  unset($mysqli);
  Connection::close();

  $new_result = array();

  foreach($result as $r)
    $new_result[] = $r[0];

  echo json_encode($new_result);

}

 ?>
