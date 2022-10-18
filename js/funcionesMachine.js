//GET, POST , PUT Y DELETE

function getMachine (){
    $.ajax({
        url:"http://192.9.152.98:8080/api/Machine/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){            
            pintarMachine(respuesta);
        }
    });

}

function postMachine(){
    let cajas = {
        name:$("#name").val(),
        brand:$("#brand").val(),
        year:$("#year").val(),
        description:$("#description").val(),
        category:{id: +$("#select-categoria").val()}
        
    };
    //console.log(cajas);
    $.ajax({
        url:"http://192.9.152.98:8080/api/Machine/save",
        type:"POST",
        datatype:"JSON",
        contentType:"application/json; charset=utf-8",
        data: JSON.stringify(cajas),
        success:function(respuesta){
            alert("se creo correctamente la maquina");
            window.location.reload();    
        }
    });

}


function putMachine(idDesdeBoton){
    //console.log(idDesdeBoton);
    if($("#name").val().length==0 || $("#brand").val().length==0 || $("#year").val().length==0 || $("#description").val().length==0){
        alert("Todos los campos son obligatorios");
    }else{
    
    let cajas = {
        id:idDesdeBoton,
        name:$("#name").val(),
        brand:$("#brand").val(),
        year:$("#year").val(),
        description:$("#description").val(),
        category:{id: +$("#select-categoria").val()}
    };
    //console.log(cajas);
    $.ajax({
        url:"http://192.9.152.98:8080/api/Machine/update",
        type:"PUT",
        datatype:"JSON",
        contentType:"application/json",
        data: JSON.stringify(cajas),
        success:function(json_maquinas){
            alert("se actualizo correctamente la informacion de la maquina");
            window.location.reload();
    
            }
        });
    }  

}


function deleteMachine(idDesdeBoton){
  
    let myData={
        id:idDesdeBoton
    };
    $.ajax({
        url:"http://192.9.152.98:8080/api/Machine/"+idDesdeBoton,
        type:"DELETE",
        datatype:"JSON",
        data: JSON.stringify(myData),
        contentType:"application/json",
        success:function(json_maquinas){
            alert("se borro correctamente la categoria");
            window.location.reload();
        }
    });

}

////////////////////////////////////////////////////////

function pintarMachine(json_maquinas){
    
    let myTable='<table class="table-auto w-full text-left whitespace-no-wrap">';
        myTable+="<thead>";
        myTable+="<tr>";
        myTable+="<th  class='px-0 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl'>NOMBRE</td>";
        myTable+="<th  class='px-0 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl'>MARCA</td>";
        myTable+="<th  class='px-0 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl'>AÑO</td>";
        myTable+="<th  class='px-0 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl'>DESCRIPCION</td>";
        myTable+="<th  class='px-0 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl'>CATEGORIA</td>";
        myTable+="<th  class='px-0 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl'></td>";
        myTable+="<th  class='px-0 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl'></td>";
    for(i=0;i<json_maquinas.length;i++){
        myTable+="<tr>";
        myTable+="<td class='px-4 py-3'>"+json_maquinas[i].name+"</td>";
        myTable+="<td class='px-4 py-3'>"+json_maquinas[i].brand+"</td>";
        myTable+="<td class='px-4 py-3'>"+json_maquinas[i].year+"</td>";
        myTable+="<td class='px-4 py-3'>"+json_maquinas[i].description+"</td>";
        myTable+="<td class='px-4 py-3'>"+json_maquinas[i].category.name+"</td>";
        myTable+="<td class='px-4 py-3'> <button class='text-white bg-gray-700 border-0 py-0 px-12 focus:outline-none hover:bg-indigo-600 rounded' onclick='putMachine("+json_maquinas[i].id+")'> Actualizar</button>"
        myTable+="<td class='px-4 py-3'> <button class='text-white bg-gray-700 border-0 py-0 px-12 focus:outline-none hover:bg-indigo-600 rounded' onclick='deleteMachine("+json_maquinas[i].id+")'> Borrar</button>"
        myTable+="</tr>";        
        myTable+="</thead>";
    }
    myTable+="<td class='px-4 py-3'></td>";
    myTable+="<td class='px-4 py-3'></td>";
    myTable+="<td class='px-4 py-3'></td>";
    myTable+="</table>";
    $("#resultadoMachine").html(myTable);

}

function getCategoria_Machine(){
    $.ajax({
        url:"http://192.9.152.98:8080/api/Category/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            //console.log(respuesta);
            let $select = $("#select-categoria");
            $.each(respuesta, function(id, name){
                $select.append('<option value='+name.id+'>'+name.name+'</option>' )
                
            })
        }
    });
}