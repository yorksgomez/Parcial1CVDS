<?php
  require('app_constants.php');

  $usuario = $_POST['usuario'];
  $contrasena = hash('sha256', $_POST['contrasena']);

  $params = http_build_query(array("usuario" => $usuario, "contrasena" => $contrasena, "tipo" => "admin"));

  $result = file_get_contents(REQUEST_SERVER . "login.php?" . $params);

  if(((int)$result) > 0) {
    session_start();
    $_SESSION['user'] = $usuario;
    $_SESSION['password'] = $contrasena;
    $_SESSION['tipo'] = 'admin';
    header('Location: sistema/');
  } else {

    $params = http_build_query(array("usuario" => $usuario, "contrasena" => $contrasena, "tipo" => "sucursal"));
    $result = file_get_contents(REQUEST_SERVER . "login.php?" . $params);

    if(((int)$result) > 0) {
      session_start();
      $_SESSION['user'] = $usuario;
      $_SESSION['password'] = $contrasena;
      $_SESSION['tipo'] = 'sucursal';
      header('Location: sistema/');
    }

    header('Location: index.php');
  }

?>
