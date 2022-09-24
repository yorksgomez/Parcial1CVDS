<?php

  if(session_status() !== PHP_SESSION_ACTIVE)
    session_start();

  if(!isset($_APP_CONSTANTS_PHP)) {
    $_APP_CONSTANTS_PHP = 1;
    define('REQUEST_SERVER', "https://elestancodelanoche.grupocosechar.com/api/");
  }

  if(isset($_SESSION['user']) && isset($_SESSION['password']))
    $credentials = http_build_query(array("u32"=>$_SESSION['user'], "cpno"=>$_SESSION['password']));

 ?>
