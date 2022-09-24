
function make_update(url, params, do_next = function() {}, method="post", r = "") {
  let xhttp = new XMLHttpRequest();
  xhttp.responseType = r;

  xhttp.onreadystatechange = function() {

    if(xhttp.readyState == 4 && xhttp.status == 200)
      do_next(xhttp);

  }

  params = Object.keys(params).map(function(key) {
    return key + '=' + encodeURIComponent(params[key]);
  }).join('&');

  xhttp.open(method, url);

  xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

  xhttp.send(params);
}
