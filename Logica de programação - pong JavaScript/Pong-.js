//variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 15;
let raio = diametro / 2;
//placar do jogo
let meusPontos = 0;
let pontosDoOponente = 0;

//velocidade da bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;
let raqueteComprimento = 10;
let raqueteAltura = 90;

//variáveis da raquete
let xRaquete = 5;
let yRaquete = 150;

//variáveis do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;

let colidiu = false;

//sons do jogo
let raquetada;
let ponto;
let trilha;

function preload() {
    trilha = loadSound("trilha.mp3");
    ponto = loadSound("ponto.mp3");
    raquetada = loadSound("raquetada.mp3");

}


function setup() {
    createCanvas(600, 400);
    trilha.loop();
}

function draw() {
    background(0);
    mostraBolinha();
    movimentaBolinha();
    verificaColisaoBorda();
    mostraRaquete(xRaquete, yRaquete);
    movimentaMinhaRaquete();
    //verificaColisaoRaquete();
    verificaColisaoRaquete(xRaquete, yRaquete);
    mostraRaquete(xRaqueteOponente, yRaqueteOponente);
    movimentaRaqueteOponente();
    verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
    incluiPlacar();
    marcaPonto();

}
function mostraBolinha() {
    circle(xBolinha, yBolinha, diametro);
    //dentro dessa function vai os comandos para deixar o draw mais limpo, ou seja, vai criando varios fnction com as acoes necessarias para o funcionamento do codigo e depois vai chamando esses function dentro do draw, assim o codigo fica mais limpo e organizado isso é chamado de refatoração 
}

function movimentaBolinha() {
    xBolinha += velocidadeXBolinha; // += para que a velocidade da bolinha fique sempre acima do que foi colocado na velocida
    yBolinha += velocidadeYBolinha; 
}

function verificaColisaoBorda() {
    if (xBolinha + raio > width ||
        xBolinha - raio < 0) {
        velocidadeXBolinha *= -1;
        // o raio e onde a borda vai entender e jogar de volta ,ou seja, bolinha + o raio tem que bater na borda widht que éa largura maxima da borda e usamos o || (ou ) para identificar que tem outra especificacao que quando ele bater na borda 0 que é a esquerda ele deve fazer o mesmo
    }
    if (yBolinha + raio > height ||
        yBolinha - raio < 0) {
        velocidadeYBolinha *= -1; // o *= -1 e porque precisamos inverter o sinal para ela fazer o oposto e ir para o outro lado 
    }
}

function mostraRaquete(x, y) { // é colocado o x e y para informar que vai ter dois parametros dentro dessa função, ou seja, precisa estar lancado cmom variavel em cima
    // mas não é preciso declarar com varias funcoes separadas, é uma optimizacao do codigo 
    rect(x, y, raqueteComprimento,
        raqueteAltura);
        // é colocado o x e y para informar que vai ter dois parametros dentro dessa função, ou seja, precisa estar lancado cmom variavel em cima
// mas não é preciso declarar com varias funcoes separadas, é uma optimizacao do codigo 
}

function movimentaMinhaRaquete() { //para movimentar a raquete e preciso verificar na documentação qual a funcao usar, no caso o keyIsDown(UP_ARROW) e especifico do ps5 para ir para cima e necessario usar o 'up' para ir para cima e preciso subtrair o valor para a raquete ir para cima
    if (keyIsDown(UP_ARROW)) {
        yRaquete -= 10;
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
        raquetada.play();
    }
}

function verificaColisaoRaquete(x, y) {
    colidiu = collideRectCircle(x, y, raqueteComprimento, raqueteAltura,
        xBolinha, yBolinha, raio);
    if (colidiu) {
        velocidadeXBolinha *= -1;
        raquetada.play();
    }
}

function movimentaRaqueteOponente() {

    if (keyIsDown(87)) {
        yRaqueteOponente -= 10;
    }
    if (keyIsDown(83)) {
        yRaqueteOponente += 10;
    }
    //esse é ara jogar com outra pessoa




    // velocidadeYOponente = yBolinha - yRaqueteOponente - //raqueteComprimento / 2 - 30;
    //yRaqueteOponente += velocidadeYOponente esse é unsado para jogaar sozinho 

     // toda essa parte serve para o bolinha sempre bater em umponto especifico                
     // para diminuir ainda mais pegamos o comprimento da blinha e dividimos por 2 e o -30 significa que ele estatirando -30 do que foi dividido  
    //para que seja um jogo a raquete precisa seguir a bolinha e não movimentar como se fosse o mesmo jogador, por isso, temos que criar uma função onde a raquete siga a bolinha e a sua velocidade
  //
    }

function incluiPlacar() {
    stroke(255); // serve para colocar a borda em todos os objetos dentro do código
    textAlign(CENTER); // deixa o texto centralizado
    textSize(16);// tamanho da letra
    fill(color(255, 140, 0)); // precisamos colocar que a cor para reconhecer e depois colocar o valor da cor
    rect(150, 10, 40, 20);// onde vai ficar posicionado
    fill(255);// 
    text(meusPontos, 170, 26);// os meus pontos serve para guardar as informacoes do ponto dentro do jogo e onde ele vai ficar posicionado 
    fill(color(255, 140, 0));
    rect(450, 10, 40, 20);
    fill(255);
    text(pontosDoOponente, 470, 26);
}

function marcaPonto() {
    if (xBolinha > 590) {
        meusPontos += 1;
        ponto.play(); // para colocar a musica quando acontece o ponto e necessario usar o play, se usar o loop vai ficar tocando a todo momento 
        
    }
    if (xBolinha < 10) {
        pontosDoOponente += 1
        ponto.play();
    }

}


