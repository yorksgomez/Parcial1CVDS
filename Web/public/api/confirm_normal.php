<?php

$credentials = array("usuario" => $_GET['u32'], "contrasena" => $_GET['c64']);

if(!isset($credentials['usuario']) || !isset($credentials['contrasena']))
  exit;

$login = file_get_contents('login.php?' . http_build_query($credentials));

if($login > 0)
  $exists = true;

?>
