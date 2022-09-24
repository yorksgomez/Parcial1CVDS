<?php
  require('../app_constants.php');

  if(isset($_POST['update'])) {
    $params = array(
      "inventario.cantidad" => (isset($_POST['cantidad']) ? $_POST['cantidad'] : '')
    );

    $id = isset($_POST['id']) ? $_POST['id'] : 0;
    $id_sede = isset($_POST['id_sede']) ? $_POST['id_sede'] : 0;
    $params = array_map(function($k, $v) {
        return "$k=$v";
    }, array_keys($params), $params);

    $params = implode(';', $params);

    $params = http_build_query(array("params"=>$params, "id_sede"=>$id_sede, "id_producto"=>$id));

    file_get_contents(REQUEST_SERVER . "update_inventary.php?$params&$credentials");

  }

 ?>
