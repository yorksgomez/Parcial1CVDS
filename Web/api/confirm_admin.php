<?php

require('app_constants.php');

$credentials = array("usuario" => $_GET['u32'], "contrasena" => $_GET['cpno'], "tipo" => "admin");

if(!isset($credentials['usuario']) || !isset($credentials['contrasena']))
  exit;

$login = file_get_contents(REQUEST_SERVER . 'login.php?' . http_build_query($credentials));

if($login > 0)
  $exists = true;

?>
