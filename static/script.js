

class BoggleAJAX {
    constructor(){
        this.checked = []


    }
    static create_boggle(){
        return new BoggleAJAX()
    }

    async check_word(word){
        res = await axios.post('/check_word')
        if (res.data == 'ok' || res.data == 'not-on-board'){
            this.checked.push(word)
            return res.data == 'ok' ? true : false
        }

        return false
    }
}