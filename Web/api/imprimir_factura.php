<?php
$exists = false;

require('confirm_admin.php');
require('confirm_sucursal.php');

if(!$exists)
  exit;

if(!isset($_IMPRIMIR_FACTURA)) {
  $_IMPRIMIR_FACTURA = 1;
  require('fpdf182/fpdf.php');
  
  function convertir($str) {
      return iconv('UTF-8', 'windows-1252', $str);
  }
  
  $_H = 5;
  
  $direccion = $_GET['direccion'];
  $email = $_GET['email'];
  $forma_pago = $_GET['forma_pago'];
  $telefono = $_GET['telefono'];
  $productos = json_decode($_GET['productos']);
  $total = $_GET['total'];
  
  $pdf = new FPDF('P', 'mm', [80, 85 + 7 * count($productos)]);
  $pdf->SetAutoPageBreak(false);
  $pdf->AddPage();
  $pdf->SetFont("Arial", "", 7);
  $pdf->Image("logo.png", 30, null, 20);
  $pdf->Cell(50, $_H, "", 0, 1);
  $pdf->Cell(50, $_H, convertir($direccion), 0, 1);
  $pdf->Cell(50, $_H, convertir($email), 0, 1);
  $pdf->Cell(50, $_H, convertir($forma_pago), 0, 1);
  $pdf->Cell(50, $_H, convertir($telefono), 0, 1);
  $pdf->Cell(50, $_H, convertir("Productos pedidos"), 0, 1);
  
  foreach($productos as $producto)
    $pdf->Cell(500, $_H, convertir(" $producto[0]: \$$producto[2] --- $producto[1]"), 0, 1);      
  
  $pdf->SetFont("Arial", "B", 7);
  $pdf->Cell(50, $_H, convertir("TOTAL: $" . $total), 0, 1);
  $pdf->SetFont("Arial", "", 7);
  $pdf->Cell(50, $_H, "", 0, 1);
  $pdf->Cell(50, $_H, "", 0, 1);
  $pdf->Cell(50, $_H, "", 0, 1);
  $pdf->Cell(50, $_H, "", 0, 1);
  $pdf->Cell(50, $_H, "", 0, 1);
  $pdf->Cell(50, $_H, convertir("www.elestan.co - +57 315 640 2549"), 0, 1);
  $pdf->Output();
}

 ?>
