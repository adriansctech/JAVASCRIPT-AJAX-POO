'use strict';
class Producto {
	constructor(productoInfo){
		this.id = productoInfo.id;
		this.description = productoInfo.description;
		this.price = productoInfo.price;		
		this.soldTo = productoInfo.soldTo;
	}
	isSold(){
		if(!isNaN(this.soldTo)){
			return true;
		}else{
			return false;
		}
	}
	userSoldTo(usuarios){	
		/*
			Utilizamos find porque nos devuelve el primer elemento de el array
			que le mandamos, en este caso le enviamos un array de tipo usuarios, 
			y para poder utilizar dentro de la funcion el this, se lo tenemos 
			que indicar
		*/	
		return usuarios.find(function(usuario){
			return usuario.id == this.soldTo;
		}, this);
	}
	toString(){
		return  " id :" + this.id +
				", description :" + this.description +
				", price :" + this.price + 
				", soldto : " + this.soldTo;
	}
}