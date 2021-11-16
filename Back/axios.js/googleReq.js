const axios = require('axios');
const myError = require('../models/myError');
//api key geocoding = AIzaSyAM0SGgmHL00W1qSNE_dWY_7A2S9_xgs00
//req example = https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=YOUR_API_KEY

async function addressToCoordintes(address) {
    const apiKey = 'AIzaSyCOaIaByGKKP_WNf3ifid2n2XgG7bXfkpI';
    let newAddress = encodeURIComponent(address)
    console.log("address = ",address, "new address = ",newAddress);
    try{
    const response = await axios.
    get(`https://maps.googleapis.com/maps/api/geocode/json?address=${newAddress}&key=${apiKey}`);
    data = response.data;
    const coords =  data.results[0].geometry.location;
        return coords;
    }catch(e){
        const myError = new myError(e,404);
        throw myError;
    }  
}
module.exports = addressToCoordintes;