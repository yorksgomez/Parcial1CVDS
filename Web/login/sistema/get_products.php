<?php
  require('../app_constants.php');

  $productos = json_decode(file_get_contents(REQUEST_SERVER . "get_products.php?params=categoria=&$credentials"));
?>

<?php  if($productos != NULL): ?>
  <?php foreach($productos as $producto): ?>
    <tr class="product_line">
      <td class="hidden_id"><?= $producto[0]; ?></td>
      <td class="text-primary editorjs-editable" editorjs-type="text" editorjs-datasrc="text" editorjs-name="nombre"><span class="content"><?= $producto[1] ?></span></td>
      <td class="editorjs-editable" editorjs-type="text" editorjs-datasrc="text" editorjs-name="descripcion"><span class="content"><?= $producto[2] ?></span></td>
      <td class="editorjs-editable" editorjs-type="text" editorjs-datasrc="text" editorjs-name="categoria"><span class="content"><?= $producto[4] ?></span></td>
      <td class="editorjs-editable" editorjs-type="text" editorjs-datasrc="text" editorjs-name="subcategoria"><span class="content"><?= $producto[6] ?></span></td>
      <td class="editorjs-editable" editorjs-type="text" editorjs-datasrc="text" editorjs-name="precio"><span class="content"><?= $producto[5] ?></span></td>
      <td>
        <span class="product_image button" title="Cambiar imagen">&#10016;</span>
        <span class="product_delete button" title="Eliminar producto">&#10006;</span>
      </td>
    </tr>
  <?php endforeach; ?>
<?php endif; ?>
