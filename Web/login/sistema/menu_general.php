<?php
  function navActiveIndex($i) {
    global $active_index;

    if($i == $active_index)
      echo "active";

  }

 ?>
<ul class="nav">
  <li class="nav-item <?php navActiveIndex(1); ?>">
    <a class="nav-link" href="./index.php">
      <i class="material-icons">dashboard</i>
      <p>Inicio</p>
    </a>
  </li>
<?php if($_SESSION['tipo'] == 'admin'):  ?>
  <li class="nav-item <?php navActiveIndex(2); ?>">
    <a class="nav-link" href="./cuentas.php">
      <i class="material-icons">person</i>
      <p>Cuentas</p>
    </a>
  </li>
<?php endif; ?>
  <li class="nav-item <?php navActiveIndex(3); ?>">
    <a class="nav-link" href="./pedidos.php">
      <i class="material-icons">content_paste</i>
      <p>Pedidos</p>
    </a>
  </li>
  <?php if($_SESSION['tipo'] == 'admin'):  ?>
    <li class="nav-item <?php navActiveIndex(4); ?>">
      <a class="nav-link" href="./productos.php">
        <i class="material-icons">bubble_chart</i>
        <p>Productos</p>
      </a>
    </li>
  <?php endif; ?>
  <li class="nav-item <?php navActiveIndex(5); ?>">
    <a class="nav-link" href="./inventario.php">
      <i class="material-icons">unarchive</i>
      <p>Inventario</p>
    </a>
  </li>
</ul>
