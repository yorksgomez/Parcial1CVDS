<?php

if(!isset($_CONNECT_DB_PHP)) {
	$_CONNECT_DB_PHP = 1;

	//Constantes
	define("DB_HOST", "localhost");
	define("DB_NAME", "grupoc19_elestanco");
	define("DB_USER", "grupoc19_estanco");
	define("DB_PASSWORD", "Qy_h%x1E2,{V");

	//Conecta con la base de datos
	class Connection {

		private static $connection = NULL;

		//Obtiene la conexion, la crea si no existe
		public static function get() {
			global $connection;


			if($connection == NULL) {
				$connection = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);

				if($connection->error)
					throw new Exception("No se ha podido conectar a la base de datos: " . $connection->error);

			}

			return $connection;
		}

		//Cierra la conexion y la define como nula
		public static function close() {
			global $connection;

			if($connection != NULL) {
				$connection->close();

				$connection = NULL;
			}

		}

	}



}

?>
