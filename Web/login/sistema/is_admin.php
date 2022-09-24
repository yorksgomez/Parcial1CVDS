<?php

  if($_SESSION['tipo'] !== 'admin') {
    header('Location: index.php');
    exit;
  }

 ?>
