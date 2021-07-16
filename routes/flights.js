import { Router } from 'express'
const router = Router()

export {
  router
}

// GET localhost:3000/flights
router.get('/', flightsCtrl.index)

// GET localhost:3000/flights/new
router.get('/new', flightsCtrl.new)

router.get('/:id', flightsCtrl.show);

// POST localhost:3000/flights
router.post('/', flightsCtrl.create)

//POST localhost:3000/flights/:id/reviews
router.post('/:id/reviews', flightsCtrl.createReview)