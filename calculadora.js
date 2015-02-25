var	resultado = null,
	ultimoResultado = null,
	operacion = null,
	operacionCadena = null,
	ultimoEsOperador = false,
	ultimoNumero = "",
	numero1 = null ,
	numero2 = null,
	operadores = new Array,
	operadoresSecundarios = new Array,
	numeros = new Array,
	nuevo = true,
	operadorSecundario = null;


function agregarNumero(e){
	if(nuevo){
		resultado.value = "";
		operacionCadena.value = "";
	}
	numeroSolo = e.target.textContent
	ultimoNumero +=numeroSolo;
	operacionCadena.value += numeroSolo;
	nuevo = false;
}

function agregarOperadorSecundario(e){
	if(ultimoNumero=="" ){
		if(nuevo){
			resultado.value = "";
			operacionCadena.value = "";
		}
		operadorSolo = e.target.id;
		operacionCadena.value += operadorSolo;
		operadorSecundario = e.target.id;
		nuevo = false;
	}
}

function sumar(n1, n2){
	ultimoResultado = n1+n2;
}

function restar(n1, n2){
	ultimoResultado = n1-n2;
}

function multiplicar(n1, n2){
	ultimoResultado = n1*n2;
}

function dividir(n1, n2){
	ultimoResultado = n1/n2;
}

function raiz(n1){
	ultimoNumero = Math.sqrt(n1);
}

function cuadrado(n1){
	multiplicar(n1,n1);
}
function senX(n1){
	ultimoNumero = Math.sin(n1);
}
function cosX(n1){
	ultimoNumero = Math.cos(n1);
}
function tanX(){
	ultimoNumero = Math.tan(n1);
}

function igual(){
	if(numeros.length>0){
		if(operacion==null)
			operacion = operadores[operadores.length-1] ;
		calcular();
		
	}
	else if(operadorSecundario!=null && ultimoNumero!=null){
		numTemp = ultimoNumero;
		operacionSecundaria();
		ultimoResultado = numTemp;
		resultado.value = ultimoResultado;
	}
	limpiarVariables();
}

function hacerOperacion(n1, oper, n2){
	n1 = parseFloat(n1);
	n2 = parseFloat(n2);
	if(oper == "+")
		sumar(n1 ,n2);
	else if(oper == "-")
		restar(n1,n2);
	else if(oper == "*")
		multiplicar(n1,n2);
	else if(oper == "/")
		dividir(n1,n2);

	numero1 = null;
	numero2 = null;
	resultado.value = ultimoResultado;
	operacion = null;
	ultimoEsOperador = true;
}
function calcular(e){
	resTem = null;
	if(operadorSecundario != null && ultimoNumero!=null){
		numTemp = ultimoNumero;
		operacionSecundaria();
		//ultimoResultado += ultimoNumero;
		resultado.value = ultimoResultado;
		resTem  = ultimoNumero;
		ultimoNumero = numTemp;
	}

	concatenar = false;
	if(ultimoNumero != ""){
		numeros[numeros.length] = ultimoNumero;
		ultimoNumero = resTem!=null ? resTem:ultimoNumero;
		numero1 = numero1 == null && ultimoNumero!="" ? ultimoNumero : numero1;
		numero1 = ultimoResultado != null ? ultimoResultado : numero1;
		numero2 = numero2 == null  && numero1 != null && ultimoEsOperador && ultimoNumero!=""  ? ultimoNumero : numero2;
		numero2 = numero2 != null && ultimoResultado != null ? ultimoNumero : numero2;
		ultimoNumero = "";
		ultimoEsOperador = false;
		concatenar = true;
	}

	if(numeros.length>0 && e!=null){
		operacion = e.target.id;

		if(!ultimoEsOperador)
			operadores[operadores.length] = operacion;
		else
			operadores[operadores.length-1] = operacion;

		ultimoEsOperador = true;
		concatenar = true;
	}

	if(concatenar)
		concatenarOperacion();

	if(operacion!=null && numero2!=null){
		j = 2;
		if(e==null){
			ultimoEsOperador = false;
			j = 1
		}
		oper = operadores.length>1 ? operadores[operadores.length-j] : operacion ;
		hacerOperacion(numero1,oper,numero2);

	}
}
function operacionSecundaria(){
	if(operadorSecundario=="√"){
		raiz(ultimoNumero);
	}else if(operadorSecundario=="x(2)"){
		cuadrado(ultimoNumero);
	}
	else if(operadorSecundario=="SenX"){
		senX(ultimoNumero);
	}
	else if(operadorSecundario=="CosX"){
		cosX(ultimoNumero);
	}
	else if(operadorSecundario=="TanX"){
		tanX(ultimoNumero);
	}
	operadoresSecundarios[numeros.length] = operadorSecundario;
	operadorSecundario = null;
}

function concatenarOperacion(){
	c = "";
	for(i = 0; i < numeros.length+1; i++){
		if(i<operadoresSecundarios.length && operadoresSecundarios[i]!=null)
			c += operadoresSecundarios[i];
		if(i<numeros.length)
			c += numeros[i];
		if(i<operadores.length)
			c += " "+operadores[i]+" ";
	}
	operacionCadena.value = c;
}

function limpiarVariables(){
	ultimoResultado = null,
	operacion = null,
	ultimoEsOperador = false,
	ultimoNumero = "",
	numero1 = null ,
	numero2 = null,
	operadores = new Array,
	numeros = new Array,
	operadoresSecundarios = new Array,
	nuevo = true,
	operadorSecundario = null;

}

function CE(){
	limpiarVariables();
	resultado.value = "";
	operacionCadena.value = "";
}

function cargarDocumento(){
	for(i =0 ; i<10 ; i++)
		document.getElementById(i).addEventListener("click",agregarNumero);

	document.getElementById("+").addEventListener("click",calcular);
	document.getElementById("-").addEventListener("click",calcular);
	document.getElementById("*").addEventListener("click",calcular);
	document.getElementById("/").addEventListener("click",calcular);

	document.getElementById("√").addEventListener("click",agregarOperadorSecundario);
	document.getElementById("x(2)").addEventListener("click",agregarOperadorSecundario);

	document.getElementById("SenX").addEventListener("click",agregarOperadorSecundario);
	document.getElementById("CosX").addEventListener("click",agregarOperadorSecundario);
	document.getElementById("TanX").addEventListener("click",agregarOperadorSecundario);
	document.getElementById("igual").addEventListener("click",igual);

	document.getElementById("ce").addEventListener("click",CE);
	/*document.getElementById("igual").addEventListener("click",igual);
	document.getElementById("igual").addEventListener("click",igual);*/

	operacionCadena=document.getElementById("operacionCadena");
	resultado=document.getElementById("resultado");
}

window.addEventListener("load",cargarDocumento);
