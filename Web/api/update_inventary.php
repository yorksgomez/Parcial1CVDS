<?php

$exists = false;

require('confirm_admin.php');
require('params.php');
error_reporting(E_ALL);
ini_set('display_errors', 1);
if(!$exists)
  exit;

if(!isset($_UPDATE_INVENTORY_PHP)) {
  $_UPDATE_INVENTORY_PHP = 1;

  require('connect_db.php');

  $id_sede = isset($_GET['id_sede']) ? $_GET['id_sede'] : 0;
  $id_producto = isset($_GET['id_producto']) ? $_GET['id_producto'] : 0;

  $param_group = new ParamGroup($_GET['params'], "set");
  $param_group->addParam(new UpdateParam("inventario.cantidad"));

  $param_group->init();

  $mysqli = Connection::get();

  $query = "UPDATE inventario " . $param_group->toQueryString() . " WHERE inventario.id_producto=? AND inventario.id_sede=?";

  $params = $param_group->toParamValArr();
  $params[] = $id_producto;
  $params[] = $id_sede;

  $stmt = $mysqli->prepare($query);
  $stmt->bind_param($param_group->toDatatypeString() . "ii", ...$params);
  $stmt->execute();

  $stmt->close();

  unset($stmt, $mysqli);

  Connection::close();

}


 ?>
