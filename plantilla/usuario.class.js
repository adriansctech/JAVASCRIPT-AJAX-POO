'use strict';
class Usuario {	

	constructor(usuarioInfo){
		this.id = usuarioInfo.id;
		this.name = usuarioInfo.name;
		this.email = usuarioInfo.email;	
		/*
			Creamos un array de objetos producto a traves de el uso de map
			y la creación de objetos
		*/
		this.products = usuarioInfo.products.map(function(product){			
			return new Producto (product);
		});			
	}
	productsSold(){
		return this.products.filter(function(product){
			return product.isSold();
		});		
	}
	productsNotSold(){
		return this.products.filter(function(product){
			return !product.isSold();
		});		
	}
	moneyWon(){		
		return this.productsSold().reduce(function(previous, product){
					/*						
						Previous es la variable donde se va acumulando los valores que le
						indicamos.
					*/
					return previous + product.price;
				}, 0); 
	}
	toString(){
		/*
			Como productos es un array de objetos producto, vamos almacenandolos 
			dentro de una variables, para luego poder mostrarlos de manera comoda
		*/
		var infoProduct = "";
		this.products.forEach(function(product){
			infoProduct += product.toString();
		});
		return " id : " + this.id +
				", name : " + this.name +
				", email : " + this.email +
				", products :" + infoProduct;
	}
	

}






