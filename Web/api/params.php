<?php

if(!isset($_PARAMS_PHP)) {
  $_PARAMS_PHP = 1;

  //ParamGroup class
  class ParamGroup {
    //Variables
    private $param_list, $param_encoded_list, $type;

    //Constructor
    public function __construct($encoded, $type = "where") {
      $this->param_list = array();
      $this->param_encoded_list = array();
      $this->type = $type;

      $list = explode(';', $encoded);

      foreach($list as $l)
        $this->param_encoded_list[] = explode('=', $l);

    }

    //Methods
    public function init() {

      foreach($this->param_list as $param) {
        $key = $param->getKey();

        foreach($this->param_encoded_list as $encoded_param) {

          if($encoded_param[0] == $key) {
            $param->setValue($encoded_param[1]);
            break;
          }

        }

      }

    }

    public function addParam($param) {
      $this->param_list[] = $param;
    }

    public function getParamByName($name) {

      foreach($this->param_list as $param)

        if($param->getKey() == $name)
          return $param;

    }

    public function toQueryString() {
      $query_string = "";
      $param_list_len = count($this->param_list);

      if($param_list_len > 0) {

        $query_string = $concat = "";

        switch($this->type) {
          case 'where':
            $concat = " AND ";
            $query_string = "WHERE ";
            break;
          case 'set':
            $concat = ", ";
            $query_string = "SET ";
        }

        for($i = 0; $i < $param_list_len; $i++) {
          $query_string .= $this->param_list[$i]->toQueryString();

          if($i + 1 < $param_list_len)
            $query_string .= $concat;

        }

      }

      return $query_string;
    }

    public function toDatatypeString(){
      $dts = "";

      foreach($this->param_list as $param)
        $dts .= $param->toDatatypeString();

      return $dts;
    }

    public function toParamValArr() {
      $param_val_arr = array();

      foreach($this->param_list as $param)
        $param_val_arr[] = $param->getValue();

      return $param_val_arr;
    }

  }

  //Param class
  class Param {
    //Variables
    protected $key, $value;

    //Constructor
    public function __construct($key) {
      $this->key = $key;
      $this->value = "";
    }

    //Methods
    public function toQueryString() {
      return "($this->key=? OR 1=" . ($this->value == "" ? '1' : '0') . ")";
    }

    public function toDatatypeString() {

      switch(gettype($this->value)) {
        case 'string':
          return 's';
        case 'integer':
          return 'i';
      }

    }

    //Getters and setters
    public function getKey() {
      return $this->key;
    }

    public function setKey($key) {
      $this->key = $key;
    }

    public function getValue() {
      return $this->value;
    }

    public function setValue($value) {
      $this->value = $value;
    }

  }

  class UpdateParam extends Param {

    public function toQueryString() {
      $is_something = $this->value != "" ? "TRUE" : "FALSE";

      return "$this->key=IF($is_something, ?, $this->key)";
    }

  }

}

?>
