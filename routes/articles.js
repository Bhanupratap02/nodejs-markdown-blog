const express = require("express");
const router = express.Router();
 const Article = require("./../models/artcle")
 //get request
router.get("/new",(req,res)=>{
 res.render("articles/new",{article:new Article()})
});
// get single one
router.get("/:slug",async (req,res)=>{
    const article = await Article.findOne({_id:req.params.slug})
    console.log(article)
    if(article === null) res.redirect("/")
 res.render("articles/show",{article:article})
});
// request for edit
router.get("/edit/:id",async (req,res)=>{
 const article = await Article.findById(req.params.id);
 res.render("articles/edit",{article:article})
});
// post request 

router.post("/",async (req,res,next)=>{
 req.article = new Article();
 next()
},saveArticleAndRedirect("new"));
//put request
router.put("/:id",async (req,res,next)=>{
 req.article = await Article.findById(req.params.id);
 next()
},saveArticleAndRedirect("edit"));
// delete request
router.delete("/:id",async (req,res)=>{
    await Article.findByIdAndDelete(req.params.id)
    res.redirect("/")
});
// savearticleand redirect function
function saveArticleAndRedirect (path){
 return   async (req,res)=>{
let  article = req.article
   article.title=req.body.title,
     article.description=req.body.description,
    article.markdown=req.body.markdown
 
 try {
   article =  await article.save()
   res.redirect(`/articles/${article.id}`)
 } catch (error) {
     res.render(`articles/${path}`,{article:article})
 }
 }
}
module.exports = router; 