<?php
  require('../app_constants.php');

  if($_SESSION['tipo'] == 'admin')
    $id_sede = isset($_GET['id_sede']) ? $_GET['id_sede'] : $_SESSION['id'];
  else
    $id_sede = $_SESSION['id'];

  $productos = json_decode(file_get_contents(REQUEST_SERVER . "get_inventary.php?id_sede=$id_sede&$credentials"));
?>

<?php  if($productos != NULL and !empty($productos)): ?>
  <?php foreach($productos as $producto): ?>
    <tr class="product_line">
      <td class="hidden_id"><?= $producto[0]; ?></td>
      <td><span class="content"><?= $producto[2] ?></span></td>
      <td><span class="content"><?= $producto[1] ?></span></td>
      <td><span class="content"><?= $producto[4] ?></span></td>
      <td><span class="content"><?= $producto[6] ?></span></td>
      <td><span class="content"><?= $producto[5] ?></span></td>
      <td class="editorjs-editable" editorjs-type="text" editorjs-datasrc="text" editorjs-name="cantidad"><span class="content"><?= $producto[7] ?></span></td>
    </tr>
  <?php endforeach; ?>
<?php else: ?>
  <tr>Puede que no haya seleccionado una sucursal en la pestaña cuentas.</tr>
<?php endif; ?>
