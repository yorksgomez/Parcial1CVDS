<?php

  require('../app_constants.php');

  $departments = json_decode(file_get_contents(REQUEST_SERVER . "get_big_cities.php"));

?>
<?php foreach($departments as $department): ?>
  <option value="<?= $department ?>"><?= $department ?></option>
<?php endforeach; ?>
