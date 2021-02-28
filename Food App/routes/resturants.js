const express = require('express');
const { auth } = require('../middlewere/auth');
const { isadmin } = require('../middlewere/admin');
const router = express.Router();
const {Genre} = require('../modules/geners')
const {validteResturant , Resturant} = require("../modules/resturants");
const { toInteger } = require('lodash');
const resDebug = require('debug')('app:resturant')



// need to authorazation 
router.get('/', auth,async (req , res) => {
  //console.log("you are in get request in resturants")
    const resturant = await Resturant.find().sort('rate')
    res.send(resturant)
})

// get by serchquery and genre
router.get('/from/:query', async (req , res) => {
  //  console.log("this is the slice: ", req.params.query)
    let arr = []
    let dir = {}
    let resturants = []
    arr = req.params.query.split("&")
    dir["serch"]=arr[0].split("=")[1]
    dir["genre"] = arr[1].split("=")[1]
    dir["from"] = arr[2].split("=")[1]
    dir["to"] = arr[3].split("=")[1]

    if(dir["genre"]==="AllGenres"){
        resturant = (await Resturant.find({title: new RegExp(dir["serch"]), }).sort('rate')).splice(dir["from"], dir["to"])
    }
    else{
        resturant = (await Resturant.find({'genres.name':{$in:[dir["genre"]]}}).sort('rate')).splice(dir["from"], dir["to"])
    }

    res.send(resturant)
    
   // console.log("this is the from: ", from)
   // console.log("this is the to: ", to)
})

// need to authorazation 
// router.get('/from/:slice', async (req , res) => {
//     //console.log("this is the slice: ", req.params.slice)
//     const from = toInteger(req.params.slice.split("-")[0])
//     const to = toInteger(req.params.slice.split("-")[1])
//    // console.log("this is the from: ", from)
//    // console.log("this is the to: ", to)
//     const resturant = (await Resturant.find().sort('rate')).splice(from, to)
//     res.send(resturant)
// })

router.get('/id/:_id', async (req , res) => {
   // console.log("you are in get request in resturant id and the id is: ", req.params._id)
    const resturant = await Resturant.find({_id:req.params._id})
    //console.log("this is the resturant i found: ", resturant)
    res.send(resturant)
})


//get a filter of all the resturant that contains one of the genres in the title that sparated by &

router.get('/genres/:genres', async (req , res) => {
    let genres= String(req.params.genres).split("&")
    let filteres = await Resturant.find({'genres.name':{$all:genres}}).sort({rate:-1})
   res.send(filteres)
});
// get the list of resturant that has all the genres 
router.get('/genres/:genres/exc', async (req , res) => {
    let genres= String(req.params.genres).split("&")
    let filteres = await Resturant.find({'genres.name':{$all:genres}}).sort({rate:-1})
   res.send(filteres)
});

// get the list of resturant that one of their genres contined in the list of genres that sent
router.get('/genres/:genres/in', async (req , res) => {
    let genres= String(req.params.genres).split("&")
    let filteres = await Resturant.find({'genres.name':{$in:genres}}).sort({rate:-1})
   res.send(filteres)
});

//update the rate by the avg of the dishes rate
router.put('/rate/update/:id', async (req , res) => {
    console.log("i am in update", req.params.id)
    let resturant = await Resturant.findById(req.params.id)
    if (!resturant) return res.status(404).send('The resturnat with the given ID was not found.');  
    resturant = resturant.updateRate()
    res.send(resturant)
})

router.post('/',[auth,isadmin] , async (req , res) => {
    let genres = []
    let genre;

     for(let i=0; i<req.body.genres.length; i++){
         genre = await Genre.findOne({name:req.body.genres[i]})
         if(!genre) return res.status(404).send(`The genre with the ID ${req.body.genre[i]} was not found.`);
         else{
             genres.push(genre)
         }
     }
    let resturant = new Resturant({
        title:req.body.title,
        genres:genres,
        menu:req.body.menu,
        dailyRentalRate:req.body.dailyRentalRate
    })

    resturant.save().then((resturant)=> res.send(resturant)).catch((e)=> console.error("there is an error" ,e))

    // try{
    // resturant = await resturant.save();
    // res.send(resturant)
    // }
    // catch(e){
    //     console.error("there is an error" ,e)
    // }
})


router.delete('/:id', async (req , res) => {
    const resturant = await Resturant.findByIdAndDelete(req.params.id)
    if (!resturant) return res.status(404).send('The genre with the given ID was not found.');
    res.send(resturant)
})


module.exports = router;