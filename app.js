let app = require('express')()

app.get('/',(req,res)=>{
    
    res.send('salut')
    
})

app.listen(3001)