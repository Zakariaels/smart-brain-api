const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: 'fcf01a0223884eeca8722d5b752e4f12'
 });

 const handleApiCall = (req, res) => {
    app.models.predict( Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        res.json(data);
    })
    .catch(err => res.status(400).json('unable to fetch from clarofai API'))
 }


const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0])
    })
    .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
    handleImage,
    handleApiCall
}