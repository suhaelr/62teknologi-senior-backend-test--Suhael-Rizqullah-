app.delete('/business/:id', (req, res) => {
  const id = req.params.id;
  
  // Melakukan operasi delete pada database dengan menggunakan id yang diterima dari parameter
  db.query('DELETE FROM businesses WHERE id = ?', id, (err, result) => {
    if (err) {
      res.status(500).send({
        message: 'Error menghapus data dari database',
        error: err
      });
    } else {
      // Mengembalikan response dengan pesan sukses dan jumlah data yang dihapus
      res.status(200).send({
        message: 'Data berhasil dihapus',
        rowsAffected: result.affectedRows
      });
    }
  });
});
