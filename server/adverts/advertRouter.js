const router = require('express').Router();
const advertDb = require('./advertModel')


//endpoints
router.get('/', async (req, res) => {
    const adverts = await advertDb.find()
    console.log(adverts)
    res.status(200)
    .json({ adverts})
})

router.get('/:id', validateUserId, (req, res) => {
    const { id } = req.params
    advertDb.findById(id)
    .then(adverts => {
        if (!adverts) {
            res.status(404).json({ message: 'No advert with id' + id })
        } else {
            console.log(adverts)
            res.status(200).json(adverts)
        }
        })
        .catch(error => {
            console.log(error);
        })
})

router.post('/add', (req, res) => {
   //create an advert
   const newAdvert = req.body
   if (!newAdvert.advertName || !newAdvert.websiteUrl || !newAdvert.country || !newAdvert.tags || !newAdvert.days || !newAdvert.number || !newAdvert.dateString) {
   res.status(400).json({ errorMessage: 'please provide complete body'})
   }else{
       advertDb.add(newAdvert)
       .then( result => {
       res.status(201).json(result)
  })
        .catch( err => res.status(500).json({ errorMessage: 'There was an error while saving the advert to database'}))
  }
   
})

router.delete('/delete/:id', (req, res) => {
    const {id} = req.params
    advertDb.remove(id)
    .then(results => {
        if(results){
            res.status(200).json({ message: 'Delete sucessful'})
        }else{
            res.status(400).json({ message: 'The advert with the specific id does not exist'})
        }})
        .catch(err => res.status(500).json({ message: 'Error deleting adverts'}))
    })

router.put('/update/:id', (req, res) => {
    const {id} = req.params
    const advertInfo = req.body
    if(!advertInfo.advertName || !advertInfo.websiteUrl || !advertInfo.country || !advertInfo.tags || !advertInfo.days || !advertInfo.date || !advertInfo.dateString || !advertInfo.user_id){
       res.status(400).json({ errorMessage: 'please provide full details'})
    } else{
        advertDb.update(id, advertInfo)
        .then(updateAdvert => {
            if(updateAdvert){
                res.status(200).json(updateAdvert)
            }else{
                res.status(404).json({ error: 'The advert could not be removed'})
            }
        })
        .catch( err => res.status(500).json({ error: 'The advert information could not be modified'}))
    }
})

function validateUserId(req, res, next) {
    const advertId = req.params.id
    advertDb.findById(advertId)
        .then(user => {
            // console.log(user)
            if (user) {
                req.advert = advert;
                next();
            } else {
                res.status(400).json({ message: "invalid advert id" })
            }
        })
        .catch(() => {
            res.status(500).json({ errorMessage: "Could not validate adverts with the specified id" })
        })

};
module.exports = router;