import { Flight } from '../models/flight.js'

export {
  newFlight as new,
  create,
  index,
  show,
  createTicket,
}

function show(req, res) {
  Flight.findById(req.params.id, function (err, flight) {
    res.render('flights/show', { 
      title: 'Flight Detail', 
      flight: flight,
    })
  })
}

function index(req, res) {
  Flight.find({}, function(err, flights) {
    res.render('flights/index', {
      flights: flights,
      title: 'All Flights'
    })
  })
}

function create(req, res) {
  req.body.nowShowing = !!req.body.nowShowing
  if (req.body.cast) {
    req.body.cast = req.body.cast.replace(', ', ',')
    req.body.cast = req.body.cast.split(',')
  }
  const flight = new Flight(req.body)
  flight.save(function(err) {
    if (err) return res.redirect('/flights/new')
    res.redirect('/flights')
  })


}

function newFlight(req, res) {
  res.render('flights/new', {
    title: "Add Flight"
  })
}

function createTicket(req,res){
  Flight.findById(req.params.id, function(err, flight){
    flight.reviews.push(req.body)
    flight.save(function(err){
      res.redirect(`/flights/${flight._id}`)
    })
  })
}