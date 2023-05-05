app.put('/business/:id', (req, res) => {
  const { id } = req.params;
  const updatedBusiness = req.body;

  // TODO: perform validation on the updatedBusiness object

  // TODO: update the business with the specified id in the database
  // Example:
  db.collection('businesses').updateOne({ id }, { $set: updatedBusiness }, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send({ error: 'An error occurred while updating the business.' });
    }

    if (result.modifiedCount === 0) {
      return res.status(404).send({ error: `No business found with id ${id}.` });
    }

    return res.status(200).send({ message: 'Business updated successfully.' });
  });
});
