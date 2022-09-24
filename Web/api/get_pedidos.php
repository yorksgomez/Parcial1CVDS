<?php

$exists = false;

require('confirm_sucursal.php');
require('confirm_admin.php');

if(!$exists)
  exit;

if(!isset($_GET_PEDIDOS_PHP)) {
  $_GET_PEDIDOS_PHP = 1;

  require('params.php');
  require('connect_db.php');

  $ciudad = isset($_GET['params']) ? $_GET['params'] : '';

  $param_gp = new ParamGroup($ciudad);

  $param_gp->addParam(new Param("ciudades.id"));

  $param_gp->init();

  $mysqli = Connection::get();

  $query = "SELECT pedidos.id as id_pedido, usuarios.id as id_usuario, pedidos.direccion as direccion, pedidos.forma_pago as forma_pago,usuarios.usuario as correo, usuarios.nombre as nombre_usuario, usuarios.telefono as telefono,
            ciudades.id as id_ciudad, ciudades.departamento as departamento, ciudades.municipio as municipio, productos.id as id_producto, productos.nombre as nombre_producto, productos.imagen as imagen, productos.descripcion as descripcion, productos.precio as precio, productos_pedidos.cantidad as cantidad FROM pedidos
            LEFT JOIN usuarios ON pedidos.id_usuario=usuarios.id
            LEFT JOIN ciudades ON usuarios.id_ciudad=ciudades.id
            LEFT JOIN productos_pedidos ON productos_pedidos.id_pedido=pedidos.id
            LEFT JOIN productos ON productos_pedidos.id_producto=productos.id " . $param_gp->toQueryString();

  $stmt = $mysqli->prepare($query);
  echo $stmt->error;
  echo $mysqli->error;
  $stmt->bind_param($param_gp->toDatatypeString(), ...$param_gp->toParamValArr());
  $stmt->execute();

  $result = json_encode($stmt->get_result()->fetch_all(MYSQLI_ASSOC));

  echo $result;

}

 ?>
