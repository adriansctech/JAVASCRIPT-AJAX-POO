'use strict';
var users = [];
window.onload = function() {
	loadInfo();		
}
function loadInfo(){		
	/*
		A partir del fichero data, creamos un array de usuarios y con la funcion 
		map vamos incluyendolos en el mismo
	*/

	users = data.map(function(user){
		/*
			Cuando creamos un objeto usuario le enviamos un objeto con todos los 
			valores de data
		*/
		return new Usuario (user);
	})
	addUsers();	
}

function addUsers(){
	var userList = document.getElementById("users-list");
	users.forEach(function(user){
		userList.innerHTML += "<a href='#' class='list-group-item username' "+
							 "id='user" + user.id + "'>"+user.name+
							 "<span class='badge'>"+ user.productsSold().length + "/" 
							 +user.products.length+"</span></a>";
	});	
	setUserEvents();
}
function setUserEvents(){
	/*
		Utilizamos querySelectorAll, así obtenemos una lista de nodos, si utilizamos
		byTagName o byClassName nos devuelve una coleción de objetos HTML y 
		deberíamos de utilizar un bucle for normal
	*/
	var userNameClassElements = document.querySelectorAll('.username');
	userNameClassElements.forEach(function(element){
		element.addEventListener("click", addActiveClass);
		/*
			Ahora cuando pasamos por encima con el ratón, cogeremos el id del elemento
			pediremos su usuario y mostraremos su nombre y la cantidad de productos que tiene
		*/		
		element.addEventListener("mouseenter", function(event){
			document.getElementById("info").innerHTML = getUserById(this.id.substring(4)).name+
														"tiene " + getUserById(this.id.substring(4)).products.length +
														"productos";
		});
		element.addEventListener("mouseleave", function(){
			document.getElementById("info").innerHTML = "";
		});
	});
}
function addActiveClass(event){	
	/*
		Primero eliminamos la clase active a todos los elementos, luego
		se la agregamos al elemento que se ha seleccionado
	*/
	removeActiveClass();
	this.classList.add("active");
	//Le enviamos a la funcion el id del usuario que se ha seleccionado
	addProducts(this.id.substring(4));
}
function removeActiveClass(element){
	/*
		Esta función elimina la clase active de todos los elementos
	*/
	var userNameClassElements = document.querySelectorAll('.username');
	userNameClassElements.forEach(function(element){
		element.classList.remove("active");
	});
}

function addProducts(userId){
	var table = document.querySelector("tbody");
	removeProducts();	
	getUserById(userId).products.forEach(function(product){
		/*
			A continuación creamos una variable donde almacenaremos no si el 
			producto no se ha vendido, si el producto si se ha vendido, almacenaremos en 
			ella el nombre el ususario al que se ha vendido
		*/
		var userSoldName;
		if(!product.isSold()){
			userSoldName = "no";
		}else{
			userSoldName = product.userSoldTo(users).name;
		}
		table.innerHTML += "<tr><td>" + product.description +"</td>"+
							"<td>"+ product.price +" € </td>"+
							"<td>"+ userSoldName+"</td></tr>";
	});
	document.getElementById("money-won").innerHTML = "<tr><td>"+ getUserById(userId).moneyWon()+" € </td></tr>";
}
function removeProducts(){
	/*
		Esta función elimina los elementos de la tabla productos
	*/
	var table = document.querySelector("tbody");
	table.innerHTML = "";
}

function getUserById(id){
	/*
		Esta función devolverá un usuario a través de su id
	*/
	return users.find(function(user){
		return user.id == id;
	});		
}