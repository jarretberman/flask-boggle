let boggle;

describe('axios tests for BoggleAJAX class', () =>{

    beforeEach(async()=>{
        boggle = new BoggleAJAX
    })

    it('check_word should return a boolean and update tried words list',async ()=>{
        const test = await boggle.check_word('aaron')

        expect(typeof test).toEqual('boolean')
        expect(boggle.checked.length).toEqual(1)
        expect(boggle.checked[0]).toEqual('aaron')
        
    })

    it('check_word should be a boolean in failed word cases', async ()=>{
        const test = await boggle.check_word('zxywe')

        expect(typeof test).toEqual('boolean')
        expect(boggle.checked.length).toEqual(0)
    })
}) 
