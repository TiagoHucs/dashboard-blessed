var axios = require('axios');
var ServiceISS = {};


ServiceISS.obterPositionISS = async function(){

    await axios.get('https://api.wheretheiss.at/v1/satellites/25544')
    .then(function (response) {
        return response.data;
    })
    .catch(function (error) {
        console.log(error);
    })
    .finally(function () {
    });
}

//obterPositionISS();

module.exports = ServiceISS;