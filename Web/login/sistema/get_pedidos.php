<?php

  require('../app_constants.php');

  $ciudad = "";
  if($_SESSION['tipo'] == 'sucursal')
    $ciudad = "params=ciudades.id=" . $_SESSION['id_ciudad'] . "&";

  $result = json_decode(file_get_contents(REQUEST_SERVER . 'get_pedidos.php?' . $ciudad . $credentials));

  $pedidos = array();

  foreach($result as $r) {
    $id = $r->id_pedido;

    if(!isset($pedidos[$id])) {
      $pedidos[$id] = array();

      $pedidos[$id]['id_pedido'] = $r->id_pedido;
      $pedidos[$id]['correo'] = $r->correo;
      $pedidos[$id]['direccion'] = $r->direccion;
      $pedidos[$id]['forma_pago'] = $r->forma_pago;
      $pedidos[$id]['telefono'] = $r->telefono;
      $pedidos[$id]['departamento'] = $r->departamento;
      $pedidos[$id]['municipio'] = $r->municipio;
    }

    if(!isset($pedidos[$id]['productos']))
      $pedidos[$id]['productos'] = array();

    if(!isset($pedidos[$id]['total']))
      $pedidos[$id]['total'] = 0;

    $pedidos[$id]['productos'][] = array($r->nombre_producto, $r->cantidad, REQUEST_SERVER . 'images/' . $r->imagen, $r->descripcion);
    $pedidos[$id]['p-data'][] = array($r->nombre_producto, $r->cantidad, $r->precio);
    $pedidos[$id]['total'] += $r->cantidad * $r->precio;
  }

  unset($result);
?>

<?php  foreach($pedidos as $k => $pedido): ?>
    <tr class="product_line">
      <td class="hidden_id"><?= $pedido['id_pedido'] ?></td>
      <td class="text-primary"><?= $pedido['correo'] ?></td>
      <td><?= $pedido['direccion'] ?></td>
      <td><?= $pedido['forma_pago'] ?></td>
      <td><?= $pedido['telefono'] ?></td>
      <td><?= $pedido['departamento'] ?></td>
      <td><?= $pedido['municipio'] ?></td>
      <td class="text-primary"><?= $pedido['total'] ?> </td>
      <td>
          <span class="product_button button">&#8659;</span>
          <span class="product_delete button">&#10006;</span>
          <span class="product_print button" p-data="<?= htmlentities(json_encode($pedido['p-data'])) ?>">&#9113;</span>
          <div class="product_list">
            <div class="close_button">X</div>
            <?php foreach($pedido['productos'] as $producto): ?>
              <div class="product">
                <p class="product_name"><?= $producto[0] ?></p>
                <img class="product_image" src="<?= $producto[2] ?>"/>
                <p class="product_description"><?= $producto[3] ?></p>
                <p class="product_count"><?= $producto[1] ?></p>
              </div>
            <?php endforeach; ?>
        </div>
      </td>
    </tr>
<?php endforeach; ?>
