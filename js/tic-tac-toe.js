// TIC TAC TOE

var x4 = document.querySelector('.x4')
var x5 = document.querySelector('.x5')
var x6 = document.querySelector('.x6')

var p1 = document.getElementById('player-1')
var p2 = document.getElementById('player-2')

var v1 = document.getElementById('velha-1')
var v2 = document.getElementById('velha-2')

// var campo1 = document.getElementById("campo1");
// var campo2 = document.getElementById("campo1");

function bloquear() {
    // if (campo1 && campo2) {
        // console.log(campo1)
        // console.log(campo2)
    // }
}

var me = this;

var jogadores = {
    'O': [],
    'X': []
}

var jogadas = [];

var matriz = []

function matriz4x4() {
    matriz = [];
    matriz.push([{ 0: null }, { 1: null }, { 2: null }, { 3: null }]);
    matriz.push([{ 0: null }, { 1: null }, { 2: null }, { 3: null }]);
    matriz.push([{ 0: null }, { 1: null }, { 2: null }, { 3: null }]);
    matriz.push([{ 0: null }, { 1: null }, { 2: null }, { 3: null }]);
    document.querySelector('.game').classList.add('x4');
    document.querySelector('.game').classList.remove('x5', 'x6')
    tic_tac_toe.start();
}

function matriz5x5() {
    matriz4x4();
    matriz.forEach(linha => {
        linha.push({ 4: null });
    });
    matriz.push([{ 0: null }, { 1: null }, { 2: null }, { 3: null }, { 4: null }]);
    document.querySelector('.game').classList.add('x5');
    document.querySelector('.game').classList.remove('x4', 'x6')
    tic_tac_toe.start();
}

function matriz6x6() {
    matriz4x4();
    matriz.forEach(linha => {
        linha.push({ 4: null }, { 5: null });
    });

    matriz.push([{ 0: null }, { 1: null }, { 2: null }, { 3: null }, { 4: null }, { 5: null }]);
    matriz.push([{ 0: null }, { 1: null }, { 2: null }, { 3: null }, { 4: null }, { 5: null }]);
    document.querySelector('.game').classList.add('x6');
    document.querySelector('.game').classList.remove('x5', 'x4')
    tic_tac_toe.start();
}


