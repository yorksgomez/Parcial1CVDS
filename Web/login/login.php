<?php
  require('app_constants.php');

  $usuario = $_POST['usuario'];
  $contrasena = hash('sha256', $_POST['contrasena']);
  
  $params = http_build_query(array("usuario" => $usuario, "contrasena" => $contrasena, "tipo" => "admin"));

  $result = file_get_contents(REQUEST_SERVER . "login.php?" . $params);

  if($result > 0) {
    session_start();
    $_SESSION['user'] = $usuario;
    $_SESSION['password'] = $contrasena;
    $_SESSION['tipo'] = 'admin';
    $_SESSION['id'] = $result;
    header('Location: sistema/');
  } else {

    $params = http_build_query(array("usuario" => $usuario, "contrasena" => $contrasena, "tipo" => "sucursal"));

    $result = file_get_contents(REQUEST_SERVER . "login.php?" . $params);

    if($result > 0) {
      session_start();

      require('app_constants.php');

      $id_ciudad = file_get_contents(REQUEST_SERVER . "get_user_city.php?user_id=$result&$credentials");

      $_SESSION['user'] = $usuario;
      $_SESSION['password'] = $contrasena;
      $_SESSION['tipo'] = 'sucursal';
      $_SESSION['id_ciudad'] = $id_ciudad;
      $_SESSION['id'] = $result;

      header('Location: sistema/');
    } else {
      header('Location: index.php');
    }

  }
?>
