import express from 'express';
import cookieParser  from 'cookie-parser';
import cors  from 'cors';
import logger  from 'morgan';
import pool from '../db/connection.js'
import serverless from 'serverless-http'


const app = express()
const port = process.env.PORT || 3000
const router = express.Router();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use('/.netlify/functions/index',router)

/* GET users listing. */
router.get("/", async (req, res, next)=> {
  res.json({ 
    message:'connected to database',
    link:'http://localhost:3000/drinks'
 });
});

router.get("/drinks", async (req, res, next)=> {
  const cocktailList = await pool.query('SELECT * FROM cocktails')
  res.json({ 
    payload:cocktailList.rows
 });
});

router.get("/drinks/:id", async (req, res, next)=> {
  const id = req.params.id;
  const selectedCocktail = await pool.query('SELECT * FROM cocktails WHERE id = $1',[id])
  res.json({ 
    message: "Founded",
    payload:selectedCocktail.rows
 });
});

router.post('/drinks',async(req,res)=>{
  const{name,image,ingridients,instructions}=req.body;
  const saveCockatil = await pool.query('INSERT INTO cocktails(name,image,ingridients,instructions) VALUES($1,$2,$3,$4)',[name,image,ingridients,instructions])
  res.json({
    message:'added',
    payload:saveCockatil.rows
  })
})

router.delete("/drinks/:id",async(req,res)=>{
  const id = req.params.id;
  const deleteCocktail = await pool.query('DELETE FROM cocktails WHERE id = $1',[id])
  res.json({
    message:'deleted',
    payload:deleteCocktail.rows
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


export default serverless(app);