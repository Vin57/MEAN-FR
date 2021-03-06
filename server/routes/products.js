const router = require("express").Router();
const mongoose = require("mongoose");
const Products = require("../models/products.model");
const categories = require("../models/categories.model");

router.get("/", (req, res) => {
  if (req.query.search === undefined) {
    run_100_last()
  } else {
    run_search()
  }

  async function run_search(){
    search_product = req.query.search
    //The part below permit to insensitive the query
    const regex = new RegExp(search_product, 'i')
    const product = await Products.find({ $or: [{ name : {$regex: regex}},{ description : {$regex: regex}} ]}).populate("categories")
    res.json(product)
    res.end()
  }

  async function run_100_last(){
    const product = await Products.find().sort({ _id: -1 }).limit(100).populate("categories")
    res.json(product)
    res.end()
  }
});

router.post("/create", (req, res) => {
  const create_products = new Products ({
    name: req.body['name'],
    description: req.body['description'],
    price: req.body['price'],
    categories: req.body['categories'],
    images: req.body['images'],
    });
    create_products.save(function(err){
      if (err) {
        res.send(400, '[!] all information are not send correctly to the server for the creation of a product')
        res.end()
      }
      else{
        res.json("[+] Products created")
        res.end()
      }
    })
});


module.exports = router;
