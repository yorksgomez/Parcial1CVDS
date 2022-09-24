<?php
$exists = false;

require('confirm_normal.php');

if(!$exists)
  exit;

if(!isset($_FACTURA)) {
  $_FACTURA = 1;

  $email = $_GET['email'];
  $direccion = $_GET['direccion'];
  $forma_pago = $_GET['forma_pago'];
  $productos = json_decode($_GET['productos']);

  $mensaje = '
    <html>
    <head><meta charset="gb18030">
      
      <title>Factura de pedido</title>
    </head>
    <body style="width: 100%; height: 100%;">
      <img src="https://elestan.co/img/logo.png" style="width:300px; display: block; margin: 20px auto;"/>
      <p style="margin: auto; text-align: center;">Saludos usuario, hemos recibido un pedido por su parte a la dirección ' . $direccion . ', usando como medio de pago su ' . $forma_pago . ', lista los siguientes productos:</p>
      <table>
  ';

  foreach($productos as $producto) {
    $mensaje .= "<tr>";
    $mensaje .= "<td>" . $producto[0] . "</td>";
    $mensaje .= "<td>" . $producto[1] . "</td>";
    $mensaje .= "</tr>";
  }
  
  $mensaje .= '
    </table>
    <p style="margin: auto; text-align: center;">Este correo sólo es de caracter informativo y no debe responderse. Agradecemos su compra, llegará lo más pronto posible a su domicilio</p>
    </body>
    </html>
  ';

  $de = "estanco@grupocosechar.com";

  $cabeceras  = 'MIME-Version: 1.0' . "\r\n";
  $cabeceras .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";

  // Cabeceras adicionales
  $cabeceras .= "From: $de\r\n";
  $titulo = "Factura El Estanco";
  
  mail($email, $titulo, $mensaje, $cabeceras);
  
}

?>