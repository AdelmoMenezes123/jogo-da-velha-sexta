// TIC TAC TOE

x4 = document.querySelector('.x4')
x5 = document.querySelector('.x5')
x6 = document.querySelector('.x6')

const tic_tac_toe = {
    // ATTRIBUTES
    boardx4: [
        '', '', '', '',
        '', '', '', '',
        '', '', '', '',
        '', '', '', ''
    ],

    boardx5: [
        '', '', '', '', '',
        '', '', '', '', '',
        '', '', '', '', '',
        '', '', '', '', '',
        '', '', '', '', ''
    ],

    boardx6: [
        '', '', '', '', '', '',
        '', '', '', '', '', '',
        '', '', '', '', '', '',
        '', '', '', '', '', '',
        '', '', '', '', '', '',
        '', '', '', '', '', ''
    ],


    symbols: {
        options: ['O', 'X'],
        turn_index: 0,
        change() {
            this.turn_index = (this.turn_index === 0 ? 1 : 0);
        }
    },
    container_element: null,
    gameover: false,
    winning_sequences: [
        [0, 1, 2], [1, 2, 3], //LINHA 1 
        [4, 5, 6], [5, 6, 7], // LINHA 2
        [8, 9, 10], [9, 10, 11], // LINHA 3
        [12, 13, 14], [13, 14, 15], // LINHA 4

        [0, 4, 8], [4, 8, 12] // COLUNA 1
        [1, 5, 9], [5, 9, 13] //COLUNA 2
        [2, 6, 10], [6, 10, 14] // COLUNA 3
        [3, 7, 11], [7, 11, 15] // COLUNA 4

        [0, 5, 10], [5, 10, 15]
        [4, 9, 14],
        [8, 5, 2],
        [12, 9, 6], [9, 6, 3],
        [1, 6, 11],
        [13, 10, 7],


    ],

    // FUNCTIONS
    init(container) {
        this.container_element = container;
    },

    make_play(position) {

        if ((!!x4) && (this.gameover || this.boardx4[position] !== '')) return false;
        else if ((!!x5) && (this.gameover || this.boardx5[position] !== '')) return false;
        else if ((!!x6) && (this.gameover || this.boardx6[position] !== '')) return false;

        const currentSymbol = this.symbols.options[this.symbols.turn_index];
        if (!!x4) this.boardx4[position] = currentSymbol;
        else if (!!x5) this.boardx5[position] = currentSymbol;
        else if (!!x6) this.boardx6[position] = currentSymbol;

        this.draw();

        const winning_sequences_index = this.check_winning_sequences(currentSymbol);
        if (this.is_game_over()) {
            this.game_is_over();
        }
        if (winning_sequences_index >= 0) {
            this.game_is_over();
            this.stylize_winner_sequence(this.winning_sequences[winning_sequences_index]);
        } else {
            this.symbols.change();
        }
        return true;
    },

    stylize_winner_sequence(winner_sequence) {
        winner_sequence.forEach((position) => {
            this
                .container_element
                .querySelector(`div:nth-child(${position + 1})`)
                .classList.add('winner');
        });
    },

    check_winning_sequences(symbol) {

        for (i in this.winning_sequences) {
console.log(i)
            if (!!x4) {
                if (this.boardx4[this.winning_sequences[i][0]] == symbol &&
                    this.boardx4[this.winning_sequences[i][1]] == symbol &&
                    this.boardx4[this.winning_sequences[i][2]] == symbol &&
                    this.boardx4[this.winning_sequences[i][3]] == symbol) {
                    alert('winning sequences INDEX:' + i);
                    return i;
                }
            }


        };
        return -1;
    },

    game_is_over() {
        this.gameover = true;
        alert('GAME OVER');
    },

    is_game_over() {
        if (!!x4) return !this.boardx4.includes('');
    },

    start() {
        if (!!x4) this.boardx4.fill('');
        this.draw();
        this.gameover = false;
    },

    restart() {
        if (this.is_game_over() || this.gameover) {
            this.start();
            alert('this game has been restarted!')
        } else if (confirm('Are you sure you want to restart this game?')) {
            this.start();
            alert('this game has been restarted!')
        }
    },

    draw() {
        if (!!x4) this.container_element.innerHTML = this.boardx4.map((element, index) => `<div onclick="tic_tac_toe.make_play('${index}')"> ${element} </div>`).reduce((content, current) => content + current);
    },
};