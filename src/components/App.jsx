import React, { Component } from 'react';
import {withGoogleMap, GoogleMap, Circle, InfoWindow} from "react-google-maps";

const ClosureListenersExampleGoogleMap = withGoogleMap(props => (
  <GoogleMap
    defaultZoom={4}
    defaultCenter={new google.maps.LatLng(-25.363882, 131.044922)}
  >
    {props.markers.map((marker, index) => {
      const onClick = () => props.onMarkerClick(marker);
      const onCloseClick = () => props.onCloseClick(marker);

      return (
        <Circle
          key={index}
          center={marker.position}
          radius={20000}
          title={(index + 1).toString()}
          onClick={onClick}
          options={{
            fillColor: `red`,
            fillOpacity: 0.20,
            strokeColor: `red`,
            strokeOpacity: 1,
            strokeWeight: 1,
          }}
          >
          {marker.showInfo && (
            <InfoWindow onCloseClick={onCloseClick}>
              <div>
                <strong>{marker.content}</strong>
                <br />
                <em>The contents of this InfoWindow are actually ReactElements.</em>
              </div>
            </InfoWindow>
          )}
        </Circle>
      );
    })}
  </GoogleMap>
));

// function generateInitialMarkers() {
//   // const southWest = new google.maps.LatLng(-31.203405, 125.244141);
//   // const northEast = new google.maps.LatLng(-25.363882, 131.044922);

//   // const lngSpan = northEast.lng() - southWest.lng();
//   // const latSpan = northEast.lat() - southWest.lat();

//   const markers = [];
//   for (let i = 0; i < this.state.earthquakes; i++) {
//     const position = new google.maps.LatLng(
//       this.state.earthquakes[i].geometry.coordinates[0],
//       this.state.earthquakes[i].geometry.coordinates[0]
//     );
//     markers.push({
//       position,
//       content: `This is the secret message`.split(` `)[i],
//       showInfo: false,
//     });
//   }
//   return markers;
// }

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [],
      earthquakes: [],
    };
    this.fetchData = this.fetchData.bind(this);
    this.handleMarkerClick = this.handleMarkerClick.bind(this);
    this.handleCloseClick = this.handleCloseClick.bind(this);
    this.createMarkers = this.createMarkers.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch('http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson')
      .then((response) => {
          console.log(this);
          if(response.status !== 200) {
            console.log('Problem with request ' + response.status);
            return;
          }
          response.json().then((data) => {
            console.log(data);
            this.setState({
              earthquakes: data.features
            });
            this.createMarkers();
          });
        }
      )
      .catch(function(err) {
        console.log('Fetch error', err);
      })
  }

  createMarkers() {
    let markers = [];
    // console.log(this.state.earthquakes);
    // console.log(this.state.earthquakes[0].geometry.coordinates[1]);
    for (let i = 0; i < this.state.earthquakes.length; i++) {
    //this.state.earthquakes.forEach(()
      const position = new google.maps.LatLng(
        this.state.earthquakes[i].geometry.coordinates[1],
        this.state.earthquakes[i].geometry.coordinates[0]
      );
      markers.push({
        position,
        content: `This is the secret message`.split(` `)[i],
        showInfo: false,
        alert: this.state.earthquakes[i].properties.alert,
        mag: this.state.earthquake[i].properties.mag,
      });
    }
    console.log(markers);
    this.setState ({
      markers: markers
    })
  }

  handleMarkerClick(targetMarker) {
    this.setState({
      markers: this.state.markers.map(marker => {
        if (marker === targetMarker) {
          return {
            marker,
            showInfo: true,
          };
        }
        return marker;
      }),
    });
  }

  handleCloseClick(targetMarker) {
    this.setState({
      markers: this.state.markers.map(marker => {
        if (marker === targetMarker) {
          return {
            marker,
            showInfo: false,
          };
        }
        return marker;
      }),
    });
  }

  render() {
    return (
      <div style={{height:'100%'}}>
        <div>
          Hello world2.
        </div>
      <ClosureListenersExampleGoogleMap
        containerElement={
          <div style={{ height: `100%` }} />
        }
        mapElement={
          <div style={{ height: `100%` }} />
        }
        onMarkerClick={this.handleMarkerClick}
        onCloseClick={this.handleCloseClick}
        markers={this.state.markers}
      />
    </div>
    );
  };
}

export default App;
