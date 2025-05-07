const exp = require('express');
const mysqldb = require('mysql2');
const cors = require('cors')

const app = exp();
const port = 4100;

app.use(exp.json());
app.use(cors());

const db = mysqldb.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'recipe_book'
})

db.connect(err=>{
    if(err){
     console.error("Data is not connected",err);
     return;
    }
    else{
        console.log('Connected Successfully');
    }
},



app.get('/api/get_recipe',(req,res)=>{
const sql = "Select * from recipe";
db.query(sql,(err,result)=>{
    if(err){
        console.log("There is a error with the recipe query");
        return res.status(500).send("Error while fetching recipe data");
    }
    let resp = res.json(result);
    console.log(resp,"response")
})
}),
app.listen(port,()=>{
 console.log("Service running on ",{port})
})
)