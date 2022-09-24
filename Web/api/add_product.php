<?php

$exists = false;

require('confirm_admin.php');

if(!$exists)
  exit;

if(!isset($_ADD_PRODUCT_PHP)) {
  $_ADD_PRODUCT_PHP = 1;

  require('connect_db.php');

  $nombre = $_POST['nombre'];
  $descripcion = $_POST['descripcion'];
  $imagen = $_POST['imagen'];
  $categoria = $_POST['categoria'];
  $precio = $_POST['precio'];
  $subcategoria = $_POST['subcategoria'];

  $mysqli = Connection::get();

  $query = "CALL agregarProducto(?, ?, ?, ?, ?, ?)";

  $stmt = $mysqli->prepare($query);
  $stmt->bind_param('ssssis', $nombre, $descripcion, $imagen, $categoria, $precio, $subcategoria);
  $stmt->execute();

  $stmt->close();
  unset($stmt, $mysqli);

  $imagen_data = base64_decode($_POST['imagen_data']);

  $img = new Imagick();

  $img->readimageblob($imagen_data);
  $img->adaptiveResizeImage(300, 350);
  $img->setImageCompressionQuality(83);

  file_put_contents("images/$imagen", $img->getImageBlob());

  Connection::close();
}

?>
