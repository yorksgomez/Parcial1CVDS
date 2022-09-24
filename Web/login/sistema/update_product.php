<?php

  require('../app_constants.php');

   if(isset($_POST['update'])) {
     $params = array(
       "productos.nombre" => (isset($_POST['nombre']) ? $_POST['nombre'] : ''),
       "productos.descripcion" => (isset($_POST['descripcion']) ? $_POST['descripcion'] : ''),
       "productos.imagen" => (isset($_FILES['imagen']['name']) ? $_FILES['imagen']['name'] : ''),
       "productos.categoria" => (isset($_POST['categoria']) ? $_POST['categoria'] : ''),
       "productos.precio" => (isset($_POST['precio']) ? $_POST['precio'] : ''),
       "productos.subcategoria" => (isset($_POST['subcategoria']) ? $_POST['subcategoria'] : '')
     );

     $params = array_map(function($k, $v) {
       return "$k=$v";
     }, array_keys($params), $params);

     $params = implode(';', $params);

     $id = isset($_POST['id']) ? $_POST['id'] : 0;

     $params = array("params" => $params, "id" => $id);
     if(isset($_FILES['imagen']))
       $params["imagen_data"] = base64_encode(file_get_contents($_FILES['imagen']['tmp_name']));


     $query = array_map(function($k, $v) {
        return "$k=$v";
     }, array_keys($params), $params);

     $query = implode('&', $query);

     $ch = curl_init();

     curl_setopt($ch, CURLOPT_URL, REQUEST_SERVER . "update_product.php?$credentials");
     curl_setopt($ch, CURLOPT_POST, TRUE);
     curl_setopt($ch, CURLOPT_POSTFIELDS, $params);
     curl_setopt($ch, CURLOPT_RETURNTRANSFER, false);

     curl_exec($ch);

     curl_close($ch);

     header('Location: productos.php');
   }

 ?>
