import React from 'react';
import Geocode from "react-geocode";
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
mapboxgl.accessToken = 'pk.eyJ1IjoicHAwMDYzeCIsImEiOiJjazhiNmo1ZmYwOTM5M2VwaXNtcmlidDk4In0.toBgfqf3KxIR4Ly9AmDx4Q';



class Location extends  React.PureComponent {
      constructor(props) {
        super(props);
        this.state = {
          lng: -70.9,
          lat: 42.35,
          zoom: 9
        };
        this.mapContainer = React.createRef();
      }
      componentDidMount() {
        const { lng, lat, zoom } = this.state;
        const map = new mapboxgl.Map({
          container: this.mapContainer.current,
          style: 'mapbox://styles',
          center: [lng, lat],
          zoom: zoom
        });
    
        map.on('move', () => {
          this.setState({
            lng: map.getCenter().lng.toFixed(4),
            lat: map.getCenter().lat.toFixed(4),
            zoom: map.getZoom().toFixed(2)
          });
        });
      }
      render() {
        const { lng, lat, zoom } = this.state;
        return (
          <div>
            <div ref={this.mapContainer} className="map-container" />
            <div className="sidebar">
              Longitude: {getReverseGeocodingData(lat, lng)} | Latitude: {lat} | Zoom: {zoom}
            </div>
          </div>
        );
      }
    }
    
function getReverseGeocodingData(lat, lng) { 
    var address ;
    Geocode.setLocationType("ROOFTOP");
    Geocode.setLanguage("en");
    Geocode.enableDebug();
    Geocode.setApiKey("AIzaSyBJhn-OQTu5b829LAAmDQfhq5Mgj0UKz4Q");
    // Get address from latitude & longitude.
    Geocode.fromLatLng(lat, lng).then(
    (response) => {
        address = response.results[0].formatted_address;
        console.log(address);
    },
    (error) => {
        console.error(error);
    }
    );
    return address;
}

export default Location;