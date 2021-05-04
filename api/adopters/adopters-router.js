// ADOPTERS ENDPOINTS
// ADOPTERS ENDPOINTS
// ADOPTERS ENDPOINTS
server.get('/api/adopters', (req, res) => {
  Adopter.find(req.query)
    .then(adopters => {
      res.status(200).json(adopters);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the adopters',
      });
    });
});

server.get('/api/adopters/:id', (req, res) => {
  Adopter.findById(req.params.id)
    .then(adopter => {
      if (adopter) {
        res.status(200).json(adopter);
      } else {
        res.status(404).json({ message: 'Adopter not found' });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the adopter',
      });
    });
});

server.get('/api/adopters/:id/dogs', (req, res) => {
  Adopter.findDogs(req.params.id)
    .then(dogs => {
      if (dogs.length > 0) {
        res.status(200).json(dogs);
      } else {
        res.status(404).json({ message: 'No dogs for this adopter' });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the dogs for this adopter',
      });
    });
});

server.post('/api/adopters', (req, res) => {
  Adopter.add(req.body)
    .then(adopter => {
      res.status(201).json(adopter);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: 'Error adding the adopter',
      });
    });
});

server.delete('/api/adopters/:id', (req, res) => {
  Adopter.remove(req.params.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: 'The adopter has been nuked' });
      } else {
        res.status(404).json({ message: 'The adopter could not be found' });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: 'Error removing the adopter',
      });
    });
});

server.put('/api/adopters/:id', (req, res) => {
  const changes = req.body;
  Adopter.update(req.params.id, changes)
    .then(adopter => {
      if (adopter) {
        res.status(200).json(adopter);
      } else {
        res.status(404).json({ message: 'The adopter could not be found' });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: 'Error updating the adopter',
      });
    });
});
