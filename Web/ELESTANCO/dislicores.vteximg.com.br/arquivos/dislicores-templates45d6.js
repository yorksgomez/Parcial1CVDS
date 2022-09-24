var dislicoresTemplates = (function(window,undefined){
    this.spinner_border = '\
    <div class="spinner-border" role="status">\
        <span class="sr-only"></span>\
    </div>\
    '
    this.mini_cart_empty = '\
        <div style="display:none" class="dislicores-mini-cart dislicores-mini-cart--empty no-padding col-sm-8 row offset-sm-4 f-oswald c-322616">\
            No tienes productos en tu carrito\
        </div>\
    '

    this.content_mega_menu_preloader = '\
        <% for(index = 1;index <= quantity_grows;index++){ %>\
            <div class="spinner-grow" role="status">\
                <span class="sr-only"></span>\
            </div>\
        <% }; %>\
    '

    this.template_color_filter = '\
    <div class="col-xs-12 col-sm-6 dislicores-header__color-filter-proton" id="canvas-color-filter">\
        <ul class="color-filter-selector">\
            <li data-color="#692732" data-color-search="#5E2129" style="background: #692732"></li>\
            <li data-color="#FFFFEE" data-color-search="#F5F5DC" style="background: #FFFFEE"></li>\
            <li data-color="#FF97AD" data-color-search="#F76D85" style="background: #FF97AD"></li>\
            <li data-color="#FFE98F" data-color-search="#F4D33D" style="background: #FFE98F"></li>\
            <li data-color="#FFCC5A" data-color-search="#DAA520" style="background: #FFCC5A"></li>\
        </ul>\
        <div class="text-canvas">Podrás ver que licores tienen este color</div>\
        <canvas id="canvas-proton"></canvas>\
        <div class="container-canvas-proton">\
            <img src="/arquivos/dummy-canvas.png" />\
        </div>\
        <ul id="products-per-color"></ul>\
    </div>'


    this.content_mega_menu_active = '\
        <div class="row no-margin">\
            <div class="col-xs-12 col-sm-6 dislicores-header__content-category">\
                <%- category_content %>\
            </div>\
            '+ this.template_color_filter +'\
        </div>\
    '

    this.container_sub_categories_mobile = '\
        <div class="dislicores-header__container-sub-categories">\
            <div class="row no-margin">\
                <div class="col-6 dislicores-header__btn-return-sub-categories f-oswald c-322616 ta-center"><i class="icon-arrow-left"></i> Atrás</div>\
                <div class="col-6 dislicores-header__category-active f-oswald c-dorado ta-center"></div>\
            </div>\
            <div class="list-sub-categories-mobile"></div>\
        </div>'

    this.content_mega_menu_no_active = '\
        <div class="row no-margin">\
            <figure class="col-xs-12 col-sm-6 dislicores-header__content-products">\
                    <% products.forEach(function( product,index_product ){%>\
                        <div class="dislicores-header__container-product-mega-menu-inactive row <% if(index_product == 0){ %>slick-init<% } %>">\
                            <div class="dislicores-header__container-image-product-mega-menu-inactive col-xs-12 col-sm-6">\
                                <div class="dislicores-header__sub-container-image-product-mega-menu-inactive">\
                                    <img class="dislicores-header__image-product-mega-menu-inactive" src="<%= product.items[0].images[0].imageUrl %>" >\
                                </div>\
                            </div>\
                            <div class="dislicores-header__container-info-product-mega-menu-inactive col-xs-12 col-sm-6 align-self-center">\
                                <span class="dislicores-header__name-product-mega-menu-inactive c-322616 f-oswald">\
                                    <%= product.productName.toUpperCase() %>\
                                </span>\
                                <span class="dislicores-header__price-product-mega-menu-inactive c-fucsia f-oswald-medium">\
                                    <%= to_money(product.items[0].sellers[0].commertialOffer.Price,true) %>\
                                </span>\
                                <a href="<%= product.link %>" class="dislicores-header__button-product-mega-menu-inactive btn btn-primary">\
                                    Comprar aquí\
                                </a>\
                            </div>\
                        </div>\
                    <% }); %>\
            </figure>\
            '+ this.template_color_filter +'\
    </div>\
    '

    this.mini_cart_not_empty = '\
    <div style="display:none" class="dislicores-mini-cart dislicores-mini-cart--not-empty no-padding col-sm-8 row offset-sm-4 f-oswald c-322616">\
        <div class="dislicores-mini-cart__header col-xs-12 col-sm-12">\
            Tus productos añadidos\
        </div>\
        <div class="dislicores-mini-cart__products-list col-xs-12 col-sm-12">\
            <% products.forEach(function(product,index_){ %>\
                <li class="dislicores-mini-cart__container-product row" data-product="<%= product.id %>" data-sku="<%= product.id %>" data-index="<%= index_ %>">\
                    <figure class="dislicores-mini-cart__container-product-image col-xs-3 col-sm-3">\
                        <img src="<%= product.imageUrl.replace(\'55-55\',\'100-100\') %>">\
                    </figure>\
                    <div class="dislicores-mini-cart__container-product-info col-xs-6 col-sm-6">\
                        <div class="dislicores-mini-cart__product-name">\
                            <%= product.name.toUpperCase() %>\
                        </div>\
                        <div class="dislicores-mini-cart__product-price c-fucsia">\
                            <%= to_money(product.price) %>\
                        </div>\
                    </div>\
                    <div class="dislicores-mini-cart__container-product-quantity col-xs-2 col-sm-2">\
                        <span class="dislicores-mini-cart__product-quantity"><%= product.quantity %></span>\
                        <span class="dislicores-mini-cart__product-quantity-add">+</span>\
                        <span class="dislicores-mini-cart__product-quantity-remove">-</span>\
                    </div>\
                    <div class="col-xs-1 col-sm-1 dislicores-mini-cart__container-product-delete">\
                        <a href="javascript:void(0)" class="dislicores-mini-cart__product-delete f-open-sans">x</a>\
                    </div>\
                </li>\
            <% }); %>\
        </div>\
        <div class="dislicores-mini-cart__totals-list col-xs-12 col-sm-12 row no-margin no-padding">\
            <span class="dislicores-mini-cart__total-label col-xs-6 col-sm-6">Subtotal</span>\
            <span class="dislicores-mini-cart__total-value col-xs-6 col-sm-6 c-fucsia"><%= to_money(get_total_by_id(order.totalizers,\'Items\')) %></span>\
        </div>\
        <a href="/checkout/#cart" class="dislicores-mini-cart__button-to-pay col-xs-12 col-sm-12 no-padding">\
                Ir a pagar\
        </a>\
    </div>\
    '

    this.print_template = function( container,template,data,callback,total_replace ){
        var data = (data) ? data : {}
        var template_tmp = ejs.render(template,data,{context:context_ejs});

        if(total_replace){
            $(container).html( template_tmp )
        }
        else{
            $(container).append( template_tmp )
        }

        if(callback){
            callback()
        }
    }

    var to_money = function( input,not_div_by_100 ){
        if(!not_div_by_100){
            input = input / 100
        }

        var num = input.toString().replace(/\./g,'');

        if(!isNaN(num)){
            num = num.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g,'$1.');
            num = num.split('').reverse().join('').replace(/^[\.]/,'');
            return '$ ' + num;
        }
        else{
            return '$ ' + input.toString().replace(/[^\d\.]*/g,'');
        }
    }

    var context_ejs = function(  ){
        this.to_money = to_money

        this.get_total_by_id = function( list_totals,id_total ){
            var index_total = list_totals.map(function( total ){
                return total.id
            }).indexOf(id_total.toString())

            return ( index_total === -1 ) ? false : list_totals[index_total].value
        }

        this.image_from_masterdata = function( abbr_de,id_register,filename ){
            return 'https://dislicores.vtexcrm.com.br/DynamicForm/GetFile?dataEntityInstanceId=' + abbr_de + '-' + id_register + '&fileName=' + filename;
        }
        return this;
    }()

    return this;
}(window))
