<?php

  require('../app_constants.php');

  $id_usuario = isset($_GET['usuario']) ? $_GET['usuario'] : 0;

  file_get_contents(REQUEST_SERVER . "del_account.php?id_usuario=$id_usuario&$credentials");

 ?>
