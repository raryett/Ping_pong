//variaveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 15;
let raio = diametro / 2;
//velocidade da bolinha 
let velocidadexBolinha = 6;
let velocidadeyBolinha = 6;


//variaveis da minha raquete raquete 

let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 90;

//Variaveis  do oponente 
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeyOponente;
//variavel de erro 
let chanceDeErrar = 0;

let colidiu = false

//n precisa colocar a velocidade porque dentro da funcao vamos manipular a velocidade 


function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(0); // cor do background
  mostraBolinha(); // desenho da bolinha 
  movimentaBolinha(); // movimento da bolinha 
  verificaColisaoBorda(); // verifica a colisão
  mostraRaquete(xRaquete, yRaquete); // o tamanho da raquete 
  movimentaMinhaRaquete(); // que faz movimentar para cima e para baixo 
  //verificaColisaoRaquete();
  verificaColisaoRaquete(xRaquete,yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente); // o tamanho da raquete do oponente
  movimentaRaqueteOponente();
  verificaColisaoRaquete(xRaqueteOponente,yRaqueteOponente);



}

function mostraBolinha() {
  circle(xBolinha, yBolinha, diametro);
  //dentro dessa function vai os comandos para deixar o draw mais limpo, ou seja, vai criando varios fnction com as acoes necessarias para o funcionamento do codigo e depois vai chamando esses function dentro do draw, assim o codigo fica mais limpo e organizado isso é chamado de refatoração 
}
function movimentaBolinha() {
  xBolinha += velocidadexBolinha; // += para que a velocidade da bolinha fique sempre acima do que foi colocado na velocida
  yBolinha += velocidadeyBolinha;
}
function verificaColisaoBorda() {
  if (xBolinha + raio > width || xBolinha - raio < 0) {
    velocidadexBolinha *= -1;// o raio e onde a borda vai entender e jogar de volta ,ou seja, bolinha + o raio tem que bater na borda widht que éa largura maxima da borda e usamos o || (ou ) para identificar que tem outra especificacao que quando ele bater na borda 0 que é a esquerda ele deve fazer o mesmo
  }
  if (yBolinha + raio > height || yBolinha - raio < 0) {
    velocidadeyBolinha *= -1; // o *= -1 e porque precisamos inverter o sinal para ela fazer o oposto e ir para o outro lado 
  }

}
// é colocado o x e y para informar que vai ter dois parametros dentro dessa função, ou seja, precisa estar lancado cmom variavel em cima
// mas não é preciso declarar com varias funcoes separadas, é uma optimizacao do codigo 
function mostraRaquete(x, y) {
  rect(x, y, raqueteComprimento,
    raqueteAltura);
}
function movimentaMinhaRaquete() {
  if (keyIsDown(UP_ARROW)) {
    yRaquete -= 10;
    //para movimentar a raquete e preciso verificar na documentação qual a funcao usar, no caso o keyIsDown(UP_ARROW) e especifico do ps5 para ir para cima e necessario usar o 'up' para ir para cima e preciso subtrair o valor para a raquete ir para cima
  }
  if (keyIsDown(DOWN_ARROW)) {
    yRaquete += 10;
    // aqui segue o mesmo sentido porém com as intruções para baixo, se a tecla para baixo for precionada queremos que a raquete va para baixo e por isso adicionamos +10 como parametro 
    // keyisdown e uma função e dentro dessa função preciso indicar qual a seta wue eu quero no caso Down
  }

}
function verificaColisaoRaquete() {
  if (xBolinha - raio < xRaquete + raqueteComprimento &&
    yBolinha - raio < yRaquete + raqueteAltura &&
    yBolinha + raio > yRaquete) {
    velocidadeXBolinha *= -1;
  }
}


function verificaColisaoRaquete(x,y) {
  colidiu = collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
  if (colidiu) {
    velocidadexBolinha *= -1;
  }
}

// é colocado o x e y para informar que vai ter dois parametros dentro dessa função, ou seja, precisa estar lancado cmom variavel em cima
// mas não é preciso declarar com varias funcoes separadas, é uma optimizacao do codigo 


function movimentaRaqueteOponente() {
  //   // toda essa parte serve para o bolinha sempre bater em umponto especifico                                                  tirar o comprimento para a raquete sempre bater em um ponto especifico
  velocidadeYOponente = yBolinha - yRaqueteOponente - raqueteComprimento / 2 - 30; 
  yRaqueteOponente += velocidadeyOponente// para diminuir ainda mais pegamos o comprimento da blinha e dividimos por 2 e o -30 significa que ele estatirando -30 do que foi dividido  
  //para que seja um jogo a raquete precisa seguir a bolinha e não movimentar como se fosse o mesmo jogador, por isso, temos que criar uma função onde a raquete siga a bolinha e a sua velocidade
  //
}

