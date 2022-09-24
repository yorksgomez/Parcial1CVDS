<?php

if(isset($_GET['email']) && isset($_GET['pin'])) {
  require('connect_db.php');

  $mysqli = Connection::get();

  $query = "SELECT pinCorrecto(?, ?)";

  $stmt = $mysqli->prepare($query);
  $stmt->bind_param('ss', $_GET['email'], $_GET['pin']);
  $stmt->execute();

  echo $stmt->get_result()->fetch_row()[0];
}

?>
