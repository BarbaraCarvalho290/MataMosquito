
var altura = 0
var largura = 0
var vidas = 1
var tempo = 15

var criaMosquitoTempo = 1500

var nivel = window.location.search //retorna o valor a direita do ?
nivel = nivel.replace('?', '') //replace remove os caracteres quando for localizado

//tempo para cada nivel
if(nivel === 'normal') { 
	//1500
	criaMosquitoTempo = 1500
} else if(nivel === 'dificil') {
	//1000
	criaMosquitoTempo = 1000
} else if (nivel === 'chucknorris') {
	//750
	criaMosquitoTempo = 750
}

//ajustando tamanho da tela
function ajustaTamanhoPalcoJogo() {
	altura = window.innerHeight
	largura = window.innerWidth

	console.log(largura, altura)
}

ajustaTamanhoPalcoJogo()

var cronometro = setInterval(function() {

	tempo -= 1

	if(tempo < 0) { //para o cronometro não ir para negativo
		clearInterval(cronometro) //limpa a variavel cronometro
		clearInterval(criaMosca) //limpa a variavel de criação dos mosquitos
		window.location.href = 'vitoria.html'
	} else {
		document.getElementById('cronometro').innerHTML = tempo //innerHTML valor dentro da tag
	}
	
}, 1000)

function posicaoRandomica() {


	//remover o mosquito anterior (caso exista)
	if(document.getElementById('mosquito')) {
		document.getElementById('mosquito').remove()

		//console.log('elemento selecionado foi: v' + vidas)
		if(vidas > 3) {

			window.location.href = 'fim_de_jogo.html'
		} else { //se o mosquito não for clicado, a vida é baixada
			document.getElementById('v' + vidas).src = "imagens/coracao_vazio.png"

			vidas++
		}
	}

	var posicaoX = Math.floor(Math.random() * largura) - 90 //floor faz arredondamento para baixo
	var posicaoY = Math.floor(Math.random() * altura) - 90

	posicaoX = posicaoX < 0 ? 0 : posicaoX
	posicaoY = posicaoY < 0 ? 0 : posicaoY

	console.log(posicaoX, posicaoY)

	//criar o elemento html
	var mosquito = document.createElement('img')
	mosquito.src = 'imagens/mosquito.png' //chamando imagem de forma dinamica
	mosquito.className = tamanhoAleatorio() + ' ' + ladoAleatorio()
	mosquito.style.left = posicaoX + 'px' //estilo da pagina 
	mosquito.style.top = posicaoY + 'px'
	mosquito.style.position = 'absolute'
	mosquito.id = 'mosquito' //mostra um mosquito por vez na tela, modo randomico
	mosquito.onclick = function() { //captura a ação de clique 
		this.remove() //remove o mosquito apos o clique 
	}

	document.body.appendChild(mosquito) //add filho para o pai

}

function tamanhoAleatorio() {
	var classe = Math.floor(Math.random() * 3)//random gera numero entre 0 e 1
	
	switch(classe) {
		case 0:
			return 'mosquito1'
		
		case 1:
			return 'mosquito2'

		case 2:
			return 'mosquito3'
	}
}

function ladoAleatorio() { //troca o lado do mosquito
	var classe = Math.floor(Math.random() * 2)
	
	switch(classe) {
		case 0:
			return 'ladoA'
		
		case 1:
			return 'ladoB'

	}
}

