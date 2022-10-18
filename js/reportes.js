function traerReporteStatus(){
    $.ajax({
        url:"http://192.9.152.98:8080/api/Reservation/report-status",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta)
            pintarStatus(respuesta);
        }
    });
}

function traerReportesFechas(){

    //let starDate = document.getElementById("starDate").value;
    //let finalDate = document.getElementById("finalDate").value;

    let starDate = $("#starDate").val();
    let finalDate = $("#finalDate").val();

    console.log(starDate);
    console.log(finalDate);
    
    $.ajax({
        url:"http://192.9.152.98:8080/api/Reservation/report-dates/"+starDate+"/"+finalDate,
        //url:"http://192.9.152.98:8080/api/Reservation/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarFecha(respuesta);
        }
    });
}

function traerReportesClientes(){
    
    $.ajax({
        url:"http://192.9.152.98:8080/api/Reservation/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarClientes(respuesta);
        }
    });
}

////////////////////funciones pintar///////////////

function  pintarStatus(json_maquinas){

    myTable='<table class="table-auto w-full text-left whitespace-no-wrap">';
        myTable+="<thead>";
        myTable+="<tr>";
        myTable+="<th  class='px-0 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl'>COMPLETADAS</td>";
        myTable+="<th  class='px-0 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl'>CANCELADAS</td>";
        myTable+="<th  class='px-0 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl'></td>";
        myTable+="<th  class='px-0 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl'></td>";
    
    if(json_maquinas.completed==0 && json_maquinas.cancelled==0){
        alert("No hay Reservaciones");
    }else{    
        myTable+="<tr>";
        //myTable+="<td>Completadas </td>";
        myTable+="<td class='py-3'>"+json_maquinas.completed+"</td>";
        //myTable+="</tr>";
        //myTable+="<td>Canceladas </td>";
        myTable+="<td class='py-3'>"+json_maquinas.cancelled+"</td>";
        myTable+="</tr>";
        myTable+="</thead>";
    }
    myTable+="</table>";
    $("#resultadoStatus").html(myTable);
}

function  pintarFecha(respuesta){

    let completadas = 0;
    let canceladas = 0;

    
    myTable='<table class="table-auto w-full text-left whitespace-no-wrap">';
        myTable+="<thead>";
        myTable+="<tr>";
        myTable+="<th  class='px-0 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl'>FECHA INICIO</td>";
        myTable+="<th  class='px-0 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl'>FECHA DEVOLUCION</td>";
        myTable+="<th  class='px-0 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl'>ESTADO DE LA RESERVA</td>";
        myTable+="<th  class='px-0 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl'></td>";
        myTable+="<th  class='px-0 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl'></td>";
    for(i=0;i<respuesta.length;i++){
        if(respuesta[i].status == "cancelled"){
            canceladas++;
        }else{
            completadas++;
        }
        
        myTable+="</tr>";
        myTable+="<td>"+respuesta[i].startDate+"</td>";       
        myTable+="<td>"+respuesta[i].devolutionDate+"</td>";
        myTable+="<td>"+respuesta[i].status+"</td>";
        myTable+="</tr>";
        myTable+="</thead>";
    
}
    if(completadas==0 && canceladas==0){
        alert("No hay Reservaciones");
    }else{
    myTable+="<tr>";
    myTable+="<td>Total "+completadas+" Completadas</td>";
    myTable+="<tr>";
    myTable+="<td>Total "+canceladas+" Canceladas</td>";
    }    
    myTable+="</tr>";

    myTable+="</table>";
    $("#resultadoFechas").html(myTable);
}

function  pintarClientes(respuesta){

    let completadas = 0;
    let canceladas = 0;

    myTable='<table class="table-auto w-full text-left whitespace-no-wrap">';
        myTable+="<thead>";
        myTable+="<tr>";
        myTable+="<th  class='px-0 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl'>NOMBRE</td>";
        myTable+="<th  class='px-0 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl'>EMAIL</td>";
        myTable+="<th  class='px-0 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl'>ESTADO DE LA RESERVA</td>";
        myTable+="<th  class='px-0 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl'></td>";
        myTable+="<th  class='px-0 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl'></td>";
    for(i=0;i<respuesta.length;i++){
        if(respuesta[i].status == "cancelled"){
            canceladas++;
        }else{
            completadas++;
        }
        
        myTable+="</tr>";
        myTable+="<td>"+respuesta[i].client.name+"</td>";
        myTable+="<td>"+respuesta[i].client.email+"</td>";
        myTable+="<td>"+respuesta[i].status+"</td>";
        myTable+="</tr>";
    }
    if(completadas==0 && canceladas==0){
        alert("No hay Reservaciones");
    }else{
    myTable+="<tr>";
    myTable+="<td>Total "+completadas+" Completadas</td>";
    myTable+="<tr>";
    myTable+="<td>Total "+canceladas+" Canceladas</td>";
    }    
    myTable+="</tr>";

    myTable+="</table>";
    $("#resultadoClientes").html(myTable);
}


//////////////////////////////////