const tic_tac_toe = {

    symbols: {
        options: ['O', 'X'],
        turn_index: 0,
        change() {
            this.turn_index = (this.turn_index === 0 ? 1 : 0);
        }
    },
    player1: 'player 1',
    player2: 'Player 2',

    win1: 1,
    win2: 1,

    velha1: 1,
    velha2: 1,

    container_element: null,
    gameover: false,

    // FUNCTIONS
    init(container) {
        this.container_element = container;
    },

    make_play(position) {
        var linha;
        var coluna;

        // let obj = JSON.stringify(position).replace(/"/g, "")

        for (key in position) {
            linha = key;
            coluna = position[key];

            for (keyObj in matriz[linha][coluna]) {
                if (!matriz[linha][coluna][keyObj] && !this.gameover) {
                    const currentSymbol = this.symbols.options[this.symbols.turn_index];
                    matriz[linha][coluna] = currentSymbol;
                    this.draw();
                    let sequenci_win = this.verificarJogada(parseInt(linha), parseInt(coluna));
                    if (sequenci_win && jogadores[currentSymbol].length >= 5) {
                        console.table(sequenci_win)

                        for (i in jogadores[currentSymbol]) {
                            this.addClassWinner(jogadores[currentSymbol][i])
                        }

                        if (currentSymbol == 'O') {
                            p1.innerHTML = `${this.win1++}`
                        }
                        else if (currentSymbol == 'X') {
                            p2.innerHTML = `${this.win2++}`
                        }

                        if (!this.is_game_over()) {
                            this.game_is_over();
                        }

                    } else if (this.verificaVelha(position)) {
                        if (!this.is_game_over()) {
                            this.game_is_over();
                            v1.innerHTML = `${this.velha1++}`
                            v2.innerHTML = `${this.velha2++}`
                        }
                    } else {
                        this.symbols.change()
                    }

                } else {
                    return false
                }
            }
        }
        return true;

    },

    verificarJogada(linha, coluna) {
        let acertou = false;

        if (this.verificarJogadaMesmaLinhaFrenteAtras(linha, coluna)) { acertou = matriz; }
        else if (this.verificarJogadaMesmaLinhaFrente(linha, coluna)) { acertou = matriz; }
        else if (this.verificarJogadaMesmaLinhaAtras(linha, coluna)) { acertou = matriz; }
        else if (this.verificarJogadaMesmaColunaCimaBaixo(linha, coluna)) { acertou = matriz; }
        else if (this.verificarJogadaMesmaColunaCima(linha, coluna)) { acertou = matriz; }
        else if (this.verificarJogadaMesmaColunaBaixo(linha, coluna)) { acertou = matriz; }
        else if (this.verificarJogadaMesmaDiagonalBaixoFrente(linha, coluna)) { acertou = matriz; }
        else if (this.verificarJogadaMesmaDiagonalBaixoAtras(linha, coluna)) { acertou = matriz; }
        else if (this.verificarJogadaMesmaDiagonalCimaAtras(linha, coluna)) { acertou = matriz; }
        else if (this.verificarJogadaMesmaDiagonalCimaFrente(linha, coluna)) { acertou = matriz; }
        else if (this.verificarJogadaMesmaDiagonalMeiofrente(linha, coluna)) { acertou = matriz; }
        else if (this.verificarJogadaMesmaDiagonalMeioAtras(linha, coluna)) { acertou = matriz; }
        else if (this.verificarJogadaMesmaDiagonalCimaFrenteBaixoAtras(linha, coluna)) { acertou = matriz }


        if (this.verificaDiagonal_1(linha, coluna)) { acertou = matriz }
        else if (this.verificaColunaLinha_1(linha, coluna)) { acertou = matriz }
        else if (this.verificaColuna_2(linha, coluna)) { acertou = matriz }
        else if (this.verificaColunaDiagonal_1(linha, coluna)) { acertou = matriz }

        return acertou
    },

    condicaoJogadas(condicao1, condicao2, condicao3) {
        if ((condicao1 == condicao2) && (condicao1 == condicao3)) {
            return true
        } else {
            return false
        }
    },

    condicaoJogadas_5(condicao1, condicao2, condicao3, condicao4, condicao5) {
        if ((condicao1 == condicao2) &&
            (condicao1 == condicao3) &&
            (condicao1 == condicao4) &&
            (condicao1 == condicao5)) {
            return true
        } else {
            return false
        }
    },

    selecioneId(linha, coluna) {
        return document.querySelector(`[onclick="tic_tac_toe.make_play({${linha}:${coluna}})"]`).getAttribute('id')
    },

    pesquisaIdSimbolo(linha, coluna, id) {
        if (id !== undefined) {
            return jogadores[matriz[linha][coluna]].includes(id)
        }

    },

    addClassWinner(id) {
        document.getElementById(id)
            .classList.add('winner')
    },

    verificaVelha(posicao) {
        var velha = false;
        const tamanho = matriz.length * matriz.length;
        jogadas.push(posicao)
        if (jogadas.length == tamanho) {
            jogadas = []
            velha = true
        }

        return velha;
    },

    verificarJogadaMesmaLinhaFrenteAtras(linha, coluna) {
        let simboloMeio = matriz[linha][coluna];
        let simboloFrente = matriz[linha][coluna + 1];
        let simboloAtras = matriz[linha][coluna - 1];
        if (simboloFrente && simboloMeio && simboloAtras) {
            let acertou = this.condicaoJogadas(simboloAtras, simboloMeio, simboloFrente);

            if (
                (acertou &&
                    !this.pesquisaIdSimbolo(linha, coluna + 1, this.selecioneId(linha, coluna + 1))) ||

                (acertou &&
                    !this.pesquisaIdSimbolo(linha, coluna - 1, this.selecioneId(linha, coluna - 1)))) {

                jogadores[matriz[linha][coluna]].push(this.selecioneId(linha, coluna))
                jogadores[matriz[linha][coluna]].push(this.selecioneId(linha, coluna + 1))
                jogadores[matriz[linha][coluna]].push(this.selecioneId(linha, coluna - 1))
            } else {
                acertou = false;
            }
            return acertou
        }
    },

    verificarJogadaMesmaLinhaFrente(linha, coluna) {
        let simboloInicio = matriz[linha][coluna];
        let simboloFrente1 = matriz[linha][coluna + 1];
        let simboloFrente2 = matriz[linha][coluna + 2];

        if (simboloInicio && simboloFrente1 && simboloFrente2) {
            let acertou = this.condicaoJogadas(simboloInicio, simboloFrente1, simboloFrente2)

            if (
                (acertou &&
                    !this.pesquisaIdSimbolo(linha, coluna + 1, this.selecioneId(linha, coluna + 1))) ||
                (acertou &&
                    !this.pesquisaIdSimbolo(linha, coluna + 2, this.selecioneId(linha, coluna + 2)))) {

                jogadores[matriz[linha][coluna]].push(this.selecioneId(linha, coluna))
                jogadores[matriz[linha][coluna]].push(this.selecioneId(linha, coluna + 1))
                jogadores[matriz[linha][coluna]].push(this.selecioneId(linha, coluna + 2))
            } else {
                acertou = false;
            }
            return acertou
        }
    },

    verificarJogadaMesmaLinhaAtras(linha, coluna) {
        let simboloInicio = matriz[linha][coluna];
        let simboloAtras1 = matriz[linha][coluna - 1];
        let simboloAtras2 = matriz[linha][coluna - 2];

        if (simboloInicio && simboloAtras1 && simboloAtras2) {
            let acertou = this.condicaoJogadas(simboloInicio, simboloAtras1, simboloAtras2)

            if ((acertou &&
                !this.pesquisaIdSimbolo(linha, coluna - 1, this.selecioneId(linha, coluna - 1))) ||
                (acertou &&
                    !this.pesquisaIdSimbolo(linha, coluna - 2, this.selecioneId(linha, coluna - 2)))) {

                jogadores[matriz[linha][coluna]].push(this.selecioneId(linha, coluna))
                jogadores[matriz[linha][coluna]].push(this.selecioneId(linha, coluna - 1))
                jogadores[matriz[linha][coluna]].push(this.selecioneId(linha, coluna - 2))
            } else {
                acertou = false;
            }
            return acertou
        }
    },

    verificarJogadaMesmaColunaCimaBaixo(linha, coluna) {
        if ((matriz[linha - 1] === undefined) || (matriz[linha + 1] === undefined)) {
            return false
        } else {
            let simboloInicio = matriz[linha][coluna];
            let simboloCima = matriz[linha - 1][coluna];
            let simboloBaixo = matriz[linha + 1][coluna];

            if (simboloInicio && simboloCima && simboloBaixo) {
                let acertou = this.condicaoJogadas(simboloInicio, simboloCima, simboloBaixo)

                if ((acertou &&
                    !this.pesquisaIdSimbolo(linha - 1, coluna, this.selecioneId(linha - 1, coluna))) ||
                    (acertou &&
                        !this.pesquisaIdSimbolo(linha + 1, coluna, this.selecioneId(linha + 1, coluna)))) {

                    jogadores[matriz[linha][coluna]].push(this.selecioneId(linha, coluna))
                    jogadores[matriz[linha][coluna]].push(this.selecioneId(linha - 1, coluna))
                    jogadores[matriz[linha][coluna]].push(this.selecioneId(linha + 1, coluna))
                }
                return acertou
            }
        }
    },

    verificarJogadaMesmaColunaCima(linha, coluna) {
        if ((matriz[linha - 1] === undefined) || (matriz[linha - 2] === undefined)) {
            return false
        } else {
            let simboloInicio = matriz[linha][coluna];
            let simboloCima1 = matriz[linha - 1][coluna];
            let simboloCima2 = matriz[linha - 2][coluna];

            if (simboloInicio && simboloCima1 && simboloCima2) {
                let acertou = this.condicaoJogadas(simboloInicio, simboloCima1, simboloCima2)

                if ((acertou &&
                    !this.pesquisaIdSimbolo(linha - 1, coluna, this.selecioneId(linha - 1, coluna))) ||
                    (acertou &&
                        !this.pesquisaIdSimbolo(linha - 2, coluna, this.selecioneId(linha - 2, coluna)))) {

                    jogadores[matriz[linha][coluna]].push(this.selecioneId(linha, coluna))
                    jogadores[matriz[linha][coluna]].push(this.selecioneId(linha - 1, coluna))
                    jogadores[matriz[linha][coluna]].push(this.selecioneId(linha - 2, coluna))
                }
                return acertou
            }
        }
    },

    verificarJogadaMesmaColunaBaixo(linha, coluna) {
        if ((matriz[linha + 1] === undefined) || (matriz[linha + 2] === undefined)) {
            return false
        } else {
            let simboloInicio = matriz[linha][coluna];
            let simboloBaixo1 = matriz[linha + 1][coluna];
            let simboloBaixo2 = matriz[linha + 2][coluna];

            if (simboloInicio && simboloBaixo1 && simboloBaixo2) {
                let acertou = this.condicaoJogadas(simboloInicio, simboloBaixo1, simboloBaixo2)

                if ((acertou &&
                    !this.pesquisaIdSimbolo(linha + 1, coluna, this.selecioneId(linha + 1, coluna))) ||
                    (acertou &&
                        !this.pesquisaIdSimbolo(linha + 2, coluna, this.selecioneId(linha + 2, coluna)))) {

                    jogadores[matriz[linha][coluna]].push(this.selecioneId(linha, coluna))
                    jogadores[matriz[linha][coluna]].push(this.selecioneId(linha + 1, coluna))
                    jogadores[matriz[linha][coluna]].push(this.selecioneId(linha + 2, coluna))
                }
                return acertou
            }
        }
    },

    verificarJogadaMesmaDiagonalBaixoFrente(linha, coluna) {
        if ((matriz[linha + 1] === undefined) || (matriz[linha + 2] === undefined)) {
            return false
        } else {
            let simboloInicio = matriz[linha][coluna];
            let simboloBaixoFrente1 = matriz[linha + 1][coluna + 1];
            let simboloBaixoFrente2 = matriz[linha + 2][coluna + 2];

            if (simboloInicio && simboloBaixoFrente1 && simboloBaixoFrente2) {
                let acertou = this.condicaoJogadas(simboloInicio, simboloBaixoFrente1, simboloBaixoFrente2)

                if ((acertou &&
                    !this.pesquisaIdSimbolo(linha + 1, coluna + 1, this.selecioneId(linha + 1, coluna + 1))) ||
                    (acertou &&
                        !this.pesquisaIdSimbolo(linha + 2, coluna + 2, this.selecioneId(linha + 2, coluna + 2)))) {

                    jogadores[matriz[linha][coluna]].push(this.selecioneId(linha, coluna))
                    jogadores[matriz[linha][coluna]].push(this.selecioneId(linha + 1, coluna + 1))
                    jogadores[matriz[linha][coluna]].push(this.selecioneId(linha + 2, coluna + 2))
                }
                return acertou
            }
        }
    },

    verificarJogadaMesmaDiagonalBaixoAtras(linha, coluna) {
        if ((matriz[linha + 1] === undefined) || (matriz[linha + 2] === undefined)) {
            return false
        } else {
            let simboloInicio = matriz[linha][coluna];
            let simboloBaixoAtras1 = matriz[linha + 1][coluna - 1];
            let simboloBaixoAtras2 = matriz[linha + 2][coluna - 2];

            if (simboloInicio && simboloBaixoAtras1 && simboloBaixoAtras2) {
                let acertou = this.condicaoJogadas(simboloInicio, simboloBaixoAtras1, simboloBaixoAtras2)

                if ((acertou &&
                    !this.pesquisaIdSimbolo(linha + 1, coluna - 1, this.selecioneId(linha + 1, coluna - 1))) ||
                    (acertou &&
                        !this.pesquisaIdSimbolo(linha + 2, coluna - 2, this.selecioneId(linha + 2, coluna - 2)))) {

                    jogadores[matriz[linha][coluna]].push(this.selecioneId(linha, coluna))
                    jogadores[matriz[linha][coluna]].push(this.selecioneId(linha + 1, coluna - 1))
                    jogadores[matriz[linha][coluna]].push(this.selecioneId(linha + 2, coluna - 2))
                }
                return acertou
            }
        }
    },

    verificarJogadaMesmaDiagonalCimaAtras(linha, coluna) {
        if ((matriz[linha - 1] === undefined) || (matriz[linha - 2] === undefined)) {
            return false
        } else {
            let simboloInicio = matriz[linha][coluna];
            let simboloCimaAtras1 = matriz[linha - 1][coluna - 1];
            let simboloCimaAtras2 = matriz[linha - 2][coluna - 2];

            if (simboloInicio && simboloCimaAtras1 && simboloCimaAtras2) {
                let acertou = this.condicaoJogadas(simboloInicio, simboloCimaAtras1, simboloCimaAtras2)

                if ((acertou &&
                    !this.pesquisaIdSimbolo(linha - 1, coluna - 1, this.selecioneId(linha - 1, coluna - 1))) ||
                    (acertou &&
                        !this.pesquisaIdSimbolo(linha - 2, coluna - 2, this.selecioneId(linha - 2, coluna - 2)))) {

                    jogadores[matriz[linha][coluna]].push(this.selecioneId(linha, coluna))
                    jogadores[matriz[linha][coluna]].push(this.selecioneId(linha - 1, coluna - 1))
                    jogadores[matriz[linha][coluna]].push(this.selecioneId(linha - 2, coluna - 2))
                }
                return acertou
            }
        }
    },

    verificarJogadaMesmaDiagonalCimaFrente(linha, coluna) {
        if ((matriz[linha - 1] === undefined) || (matriz[linha - 2] === undefined)) {
            return false
        } else {
            let simboloInicio = matriz[linha][coluna];
            let simboloCimaFrente1 = matriz[linha - 1][coluna + 1];
            let simboloCimaFrente2 = matriz[linha - 2][coluna + 2];

            if (simboloInicio && simboloCimaFrente1 && simboloCimaFrente2) {
                let acertou = this.condicaoJogadas(simboloInicio, simboloCimaFrente1, simboloCimaFrente2)

                if ((acertou &&
                    !this.pesquisaIdSimbolo(linha - 1, coluna + 1, this.selecioneId(linha - 1, coluna + 1))) ||
                    (acertou &&
                        !this.pesquisaIdSimbolo(linha - 2, coluna + 2, this.selecioneId(linha - 2, coluna + 2)))) {

                    jogadores[matriz[linha][coluna]].push(this.selecioneId(linha, coluna))
                    jogadores[matriz[linha][coluna]].push(this.selecioneId(linha - 1, coluna + 1))
                    jogadores[matriz[linha][coluna]].push(this.selecioneId(linha - 2, coluna + 2))
                }
                return acertou
            }
        }
    },

    verificarJogadaMesmaDiagonalMeiofrente(linha, coluna) {
        if ((matriz[linha + 1] === undefined) || (matriz[linha - 1] === undefined)) {
            return false
        } else {
            let simboloInicio = matriz[linha][coluna];
            let simboloCimaAtras1 = matriz[linha - 1][coluna - 1];
            let simboloBaixoFrente2 = matriz[linha + 1][coluna + 1];
            if (simboloInicio && simboloCimaAtras1 && simboloBaixoFrente2) {
                let acertou = this.condicaoJogadas(simboloInicio, simboloCimaAtras1, simboloBaixoFrente2)

                if ((acertou &&
                    !this.pesquisaIdSimbolo(linha - 1, coluna - 1, this.selecioneId(linha - 1, coluna - 1))) ||
                    (acertou &&
                        !this.pesquisaIdSimbolo(linha + 1, coluna + 1, this.selecioneId(linha + 1, coluna + 1)))) {

                    jogadores[matriz[linha][coluna]].push(this.selecioneId(linha, coluna))
                    jogadores[matriz[linha][coluna]].push(this.selecioneId(linha - 1, coluna - 1))
                    jogadores[matriz[linha][coluna]].push(this.selecioneId(linha + 1, coluna + 1))
                }
                return acertou
            }
        }
    },

    verificarJogadaMesmaDiagonalMeioAtras(linha, coluna) {
        if ((matriz[linha + 1] === undefined) || (matriz[linha - 1] === undefined)) {
            return false
        } else {
            let simboloInicio = matriz[linha][coluna];
            let simboloCimaAtras1 = matriz[linha + 1][coluna - 1];
            let simboloBaixoFrente2 = matriz[linha - 1][coluna + 1];
            if (simboloInicio && simboloCimaAtras1 && simboloBaixoFrente2) {
                let acertou = this.condicaoJogadas(simboloInicio, simboloCimaAtras1, simboloBaixoFrente2)

                if ((acertou &&
                    !this.pesquisaIdSimbolo(linha + 1, coluna - 1, this.selecioneId(linha + 1, coluna - 1))) ||
                    (acertou &&
                        !this.pesquisaIdSimbolo(linha - 1, coluna + 1, this.selecioneId(linha - 1, coluna + 1)))) {
                    jogadores[matriz[linha][coluna]].push(this.selecioneId(linha, coluna))
                    jogadores[matriz[linha][coluna]].push(this.selecioneId(linha + 1, coluna - 1))
                    jogadores[matriz[linha][coluna]].push(this.selecioneId(linha - 1, coluna + 1))
                }
                return acertou
            }
        }
    },

    verificarJogadaMesmaDiagonalCimaFrenteBaixoAtras(linha, coluna) {
        if ((matriz[linha + 1] === undefined) || (matriz[linha - 1] === undefined)) {
            return false
        } else {
            let simboloInicio = matriz[linha][coluna];
            let simboloCimaFrente1 = matriz[linha - 1][coluna + 1];
            let simboloBaixoAtras2 = matriz[linha + 1][coluna - 1];
            if (simboloInicio && simboloCimaFrente1 && simboloBaixoAtras2) {
                let acertou = this.condicaoJogadas(simboloInicio, simboloCimaFrente1, simboloBaixoAtras2)

                if ((acertou &&
                    !this.pesquisaIdSimbolo(linha - 1, coluna + 1, this.selecioneId(linha - 1, coluna + 1))) ||
                    (acertou &&
                        !this.pesquisaIdSimbolo(linha + 1, coluna - 1, this.selecioneId(linha + 1, coluna - 1)))) {

                    jogadores[matriz[linha][coluna]].push(this.selecioneId(linha, coluna))
                    jogadores[matriz[linha][coluna]].push(this.selecioneId(linha - 1, coluna + 1))
                    jogadores[matriz[linha][coluna]].push(this.selecioneId(linha + 1, coluna - 1))
                }
                return acertou
            }
        }
    },


    verificaDiagonal_1(linha, coluna) {
        if ((matriz[linha + 1] === undefined) || (matriz[linha - 1] === undefined)) {
            return false
        } else {
            let condicao1 = matriz[linha][coluna];
            let condicao2 = matriz[linha - 1][coluna - 1];
            let condicao3 = matriz[linha - 1][coluna + 1];

            let condicao4 = matriz[linha + 1][coluna - 1];
            let condicao5 = matriz[linha + 1][coluna + 1];

            if (condicao1 && condicao2 && condicao3 && condicao4 && condicao5) {
                let acertou = this.condicaoJogadas_5(condicao1, condicao2, condicao3, condicao4, condicao5)

                if (acertou) {
                    jogadores[matriz[linha][coluna]] = []
                    jogadores[matriz[linha][coluna]].push(this.selecioneId(linha, coluna))
                    jogadores[matriz[linha][coluna]].push(this.selecioneId(linha - 1, coluna - 1))
                    jogadores[matriz[linha][coluna]].push(this.selecioneId(linha - 1, coluna + 1))
                    jogadores[matriz[linha][coluna]].push(this.selecioneId(linha + 1, coluna - 1))
                    jogadores[matriz[linha][coluna]].push(this.selecioneId(linha + 1, coluna + 1))

                }
                return acertou
            }
        }

    },

    verificaColunaLinha_1(linha, coluna) {


        if ((matriz[linha + 1] === undefined) || (matriz[linha - 1] === undefined)) {
            return false
        } else {
            let condicao1 = matriz[linha][coluna];
            let condicao2 = matriz[linha][coluna - 1];
            let condicao3 = matriz[linha][coluna + 1];
            let condicao4 = matriz[linha - 1][coluna];
            let condicao5 = matriz[linha + 1][coluna];

            if (condicao1 && condicao2 && condicao3 && condicao4 && condicao5) {
                let acertou = this.condicaoJogadas_5(condicao1, condicao2, condicao3, condicao4, condicao5)

                if (acertou) {
                    jogadores[matriz[linha][coluna]] = []
                    jogadores[matriz[linha][coluna]].push(this.selecioneId(linha, coluna))
                    jogadores[matriz[linha][coluna]].push(this.selecioneId(linha, coluna - 1))
                    jogadores[matriz[linha][coluna]].push(this.selecioneId(linha, coluna + 1))
                    jogadores[matriz[linha][coluna]].push(this.selecioneId(linha - 1, coluna))
                    jogadores[matriz[linha][coluna]].push(this.selecioneId(linha + 1, coluna))

                }
                return acertou
            }
        }
    },

    verificaColuna_2(linha, coluna) {
        let condicao1 = matriz[linha][coluna];
        let condicao2 = matriz[linha][coluna - 1];
        let condicao3 = matriz[linha][coluna - 2];
        let condicao4 = matriz[linha][coluna + 1];
        let condicao5 = matriz[linha][coluna + 2];

        if (condicao1 && condicao2 && condicao3 && condicao4 && condicao5) {
            let acertou = this.condicaoJogadas_5(condicao1, condicao2, condicao3, condicao4, condicao5)

            if (acertou) {
                jogadores[matriz[linha][coluna]] = []
                jogadores[matriz[linha][coluna]].push(this.selecioneId(linha, coluna))
                jogadores[matriz[linha][coluna]].push(this.selecioneId(linha, coluna - 1))
                jogadores[matriz[linha][coluna]].push(this.selecioneId(linha, coluna - 2))
                jogadores[matriz[linha][coluna]].push(this.selecioneId(linha, coluna + 1))
                jogadores[matriz[linha][coluna]].push(this.selecioneId(linha, coluna + 2))

            }
            return acertou
        }
    },

    verificaColunaDiagonal_1(linha, coluna) {
        if ((matriz[linha - 1] === undefined) || (matriz[linha - 2] === undefined)) {
            return false
        } else {
            let condicao1 = matriz[linha][coluna];
            let condicao2 = matriz[linha - 1][coluna];
            let condicao3 = matriz[linha - 2][coluna];
            let condicao4 = matriz[linha - 1][coluna + 1];
            let condicao5 = matriz[linha - 2][coluna + 2];

            if (condicao1 && condicao2 && condicao3 && condicao4 && condicao5) {
                let acertou = this.condicaoJogadas_5(condicao1, condicao2, condicao3, condicao4, condicao5)

                if (acertou) {
                    jogadores[matriz[linha][coluna]] = []
                    jogadores[matriz[linha][coluna]].push(this.selecioneId(linha, coluna))
                    jogadores[matriz[linha][coluna]].push(this.selecioneId(linha - 1, coluna))
                    jogadores[matriz[linha][coluna]].push(this.selecioneId(linha - 2, coluna))
                    jogadores[matriz[linha][coluna]].push(this.selecioneId(linha - 1, coluna + 1))
                    jogadores[matriz[linha][coluna]].push(this.selecioneId(linha - 2, coluna + 2))

                }
                return acertou
            }
        }
    },


    game_is_over() {
        return this.gameover = true;
    },

    is_game_over() {
        return this.gameover = false;
    },

    start() {
        jogadas = [];
        jogadores['O'] = []
        jogadores['X'] = []
        this.gameover = false;
        this.draw();
    },

    // restart() {
    // if (this.is_game_over() || this.gameover) {
    // this.start();
    // } else if (confirm('Você tem certeza que quer reiniciar essa partida?')) {
    // this.start();
    // alert('Este jogo foi reiniciado!')
    // }
    // },

    draw() {
        let tabuleiro = '';
        let id = 0;
        for (var x in matriz) {
            for (var y in matriz) {
                for (var key in matriz[x][y]) {
                    tabuleiro += `<div id=l${id++} onclick="tic_tac_toe.make_play({${x}:${y}})">${matriz[x][y][key] ? matriz[x][y][key] : ''}</div>`;
                }
            }
        }
        this.container_element.innerHTML = tabuleiro;
    },
};