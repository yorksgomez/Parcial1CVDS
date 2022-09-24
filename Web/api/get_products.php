<?php

$exists = false;

require('confirm_normal.php');
require('confirm_admin.php');

if(!$exists)
  exit;

if(!isset($_GET_PRODUCTS_PHP)) {
	$_GET_PRODUCTS_PHP = 1;

	require('params.php');
	require('connect_db.php');

	$params = isset($_GET['params']) ? $_GET['params'] : "";

	$mysqli = Connection::get();
	$param_gp = new ParamGroup($params);

	$param_gp->addParam(new Param("categoria"));
  	$param_gp->addParam(new Param("subcategoria"));
  
  	$sub = $param_gp->getParamByName("subcategoria");
  
	$param_gp->init();
	
	if($sub->getValue() == 'ver todos')
  		$sub->setValue("");

	$query = "SELECT * FROM productos " . $param_gp->toQueryString();

	$stmt = $mysqli->prepare($query);

	$stmt->bind_param($param_gp->toDatatypeString(), ...$param_gp->toParamValArr());

	$stmt->execute();

	$result = $stmt->get_result();

	echo json_encode($result->fetch_all(MYSQLI_NUM));

	$stmt->close();
	unset($mysqli);
	Connection::close();

}

?>
