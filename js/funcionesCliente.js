//GET, POST , PUT Y DELETE

function getCliente (){
    $.ajax({
        url:"http://192.9.152.98:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){   
            pintarCliente(respuesta);
        }
    });

}

function postCliente(){
    if($("#email").val().length==0 || $("#password").val().length==0 || $("#name").val().length==0 || $("#age").val().length==0 ){
        alert("Todos los campos son obligatorios");
    }else{
    let cajas = {
        email:$("#email").val(),
        password:$("#password").val(),
        name:$("#name").val(),
        age:$("#age").val()
    };
    $.ajax({
        url:"http://192.9.152.98:8080/api/Client/save",
        type:"POST",
        datatype:"JSON",
        contentType:"application/json; charset=utf-8",
        data: JSON.stringify(cajas),
        success:function(respuesta){
            alert("se registro correctamente el cliente");
            window.location.reload();
    
        }
    });
    }
}


function putCliente(idDesdeBoton){
    console.log(idDesdeBoton);
    if($("#email").val().length==0 || $("#password").val().length==0 || $("#name").val().length==0 || $("#age").val().length==0 ){
        alert("Todos los campos son obligatorios");
    }else{
    
    let cajas = {
        idClient:idDesdeBoton,
        name:$("#name").val(),
        email:$("#emaila").val(),
        age:$("#age").val(),
        password:$("#password").val()
        
        
    };
    console.log(cajas);
    $.ajax({
        url:"http://192.9.152.98:8080/api/Client/update",
        type:"PUT",
        datatype:"JSON",
        contentType:"application/json",
        data: JSON.stringify(cajas),
        success:function(respuesta){
            alert("se actualizo correctamente la informacion del cliente");
            window.location.reload();
    
            }
        });
    }
    

}

function deleteCliente(idDesdeBoton){
    let myData={
        id:idDesdeBoton
    };
    $.ajax({
        url:"http://192.9.152.98:8080/api/Client/"+idDesdeBoton,
        type:"DELETE",
        datatype:"JSON",
        data: JSON.stringify(myData),
        contentType:"application/json",
        success:function(respuesta){
            alert("se borro correctamente el cliente");
            window.location.reload();
        }
    }); 
}



////////////////////////////////////////////

function pintarCliente(respuesta){

    let myTable='<table class="table-auto w-full text-left whitespace-no-wrap">';
    myTable+="<thead>";
    myTable+="<tr>";
    myTable+="<th  class='px-0 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl'>NOMBRE</td>";
    myTable+="<th  class='px-0 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl'>EMAIL</td>";    
    myTable+="<th  class='px-0 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl'>EDAD</td>";
    myTable+="<th  class='px-0 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl'></td>";
    myTable+="<th  class='px-0 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl'></td>";
for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        //myTable+="<td class='px-4 py-3'>"+respuesta[i].idClient+"</td>";
        myTable+="<td class='px-4 py-3'>"+respuesta[i].name+"</td>";
        myTable+="<td class='px-4 py-3'>"+respuesta[i].email+"</td>";
        //myTable+="<td class='px-4 py-3'>"+respuesta[i].password+"</td>";        
        myTable+="<td class='px-4 py-3'>"+respuesta[i].age+"</td>";
        myTable+="<td class='px-4 py-3'> <button class='text-white bg-gray-700 border-0 py-0 px-12 focus:outline-none hover:bg-indigo-600 rounded' onclick='putCliente("+respuesta[i].idClient+")'> Actualizar</button>"
        myTable+="<td class='px-4 py-3'> <button class='text-white bg-gray-700 border-0 py-0 px-12 focus:outline-none hover:bg-indigo-600 rounded' onclick='deleteCliente("+respuesta[i].idClient+")'> Borrar</button>"
        myTable+="</tr>";
        myTable+="</thead>";
    }
    myTable+="<td class='px-4 py-3'></td>";
    myTable+="<td class='px-4 py-3'></td>";
    myTable+="<td class='px-4 py-3'></td>";
    myTable+="</table>";
    $("#resultado1").html(myTable);


}