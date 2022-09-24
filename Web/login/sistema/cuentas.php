<?php require('is_log.php'); ?>
<?php require('is_admin.php'); ?>
<!--
=========================================================
 Material Dashboard - v2.1.1
=========================================================

 Product Page: https://www.creative-tim.com/product/material-dashboard
 Copyright 2019 Creative Tim (https://www.creative-tim.com)
 Licensed under MIT (https://github.com/creativetimofficial/material-dashboard/blob/master/LICENSE.md)

 Coded by Creative Tim

=========================================================

 The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. -->
<!doctype html>
<html lang="en">

<head>
  <title>Cuentas - El Estanco</title>
  <!-- Required meta tags -->
  <meta charset="utf-8">
  <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
  <!--     Fonts and icons     -->
  <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Roboto+Slab:400,700|Material+Icons" />
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css">
  <!-- Material Kit CSS -->
  <link href="assets/css/material-dashboard.css?v=2.1.1" rel="stylesheet" />
  <!-- Others -->
  <link rel="stylesheet" href="styles/index.css">
</head>

<body>
  <div class="wrapper ">
    <div class="sidebar" data-color="green" data-background-color="white">
      <!--
      Tip 1: You can change the color of the sidebar using: data-color="purple | azure | green | orange | danger"

      Tip 2: you can also add an image using data-image tag
  -->
      <div class="logo">
        <a href="index.php" class="simple-text logo-mini">
          El Estanco de la Noche
        </a>
        <a href="#" class="simple-text logo-normal">
          <?php echo $_SESSION['user']; ?>
        </a>
      </div>
      <div class="sidebar-wrapper">
        <?php
          $active_index = 2;
          require('menu_general.php');
        ?>
      </div>
    </div>
    <div class="main-panel">
      <!-- Navbar -->
      <nav class="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top ">
        <div class="container-fluid">
          <div class="navbar-wrapper">
            <a class="navbar-brand" href="#pablo">Cuentas</a>
          </div>
          <button class="navbar-toggler" type="button" data-toggle="collapse" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
            <span class="sr-only">Toggle navigation</span>
            <span class="navbar-toggler-icon icon-bar"></span>
            <span class="navbar-toggler-icon icon-bar"></span>
            <span class="navbar-toggler-icon icon-bar"></span>
          </button>
          <div class="collapse navbar-collapse justify-content-end">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link" href="logout.php">
                  <i class="material-icons">notifications</i> Cerrar sesión
                </a>
              </li>
              <!-- your navbar here -->
            </ul>
          </div>
        </div>
      </nav>
      <!-- End Navbar -->
      <div class="content">
        <div class="container-fluid">
          <div class="row">
            <div class="col-12">
              <div class="card" id="agregar_sucursal">
                <div class="card-header card-header-primary">
                  <h4 class="card-title">AGREGAR SUCURSAL</h4>
                  <p class="card-category">complete el formulario</p>
                </div>
                <div class="card-body">
                  <form>
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group">
                          <label class="bmd-label-floating">Nombre sucursal</label>
                          <input type="text" class="form-control" name="nombre">
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <label class="bmd-label-floating">Correo</label>
                          <input type="email" class="form-control" name="correo">
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group">
                          <label class="bmd-label-floating">Número de celular</label>
                          <input type="tel" class="form-control" name="telefono">
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <label class="bmd-label-floating">Fecha de inicio</label>
                          <input type="date" class="form-control" name="inicio">
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-4">
                        <div class="form-group">
                          <label class="bmd-label-floating">Departamento</label>
                          <select class="form-control" id="departSelect" name="departamento">
                            <?php include('get_departamentos.php'); ?>
                          </select>
                        </div>
                      </div>
                      <div class="col-md-4">
                        <div class="form-group">
                          <label class="bmd-label-floating">Municipio</label>
                          <select class="form-control" name="municipio" id="municipioSelect">
                          </select>
                        </div>
                      </div>
                      <div class="col-md-4">
                        <div class="form-group">
                          <label class="bmd-label-floating">Contraseña</label>
                          <input type="password" class="form-control" name="contrasena">
                        </div>
                      </div>
                    </div>
                    <button type="submit" class="btn btn-primary pull-right" id="crear_sucursal">Crear Cuenta</button>
                    <div class="clearfix"></div>
                    <?php include('add_sucursal.php'); ?>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <div class="card">
                <div class="card-header card-header-primary">
                  <h4 class="card-title ">Sucursales</h4>
                  <p class="card-category"> </p>
                </div>
                <div class="card-body">
                  <div class="table-responsive">
                    <table class="table" id="editable-form1">
                      <thead class=" text-primary">
                        <tr>
                          <th>Nombre</th>
                          <th>Correo</th>
                          <th>Telefono</th>
                          <th>Departamento</th>
                          <th>Municipio</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        <?php include('get_sucursales.php'); ?>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <div class="card">
                <div class="card-header card-header-primary">
                  <h4 class="card-title ">Usuarios</h4>
                  <p class="card-category"> </p>
                </div>
                <div class="card-body">
                  <div class="table-responsive">
                    <table class="table" id="editable-form2">
                      <thead class="text-primary">
                        <tr>
                          <th>Nombre</th>
                          <th>Correo</th>
                          <th>Telefono</th>
                          <th>Departamento</th>
                          <th>Municipio</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        <?php include('get_usuarios.php'); ?>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- your content here -->
        </div>
      </div>
      <footer class="footer">
        <div class="container-fluid">
          <nav class="float-left">
            <ul>
              <li>
                <a href="https://www.creative-tim.com">
                  Creative Tim
                </a>
              </li>
            </ul>
          </nav>
          <div class="copyright float-right">
            &copy;
            <script>
              document.write(new Date().getFullYear())
            </script>, made with <i class="material-icons">favorite</i> by
            <a href="https://www.creative-tim.com" target="_blank">Creative Tim</a> for a better web.
          </div>
          <!-- your footer here -->
        </div>
      </footer>
    </div>
  </div>
  <script src="scripts/constants.js" charset="utf-8"></script>
  <script src="scripts/municipios.js" charset="utf-8"></script>
  <script src="scripts/editor.js" charset="utf-8"></script>
  <script src="scripts/make_update.js" charset="utf-8"></script>
  <script src="scripts/user.js" charset="utf-8"></script>
  <script>

    function whatDoNext(event, data) {
      make_update("update_account.php", {[data.name]: data.content, id: data.id, update: 1});
    }

    function changePassword(event) {
      let id = event.srcElement.closest('.product_line').getElementsByClassName('hidden_id')[0].innerText,
          contrasena = prompt("Introduzca la nueva contrasena:");

      if(contrasena != null)
        make_update("update_account.php", {contrasena: contrasena, id: id, update: 1});

    }

    Array.from(document.getElementsByClassName('change_password_icon')).forEach((ch_button) => ch_button.addEventListener('click', changePassword));
    Array.from(document.getElementsByClassName('user_delete')).forEach((del_button) => del_button.addEventListener('click', deleteUser));

    editorjsInit(whatDoNext, document.getElementById('editable-form1'));
    editorjsInit(whatDoNext, document.getElementById('editable-form2'));

  </script>
</body>
</html>
