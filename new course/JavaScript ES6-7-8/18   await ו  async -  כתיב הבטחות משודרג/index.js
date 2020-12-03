const tmp = 
{
    "message": "success",
    "iss_position": {
                        "latitude": "31.9289",
                        "longitude": "65.9571"
                    },
    "timestamp": 1605708008,
}




import {} from 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js';

const lat_field = document.querySelector('#lat-field');
const long_field = document.querySelector('#long-field');

async function getLocationAndPrint() {
    try {
        const data = await $.get('http://api.open-notify.org/iss-now.json');
        const { iss_position: { latitude, longitude  }} = data;
        lat_field.value = latitude;
        long_field.value = longitude;
        setTimeout(getLocationAndPrint, 1000);
    } catch(err) {
        console.log('network error');
    }
   
}

getLocationAndPrint();