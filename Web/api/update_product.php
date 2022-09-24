<?php

$exists = false;

require('confirm_admin.php');
require('params.php');

if(!$exists)
  exit;

if(!isset($_UPDATE_PRODUCT_PHP)) {
  $_UPDATE_PRODUCT_PHP = 1;

  require('connect_db.php');

  $id = isset($_POST['id']) ? $_POST['id'] : 0;

  $param_group = new ParamGroup($_POST['params'], "set");
  $param_group->addParam(new UpdateParam("productos.nombre"));
  $param_group->addParam(new UpdateParam("productos.descripcion"));
  $param_group->addParam(new UpdateParam("productos.categoria"));
  $param_group->addParam(new UpdateParam("productos.precio"));
  $param_group->addParam(new UpdateParam("productos.imagen"));
  $param_group->addParam(new UpdateParam("productos.subcategoria"));

  $param_group->init();

  $mysqli = Connection::get();

  $query = "UPDATE productos " . $param_group->toQueryString() . " WHERE productos.id=?";

  $params = $param_group->toParamValArr();
  $params[] = $id;

  $stmt = $mysqli->prepare($query);
  $stmt->bind_param($param_group->toDatatypeString() . "i", ...$params);
  $stmt->execute();

  $stmt->close();

  unset($stmt, $mysqli);

  Connection::close();

  if(isset($_POST['imagen_data'])) {

    $imagen_data = base64_decode($_POST['imagen_data']);

    $img = new Imagick();

    $img->readimageblob($imagen_data);
    $img->adaptiveResizeImage(300, 350);
    $img->setImageCompressionQuality(83);

    file_put_contents("images/" . $param_group->getParamByName("productos.imagen")->getValue(), $img->getImageBlob());

  }

}


 ?>
