(function($) {
  $.fn.changes = function(cb, e) {
    e = e || { subtree:true, childList:true, characterData:true };
    $(this).each(function() {
      function callback(changes) { cb.call(node, changes, this); }
      var node = this;
      (new MutationObserver(callback)).observe(node, e);
    });
  };
})(jQuery);

var dislicoresMain = (function(window,undefined){
    var $landscape = 1367;
    var $landscapeMedium = 1281;
    var $landscapeSmall = 1101;
    var $mobile = 993;
    var $mobileMedium = 769;
    var $mobileSmall = 577;
    var logged_checked = -1
    var wine_colors = {
        "#5E2129" : "Vino",
        "#F5F5DC" : "Blanco",
        "#F76D85" : "Rosado",
        "#F4D33D" : "Amarillo",
        "#DAA520" : "Ocre"
    }

    var is_mobile = function(){
        var match_object = window.matchMedia("(max-width: " + $mobile + "px)")
        return match_object.matches;    
    }

    //SLIDES SLICK
	var get_arrows_slide = function( direction ){
	    if(direction == 'prev'){
	        return '<a href="javascript:void(0)" class="slick-prev"><i class="icon-angle-left"></i></a>'
	    }
	    else{
	        return '<a href="javascript:void(0)" class="slick-next"><i class="icon-angle-right"></i></a>'
	    }
	};

    var mega_menu = function(){
        var container_mega_menu_active = '.dislicores-header__container-content-megamenu-active'

        this.btn = function(){
            if(!is_mobile()){
                $('.dislicores-header__container-mega-menu').hover(function(){
                
                },function(){
                    if($('.dislicores-header__container-mega-menu').hasClass('dislicores-header__container-mega-menu--active')){
                        $('.dislicores-header__btn-mega-menu').trigger('click')
                    }
                })
            }

            $('.dislicores-header__btn-mega-menu').click(function(){
                if(is_mobile()){
                    if($('.dislicores-header__container-sub-categories').hasClass('active')){
                        $('.dislicores-header__btn-return-sub-categories').trigger('click')
                    }

                    $('.dislicores-header__super-category:not([class*="icons"])').slideToggle('fast')
                    $('.dislicores-header__social-icons-mobile').slideToggle('fast')
                }
                else{
                    $('.dislicores-header__item-menu-bottom').slideToggle('fast')
                }
                $('.dislicores-header__container-mega-menu').toggleClass('dislicores-header__container-mega-menu--active')
                
                if($('.dislicores-header__container-mega-menu').hasClass('dislicores-header__container-mega-menu--active')){
                    $('.dislicores-header__super-category--has-sub-menu.dislicores-header__super-category--active').trigger('click')
                    
                    if(!is_mobile()){
                        print_default_content()
                        mega_menu_active()
                    }
                    
                }
                else{
                    $('.dislicores-header__container-content-megamenu-active').stop().animate({
                                opacity : 0
                            },100);
                    $(container_mega_menu_active).html('')
                    if(!is_mobile()){
                        mega_menu_inactive()
                    }  
                }
                
            })
        }

        this.mega_menu_inactive = function(){
            $('.dislicores-header__super-category--has-sub-menu').unbind('click').click(function(){
                $('.dislicores-header__super-category--has-sub-menu').not($(this)).removeClass('dislicores-header__super-category--active')
                $('.dislicores-header__super-category--has-sub-menu .dislicores-header__super-container-sub-menu').not($(this).find('.dislicores-header__super-container-sub-menu')).slideUp('fast')
                
                $(this).toggleClass('dislicores-header__super-category--active')
                $(this).find('.dislicores-header__super-container-sub-menu').slideToggle('fast')
            })
        }

        var mega_menu_active = function(){
            $('.dislicores-header__super-category--has-sub-menu').unbind('click').click(function(){
                $('.dislicores-header__super-category--has-sub-menu').not($(this)).find('.dislicores-header__link-super-category').removeClass('dislicores-header__link-super-category--active-inter')

                $(this).find('.dislicores-header__link-super-category').toggleClass('dislicores-header__link-super-category--active-inter')

                if($('.dislicores-header__super-category--has-sub-menu .dislicores-header__link-super-category').hasClass('dislicores-header__link-super-category--active-inter')){
                    print_category_content($(this).find('.dislicores-header__super-container-sub-menu').html())
                }
                else{
                    $('.dislicores-header__container-content-megamenu-active').html('')
                    print_default_content()
                }
                
            })
        }

        var print_category_content = function(content){
            dislicoresTemplates.print_template(container_mega_menu_active,dislicoresTemplates.content_mega_menu_active,{category_content : content},function(){},true)
        }

        var print_default_content = function(){
            $('.dislicores-header__container-content-megamenu-active').addClass('dislicores-header__container-content-megamenu-active--loading')
            dislicoresTemplates.print_template(container_mega_menu_active,dislicoresTemplates.content_mega_menu_preloader,{quantity_grows:4})
            
            if($('.dislicores-header__container-mega-menu--active')[0]){
                var settings = {
                        "url": "/api/catalog_system/pub/products/search?fq=productClusterIds:137",
                        "method": "GET",
                        "timeout": 0,
                        "headers": {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                };

                $.ajax(settings)
                .done(function (response) {
                    if($('.dislicores-header__container-mega-menu').hasClass('dislicores-header__container-mega-menu--active')){
                        dislicoresTemplates.print_template('.dislicores-header__container-content-megamenu-active',dislicoresTemplates.content_mega_menu_no_active,{products:response},function(){
                            $('.dislicores-header__sub-container-image-product-mega-menu-inactive:first').css('min-height',$('.dislicores-header__container-image-product-mega-menu-inactive:first').width()+'px')
                            $('.dislicores-header__container-content-megamenu-active').stop().animate({
                                opacity : 1
                            },500)
                            $('.dislicores-header__container-content-megamenu-active').removeClass('dislicores-header__container-content-megamenu-active--loading')
                            $('.dislicores-header__content-products').slick({
                                slidesToShow : 1,
                                prevArrow: get_arrows_slide('prev'),
                                nextArrow: get_arrows_slide('next'),
                                fade: true,
                            })
                            $('.dislicores-header__container-product-mega-menu-inactive').addClass('slick-init')
                        },true)
                    }
                    //esperar a que cargue la imagen del canvas
                    $('.container-canvas-proton > img').load(function(event){
                        canvas_proton();
                    });
                });
            }
        }

        //variables globales para las particulas
        var canvas, context, proton, emitter, renderer, interval, particle_color = '#C14056';
        //creacion del canvas
        var canvas_proton = function(){
            canvas  = document.getElementById('canvas-proton');
            canvas.width = $('#canvas-color-filter').outerWidth();
            canvas.height = $('#canvas-color-filter').outerHeight();
            context = canvas.getContext('2d');
            //context.globalCompositeOperation = 'lighter';
            console.log('info control',canvas,particle_color)
            create_particle(particle_color);
            particle_event();
            tick();
        }

        //creacion de la particlua
        var create_particle = function(color){
            proton = new Proton;
            emitter = new Proton.Emitter();
            emitter.rate = new Proton.Rate(new Proton.Span(0, 0), new Proton.Span(.05, .2));
            emitter.addInitialize(new Proton.Body('/arquivos/helper-particle.png', 32));
            emitter.addInitialize(new Proton.Mass(1));
            emitter.addInitialize(new Proton.Radius(7));
            emitter.addInitialize(new Proton.Life(.1, 1));
            emitter.addInitialize(new Proton.V(new Proton.Span(0, 0), 500, 'polar'));
            emitter.addBehaviour(new Proton.Alpha(1, 0));
            emitter.addBehaviour(new Proton.Color(color, color));
            emitter.addBehaviour(new Proton.Scale(2, 2));
            emitter.p.x = canvas.width / 2;
            emitter.p.y = canvas.height / 2;
            emitter.emit();
            renderer = new Proton.CanvasRenderer(canvas);
    
            proton.addEmitter(emitter);
            proton.addRenderer(renderer);
        }
        
        //animacion para el renderizado constante de la particula
        var tick = function() {
            requestAnimationFrame(tick);
            proton.update();
        }
        
        //mouse over paar el seguimiento de la particula
        var particle_event = function(){
            $('#canvas-color-filter').on('mousemove', function(a) {
                var offset_elem = $(this).offset();
                
                emitter.p.x = a.pageX - offset_elem.left; 
                emitter.p.y = a.pageY - offset_elem.top;
                emitter.rate = new Proton.Rate(new Proton.Span(1, 3), new Proton.Span(.01, .01)),
                clearTimeout(interval);
                interval = setTimeout(function() {
                    clearTimeout(interval);
                    emitter.rate = new Proton.Rate(new Proton.Span(0, 0), new Proton.Span(.01, .01));
                    console.log('emiter is',emitter)
                }, 60);

                console.log('test',emitter.rate,proton)
            });

            $('.color-filter-selector li').click(function(){
                var _self = this;

                if( !$(_self).hasClass('active') ){//si no esta activo
                    var color = $(_self).attr('data-color');
                    $('.color-filter-selector li').removeClass('active');
                    $(_self).addClass('active');
                    particle_color = color
                    //cambiar color de la particula del canvas
                    create_particle(particle_color);
                    $('#canvas-color-filter').css('background-color', color);
                    
                    search_color($(_self).attr('data-color-search'));
                }
            });

            $('.color-filter-selector li:first-child').trigger('click');
        }

        var search_color = function(filter){
            filter = filter.substr(1);
            $.ajax({
                url: '/api/catalog_system/pub/products/search?fq=specificationFilter_32:%23' + filter,
                contentType : 'application/json',
                type:'GET',
                success : function(data){
                    //console.log('productos por color', data, filter);
                    var five_prods = data.slice(0, 5);//los primeros 5
                    print_products_per_color(five_prods);
                },
                error : function(error){
                    console.log(error);
                }
            });
        }

        var print_products_per_color = function(products){
            //console.log(products);
            $('#products-per-color').empty();
            products.forEach(function(product){
                $('#products-per-color')
                .append('<li><a title="'+product.productTitle+'" href="'+product.link+'"><img src="'+product.items[0].images[0].imageUrl+'" /></a></li>');
            });
        }

        var sub_categories_mobile = function(){
            $('.dislicores-header__super-category--has-sub-menu').click(function(){
                $('.dislicores-header__container-sub-categories .list-sub-categories-mobile').html($(this).find('.dislicores-header__super-container-sub-menu').html())
                $('.dislicores-header__container-sub-categories').addClass('active')
                $('.dislicores-header__category-active').text($(this).find('.dislicores-header__link-super-category').text())
            })

            $('.dislicores-header__btn-return-sub-categories').click(function(){
                $('.dislicores-header__container-sub-categories').removeClass('active')
            })
        }

        //cuando estoy en mobile imprimo el contenedor de las sub categorías
        if(is_mobile()){
            dislicoresTemplates.print_template('.dislicores-header>.container',dislicoresTemplates.container_sub_categories_mobile)
            var top_sub_categories = parseFloat($('.dislicores-header__top-bar-top').outerHeight()) + parseFloat($('.dislicores-header .icons-left').height())
            $('.dislicores-header__container-sub-categories').css('top',top_sub_categories + 'px')
            sub_categories_mobile()
        }

        return this;
    }()

    

    var mini_cart = function(){
        //delete item
        this.remove_item = function( index ){
            dislicoresTemplates.print_template('.dislicores-mini-cart .dislicores-mini-cart__container-product[data-index=' + index + '] .dislicores-mini-cart__product-quantity',dislicoresTemplates.spinner_border,{},false,true)

            var orderForm = vtexjs.checkout.orderForm;
            var remove_item = orderForm.items[ index ];
            var itemsToRemove = [{
                "index": index,
                "quantity": 0,
            }];
            if(vtexjs.checkout.removeItems(itemsToRemove)){
                update(true)
                $(document).trigger('remove-item-checkout-custom',remove_item)
            }
        }
        //update quantity item
            this.update_quantity_item = function( quantity,index ){
                dislicoresTemplates.print_template('.dislicores-mini-cart .dislicores-mini-cart__container-product[data-index=' + index + '] .dislicores-mini-cart__product-quantity',dislicoresTemplates.spinner_border,{},false,true)

                var updateItem = {
                    index: index,
                    quantity: quantity
                };
                vtexjs.checkout.updateItems([updateItem], null, false)
                .done(function(orderForm) {
                    update(true)
                })
                .fail(function(error){
                    console.log('falló la actualización',error)
                })
            }

            this.init_func_buttons = function( open_mini_cart,slide_down ){
                if(open_mini_cart){
                    $('.dislicores-mini-cart').removeAttr('style')
                }

                $(document).off("click", ".dislicores-header__btn-cart").on("click", ".dislicores-header__btn-cart", function(e){
                    e.stopPropagation();
                    $(this).toggleClass('dislicores-header__btn-cart--active')
                    $('[class*="dislicores-mini-cart dislicores-mini-cart"]').slideToggle('fast')
                })

                $('.dislicores-mini-cart__product-delete').unbind('click').click(function( e ){
                    e.stopPropagation()
                    $(this).addClass('dislicores-mini-cart__product-delete--inactive')
                    remove_item( $(this).parents('.dislicores-mini-cart__container-product').attr('data-index') )
                })

                $('.dislicores-mini-cart__product-quantity-add').unbind('click').click(function( e ){
                    e.stopPropagation()
                    $(this).addClass('dislicores-mini-cart__product-quantity-add--inactive')
                    update_quantity_item( parseInt( $(this).parent().find('.dislicores-mini-cart__product-quantity').text() ) + 1,$(this).parents('.dislicores-mini-cart__container-product').attr('data-index') )
                })

                $('.dislicores-mini-cart__product-quantity-remove').unbind('click').click(function( e ){
                    e.stopPropagation()
                    $(this).addClass('dislicores-mini-cart__product-quantity-remove--inactive')
                    update_quantity_item( parseInt( $(this).parent().find('.dislicores-mini-cart__product-quantity').text() ) - 1,$(this).parents('.dislicores-mini-cart__container-product').attr('data-index') )
                })

                if(slide_down){
                    $('.dislicores-mini-cart').slideDown()
                }
            }

        //update mini cart header
        this.update = function(open_mini_cart,slide_down){
            vtexjs.checkout.getOrderForm()
            .done(function( response ){
                if(logged_checked === -1){
                    logged_checked = response.loggedIn
                    $(document).trigger('user-logged-checked',[logged_checked])
                }
                $('.dislicores-mini-cart--not-empty').remove()

                if(is_mobile()){
                    var container_mini_cart = '.dislicores-header'
                }
                else{
                    var container_mini_cart = '.dislicores-header__right-menu'
                }

                if(response.items.length > 0){
                    dislicoresTemplates.print_template(container_mini_cart,dislicoresTemplates.mini_cart_not_empty,{
                        products : response.items,
                        order : response
                    },function(){
                        init_func_buttons( open_mini_cart,slide_down )
                    })
                }
                else{
                    dislicoresTemplates.print_template(container_mini_cart,dislicoresTemplates.mini_cart_empty,{},function(){
                        init_func_buttons( open_mini_cart,slide_down )
                    })
                }
            })

            
        }

        return this;
    }()

    //init brands slide footer
    var brands_footer = function(){
        $('.footer__container-brands').slick({
            slidesToShow : 6,
            slidesToScroll : 3,
            arrows : false,
            autoplay: true,
            autoplaySpeed: 8000,
            responsive : [
                {
                    breakpoint : $mobile,
                    settings : {
                        slidesToShow : 3,
                        slidesToScroll : 3
                    }
                }
            ]
        })
    }

    var add_new_methods_validate_jquery = function(){
        $.validator.addMethod(
            "regex",
            function(value, element, regexp) {
                var re = new RegExp(regexp);
                return this.optional(element) || re.test(value);
            },
            "Please check your input."
        );
        // add the rule here not equal
		$.validator.addMethod("valueNotEquals", function(value, element, arg){
            return arg !== value;
        }, "Value must not equal arg.");
    }

    var newsletter_footer = function(){
        $('form.footer__subscription-form-container').validate({
		    rules: {
		        email: {
		            required: !0,
                    email: !0,
                    regex : "^([A-Z]|[a-z]|[0-9]|-|\\.|@){4,}$",
		        },
		        "terms-and-conditions" : {
                    required: !0
                }
		    },
		    messages: {
		    	email: {
		            required: "Correo electrónico es un campo requerido ",
                    email: "Por favor ingresa un correo electrónico válido (ejemplo@ejemplo.com).",
                    regex: "Por favor ingresa un correo sin caracteres especiales."
		        },
		        "terms-and-conditions": {
		            required: "Por favor acepta la política de privaicidad y Tratamiento de datos Personales."
		        }
		    },
		    errorPlacement: function(error, element) {

                if($(element).attr('type') == 'checkbox'){
                    error.insertAfter($(element).parents('.check-no-default'))
                }
                else{
                    error.insertAfter($(element).next())
                }
		    },
		    submitHandler: function(form) {
		    	var prev_data = {
		    		email : $(form).find("[name='email']").val(),
		    		terms_and_conditions : "on" == $(form).find("[name='terms-and-conditions']").val()
                }
                var prev_value_submit = $(form).find("[type='submit']").val()
		    	$(form).find("[type='submit']").val('ENVIANDO...').prop('disabled', true);
		    	dislicoresMasterData.insert_into('NW',prev_data,function( response ){
                    if($('.footer__subscription-form-container .error-master-data')[0]){
                        $('.footer__subscription-form-container .error-master-data').remove()
                    }
                    $(form).find("[type='submit']").val(prev_value_submit).prop('disabled', false);
                    
                    if(response.success){
                        $('<span class="sucess master-data ta-center">Gracias por suscribirte</span>').insertBefore($('.footer__subscription-form-container [name="email"]'))
                    }
                    else{
                        $('<span class="error error-master-data">' + JSON.parse(response.data.responseText).Message + '</span>').insertBefore($('.footer__subscription-form-container [name="email"]'))
                    }
		    	})
		    }
		})
    }

    var add_class_collapse = function( elements ){
        $(elements).not('.footer__title-column-bottom').addClass('collapse')
        $(elements).addClass('accordion-initialized')

    }

    var accordion_footer_mobile = function(){
        var for_accordion = []
        $('.footer__title-column-bottom').each(function(){
            for_accordion.push({
                title : $('<a class="footer__title-column-bottom">' + this.innerHTML + '</a>'),
                content : $(this).next()
            })
        })

        $('.footer__column-left-container').empty()
        
        for_accordion.forEach(function( element ){
            $('.footer__column-left-container').append('<div class="col-12"></div>')
            $('.footer__column-left-container>div:last').append($(element.title))
            $('.footer__column-left-container>div:last').append($(element.content))
        })
        $('.footer__list-column-bottom-left .footer__title-column-bottom').remove()
        //recorro los títulos de las secciones de la izquierda del footer
        $('.footer__title-column-bottom').each(function( index,element ){
            //si la columna no se quiere excluir del accordión agrego las clases que necesita bootstrap para volverla parte de un acordión
            if(!$(this).parent().hasClass('exclude-accordion')){
                $(this).attr('data-index-accordion',index)
                $(this).attr('data-toggle','collapse')
                $(this).attr('data-target','.column-footer-accordion-' + index)
                $(this).attr('href','.column-footer-accordion-' + index)
                $(this).siblings().addClass('column-footer-accordion-' + index)
                add_class_collapse($(this).siblings())
                $(this).siblings().attr('data-parent','.footer__column-left-container')
                

                //agrego como elemento a desplegar al menú de esta columna y los menús de todas las columnas que le siguen que no tengan un título y ya no hayan sido inicializadas
                $(this).parent().siblings().each(function(){
                    if(!$(this).find('.footer__title-column-bottom')[0] && !$(this).hasClass('accordion-initialized')){
                        $(this).addClass('column-footer-accordion-' + index)
                        add_class_collapse($(this))
                        $(this).attr('data-parent','.footer__column-left-container')
                    }
                })
            }
            
        })
        
        $('.footer__list-column-bottom-left').addClass('accordion-initialized')
    }

    var header_btns = function(){
        $('.busca').append('<a href="javascript:void(0)" class="search-btn-custom"><i class="icon-search"></i></a><a href="javascript:void(0)" class="close-search-btn-custom"><i class="icon-x"></i></a>')

        $('.search-btn-custom').click(function( e ){
            e.stopPropagation()
            console.log('click custom buscar')
            $('.btn-buscar').trigger('click')
        })

        $('.dislicores-header__icon-search').click(function( e ){
            e.stopPropagation()
            $('.dislicores-header__container-search').fadeIn('fast')
        })

        $('.close-search-btn-custom').click(function( e ){
            e.stopPropagation()
            $('.dislicores-header__container-search').fadeOut('fast')
        })
    }

    var links_whatsapp = function(){
        if($('.link-to-whatsapp').length > 0){
			$('.link-to-whatsapp').unbind('click')
			$('.link-to-whatsapp').click(function(){
                console.log('hey hey hye','http://web.whatsapp.com/send?phone=' + $(this).attr('data-number') +'&text=hola')
				if(is_mobile()){
					window.open('http://api.whatsapp.com/send?phone=+' + $(this).attr('data-number') +'&text=hola','_blank')
				}
				else{
					window.open('http://web.whatsapp.com/send?phone=+' + $(this).attr('data-number') +'&text=hola','_blank')
				}
				
			})
		}
    }

    var icons_fixed = function(){
        $('.principal-slider img:first').load(function(){
            
            if(is_mobile()){
                var aumento = 130
            }
            else{
                var aumento = 20
            }

            if($('body').hasClass('home')){
                $('.icons-fixed').css('top',($('.principal-slider img:first').height() + aumento) + 'px')
            }
            $('.icons-fixed').fadeIn()
        }) 
    }

    var search_auto_complete = function(){
        if(dislicoresMain.is_mobile()){
            var container = '.dislicores-header__container-search'
        }
        else{
            var container = '.fulltext-search-box'
        }
        $('body').changes(function(){
            
            if($('.ui-autocomplete.ui-menu.ui-widget.ui-widget-content.ui-corner-all')[0] && $('.ui-autocomplete.ui-menu.ui-widget.ui-widget-content.ui-corner-all').width() != ($(container).outerWidth() - 30)){
                $('.ui-autocomplete.ui-menu.ui-widget.ui-widget-content.ui-corner-all').width(($(container).outerWidth() - 30) + 'px')
            }
        })
    }

    var open_modal_login = function( return_url_us,force_reload ){
        var return_url = (return_url_us) ? '' : return_url

        vtexid.start({
            returnUrl: return_url,
            userEmail: '',
            locale: 'es-CO',
            forceReload: force_reload
        });
    }

    var icon_user_header = function(){
        if(logged_checked){
            $('.dislicores-header .icon-user').parent().click(function(){
                window.location.href = '/_secure/account#/profile'
            })    
        }
        else{
            $('.dislicores-header .icon-user').parent().click(function(){
                open_modal_login('/_secure/account#/profile')
            })
        }
    }

    var close_click_body = function(){
        /*var elements_close = [
            {open : '.dislicores-mini-cart',close : '.dislicores-header__btn-cart'},
            {open : '.busca',close : '.close-search-btn-custom'}

        ]

        $("html").click(function() {
            console.log('detectamos click en el html')
            elements_close.forEach(function( element ){
                if($(element.open).is(':visible')){
                    $(element.close).trigger('click')
                }
            })
        }) 

        elements_close.forEach(function( element ){
            $(element.open).click(function(e){
                e.stopPropagation()
                console.log('click para abrir-cerrar')
            })

            $(element.open + ' *').not(element.close).click(function(e){
                e.stopPropagation()
                console.log('click por children')
            })
        })*/

         
    }

    var adjust_breadcrumbs = function(){
        if($('.bread-crumb')[0]){
            if($('body').hasClass('producto')){
                $('.bread-crumb li:first a').text('Dislicores')
                $('.bread-crumb li:nth-child(2)').remove()
                $('.bread-crumb').slideDown()
            }
            else{
                $('.bread-crumb [title="dislicores"]').text('Dislicores')
                $('.bread-crumb [title="es"]').parent().remove()
                $('.bread-crumb').slideDown()
            }            
        }
    }

    var addToCart = function(skuId, itemQty,callback ) {
		$.ajax({
			url:'/checkout/cart/add?sku='+ skuId + '&qty='+ itemQty +'&seller=1&redirect=false&sc=1',
			method:'GET',
			success: function( response ){
                if(callback){
                    callback( response )
                }
			},
			error: function(error){
				if(callback){
                    callback( error )
                }
			}
		});
    };

    var general_functions_vitrine = function(){
        var button_add_cart = function(){
            $('.product-container-shelf .btn-add-buy-button-asynchronous').unbind('click').click(function(event){
                event.preventDefault();
                var sku = $(this).parents('.product-container-shelf').attr('data-id-sku')
                $(this).find('.adding').remove()
                $(this).addClass('adding')
                $(this).append('<div class="adding">' + dislicoresTemplates.spinner_border + '</div>');
                var auto_ref = this;
                addToCart( sku,1,function( response ){
                    $(auto_ref).find('.adding').remove()
                    $(auto_ref).removeClass('adding')
                    mini_cart.update(false,true);

                    $(auto_ref).append('<span class="prod-added-alert">Agregado!</span>');
                    setTimeout(function(){
                        $(auto_ref).find('.prod-added-alert').remove();
                    }, 3000);
                })
            })
        }

        button_add_cart()
    }

    var init = function(){
        $('.helperComplement').remove() 
        mega_menu.btn()
        mini_cart.update()
        brands_footer()
        add_new_methods_validate_jquery()
        newsletter_footer()
        header_btns()
        links_whatsapp()
        icons_fixed()
        search_auto_complete()
        close_click_body()
        adjust_breadcrumbs()
        general_functions_vitrine()

        //evento disparado cada vez que se elimina un producto del carrito para comparar si está en la ancheta actual
        $(document).bind('remove-item-checkout-custom',function( event,item_removed ){
            AssembleKitVtex.listen_item_removed_cart( event,item_removed )
        })

        //funcionalidad de ciudad desde la que se compra en el header
        $(document).bind('preference-city-added',function( event,city ){
            $('.dislicores-header__current-city-user').text(city.city)
            $('.dislicores-header__container-current-city-user').click(function(){
                AvailabilityCitiyVtex.open_pop_up_city()
            })
        })

        if(is_mobile()){
            accordion_footer_mobile()
        }
        else{
            mega_menu.mega_menu_inactive()
        }

        $(document).bind('user-logged-checked',function( event,user_logged ){
            icon_user_header()
        })
    }

    return{
        init : init,
        get_arrows_slide : get_arrows_slide,
        mini_cart: mini_cart,
        open_modal_login : open_modal_login,
        landscape : $landscape,
        landscape_medium : $landscapeMedium,
        landscape_small : $landscapeSmall,
        mobile : $mobile,
        mobile_medium : $mobileMedium,
        mobile_small : $mobileSmall,
        add_class_collapse : add_class_collapse,
        is_mobile : is_mobile,
        wine_colors : wine_colors,
        general_functions_vitrine : general_functions_vitrine,
        addToCart : addToCart
    }
}(window))

$(document).ready(function(){
    dislicoresMain.init()
    //$('.dislicores-header__btn-mega-menu').trigger('click')

    $(document).on("click", ".dislicores-header li.sub_cocteleria", function(){
        //$('.dislicores-header__btn-mega-menu').trigger('click')
    });

})

var dislicoresMasterData = (function( window,undefined ){

	//INSERT DOCUMENT IN DATA ENTITY
	var insert_into = function( sigla,data_us,callback ){

		if(data_us.file){
			var file_us = data_us.file
		}

		var contentData = {
		    url: "/api/ds/pub/documents/" + sigla,
		    contentType: "application/json; charset=utf-8",
		    data: JSON.stringify(data_us),
		    type: "POST",
		    success: function(data) {
		    	if(data_us.file){
		    		var document_id = data.Id//obtener el id
		    		document_id = document_id.slice(3);//remover la entidad del id

		    		save_file( sigla,document_id,file_us,function( data ){
		    			callback(data)
		    		})
		    	}
		    	else{
		    		if(callback){
		    			callback({
		    				success : true,
		    				data : data
		    			})
		    		}
		    	}
		        
		    },
		    error: function(data) {
		    	console.log(data.responseText)
		        if(callback){
		        	callback({
		        		success : false,
		        		data : data
		        	})
		        }
		    }
		};
		$.ajax(contentData)
	};

	var save_file = function( sigla,id_document,file,callback ){
		var file_def = new FormData();//crear datos de formulario
		file_def.append(file.name_field, file.file[0].files[0]);//agregar el archivo

		var fileSettings = {
		  data: file_def,
		  url: '/api/dataentities/'+sigla+'/documents/'+id_document+'/'+file.name_field+'/attachments',
		  type:'POST',
		  async: true,
		  crossDomain: true,
		  processData: false,
		  contentType: false,
		  cache: false,
		  headers: {
		    'contentType': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
		  },
		  success: function( data ){
		    callback({success : true})
		  },
		  error: function(error){
		    callback({success : false})
		  }
		}
		$.ajax(fileSettings);
	};

	return {
		insert_into : insert_into
	}
}(window))