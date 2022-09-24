var dislicoresCategory = (function(window,undefined){

    //init accordion filters
    var accordion_filters = function(){
        $('.search-multiple-navigator fieldset').each(function(index,element){
            if($(this).find('h5').text() == 'Rango de precio'){
                $(this).addClass('exclude-dropdown')
                $(this).find('h5').addClass('exclude-accordion')
                //$(this).find('h5').text('Rango de precio')
                $(this).find('div').addClass('exclude-accordion')
            }
            else{
                $(this).addClass('has-dropdown')
                $(this).find('h5').attr('data-index-accordion',index)
                $(this).find('h5').attr('data-toggle','collapse')
                $(this).find('h5').attr('data-target','.filters-group-' + index)
                $(this).find('h5').attr('data-parent','.search-multiple-navigator')
                    
                $(this).find('div').addClass('filters-group-' + index)
                dislicoresMain.add_class_collapse($(this).find('div'))
                $(this).find('div').attr('data-parent','.search-multiple-navigator')
            }
        })
    }

    var after_filter_action = function( filter,action,forced ){
        var template_filter_result = '\
            <div class="filter-result">\
                <a href="javascript:void(0)" data-url-filter="<%= url_filter %>" class="filter-result__btn-remove">x</a>\
                <%= label_filter %>\
            </div>\
        '
        if($(filter)[0]){
            if(action == 'add'){
                if($(filter).parents('fieldset').hasClass('filtro_color')){
                    var hexa = $(filter).attr('value').toUpperCase()
                    var text_result = (dislicoresMain.wine_colors[ hexa ] ) ? dislicoresMain.wine_colors[ hexa ] : hexa
                }
                else if($(filter).parents('fieldset').hasClass('filtro_rango-de-precio')){
                    var vals_embruto = $(filter).attr('value').replace('[','').replace(']','').split(' TO ')
                    
                    var text_result = dislicoresTemplates.to_money(vals_embruto[0],true) + ' - ' + dislicoresTemplates.to_money(vals_embruto[1],true)
                }
                else{
                    var text_result = $(filter).parent().text()
                }

                $('.result-filters__remove-all').remove()
                dislicoresTemplates.print_template('.result-filters',template_filter_result,{
                    url_filter : $(filter).attr('rel'),
                    label_filter : text_result
                },function(){
                    $('.result-filters .filter-result__btn-remove').unbind('click').click(function(){
                        $('input[rel="' + $(this).attr('data-url-filter') + '"]').parent().trigger('click')
                    })
                })
                $('.result-filters').append('<a href="javascript:dislicoresCategory.remove_all_filters(0)" class="result-filters__remove-all">Borrar todo</a>')
                
            }
            else{
                $('.result-filters').find('[data-url-filter="' + $(filter).attr('rel') + '"]').parent().fadeOut().remove()
                if($('.result-filters .filter-result').length == 0){
                    $('.result-filters__remove-all').remove()
                }
            }
        }
    }

    var init_smart_research = function(){
        $(".filters-section input[type='checkbox']").vtexSmartResearch({
            loadContent:".vitrine-container[id^=ResultItems]",
            shelfClass:".vitrine-container",
            elemLoading:'<div id="scrollLoading">' + dislicoresTemplates.spinner_border + ' <span class="f-oswald text-pre-loading-sr">Cargando</span></div>',
            emptySearchMsg:'<div class="f-oswald c-322616">No hay resultados para esta combinación de filtros</div>',
            filterCallback : after_filter_action,
            shelfCallback : function(){
                AvailabilityCitiyVtex.check_vitrines()
                dislicoresMain.general_functions_vitrine()
            },
            ajaxCallback:function(){
                AvailabilityCitiyVtex.check_vitrines()
                dislicoresMain.general_functions_vitrine()
            }
        })
    }

    var order_by = function(){
        var dropdowm_template = '\
            <div class="dropdown-menu" aria-labelledby="dropdown-order-by">\
                <% items_dropdown.forEach(function( item_dropdown,index_item ){%>\
                    <a class="dropdown-item" href="<%= item_dropdown.link %>" data-index-item-dropdown="<%= index_item %>">\
                        <%= item_dropdown.text %>\
                    </a>\
                <% }) %>\
            </div>\
        '

        $('.orderBy:first').addClass('dropdown')
        $('.orderBy:first label').addClass('dropdown-toggle')
        $('.orderBy:first label').attr('data-toggle','dropdown')
        $('.orderBy:first label').attr('aria-haspopup','true')
        $('.orderBy:first label').attr('aria-expanded','false')
        $('.orderBy:first label').attr('id','dropdown-order-by')
    
        var items_dropdown = []
        $('.orderBy:first select option').each(function(){
            if($(this).attr('value') != ''){
                var link_tmp_text = $(this).parent().attr('onchange').replace('this.options[this.selectedIndex].value',"'" + $(this).attr('value') + "'").replace('window.location.href=','').trim()
                
                items_dropdown.push({
                    link : eval(link_tmp_text),
                    text : $(this).text()
                })
            }
        })

        dislicoresTemplates.print_template('.orderBy',dropdowm_template,{
            items_dropdown : items_dropdown
        })
    }

    var modify_number_columns = function(){
        $('.filterBy').addClass('loaded')
        $('.filterBy').append('\
            <a class="modify-grid active" data-columns="4"><i class="icon-grid-by-4"></i></a>\
            <a class="modify-grid" data-columns="3"><i class="icon-grid-by-3"></i></a>\
        ')

        $('.filterBy .modify-grid').click(function(){
            $('.filterBy .modify-grid').removeClass('active')
            $(this).addClass('active')

            var new_width = 100 / $(this).attr('data-columns')

            $('[layout]').css('-ms-flex','0 0 ' + new_width + '%')
            $('[layout]').css('flex','0 0 ' + new_width + '%')
            $('[layout]').css('max-width',new_width + '%')
        })
    }

    var filterByPrice = function(){
        //console.log('filter element',$('.filtro_rango-de-precio')[0])
        $('<div id="priceFilterLabels" class="exclude-accordion"></div><div id="slider-range-price" class="exclude-accordion"></div>').appendTo($('.filtro_rango-de-precio'))
		//jQuery('body').changes(function(changes, observer) {
			if (jQuery(".filtro_rango-de-precio label")[0] && !jQuery(".filtro_rango-de-precio").hasClass('loaded')) {
				if (window.matchMedia('(max-width: 992px)').matches){
					$('.filterByPrice').parent().insertAfter($('[class*="filtro_"]:last'))
					$('.filterByPrice').addClass('active')
					//console.log('Esto es un dispositivo móvil');
				}

				jQuery(".filtro_rango-de-precio").addClass('loaded');
				// Algoritmo para encontrar el numero cercano. by Santiago Power Code jaja
				var array_min = [];
				var array_max = [];
                var array_clasess = [];
                var ranges_price_min = [];
                var ranges_price_max = [];
				// Se obtienen todos los valores de precios activos en la vitrina
				jQuery(".filtro_rango-de-precio label").each(function(){
					var gettingNumberMin = jQuery(this).find("input").val();
						gettingNumberMin = Number(gettingNumberMin.substring(0, gettingNumberMin.indexOf('TO')).replace("[",""));
						array_min.push(gettingNumberMin);

					var gettingNumber = jQuery(this).find("input").val();
						gettingNumber = Number(gettingNumber.substring(gettingNumber.indexOf("TO") + 2).replace("]",""));
                        array_max.push(gettingNumber);
                        
                    ranges_price_min.push(gettingNumberMin)
                    ranges_price_max.push(gettingNumber)
                });
                //console.log('array min',array_min,'array max',array_max)
				var min_price;
				var max_price;
				min_price = jQuery(".filtro_rango-de-precio label").first().find("input").val();
				min_price = Number(min_price.substring(0, min_price.indexOf('TO')).replace("[",""));
				max_price = jQuery(".filtro_rango-de-precio label").last().find("input").val();
				max_price = Number(max_price.substring(max_price.indexOf("TO") + 2).replace("]",""));
				// Busca valor mas cercano al array
				function closest(array,num){
				    var i=0;
				    var minDiff=max_price; // valor maximo en los filtros
				    var ans;
				    for(i in array){
				         var m=Math.abs(num-array[i]);
				         if(m<minDiff){ 
				                minDiff=m; 
				                ans=array[i]; 
				            }
				      }
				    return ans;
				}
				
				//console.log( closest(array_test,12000) );
				var algoritmoGetPrice = 'sr_['+'-to-'+']';

				// Slider aqui
				var slider = document.getElementById('slider-range-price');
				noUiSlider.create(slider, {
					start: [min_price, max_price],
					connect: true,
					range: {
                        min : ranges_price_min,
                        max : ranges_price_max
                    }
				});
				slider.noUiSlider.on('change.one', function (value) {
                    var min_value = parseInt(value[0].replace('.00',''))
                    var max_value = parseInt(value[1].replace('.00',''))

					jQuery("fieldset.filtro_rango-de-precio label").each(function(){
						if (jQuery(this).find("input").prop('checked')) {
							jQuery(this).trigger("click");
						}
					});

                    var filters_click = []
                    var count_selected_range = 0
                    //console.log('min value',min_value,max_value)
					jQuery(".filtro_rango-de-precio label").each(function(){
                        var embruto_label = $(this).attr('title').replace('[','').replace(']','')
                        var values_label = embruto_label.split(' TO ')

                        if(min_value == max_value){
                            console.log('si son iguales y qué',min_value,min_value == parseInt(values_label[0]),parseInt(values_label[0]),min_value == parseInt(values_label[1]),parseInt(values_label[1]))
                            if(min_value == parseInt(values_label[0]) || min_value == parseInt(values_label[1])){
                                count_selected_range++
                                filters_click.push('[title="' + $(this).attr('title') + '"]')
                            }
                        }
                        else{
                            if( parseInt(values_label[0]) >= min_value && parseInt(values_label[1]) <= max_value){
                            
                                count_selected_range++
                                filters_click.push('[title="' + $(this).attr('title') + '"]')
                            }
                        }
                        
                    }); // each after stop
                    setTimeout(function(){
                        filters_click = filters_click.join(',')
                        jQuery(".filtro_rango-de-precio label input:checked").trigger('click').trigger('change')

                        if(count_selected_range < jQuery(".filtro_rango-de-precio label").length){
                            jQuery(filters_click).trigger('click').trigger('change')
                        } 

                        $('.btn-close-filters-mobile').trigger('click');
                    },200)
                    
				});
				slider.noUiSlider.on('update', function (value) {
					var valMin = Number(value[0]);
					var valMax = Number(value[1]);
						valMin = valMin.toString().replace(".00","");
						valMax = valMax.toString().replace(".00","");
					jQuery("#priceFilterLabels").text(dislicoresTemplates.to_money(valMin,true)+" - "+dislicoresTemplates.to_money(valMax,true));
				});
				jQuery("#priceFilterLabels").text(dislicoresTemplates.to_money(min_price,true)+" - "+dislicoresTemplates.to_money(max_price,true));

			}
		//}); 

    } // filterByPrice
    
    var search_for_filter = function( element_filter ){
        var template_search_form = '\
            <form class="search-for-filter">\
                <input type="text" class="search-for-filter__term">\
                <a href="javascript:void(0)" class="search-for-filter__button"><i class="icon-search"></i></a>\
            </form>\
        '
        
        $(template_search_form).prependTo($(element_filter).find('div'))

        $('.search-for-filter__term').keydown(function(){
            var auto_ref = $(this)
            setTimeout(function(){
                if($('.search-for-filter__term').attr('value').trim().length == 0 || $('.search-for-filter__term').attr('value').trim().length >= 3){
                    $(auto_ref).parents('.search-for-filter').trigger('submit')
                }
            },200)
            
        })

        $('.search-for-filter__button').unbind('click').click(function(){
            $(this).parents('.search-for-filter').trigger('submit')
        })

        $('.search-for-filter').unbind('submit').submit(function( event ){
            event.preventDefault();
            var valor_busqueda = $(this).find('.search-for-filter__term').attr('value').trim()

            if(valor_busqueda == ''){
                console.log('valor de busqueda vacío')
                $(this).parent().find('label').fadeIn('fast')
            }
            else{
                $(this).parent().find('label').fadeOut('fast');
            
                $(this).parent().find('label').filter(function(){
                    var expresion_regular = new RegExp(valor_busqueda, 'i');
                    return expresion_regular.test($(this).text());
                }).fadeIn('fast')
            }
            
        })
    }

    var remove_all_filters = function(){
        $('.search-multiple-navigator fieldset input').attr('checked',false).trigger('change')
        $('#slider-range-price')[0].noUiSlider.reset()
    }

    var filters_mobile = function(){
        console.log('pasamos acá')
        //$('.filters-section').append('<a href="javascript:void(0)" class="btn-search-filters-mobile btn btn-secondary gray">Buscar</a>')
        $('.filters-section').prepend('<a href="javascript:void(0)" class="btn-close-filters-mobile">Buscar<i class="icon-angle-up"></i></a>')
        $('.filters-section').css('top',$('.dislicores-header').height() + 'px')

        $('.btn-filters-mobile').click(function(){
            $('.filters-section').slideDown()
            $('.dislicores-header').css('position','fixed')
            $('.dislicores-header').css('z-index','4')
        })

        $('.btn-search-filters-mobile,.btn-close-filters-mobile').click(function(){
            $('.filters-section').slideUp()
            $('.dislicores-header').css('position','')
            $('.dislicores-header').css('z-index','')
        })
    }

    var picker_color = function(){
        $('.filtro_color>div label').each(function(){
            var color_text = $(this).attr('title').toUpperCase()

            if(dislicoresMain.wine_colors[ color_text ]){
                var content_html = '\
                    <span class="color" style="background-color:' + color_text + '"></span>\
                    <span class="text">' + dislicoresMain.wine_colors[ color_text ] + '</span>\
                '
                $(this).append( content_html )     
            }
        })
    }

    var init = function(){
        accordion_filters()
        init_smart_research()
        order_by()
        modify_number_columns()

        /*if($('.filtro_color')[0]){
            picker_color()
        }*/
        if($('.filtro_rango-de-precio')[0]){
            filterByPrice()
        }
        $('.filters-section').addClass('filters-section--active')
        //$('.filtro_marca h5').trigger('click')
        if($('.filtro_marca')[0]){
            search_for_filter( $('.filtro_marca') )
        }
        
        if(dislicoresMain.is_mobile()){
            filters_mobile()
        }
    }

    return {
        init : init,
        remove_all_filters : remove_all_filters
    }
}(window))

$(document).ready(function(){
    dislicoresCategory.init()

    $(document).on("click", ".search-multiple-navigator .refino-marca label, .search-multiple-navigator .filtro_pais-de-origen label, .search-multiple-navigator .filtro_tipo label", function(e){

        $('.btn-close-filters-mobile').trigger('click');
    });


    //Si la url viene desde el quiz
    var queryString = window.location.search;
    var urlParams   = new URLSearchParams(queryString);
    var if_quiz = urlParams.get('filter_quiz');

    if(if_quiz){
        $('title').text('Resultado Quiz - Dislicores');
        $('#category-page').addClass('is_quiz');
    }
    //Si la url viene desde el quiz
    
})