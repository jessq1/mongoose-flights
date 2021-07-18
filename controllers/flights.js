import { Flight } from '../models/flight.js'
import { Destination } from '../models/destination.js'

export {
  newFlight as new,
  create,
  index,
  show,
  createTicket,
  addStop,
  deleteFlight as delete,
  edit,
  update,
}

function newFlight(req, res) {
  res.render('flights/new', {
    title: "Add Flight"
  })
}

function create(req, res) {
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key]
  }
  const flight = new Flight(req.body)
  flight.save(function(err) {
    if (err) {
      console.log(err)
      return res.redirect('/flights/new')
    }
    res.redirect(`/flights/${flight._id}`)
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

function show(req, res) {
  Flight.findById(req.params.id)
  .populate('airport').exec(function(err, flight) {

    Destination.find({_id: {$nin: flight.airport}}, function(err, destinations) {
      res.render('flights/show', {
        title: 'Flight Detail', 
        flight: flight,
        destinations: destinations
      })
    })
  })
}

function createTicket(req, res) {
  // Find the flight
  Flight.findById(req.params.id, function(err, flight) {
    flight.tickets.push(req.body)
    flight.save(function(err) {
      res.redirect(`/flights/${flight._id}`)
    })
  })
}

function addStop(req, res) {
  Flight.findById(req.params.id, function(err, flight) {
    console.log(req.body.destinationId)
    flight.airport.push(req.body.destinationId)
    flight.save(function(err) {
      res.redirect(`/flights/${flight._id}`)
    })
  })
}

function deleteFlight(req,res){
  Flight.findByIdAndDelete(req.params.id, function(err, flight) {
    res.redirect('/flights')
  })
}

function edit(req,res){
  Flight.findById(req.params.id, function(err, flight) {
    res.render('flights/edit', {
      flight,
      err,
      title: "Edit Flight"
    })
  })
}

function update(req,res){
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key]
  }
  Flight.findByIdAndUpdate(req.params.id, req.body, {new:true}, function(err, flight) {
    res.redirect(`/flights/${flight._id}`)
  })
}