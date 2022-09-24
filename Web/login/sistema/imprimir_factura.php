<?php
    require('../app_constants.php');
    
    $params = array(
        "email" => $_POST['email'],
        "direccion" => $_POST['direccion'],
        "forma_pago" => $_POST['forma_pago'],
        "telefono" => $_POST['telefono'],
        "total" => $_POST['total'],
        "productos" => $_POST['productos']
    );
    
    $params = http_build_query($params);
    
    $result = file_get_contents(REQUEST_SERVER . 'imprimir_factura.php?' . $params . "&" . $credentials);
    echo base64_encode($result);
?>