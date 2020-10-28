/*
	
*/
	var opcionesList = [];
	 opcionesList["movil"] = [];
	 opcionesList["fijo"] = [];
	var regsXPag = 10
	var pagActual_movil = 0;
	var pagActual_fijo = 0;

	var token = "M7N1ucgy5WiYurutTpSQLlEXj";
	var paramMovil = { 	
						url :"https://www.datos.gov.co/resource/6msf-tmbd.json",
						data: { '$limit' : regsXPag, 
								'$offset' : pagActual_movil,
								'$$app_token' : token
						  	},
						tipo : 'movil',
						verCuerpo : true,
				};
	var paramFijo = { 
						url :"https://www.datos.gov.co/resource/rcst-xw55.json",
						data: { '$limit' : regsXPag	, 
								'$offset' : pagActual_fijo,
								'$$app_token' : token
						  	},
						tipo :'fijo',
				};

	


	function getData(param){
		var data = null;
			$.ajax({
					async:false,
				    url: param['url'],
				    type: "GET",
				    data: param['data'],
				    success: function(data) {
	      					mostrarTabla(data, param['tipo']);
	      				
	    			},
				});
	}

	function getDataCount(contenedor){
		paramFiltros = contenedor == 'movil' ? paramMovil :paramFijo
		paramFiltros.data = { '$select' : 'count(a_o)', '$$app_token' : token  };
		getDataGen(paramFiltros)
	}

	function getDataGen(param){
		var data = null;
			$.ajax({
					async:false,
				    url: param['url'],
				    type: "GET",
				    data: param['data'],
				    success: function(data) {
				    	mostrarPaginado(data, param['tipo'])
	    			},
				});
	}

	function mostrarPaginado (data, contenedor){

		//console.log(data[0].count_a_o/regsXPag)
		nPags = Math.round(data[0].count_a_o/regsXPag);
		$('#npaginas_'+contenedor).val(nPags);

	}

	function mostrarTabla (data, tipo)
	{
		//$('#tabla_movil > tbody ').html("");
		$.each( data, function( id, row ) {
			$('#tabla_'+tipo+' > tbody').append("<tr></tr>");
	           	$.each( row, function( key, value ) {
	           		$('#tabla_'+tipo+' > tbody > tr:last').append("<td>"+value+"</td>");
	           		
	        	});
	        
	        });
	}

	function avanzarPagina(control , contenedor){
		paramFiltros = contenedor == 'movil' ? paramMovil :paramFijo
		
		if (contenedor == 'movil'){
			if(control == '-0')
				pagActual_movil = 0;
			if(control == '1')
				pagActual_movil = pagActual_movil +1;
			if(control == '-1' && pagActual_movil > 0)
				pagActual_movil = pagActual_movil -1;
			if(control == "0")
				pagActual_movil = $('#npaginas_movil').val();

		}
		if (contenedor == 'fijo'){
			if(control == '-0')
				pagActual_fijo = 0;
			if(control == '1')
				pagActual_fijo = pagActual_fijo +1;
			if(control == '-1' && pagActual_fijo > 0)
				pagActual_fijo = pagActual_fijo -1;
			if(control == "0")
				pagActual_fijo = $('#npaginas_movil').val();

		}

		paginaBuscar = contenedor == 'movil' ? pagActual_movil :pagActual_fijo

		paramFiltros.data = { 	'$limit' : regsXPag, 
								'$offset' : paginaBuscar,
								'$$app_token' : token
						  	}
		$('#tabla_'+contenedor+' > tbody ').html("")
		getData(paramFiltros)
		$("#pagina_"+contenedor).val(paginaBuscar)

	}

	function getSelectorData (contenedor){
		paramFiltros = contenedor == 'movil' ? paramMovil :paramFijo

		$( "#filtro_"+contenedor+" :input" ).each(function( index ) {
			paramFiltros.data = { '$select' : 'distinct '+$( this ).attr("name"), '$$app_token' : token };

			$.ajax({
					async:false,
				    url: paramFiltros['url'],
				    type: "GET",
				    data: paramFiltros['data'],
				    success: function(data) {
				    	miData = data;
				    	$.each( data, function( id, row ) {
							$.each( row, function( key, value ) {
								$('#tabla_'+contenedor +' #'+key ).append("<option value='"+value+"'>"+value+"</option>");
							});
			
						});
				    	
	    			},
				});
  				
		});
	}

	function aplicarFiltro(contenedor){
		strQuery = "";
		paramFiltros = contenedor == 'movil' ? paramMovil :paramFijo
		pagActual_movil = contenedor == 'movil' ? 0: pagActual_movil;
		pagActual_fijo = contenedor == 'fijo' ? 0 :pagActual_fijo;
		paginaBuscar = contenedor == 'movil' ? pagActual_movil :pagActual_fijo

		$( "#filtro_"+contenedor+" :input" ).each(function( index ) {
			if( $(this).val() != "--"){
				strQuery += $( this ).attr("name") +"='"+$(this).val() +"'&"
				console.log(strQuery)
			}	
		});
		console.log(strQuery);
		console.log( strQuery.slice(0, -1))
		$('#tabla_'+contenedor+' > tbody ').html("")
		paramFiltros.data = { 	//'$limit' : regsXPag, 
								//'$offset' : paginaBuscar,
								'$$app_token' : token,
								'$where' : strQuery.slice(0, -1)
						  	}
		getData(paramFiltros)
	}

	(function($) {

		dataMoviles = getData(paramMovil);
		getDataCount('movil')
		getSelectorData('movil')
		//console.log(dataMoviles);
		dataFijo = getData(paramFijo);
		getDataCount('fijjo')
		getSelectorData('fijo')
		//console.log(dataFijo);
		/*paramMovil.data['$limit'] = '100'
		dataMoviles = getData(paramMovil);*/

	})(jQuery);
