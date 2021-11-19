const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, validateCampgrounds, isAuthor } = require('../middleware');
const campgrounds = require('../controllers/campgrounds');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

//Implementing router.route(chaining)
router
  .route('/')
  .get(catchAsync(campgrounds.index))
  .post(
    upload.array('image'),
    validateCampgrounds,
    isLoggedIn,
    catchAsync(campgrounds.createCampground)
  );

router.get('/new', isLoggedIn, campgrounds.renderNewForm);

router
  .route('/:id')
  .get(catchAsync(campgrounds.showCampground))
  .put(
    isLoggedIn,
    isAuthor,
    upload.array('image'),
    validateCampgrounds,
    catchAsync(campgrounds.updateCampground)
  )
  .delete(isAuthor, isLoggedIn, catchAsync(campgrounds.deleteCampground));

router.get(
  '/:id/edit',
  isLoggedIn,
  isAuthor,
  catchAsync(campgrounds.renderEditForm)
);

module.exports = router;
