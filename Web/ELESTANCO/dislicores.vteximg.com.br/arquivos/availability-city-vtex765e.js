/*
	CLASSES EN HTML

	AvailabilityCitiyVtex_popup_select_city -> Para el pop up que va a contener el selector de ciudad.
	AvailabilityCitiyVtex_select_city_popup -> Para el select de las ciudades, debe ser un <select> o en otro caso debe modificarse el método que procesa la selección de ciudad en el pop up.
	AvailabilityCitiyVtex_select_city_ex_popup -> Para el html de ejemplo de los <option> de cada ciudad
	AvailabilityCitiyVtex_btn_save_city_popup -> Para el botón al que se le da click para guardar la ciudad seleccionada.

	En las vitrinas el target_product debe tener el atributo data-id-sku
*/

/**
 * Disponibilidad por ciudad para Vtex.
 * @module AvailabilityCitiyVtex
 * @since 1.0.0
 * @desc Este módulo suma la opción de que el usuario de la tienda elija la ciudad desde la que ingresa (teniendo en cuenta las transportadoras configuradas) y de esta manera muestra la disponibilidad de los productos según la elección, además dispara un evento llamado preference-city-added asociado a document cuando el usuario elige una ciudad.*/
var AvailabilityCitiyVtex = (function( window,undefined ){
	var config = null;
	var selected_city = null;
	var Storage = {};
	var cities = {};
	var target_popup = '.AvailabilityCitiyVtex_popup_select_city';
	var target_select_cities = '.AvailabilityCitiyVtex_select_city_popup';
	var target_option_city_ex = '.AvailabilityCitiyVtex_select_city_ex_popup';
	var target_btn_save_city = '.AvailabilityCitiyVtex_btn_save_city_popup';
	//selector jquery para la página de producto
	var target_product_page = 'body#product-page'
	//contenedor del producto en las vitrinas, usada el método check_vitrines
	var target_product = '.product-container-shelf';
	//nombre de la variable del session o localStorage donde queda almacenado el zip seleccionado por el usuario
	var name_storage_city = 'vtex_selected_city'

	var log = function( message,function_,type ){
		var filename = (config && config.filename) ? config.filename : 'AvailabilityCitiyVtex'
		var message_def = '[' + filename + ' - ' + function_ + '] : ' + message

		if(type == 'warn'){
			//console.warn(message_def)
		}
		else if(type == 'error'){
			//console.error(message_def)
		}
		else{
			//console.log(message_def)
		}
	}

	/**
	 * @method init_storage
	 * @desc Este método verifica si el navegador soporta session y local storage si es así guarda una referencia en la variable Storage, de otra manera lo deja como un objeto literal vacío.
	 */
	var init_storage = function(){
		if(config.session_storage){
			if(sessionStorage.getItem){
				Storage = sessionStorage
			}
		}
		else{
			if(localStorage.getItem){
				Storage = localStorage
			}
		}
	}


	var view_ban = function(){
		var city_banner = String(getCookie(name_storage_city))
		if(city_banner == '11001'){			
			$('.no-view').addClass('view-banner');
		}
		else{
			$('.no-view').removeClass('view-banner');
		}
	}

	/**
	 * @method check_selected_city
	 * @desc Este método verifica si el usuario tiene una ciudad seleccionada en el session o local storage según se haya configurado, le asigna el zip code a la variable selected_city en caso de que sí de lo contrario abre el pop up para seleccionar una, si hay una ciudad seleccionada dispara un evento llamado check-selected-city y envía como parametro el zip guardado.
	 */
	var check_selected_city = function(){

		if(getCookie(name_storage_city) != null){
			selected_city = getCookie( name_storage_city )
			$(document).trigger('preference-city-added',{
                zip : selected_city,
                city : cities[selected_city]
            })
		}
		else{
			open_pop_up_city()
		}
	}

	/**
	 * @method init_info_pop_up
	 * @desc Este método inicializa la información del pop up, su función más importante es rellenar el select de las ciudades.
	 */
	var init_info_pop_up = function(){
		for(zip in cities){
			var clone_option = $(target_option_city_ex).clone()

			$(clone_option).attr('value',zip)
			$(clone_option).text(cities[zip])
			$(clone_option).removeClass(target_option_city_ex.replace('.',''))

            if(zip == selected_city){
                $(clone_option).attr('selected','true')
            }

			$(target_select_cities).append($(clone_option))
        }
	}

	/**
	 * @method init_info_pop_up
	 * @desc Este método hace funcionales los botones y selects del popup donde se selecciona la ciudad.
	 */
	var init_func_pop_up = function(){
		$(target_btn_save_city).unbind('click').click(function( event ){
            event.preventDefault();

            /*INICIO - bloque propio de Dislicores para verificar el check de mayoría de edad*/
            if(!$('#age-check input').prop('checked')){
                $('.error.age-check').remove()
                $('#age-check').before('<span style="color:#d4a6b2 !important" class="error age-check">Debes ser mayor de 18 años para ingresar</span>')
                return;
            }
            else{
                $('.error.age-check').remove()
            }
            /*FIN - bloque propio de Dislicores para verificar el check de mayoría de edad*/
            
			var result_save_new_city = save_selected_city( $(target_select_cities).val() )

			if(result_save_new_city){
				close_pop_up_city()
				$(target_product).removeClass('availability-city-checked')
				$(document).trigger('preference-city-added',{
                    zip : $(target_select_cities).val(),
                    city : cities[$(target_select_cities).val()]
                })
			}
			else{
				log('Your preference could not be saved :\'(')
			}

			var city_banner = String(getCookie(name_storage_city))
		if(city_banner == '11001'){			
			$('.no-view').addClass('view-banner');
		}
		else{
			$('.no-view').removeClass('view-banner');
		}
		
		})
	}

	var getCookie = function(input) {
		var cookies = document.cookie.split(';');
		var input = input.toLowerCase().trim();
		for (var i = 0; i < cookies.length; i++) {
		  var name = cookies[i].split('=')[0].toLowerCase().trim();
		  var value = cookies[i].split('=')[1].toLowerCase().trim();
		  
		  if (name == input) {
			return value;
		  } else if (value == input) {
			return name;
		  }
		}
		console.log('ninguna coincidencia')
		return null;
	  };

	/**
	 * @method save_selected_city
	 * @desc Este método actualiza la variable selected_city y también el session o localStorage donde se almacena esta información.
	 */
	var save_selected_city = function( zip_new_city ){
		if(cities[zip_new_city]){
			selected_city = zip_new_city
			//Storage.setItem( name_storage_city,zip_new_city )
			document.cookie = name_storage_city + "=" + zip_new_city;
			return zip_new_city;
		}
		else{
            $(target_select_cities).parent().before('<span style="color:#d4a6b2 !important" class="error age-check ta-center">Elije una ciudad para ingresar</span>')
			log(zip_new_city + ' city not found','save_selected_city','error')
			return false;
		}
	}

	/**
	 * @method open_pop_up_city
	 * @desc Este método abre el pop up habilitado para que el usuario seleccione la ciudad desde la que ingresa, por defecto este método funciona con bootstrap 3
	 */
	var open_pop_up_city = function(){
		init_info_pop_up()
		init_func_pop_up()
		$(target_popup).fadeIn()
	}

	/**
	 * @method open_pop_up_city
	 * @desc Este método cierra el pop up habilitado para que el usuario seleccione la ciudad desde la que ingresa, por defecto este método funciona con bootstrap 3
	 */
	var close_pop_up_city = function(){
		$(target_popup).fadeOut()
	}

	/**
	 * @method check_product
	 * @desc Este método verifica si el producto en la interna de producto está disponible para la ciudad seleccionada y reacciona de acuerdo a ello.
	 */
	var check_product = function(){
		var sku = skuJson.skus[0].sku

		simulate_vtex(sku,function( response ){
			if(response.error){
				log('error simulate delivere','simulate_vtex','error')
			}
			else{
				response.forEach(function( item ){
                    //si no está disponible para la ciudad oculto el botón de agregar al carrito y muestro el botón de no disponible, en caso contrario hago lo inverso
					if( item.availability == "cannotBeDelivered" ){
                        $('.buy-in-page-button').css('display','none')
                        $('.unavailable-button').css('display','block')
                    }
                    else{
                        $('.buy-in-page-button').css('display','block')
                        $('.unavailable-button').css('display','none')
                    }
				})
			}
		})
    }
    
    /**
	 * @method set_delivered_vitrine
	 * @desc Este método convierte el producto en la vitrina en un producto disponible, sucede sobre todo cuando cambio de ciudad y el sku ya está disponbile (proceso inverso del método set_not_delivered_vitrine)
	 * @param {Integer} id_sku Id del sku que no está disponible en la ciudad seleccionada
	 */
	var set_delivered_vitrine = function( id_sku ){
		var current_sku = $(target_product + '[data-id-sku=' + id_sku + ']')
        if($(current_sku).hasClass('product-off')){
            log(id_sku + ' sku available for ' + selected_city,'set_delivered_vitrine')
            
            $(current_sku).removeClass('product-off')
            $(current_sku).find('.wrapper-buy-button-asynchronous').removeClass('hide')
            $(current_sku).find('.product-container-shelf--out-of-stock__tag').addClass('hide')
            $(current_sku).find('.product-container-shelf__price').removeClass('hide')
        }  
	}

	/**
	 * @method set_not_delivered_vitrine
	 * @desc Este método convierte el producto en la vitrina en un producto no disponible.
	 * @param {Integer} id_sku Id del sku que no está disponible en la ciudad seleccionada
	 */
	var set_not_delivered_vitrine = function( id_sku ){
        if(!$(current_sku).hasClass('product-off')){
            log(id_sku + ' sku no available for ' + selected_city,'set_not_delivered_vitrine')
            var current_sku = $(target_product + '[data-id-sku=' + id_sku + ']')
            $(current_sku).addClass('product-off')
            $(current_sku).find('.wrapper-buy-button-asynchronous').addClass('hide')
            
            if($(current_sku).find('.product-container-shelf--out-of-stock__tag')[0]){
                $(current_sku).find('.product-container-shelf--out-of-stock__tag').removeClass('hide')
            } 
            else{
				if( $('body').hasClass('assemble-your-kits') ){
					//Esconder productos agotados en anchetas
					$(current_sku).parent().remove();
				}else{
					$(current_sku).find('.product-container-shelf__price').after('\
						<div class="product-container-shelf--out-of-stock__tag">\
							Agotado\
						</div>\
					')
				}
            }  
            $(current_sku).find('.product-container-shelf__price').addClass('hide')
        }        
	}

	/**
	 * @method check_vitrines
	 * @desc Este método recorre todas las vitrinas y verifica si los productos que contiene están disponibles para la ciudad elegida. Solo se debe llamar luego de que el evento preference-city-added fue disparado.
	 */
	var check_vitrines = function(){
        log('init check vitrines','check_vitrines');
		var ids_sku = []
		$(target_product).not('.availability-city-checked').each(function(){
			$(this).addClass('availability-city-checked')
			//ids_sku.push()
			simulate_vtex($(this).attr('data-id-sku'),function (response) {
			//console.log('response simulate is',response)
			if(response.error){
				log('error simulate delivere','simulate_vtex','error')
			}
			else{
				//console.log('response s',response)
				response.forEach(function( item ){
					//console.log('vamos por acá',item)
					if( item.availability == "cannotBeDelivered" ){
						set_not_delivered_vitrine( item.id )
                    }
                    else{
						set_delivered_vitrine( item.id )
						//console.log('pero sí disponible',item.id)
                    }
				})
			}
			
		})
		})


		

	}

	/**
	 * @method simulate_vtex
	 * @desc Este método hace una petición a Vtex para simular un envío, si hay productos que no están disponibles para el zip enviado devuelve en availability = cannotBeDelivered
	 * @param {Integer|Integer[]} items_ Uno o varios ids de skus para revisar
	 * @param {function} [callback] Función llamada al recibir la respuesta de Vtex recibe un parametro objeto con error = true si no funcionó de otra forma un array con los items devueltos por Vtex
	 */
	var simulate_vtex = function( items_,callback ){
		var ids_sku = [];
		var items = (typeof items_ == 'object') ? items_ : [items_];

		items.forEach(function( sku ){
			ids_sku.push({
	            "id": parseInt(sku),
	            "quantity": 1,
	            "seller": "1"
	        })
		})

		var data = {
		    "items":ids_sku,
		    "postalCode": parseInt(selected_city),
			"country": config.store_country
		}
		
        var settings = {
		  async: true,
		  crossDomain: true,
		  url: "/api/checkout/pub/orderforms/simulation",
		  type: "POST",
		  headers: {
		    "Content-Type": "application/json"
		  },
		  "processData": false,
		  data: JSON.stringify(data)
		};
		$.ajax(settings)
		.done(function (response) {
			if(callback){
				callback( response.items )
			}
		})
		.fail(function( error ){
			if(callback){
				callback({
					error : true,
					info : error
				})
			}
		})
	}

	/**
	 * @method init
	 * @desc Este método inicializa la funcionalidad de acuerdo a los parámetros de inicialización recibidos en el parámetro config.
	 * @param {Object} config Recibe la configuración de la funcionalidad según la tienda 
	 * @return {Void} Void
	 */
	var init = function( config_us ){
		if(config_us.cities){
			log('starting','init')
			config = config_us
			cities = config.cities
			
			close_pop_up_city()

			init_storage()
			check_selected_city()
			view_ban()
		}
		else{
			log('cities not found configuration object','init','error')
		}
	}

	return{
		init : init,
		cities : cities,
		check_vitrines : check_vitrines,
		target_product_page : target_product_page,
        check_product : check_product,
        open_pop_up_city : open_pop_up_city
	}
})( window )

