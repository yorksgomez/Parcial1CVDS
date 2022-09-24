<?php
  require('../app_constants.php');

  $sucursales = json_decode(file_get_contents(REQUEST_SERVER . "get_sucursales.php?$credentials"));
?>

<?php  if($sucursales != NULL): ?>
  <?php foreach($sucursales as $sucursal): ?>
    <tr class="product_line">
      <td class="hidden_id"><?= $sucursal[5] ?></td>
      <td class="text-primary editorjs-editable" editorjs-type="text" editorjs-datasrc="text" editorjs-name="nombre"><span class="content"><?= $sucursal[0] ?></span></td>
      <td class="editorjs-editable" editorjs-type="text" editorjs-datasrc="text" editorjs-name="correo"><span class="content"><?= $sucursal[1] ?></span></td>
      <td class="editorjs-editable" editorjs-type="text" editorjs-datasrc="text" editorjs-name="telefono"><span class="content"><?= $sucursal[2] ?></span></td>
      <td><?= $sucursal[3] ?></td>
      <td><?= $sucursal[4] ?></td>
      <td style="max-width:150px; width:150px; ">
        <a class="change_password_icon button" title="Cambiar contraseña">&#9784;</a>
        <a class="button" href="inventario.php?id_sede=<?= $sucursal[5] ?>" title="Abrir inventario">&#9783;</a>
        <a class="product_delete button" title="Eliminar usuario"><span class="user_delete button">&#10006;</span></a>
      </td>
    </tr>
  <?php endforeach; ?>
<?php endif; ?>
