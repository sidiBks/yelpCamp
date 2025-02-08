const express = require('express')
const router = express.Router()
const catchAsync = require('../utils/catchAsync')
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware')
const { getCampgrounds, getNewCampgroundForm, createCampground, getCampground,
    getEditCampgroundForm, editCampground, deleteCampground } = require('../controllers/campground.controller')


router.route('/')
    .get(catchAsync(getCampgrounds))
    .post(isLoggedIn, validateCampground, catchAsync(createCampground))

router.route('/:id')
    .get(catchAsync(getCampground))
    .put(isLoggedIn, isAuthor, validateCampground, catchAsync(editCampground))
    .delete(isLoggedIn, isAuthor, catchAsync(deleteCampground))

router.get('/new', isLoggedIn, getNewCampgroundForm)

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(getEditCampgroundForm))



module.exports = router