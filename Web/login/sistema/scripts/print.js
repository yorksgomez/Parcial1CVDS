function prt(xhttp) {
    let pdfWindow = window.open("");
    pdfWindow.document.write(
        "<iframe width='100%' height='100%' src='data:application/pdf;base64, " +
        encodeURI(xhttp.response) + "'></iframe>"
    );
}

let product_print = document.getElementsByClassName('product_print');

for(let print of product_print) {

    print.addEventListener('click', function(e) {
        let line = e.target.closest('.product_line'),
            datas = line.getElementsByTagName('td'),
            products = line.getElementsByClassName('product_print')[0].getAttribute('p-data'), params;
    
        params = {
            email: datas[1].innerText,
            direccion: datas[2].innerText,
            forma_pago: datas[3].innerText,
            telefono: datas[4].innerText,
            total: datas[7].innerText,
            productos: products
        };
    
        console.log(params);
        make_update("imprimir_factura.php", params, prt, 'post', '');
    });
    
}
