<?php

  require('../app_constants.php');

  $id_producto = isset($_GET['id_producto']) ? $_GET['id_producto'] : 0;

  file_get_contents(REQUEST_SERVER . "del_producto.php?id_producto=$id_producto&$credentials");

 ?>
