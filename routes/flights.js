import { Router } from 'express'
const router = Router()
import * as flightsCtrl from '../controllers/flights.js'


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

//POST localhost:3000/flights/:id/tickets
router.post('/:id/tickets', flightsCtrl.createTicket)

router.post('/:id/destinations', flightsCtrl.addStop)

router.delete('/:id',flightsCtrl.delete)

router.get("/:id/edit",flightsCtrl.edit)
router.put("/:id",flightsCtrl.update)