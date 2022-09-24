<?php
  require('../app_constants.php');

  $usuarios = json_decode(file_get_contents(REQUEST_SERVER . "get_usuarios.php?$credentials"));
?>

<?php  if($usuarios != NULL): ?>
  <?php foreach($usuarios as $usuario): ?>
    <tr class="product_line">
      <td class="hidden_id"><?= $usuario[5] ?></td>
      <td class="text-primary editorjs-editable"editorjs-type="text" editorjs-datasrc="text" editorjs-name="nombre"><span class="content"><?= $usuario[0] ?></span></td>
      <td class="editorjs-editable" editorjs-type="text" editorjs-datasrc="text" editorjs-name="usuario"><span class="content"><?= $usuario[1] ?></span></td>
      <td class="editorjs-editable" editorjs-type="text" editorjs-datasrc="text" editorjs-name="telefono"><span class="content"><?= $usuario[2] ?></span></td>
      <td class="editorjs-editable" ><?= $usuario[3] ?></td>
      <td class="editorjs-editable" ><?= $usuario[4] ?></td>
      <td>
        <a class="change_password_icon button" title="Cambiar contraseña">&#9784;</a>
        <span class="user_delete button" title="Eliminar usuario">&#10006;</span>
      </td>
    </tr>
  <?php endforeach; ?>
<?php endif; ?>
