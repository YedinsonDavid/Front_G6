//GET, POST , PUT Y DELETE

function getCategoria (){
    $.ajax({
        url:"http://192.9.152.98:8080/api/Category/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            
            pintarCategoria(respuesta);
        }
    });

}

function postCategoria(){

    if($("#name").val().length==0 || $("#description").val().length==0 ){
        alert("Todos los campos son obligatorios");
    }else{
    
    let cajas = {
        name:$("#name").val(),
        description:$("#description").val()
    };
    $.ajax({
        url:"http://192.9.152.98:8080/api/Category/save",
        type:"POST",
        datatype:"JSON",
        contentType:"application/json; charset=utf-8",
        data: JSON.stringify(cajas),
        success:function(respuesta){
            alert("se creo correctamente la categoria");
            window.location.reload();
    
            }
        });
    }
}

function putCategoria(idDesdeBoton){
    console.log(idDesdeBoton);
    if($("#name").val().length==0 || $("#description").val().length==0 ){
        alert("Todos los campos son obligatorios");
    }else{
    
    let cajas = {
        id:idDesdeBoton,
        name:$("#name").val(),
        description:$("#description").val()
    };
    $.ajax({
        url:"http://192.9.152.98:8080/api/Category/update",
        type:"PUT",
        datatype:"JSON",
        contentType:"application/json",
        data: JSON.stringify(cajas),
        success:function(respuesta){
            alert("se actualizo correctamente la informacion de la categoria");
            window.location.reload();
    
            }
        });
    }
    

}

function deleteCategoria(idDesdeBoton){
  
    let myData={
        id:idDesdeBoton
    };
    $.ajax({
        url:"http://192.9.152.98:8080/api/Category/"+idDesdeBoton,
        type:"DELETE",
        datatype:"JSON",
        data: JSON.stringify(myData),
        contentType:"application/json",
        success:function(respuesta){
            alert("se borro correctamente la categoria");
            window.location.reload();
        }
    });

}

////////////////////////////////////////////

function pintarCategoria(respuesta){
    //console.log(respuesta);
    
    let myTable='<table class="table-auto w-full text-left whitespace-no-wrap">';
        myTable+="<thead>";
        myTable+="<tr>";
        //myTable+="<th class='px-0 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl'>ID</td>";
        myTable+="<th  class='px-0 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl'>NOMBRE</td>";
        myTable+="<th  class='px-0 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl'>DESCRIPCION</td>";
        myTable+="<th  class='px-0 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl'></td>";
        myTable+="<th  class='px-0 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl'></td>";
    for(i=0;i<respuesta.length;i++){        
        myTable+="<tr>";
        //myTable+="<td class='px-4 py-3'>"+respuesta[i].id+"</td>";
        myTable+="<td class='px-4 py-3'>"+respuesta[i].name+"</td>";
        myTable+="<td class='px-4 py-3'>"+respuesta[i].description+"</td>";
        myTable+="<td class='px-4 py-3'> <button class='text-white bg-gray-700 border-0 py-0 px-12 focus:outline-none hover:bg-indigo-600 rounded'  onclick='putCategoria("+respuesta[i].id+")'> Actualizar</button>"
        myTable+="<td class='px-4 py-3'> <button class='text-white bg-gray-700 border-0 py-0 px-12 focus:outline-none hover:bg-indigo-600 rounded' onclick='deleteCategoria("+respuesta[i].id+")'> Borrar</button>"
        myTable+="</tr>";
        myTable+="</thead>";
    }
    myTable+="<td class='px-4 py-3'></td>";
    myTable+="<td class='px-4 py-3'></td>";
    myTable+="<td class='px-4 py-3'></td>";
    myTable+="</table>";
    $("#resultado1").html(myTable);


}