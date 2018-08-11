$(document).ready(() => {
  getLocation();

  //Search for geolocation
  $(".inputForm").submit(e => {
    e.preventDefault();

    let latitude = $("#inputField1").val();
    let longitude = $("#inputField2").val();

    getDestinationStats(latitude, longitude);

    $("#inputField1").val("");
    $("#inputField2").val("");
  });

  //Current geolocation of user
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      alert("Turn ON geolocation on your browser!");
    }
  }

  function showPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getDepartureStats(latitude, longitude);
    console.log(position);
  }

  //Weather information for users current geolocation
  function getDepartureStats(latitude, longitude) {
    let URL = `https://api.met.no/weatherapi/locationforecast/1.9/?lat=${latitude}&lon=${longitude}`;

    $.ajax({
      url: URL,
      method: "GET",
      dataType: "xml",
      success: function(data) {
        updateDepartureDOM(data);
        console.log(data);
      },
      error: function(eror) {
        alert("Geolocation is incorrect!");
      }
    });
  }

  //Weather information for the geolocation requested by the user
  function getDestinationStats(latitude, longitude) {
    let URL = `https://api.met.no/weatherapi/locationforecast/1.9/?lat=${latitude}&lon=${longitude}`;

    $.ajax({
      url: URL,
      method: "GET",
      dataType: "xml",
      success: function(data) {
        updateDestinationDOM(data);
        console.log(data);
      },
      error: function(eror) {
        alert("Geolocation is incorrect!");
      }
    });
  }

  //Current geolocation data
  function updateDepartureDOM(data) {
    let dewPoint = $(data)
      .find("dewpointTemperature ")
      .attr("value");
    let humidity = $(data)
      .find("humidity")
      .attr("value");
    let temperature = $(data)
      .find("temperature")
      .attr("value");
    let fog = Math.round(
      $(data)
        .find("fog")
        .attr("percent")
    );
    let lowClouds = Math.round(
      $(data)
        .find("lowClouds")
        .attr("percent")
    );
    let mediumClouds = Math.round(
      $(data)
        .find("mediumClouds")
        .attr("percent")
    );
    let highClouds = Math.round(
      $(data)
        .find("highClouds")
        .attr("percent")
    );

    $(".departureStats").html(`
                  <h4>Departure Weather</h4>
                  
                  <p>Dew Point: ${dewPoint}°</p>
                  <p>Humidity: ${humidity}%</p>
                  <p>Temperature:${temperature} </p>
                  `);

    $(".departurePreview").html(`
                  <div class="item-1">
                      <h6>${fog}%</h6>
                      <p>Fog</p> 
                  </div>
                  <div class="item-2">
                      <h6>${lowClouds}%</h6>
                      <p>Low Clouds</p>
                  </div>
                  <div class="item-3">
                      <h6>${mediumClouds}%</h6>
                      <p>Medium Clouds</p>
                  </div>
                  <div class="item-4">
                      <h6>${highClouds}%</h6>
                      <p>High Clouds</p>
                  </div>
                      `);

    function weatherCheckDeparture() {
      if (fog >= 0 && fog <= 20) {
        $(".departurePreview .item-1").append(`
        <i class="sun fas fa-sun"></i>
        `);
      }
      if (lowClouds >= 0 && lowClouds <= 20) {
        $(".departurePreview .item-2").text();
      } else if (lowClouds >= 20 && lowClouds <= 50) {
        $(".departurePreview .item-2").append(`
        <i class="cloudLowTrans fas fa-cloud"></i>
        `);
      } else {
        $(".departurePreview .item-2").append(`
        <i class="cloudLow fas fa-cloud"></i>
        `);
      }

      if (mediumClouds >= 0 && mediumClouds <= 20) {
        $(".departurePreview .item-3").text();
      } else if (mediumClouds >= 20 && mediumClouds <= 50) {
        $(".departurePreview .item-3").append(`
        <i class="cloudMediumTrans fas fa-cloud"></i>
        `);
      } else {
        $(".departurePreview .item-3").append(`
        <i class="cloudMedium fas fa-cloud"></i>
        `);
      }

      if (highClouds >= 0 && highClouds <= 20) {
        $(".departurePreview .item-4").text();
      } else if (highClouds >= 20 && highClouds <= 50) {
        $(".departurePreview .item-4").append(`
        <i class="cloudHighTrans fas fa-cloud"></i>
        `);
      } else {
        $(".departurePreview .item-4").append(`
        <i class="cloudHigh fas fa-cloud"></i>
        `);
      }
    }
    weatherCheckDeparture();
  }

  //Geolocation data by user request
  function updateDestinationDOM(data) {
    let dewPoint = $(data)
      .find("dewpointTemperature ")
      .attr("value");
    let humidity = $(data)
      .find("humidity")
      .attr("value");
    let temperature = $(data)
      .find("temperature")
      .attr("value");
    let fog = Math.round(
      $(data)
        .find("fog")
        .attr("percent")
    );
    let lowClouds = Math.round(
      $(data)
        .find("lowClouds")
        .attr("percent")
    );
    let mediumClouds = Math.round(
      $(data)
        .find("mediumClouds")
        .attr("percent")
    );
    let highClouds = Math.round(
      $(data)
        .find("highClouds")
        .attr("percent")
    );

    $(".destinationStats").html(`
              <h4>Destination Weather</h4>

              <p>Dew Point: ${dewPoint}°</p>
              <p>Humidity: ${humidity}%</p>
              <p>Temperature: ${temperature}</p>
              `);

    $(".destinationPreview").html(`
              <div class="item-1">
                  <h6>${fog}%</h6>
                  <p>Fog</p> 
              </div>
              <div class="item-2">
                  <h6>${lowClouds}%</h6>
                  <p>Low Clouds</p>
              </div>
              <div class="item-3">
                  <h6>${mediumClouds}%</h6>
                  <p>Medium Clouds</p>
              </div>
              <div class="item-4">
                  <h6>${highClouds}%</h6>
                  <p>High Clouds</p>
              </div>
                  `);

    function weatherCheckDestination() {
      if (fog >= 0 && fog <= 20) {
        $(".destinationPreview .item-1").append(`
      <i class="sun fas fa-sun"></i>
      `);
      }
      if (lowClouds >= 0 && lowClouds <= 20) {
        $(".destinationPreview .item-2").text();
      } else if (lowClouds >= 20 && lowClouds <= 50) {
        $(".destinationPreview .item-2").append(`
        <i class="cloudLowTrans fas fa-cloud"></i>
        `);
      } else {
        $(".destinationPreview .item-2").append(`
        <i class="cloudLow fas fa-cloud"></i>
        `);
      }

      if (mediumClouds >= 0 && mediumClouds <= 20) {
        $(".destinationPreview .item-3").text();
      } else if (mediumClouds >= 20 && mediumClouds <= 50) {
        $(".destinationPreview .item-3").append(`
        <i class="cloudMediumTrans fas fa-cloud"></i>
        `);
      } else {
        $(".destinationPreview .item-3").append(`
        <i class="cloudMedium fas fa-cloud"></i>
        `);
      }

      if (highClouds >= 0 && highClouds <= 20) {
        $(".destinationPreview .item-4").text();
      } else if (highClouds >= 20 && highClouds <= 50) {
        $(".destinationPreview .item-4").append(`
        <i class="cloudHighTrans fas fa-cloud"></i>
        `);
      } else {
        $(".destinationPreview .item-4").append(`
        <i class="cloudHigh fas fa-cloud"></i>
        `);
      }
    }
    weatherCheckDestination();
  }
});
