<?php

  require('../app_constants.php');

  if(isset($_POST['update'])) {
    $params = array(
      "usuarios.nombre" => (isset($_POST['nombre']) ? $_POST['nombre'] : ''),
      "usuarios.usuario" => (isset($_POST['correo']) ? $_POST['correo'] : ''),
      "usuarios.telefono" => (isset($_POST['telefono']) ? $_POST['telefono'] : ''),
      "usuarios.contrasena" => (isset($_POST['contrasena']) ? hash('sha256', $_POST['contrasena']) : '')
    );

    $id = isset($_POST['id']) ? $_POST['id'] : 0;
    $params = array_map(function($k, $v) {
        return "$k=$v";
    }, array_keys($params), $params);

    $params = implode(';', $params);

    $params = http_build_query(array("params"=>$params, "id"=>$id));

    file_get_contents(REQUEST_SERVER . "update_account.php?$params&$credentials");

  }

 ?>
