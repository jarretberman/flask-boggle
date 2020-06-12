class BoggleGame {
    constructor(){
        this.checked = new Set()
        this.score = 0
        this.found = new Set()
        $('#submit').on('submit', this.handle_word_submit(evt).bind(this))
    }
    static create_boggle(){
        const game = new BoggleGame
        return game
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
            $('#msg').text('Good Job!')
            $('#found').append(`<li>${word}`)
        } else {
            $(`Sorry '${word}' isn't on the board`)
        }
    }

    determine_score(bool,word) {
        if(bool){
            this.found.add(word)
            this.score += word.length
            return true
        }
        return false
    }
    

}
