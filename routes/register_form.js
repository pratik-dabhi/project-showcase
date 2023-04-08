const {Router} = require('express');
const router = Router();
const rform= require ('../controller/creg-form');
const authToken = require('../middleware/authMiddleware');

router.get('/candidate',authToken,rform.candidate);

router.get('/city-api',authToken,rform.city_api);

router.get('/candidate-data',authToken,rform.candidate_data);

router.post('/candidate-details',authToken,rform.candidate_details);

router.get('/show',authToken,rform.show);

router.get('/delete-api',authToken,rform.delete_api);

router.post('/delete-all-api',authToken,rform.delete_all_api);

router.get('/edit-api',authToken,rform.edit_api);

router.post('/update-api',authToken,rform.update_api);


module.exports = router;