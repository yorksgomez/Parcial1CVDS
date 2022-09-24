<?php

  require('../app_constants.php');

  $id_pedido = isset($_GET['id_pedido']) ? $_GET['id_pedido'] : 0;

  file_get_contents(REQUEST_SERVER . "del_pedido.php?id_pedido=$id_pedido&$credentials");

 ?>
