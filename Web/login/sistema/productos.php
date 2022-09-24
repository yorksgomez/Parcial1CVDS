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
  <title>Productos - El Estanco</title>
  <!-- Required meta tags -->
  <meta charset="utf-8">
  <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
  <!--     Fonts and icons     -->
  <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Roboto+Slab:400,700|Material+Icons" />
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css">
  <!-- Material Kit CSS -->
  <link href="assets/css/material-dashboard.css?v=2.1.1" rel="stylesheet" />
  <!--Others-->
  <link rel="stylesheet" href="styles/index.css">
  <link rel="stylesheet" href="styles/inline_products.css">
</head>

<body>
  <div class="wrapper ">
    <div class="sidebar" data-color="azure" data-background-color="white">
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
          $active_index = 4;
          require('menu_general.php');
        ?>
      </div>
    </div>
    <div class="main-panel">
      <!-- Navbar -->
      <nav class="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top ">
        <div class="container-fluid">
          <div class="navbar-wrapper">
            <a class="navbar-brand" href="#pablo">Productos</a>
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
                  <h4 class="card-title">AGREGAR PRODUCTO</h4>
                  <p class="card-category">complete el formulario</p>
                </div>
                <div class="card-body">
                  <form method="post" enctype="multipart/form-data" action="<?= $_SERVER['PHP_SELF'] ?>">
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group">
                          <label class="bmd-label-floating">Nombre</label>
                          <input type="text" class="form-control" name="nombre">
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <label class="bmd-label-floating">Descripcion</label>
                          <input type="text" class="form-control" name="descripcion">
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-12">
                        <div class="form-group form-file-upload form-file-multiple">
                          <label class="bmd-label-floating">Imagen</label>
                          <input type="file" multiple="" name="imagen" class="inputFileHidden">
                          <div class="input-group">
                              <input type="text" class="form-control inputFileVisible" placeholder="">
                              <span class="input-group-btn">
                                  <button type="button" class="btn btn-fab btn-round btn-primary">
                                      <i class="material-icons">attach_file</i>
                                  </button>
                              </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-4">
                        <div class="form-group">
                          <label class="bmd-label-floating">Categoria</label>
                          <select class="form-control" name="categoria">
                            <option value="bebidas">Bebidas</option>
                            <option value="preservativos">Preservativos</option>
                            <option value="pasabocas">Pasabocas</option>
                            <option value="combos">Combos</option>
                            <option value="cigarrillos">Cigarrillos</option>
                          </select>
                        </div>
                      </div>
                      <div class="col-md-4">
                        <div class="form-group">
                          <label class="bmd-label-floating">Subcategoria</label>
                          <input type="text" class="form-control" name="subcategoria">
                        </div>
                      </div>
                      <div class="col-md-4">
                        <div class="form-group">
                          <label class="bmd-label-floating">Precio</label>
                          <input type="number" class="form-control" name="precio">
                        </div>
                      </div>
                    </div>
                    <button type="submit" class="btn btn-primary pull-right" id="crear_producto">Agregar Producto</button>
                    <div class="clearfix"></div>
                    <?php include('add_product.php'); ?>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <div class="card">
                <div class="card-header card-header-primary">
                  <h4 class="card-title ">Productos</h4>
                  <p class="card-category"> </p>
                </div>
                <div class="card-body">
                  <div class="table-responsive">
                    <table class="table" id="editable-form">
                      <thead class=" text-primary">
                        <tr>
                          <th>Nombre</th>
                          <th>Descripción</th>
                          <th>Categoría</th>
                          <th>Subcategoria</th>
                          <th>Precio</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        <?php include('get_products.php'); ?>
                      </tbody>
                    </table>
                    <form style="display:none;" method="post" action="update_product.php" enctype="multipart/form-data">
                      <input type="hidden" value="0" name="id" class="id">
                      <input type="hidden" value="1" name="update">
                      <input type="file" id="image_upload" class="image_upload" name="imagen">
                      <input type="submit" name="update" value="1" class="sub">
                    </form>
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
  <script src="scripts/products.js" charset="utf-8"></script>
  <script src="scripts/editor.js" charset="utf-8"></script>
  <script src="scripts/make_update.js" charset="utf-8"></script>
  <script>

    function whatDoNext(event, data) {
      make_update("update_product.php", {[data.name]: data.content, id: data.id, update: 1});
    }

    editorjsInit(whatDoNext, document.getElementById('editable-form'));

    let image_upload = document.getElementById('image_upload'),
        data = null;

    function uploadImage(event) {
      let form = event.srcElement.closest('form'),
          id = form.getElementsByClassName('id')[0];

          console.log(id);
          id.value = data.id;
          form.getElementsByClassName('sub')[0].click();

          alert("Espere a que se suba la imagen para ser redirigido");
    }

    function uploadClicked(event) {
      data = retrieveEditorData(event.srcElement.closest('.product_line'));
      image_upload.click();
    }

    image_upload.addEventListener('change', uploadImage)

    Array.from(document.getElementsByClassName('product_image')).forEach((p) => p.addEventListener('click', uploadClicked));

  </script>
</body>
</html>
