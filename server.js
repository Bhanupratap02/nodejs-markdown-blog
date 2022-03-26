 const express = require('express')
const app = express()
const mongoose = require("mongoose");
const Article = require("./models/artcle");
const port = 3000; 
const articleRouter = require("./routes/articles");
const methodOverride = require("method-override");
///view engine
app.set("view engine","ejs");
//set article routes
app.use(express.urlencoded({extended:false}));
app.use(methodOverride("_method"));



app.use("/articles",articleRouter);

//home rotes
app.get('/', async (req, res) => {
    const articles = await Article.find().sort({
        createAt:'desc'
    })
    res.render("articles/index",{articles:articles})
})
// connect to DB
mongoose.connect('mongodb://localhost:27017/blog', ()=> {
    console.log('mongodb connected')
});
//server 
app.listen(port, () => console.log(`Server started on ${port}!`)) 