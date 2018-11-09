
var weatherStatus = {
    rainny : {
        color : require("../images/weather/rainny-color.png"),
        line : require("../images/weather/rainny-line.png")
    },
    cloud : {
        color : require("../images/weather/cloud-color.png"),
        line : require("../images/weather/cloud-line.png")
    },
    littlecloudy : {
        color : require("../images/weather/little-cloudy-color.png"),
        line : require("../images/weather/little-cloudy-line.png")
    },
    snow : {
        color : require("../images/weather/snow-color.png"),
        line : require("../images/weather/snow-line.png")
    },
    sunny : {
        color : require("../images/weather/sunny-color.png"),
        line : require("../images/weather/sunny-line.png")
    },
}

var weatherListData = [
   {
    hour : '12:00',
    status : weatherStatus.rainny,
    temperature : 23,    
   },
   {
    hour : '13:00',
    status : weatherStatus.cloud,
    temperature : 23
   },
   {
    hour : '14:00',
    status : weatherStatus.snow,
    temperature : 23
   },
   {
    hour : '15:00',
    status : weatherStatus.sunny,
    temperature : 23
   },
   {
    hour : '16:00',
    status : weatherStatus.littlecloudy,
    temperature : 23
   },
   {
    hour : '17:00',
    status : weatherStatus.snow,
    temperature : 23
   },
   {
    hour : '18:00',
    status : weatherStatus.sunny,
    temperature : 23
   },
   {
    hour : '19:00',
    status : weatherStatus.littlecloudy,
    temperature : 23
   }
];

export{weatherStatus};
export{weatherListData};