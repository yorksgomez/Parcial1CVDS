<?php
  session_start();
  ini_set('display_errors', 1);
  error_reporting(E_ALL);

  if(!isset($_SESSION['user'])) {
    header('Location: https://elestan.co/login/');
    exit;
  }


?>
