//GET, POST , PUT Y DELETE

function getMensajes(){
    $.ajax({
        url:"http://192.9.152.98:8080/api/Message/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            
            pintarMensajes(respuesta);
        }
    });
}

function postMensajes(){
    if($("#messageText").val().length==0 ){
        alert("Todos los campos son obligatorios");
    }else{
    let cajas = {
        messageText:$("#messageText").val(),
        client:{idClient: +$("#select-client").val()},
        machine:{id: +$("#select-machine").val()}        
    };
    //console.log(cajas);
    $.ajax({
        url:"http://192.9.152.98:8080/api/Message/save",
        type:"POST",
        datatype:"JSON",
        contentType:"application/json; charset=utf-8",
        data: JSON.stringify(cajas),
        success:function(respuesta){
            alert("se creo correctamente el mensaje");
            window.location.reload();
    
        }
    });
    }
}

function putMensajes(idDesdeBoton){
    //console.log(idDesdeBoton);
    if($("#messageText").val().length==0 ){
        alert("Todos los campos son obligatorios");
    }else{
    
    let cajas = {
        idMessage:idDesdeBoton,
        messageText:$("#messageText").val(),
        machine:{id: +$("#select-machine").val()},
        client:{idClient: +$("#select-client").val()}      
    };
    
    $.ajax({
        url:"http://192.9.152.98:8080/api/Message/update",
        type:"PUT",
        datatype:"JSON",
        contentType:"application/json",
        data: JSON.stringify(cajas),
        success:function(respuesta){
            alert("se actualizo correctamente la informacion del mensaje");
            window.location.reload();    
            }
        });
    }
}

function deleteMensajes(idDesdeBoton){
    let myData={
        idMessage:idDesdeBoton
    };
    //console.log(myData);
    $.ajax({
        url:"http://192.9.152.98:8080/api/Message/"+idDesdeBoton,
        type:"DELETE",
        datatype:"JSON",
        data: JSON.stringify(myData),
        contentType:"application/json",
        success:function(respuesta){
            alert("se borro correctamente el mensaje");
            window.location.reload();
        }
    }); 
}


////////////////////////////////////////////

function pintarMensajes(respuesta){
   
    let myTable='<table class="table-auto w-full text-left whitespace-no-wrap">';
        myTable+="<thead>";
        myTable+="<tr>";
        myTable+="<th  class='px-0 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl'>MENSAJE</td>";
        myTable+="<th  class='px-0 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl'>MAQUINA</td>";
        myTable+="<th  class='px-0 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl'>CLIENTE</td>";
        myTable+="<th  class='px-0 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl'></td>";
        myTable+="<th  class='px-0 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl'></td>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td class='px-4 py-3'>"+respuesta[i].messageText+"</td>";
        myTable+="<td class='px-4 py-3'>"+respuesta[i].machine.name+"</td>";
        myTable+="<td class='px-4 py-3'>"+respuesta[i].client.name+"</td>";
        myTable+="<td class='px-4 py-3'> <button class='text-white bg-gray-700 border-0 py-0 px-12 focus:outline-none hover:bg-indigo-600 rounded' onclick='putMensajes("+respuesta[i].idMessage+") '> Actualizar</button>"
        myTable+="<td class='px-4 py-3'> <button class='text-white bg-gray-700 border-0 py-0 px-12 focus:outline-none hover:bg-indigo-600 rounded' onclick='deleteMensajes("+respuesta[i].idMessage+")'> Borrar</button>"
        myTable+="</tr>";
        myTable+="</thead>";
    }
    myTable+="<td class='px-4 py-3'></td>";
    myTable+="<td class='px-4 py-3'></td>";
    myTable+="<td class='px-4 py-3'></td>";
    myTable+="</table>";
    $("#resultado1").html(myTable);
    
}

function getMachine_Message(){
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

function getClient_Message(){
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