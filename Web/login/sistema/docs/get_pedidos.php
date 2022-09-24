<?php

  require('../app_constants.php');

  $result = json_decode(file_get_contents(REQUEST_SERVER . 'get_pedidos.php'));

  $pedidos = array();

  foreach($result as $r) {
    $id = $r->id_pedido;

    if(!isset($pedidos[$id])) {
      $pedidos[$id] = array();

      $pedidos[$id]['correo'] = $r->correo;
      $pedidos[$id]['direccion'] = $r->direccion;
      $pedidos[$id]['forma_pago'] = $r->forma_pago;
      $pedidos[$id]['telefono'] = $r->telefono;
      $pedidos[$id]['departamento'] = $r->departamento;
      $pedidos[$id]['municipio'] = $r->municipio;
    }

    if(!isset($pedidos[$id]['productos']))
      $pedidos[$id]['productos'] = array();

    $pedidos[$id]['productos'][] = array($r->nombre_producto, $r->cantidad);
  }

  unset($result);
?>

<?php  foreach($pedidos as $k => $pedido): ?>
    <tr class="product_line">
      <td class="text-primary"><?= $pedido['correo'] ?></td>
      <td><?= $pedido['direccion'] ?></td>
      <td><?= $pedido['forma_pago'] ?></td>
      <td><?= $pedido['telefono'] ?></td>
      <td><?= $pedido['departamento'] ?></td>
      <td><?= $pedido['municipio'] ?></td>
      <td><span>&#8659;</span></td>
      <div class="product_list">
        <?php foreach($pedido['productos'] as $producto): ?>
          <p class="product_name"><?= $producto[0] ?></p>
          <p class="product_count"><?= $producto[1] ?></p>
        <?php endforeach; ?>
      </div>
    </tr>
<?php endforeach; ?>
