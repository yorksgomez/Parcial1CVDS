let departSelect = document.getElementById('departSelect');

function actualizarMunicipio() {
  let http = new XMLHttpRequest(),
      uri = encodeURI("departamento=" + departSelect.value);

  http.responseType = "json";

  http.onreadystatechange = function() {

    if(http.readyState === 4) {
      let municipioSelect = document.getElementById('municipioSelect'),
          municipios = http.response;

      for(let i = municipioSelect.options.length - 1; i >= 0; i--)
        municipioSelect.remove(i);

      for (municipio of municipios) {
          let municipioOption = document.createElement("option");
          municipioOption.text = municipio[2];
          municipioOption.value = municipio[0];

          municipioSelect.add(municipioOption);
      }

    }

  };

  http.open("GET", REQUEST_SERVER + "get_small_cities.php?" + uri);
  http.send();
}

departSelect.addEventListener('change', actualizarMunicipio);
actualizarMunicipio();
