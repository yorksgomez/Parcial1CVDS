<?php

$exists = false;

require('confirm_admin.php');
require('params.php');

if(!$exists)
  exit;

if(!isset($_UPDATE_ACCOUNT_PHP)) {
  $_UPDATE_ACCOUNT_PHP = 1;

  require('connect_db.php');

  $accept_only = array("usuarios.nombre", "usuarios.usuario", "usuarios.telefono", "usuarios.contrasena");

  $id = isset($_GET['id']) ? $_GET['id'] : 0;

  $param_group = new ParamGroup($_GET['params'], "set");
  $param_group->addParam(new UpdateParam("usuarios.nombre"));
  $param_group->addParam(new UpdateParam("usuarios.usuario"));
  $param_group->addParam(new UpdateParam("usuarios.telefono"));
  $param_group->addParam(new UpdateParam("usuarios.contrasena"));

  $param_group->init();

  $mysqli = Connection::get();

  $query = "UPDATE usuarios " . $param_group->toQueryString() . " WHERE usuarios.id=?";

  $params = $param_group->toParamValArr();
  $params[] = $id;

  $stmt = $mysqli->prepare($query);
  $stmt->bind_param($param_group->toDatatypeString() . "i", ...$params);
  $stmt->execute();

  $stmt->close();

  unset($stmt, $mysqli);

  Connection::close();

}


 ?>
