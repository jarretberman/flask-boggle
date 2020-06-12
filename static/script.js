class BoggleGame {
    constructor(time = 60){
        this.checked = new Set()
        this.score = 0
        this.found = new Set()
        this.secs = time
        this.timer = setInterval(this.count.bind(this),1000)
        $('#checkWord').on('click', this.handle_word_submit.bind(this))
        $('#timer').text(`${this.secs}`)
        $('#score').text(`${this.score}`)
    }
    static create_boggle(){
        const game = new BoggleGame
        return game
    }
    count() {
        this.secs--
        $('#timer').text(`${this.secs}`)
        if(this.secs == 0){
            clearInterval(this.timer)
            this.gameOver()
        }
    }
    gameOver() {
        $('#gameContainer').empty()
        $('#gameContainer') .append(`<p>You Scored ${this.score} points!</p>`)
                            .append(`<a href= "/play">Click here to Play Again</a>`)
    }

    async check_word(word){
        const res = await axios.get('/check-word', {params:{word:word}})
        const data = res.data

        if (data.result == 'ok' || res.isValid == 'not-on-board'){
            this.checked.add(word)
            return data.result == 'ok' ? true : false
        }
        this.checked.add(word)
        return false
    }

    async handle_word_submit(evt){
        evt.preventDefault()
        
        const word = $('#word').val()
        if (this.found.has(word)) {
            return alert(`${word} has already been found`)
        }
        if(this.checked.has(word)){
            return alert(`You've already tried ${word}!`)
        }
        
        const bool = await this.check_word(word)
        if(this.determine_score(bool,word)){
            $('#msg').text(`Good Job! You got ${word.length} points!` )
            $('#found').append(`<li>${word}`)
        } else {
            $('#msg').text(`Sorry '${word}' isn't on the board`)
        }
    }

    determine_score(bool,word) {
        if(bool){
            this.found.add(word)
            this.score += word.length
            $('#score').text(`${this.score}`)
            return true
        }
        return false
    }
    

}
