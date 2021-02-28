const express = require('express');
const mongoose = require('mongoose')
const Joi = require('joi')
const {auth} = require('../middlewere/auth')
const {Genre , validate} = require('../modules/geners')
const router = express.Router();



async function AddGenre(genre){
  const newgenre = new Genre(genre)
  const result = await newgenre.save()
  console.log(result)
  return result;
}



router.get('/', async (req, res , next ) => {
    res.send(await Genre.find());
}); 

router.post('/', auth , async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let genre = {
    name: req.body.name
  };
  genre = await AddGenre(genre);
  res.send(genre);
});

router.put('/:id',auth, async (req, res) => {

  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let genre = await Genre.findById(req.params.id);
  if (!genre) return res.status(404).send('The genre with the given ID was not found.');

  
  genre.name = req.body.name; 
  genre = await genre.save()
  res.send(genre);
});

router.delete('/:id', auth, async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);
  if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  res.send(genre);
});

router.get('/:id',async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  console.log(genre)
  if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  res.send(genre);
});



module.exports = router;