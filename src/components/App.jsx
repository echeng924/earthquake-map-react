import React, { Component } from 'react';
import {withGoogleMap, GoogleMap, Marker, InfoWindow} from "react-google-maps";



const ClosureListenersExampleGoogleMap = withGoogleMap(props => (
  <GoogleMap
    defaultZoom={4}
    defaultCenter={new google.maps.LatLng(-25.363882, 131.044922)}
  >
    {props.markers.map((marker, index) => {
      const onClick = () => props.onMarkerClick(marker);
      const onCloseClick = () => props.onCloseClick(marker);

      return (
        <Marker
          key={index}
          position={marker.position}
          title={(index + 1).toString()}
          onClick={onClick}
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
        </Marker>
      );
    })}
  </GoogleMap>
));

function generateInitialMarkers() {
  const southWest = new google.maps.LatLng(-31.203405, 125.244141);
  const northEast = new google.maps.LatLng(-25.363882, 131.044922);

  const lngSpan = northEast.lng() - southWest.lng();
  const latSpan = northEast.lat() - southWest.lat();

  const markers = [];
  for (let i = 0; i < 5; i++) {
    const position = new google.maps.LatLng(
      southWest.lat() + latSpan * Math.random(),
      southWest.lng() + lngSpan * Math.random()
    );
    markers.push({
      position,
      content: `This is the secret message`.split(` `)[i],
      showInfo: false,
    });
  }
  return markers;
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: generateInitialMarkers(),
      earthquakes: {},
    };
    this.fetchData = this.fetchData.bind(this);
    this.handleMarkerClick = this.handleMarkerClick.bind(this);
    this.handleCloseClick = this.handleCloseClick.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch('http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_week.geojson')
      .then(
        function(response) {
          console.log(this);
          if(response.status !== 200) {
            console.log('Problem with request ' + response.status);
            return;
          }
          response.json().then(function(data) {
            console.log(data);
            this.setState({
              earthquakes: data.features
            });
          }.bind(this));
        }.bind(this)
      )
      .catch(function(err) {
        console.log('Fetch error', err);
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
