const express = require('express');
const router = express.Router();

/* GET reviews index  /reviews. */
router.get('/', (req, res, next) => {
  res.send('/posts/:id/reviews');
});

/* GET reviews create  /reviews. */
router.post('/', (req, res, next) => {
  res.send('CREATE /reviews');
});

/* GET reviews edit  /reviews. */
router.get('/:review_id/edit', (req, res, next) => {
  res.send('EDIT /posts/:id/reviews/:review_id/edit');
});

/* GET reviews update  /reviews. */
router.put('/:review_id', (req, res, next) => {
  res.send('UPDATE /posts/:id/reviews/:review_id');
});

/* GET reviews destroy  /reviews. */
router.delete('/:review_id', (req, res, next) => {
  res.send('DELETE /posts/:id/reviews/:review_id');
});


module.exports = router;

/*
GET index		/reviews
GET new			/reviews/new
POST create		/reviews
GET show		/reviews/:id
GET edit		/reviews/:id/edit
PUT update		/reviews/:id
DELETE destroy	/reviews/:id
*/