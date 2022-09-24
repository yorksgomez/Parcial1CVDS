<?php

$exists = false;

require('confirm_normal.php');

if(!$exists)
  exit;

if(!isset($_ADD_PEDIDOS_PHP)) {
  $_ADD_PEDIDOS_PHP = 1;

  require('connect_db.php');

  $id_usuario = $_GET['id_usuario'];
  $direccion = $_GET['direccion'];
  $forma_pago = $_GET['forma_pago'];
  $productos = json_decode($_GET['productos']);

  $mysqli = Connection::get();

  $query = "CALL agregarPedido(?, ?, ?)";

  $stmt = $mysqli->prepare($query);
  $stmt->bind_param('iss', $id_usuario, $direccion, $forma_pago);
  $stmt->execute();

  $id_pedido = $stmt->get_result()->fetch_row()[0];

  $stmt->close();
  unset($stmt);

  echo $id_pedido;

  $query = "INSERT INTO productos_pedidos(id_pedido, id_producto, cantidad) VALUES ";
  $parametros = array();
  $tipos = "";

  foreach($productos as $producto) {
    $query .= "(?, ?, ?), ";

    $tipos .= "iii";

    $parametros[] = $id_pedido;
    $parametros[] = $producto[0];
    $parametros[] = $producto[1];
  }

  $query = trim($query, ', ');

  $stmt = $mysqli->prepare($query);

  $stmt->bind_param($tipos, ...$parametros);
  $stmt->execute();

  $stmt->close();
  unset($stmt, $mysqli);

  Connection::close();
}

?>
