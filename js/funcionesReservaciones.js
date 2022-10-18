//GET, POST , PUT Y DELETE

function getReservaciones (){
    $.ajax({
        url:"http://192.9.152.98:8080/api/Reservation/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            
            pintarReservaciones(respuesta);
        }
    });

}

function postReservaciones(){
    if($("#startDate").val().length==0 || $("#devolutionDate").val().length==0 ){
        alert("Todos los campos son obligatorios");
    }else{
    
    let cajas = {
        startDate:$("#startDate").val(),
        devolutionDate:$("#devolutionDate").val(),
        status:$("#status").val(),
        client:{idClient: +$("#select-client").val()},
        machine:{id: +$("#select-machine").val()}
    };
    $.ajax({
        url:"http://192.9.152.98:8080/api/Reservation/save",
        type:"POST",
        datatype:"JSON",
        contentType:"application/json; charset=utf-8",
        data: JSON.stringify(cajas),
        success:function(respuesta){
            alert("se creo correctamente la reserva");
            window.location.reload();
    
        }
    });
    }

}

function putReservaciones(idDesdeBoton){
    console.log(idDesdeBoton);
    if($("#startDate").val().length==0 || $("#devolutionDate").val().length==0 ){
        alert("Todos los campos son obligatorios");
    }else{
    
    let cajas = {
        idReservation:idDesdeBoton,
        startDate:$("#startDate").val(),
        devolutionDate:$("#devolutionDate").val(),
        status:$("#status").val(),
        client:{idClient: +$("#select-client").val()},
        machine:{id: +$("#select-machine").val()}
    };
    $.ajax({
        url:"http://192.9.152.98:8080/api/Reservation/update",
        type:"PUT",
        datatype:"JSON",
        contentType:"application/json",
        data: JSON.stringify(cajas),
        success:function(respuesta){
            alert("se actualizo correctamente la informacion de la reservation");
            window.location.reload();
    
            }
        });
    }
}

function deleteReservaciones(data){
    console.log(data);
    let myData={
        id:data
    };
    $.ajax({
        url:"http://192.9.152.98:8080/api/Reservation/"+data,
        type:"DELETE",
        datatype:"JSON",
        data: JSON.stringify(myData),
        contentType:"application/json",
        success:function(respuesta){
            alert("se borro correctamente la reservacion");
            window.location.reload();
        }
    });

}
//////////////////////////////////////////////
function  pintarReservaciones(json_maquinas){

    myTable='<table class="table-auto w-full text-left whitespace-no-wrap">';
        myTable+="<thead>";
        myTable+="<tr>";
        myTable+="<th  class='px-0 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl'>FECHA INICIO</td>";
        myTable+="<th  class='px-0 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl'>FECHA DEVOLUCION</td>";
        myTable+="<th  class='px-0 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl'>ESTADO DE LA RESERVACION</td>";
        myTable+="<th  class='px-0 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl'>MAQUINA</td>";
        myTable+="<th  class='px-0 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl'>CLIENTE</td>";
        myTable+="<th  class='px-0 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl'></td>";
        myTable+="<th  class='px-0 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl'></td>";
    
    for(i=0;i<json_maquinas.length;i++){
        myTable+="<tr>";
        myTable+="<td class='py-3'>"+json_maquinas[i].startDate+"</td>";
        myTable+="<td class='py-3'>"+json_maquinas[i].devolutionDate+"</td>";
        myTable+="<td class='py-3'>"+json_maquinas[i].status+"</td>";
        myTable+="<td class='py-3'>"+json_maquinas[i].machine.name+"</td>";
        myTable+="<td class='py-3'>"+json_maquinas[i].client.name+"</td>";
        myTable+="<td class='py-3'> <button class='text-white bg-gray-700 border-0 py-1 px-3 focus:outline-none hover:bg-indigo-600 rounded' onclick='putReservaciones("+json_maquinas[i].idReservation+")'> Actualizar</button>"
        myTable+="<td class='py-3'> <button class='text-white bg-gray-700 border-0 py-1 px-3 focus:outline-none hover:bg-indigo-600 rounded' onclick='deleteReservaciones("+json_maquinas[i].idReservation+")'> Borrar</button>"
        myTable+="</tr>";
        myTable+="</thead>";
    }
    myTable+="<td class='px-4 py-3'></td>";
    myTable+="<td class='px-4 py-3'></td>";
    myTable+="<td class='px-4 py-3'></td>";
    myTable+="</table>";
    $("#resultado1").html(myTable);
}

///////////////////////////////////////////////

function getClient_Reservation(){
    $.ajax({
        url:"http://192.9.152.98:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            let $select = $("#select-client");
            $.each(respuesta, function(id, name){
                $select.append('<option value='+name.idClient+'>'+name.name+'</option>' )
            })
        }
    });
}

function getMachine_Reservation(){
    $.ajax({
        url:"http://192.9.152.98:8080/api/Machine/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            let $select = $("#select-machine");
            $.each(respuesta, function(id, name){
                $select.append('<option value='+name.id+'>'+name.name+'</option>' )
            })
        }
    });
    
}