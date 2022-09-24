<?php

if(isset($_GET['email'])) {
  require('connect_db.php');

  $mysqli = Connection::get();

  $query = "SELECT agregarPin(?)";

  $stmt = $mysqli->prepare($query);
  $stmt->bind_param('s', $_GET['email']);
  $stmt->execute();

  echo $stmt->get_result()->fetch_row()[0];
}

?>
