/* API для добовление товаров */

app.post('/add-product', (req, res) => {
    const { name, price } = req.body;
  
    const sql = 'INSERT INTO products (name, price) VALUES (?, ?)';
    connection.query(sql, [name, price], (err, results) => {
      if (err) {
        console.error('Error adding product: ' + err.stack);
        res.status(500).send('Error adding product');
        return;
      }
      res.status(200).send('Product added successfully');
    });
  });
  