$(document).ready(function(){
    /*if(window.location.host == 'dislicores.vtexlocal.com.br'){
        $('#modal-age-verification').addClass('AvailabilityCitiyVtex_popup_select_city')
        $('#modal-age-verification #city-check').addClass('AvailabilityCitiyVtex_select_city_popup')
        $('#modal-age-verification #city-check option:first').addClass('AvailabilityCitiyVtex_select_city_ex_popup')
        $('#modal-age-verification .wrap-submit-check button').addClass('AvailabilityCitiyVtex_btn_save_city_popup')
    }*/
	AvailabilityCitiyVtex.init({
		//si envío false usa localStorage si envío true, usa sessionStorage
        session_storage : true,
        //código de tres caracteres del país donde funciona la tienda (usado para las simulaciones de envío)
        store_country : 'COL',
		//objeto de las ciudades disponibles en la tienda
		cities : {
            "05001" : "Medellín",
            "11001" : "Bogotá",
            "25126" : "Cajicá",
            "68001" : "Bucaramanga",
			"76001" : "Cali",
			"66001" : "Pereira",
            "73001" : "Ibagué",
            "23001" : "Montería",
            "08001" : "Barranquilla",
            "13001" : "Cartagena",
            "20001" : "Valledupar",
            "47001" : "Santa Marta"
		}
	})
})

$(document).bind('preference-city-added',function( event,city ){
	if($(AvailabilityCitiyVtex.target_product_page)[0]){
		AvailabilityCitiyVtex.check_product()
	}
	else{
        AvailabilityCitiyVtex.check_vitrines()
	}
	
})