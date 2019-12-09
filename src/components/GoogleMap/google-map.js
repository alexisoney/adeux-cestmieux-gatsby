import React, {useEffect, createRef, useRef, useState} from 'react';
import StyledMapType from './styledMapType';

export default ({center, markers, zoom}) => {
  const [developerCenter, setDeveloperCenter] = useState(center);
  const [developerZoom, setDeveloperZoom] = useState(getZoomValue(zoom));

  let isEditor = false;
  if (typeof window !== undefined && window.location.pathname === '/editor/') {
    isEditor = true;
  }

  const container = createRef();
  const map = useRef();

  const allMarkers = useRef([]);
  const allInfowindows = useRef([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (!map.current) {
        const previousScript = document.getElementById('google-map-script');
        if (previousScript) {
          document.body.removeChild(previousScript);
          window.google = undefined;
          map.current = undefined;
        }

        const script = document.createElement('script');
        script.id = 'google-map-script';
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCVbA1Z0T4CxbZR5wVibvJYzS5_vIcWIpw`;
        window.document.body.appendChild(script);

        script.addEventListener('load', () => {
          const styles = new window.google.maps.StyledMapType(StyledMapType);
          map.current = new window.google.maps.Map(container.current, {
            zoom: getZoomValue(zoom),
            center: getCoordinates(center),
            zoomControl: true,
            mapTypeControl: false,
            scaleControl: true,
            streetViewControl: false,
            rotateControl: false,
            fullscreenControl: true,
          });

          map.current.mapTypes.set('styled_map', styles);
          map.current.setMapTypeId('styled_map');

          map.current.addListener('dragend', () => {
            const center = map.current.getCenter();
            setDeveloperCenter(`${center.lat()},${center.lng()}`);
          });

          map.current.addListener('zoom_changed', () => {
            setDeveloperZoom(`${map.current.getZoom()}`);
          });

          map.current.addListener('dragstart', () => {
            allInfowindows.current.forEach(i => i.close());
          });

          map.current.addListener('click', () => {
            allInfowindows.current.forEach(i => i.close());
          });

          createMarkers();
        });
      } else if (markers) {
        clearMarkers();
        createMarkers();
      }
    }
  }, [markers]);

  useEffect(() => {
    if (map.current !== undefined) {
      const centerValue = getCoordinates(center);
      const zoomValue = getZoomValue(zoom);
      if ((centerValue, zoomValue)) {
        map.current.setCenter(centerValue);
        map.current.setZoom(zoomValue);

        setDeveloperZoom(zoomValue);
        setDeveloperCenter(center);
      } else {
        clearMarkers();
        createMarkers();
      }
    }
  }, [zoom, center]);

  return (
    <>
      {isEditor && (
        <p
          className='google-map__editor'
          style={developerCenter === center ? null : {color: 'red'}}
        >
          Center: {developerCenter}
        </p>
      )}
      {isEditor && (
        <p
          className='google-map__editor'
          style={developerZoom === parseInt(zoom) ? null : {color: 'red'}}
        >
          Zoom: {developerZoom}
        </p>
      )}
      <div className='google-map'>
        <div ref={container} className={'google-map__container'} />
      </div>
    </>
  );

  function clearMarkers() {
    allInfowindows.current.forEach(i => i.close());
    allMarkers.current.forEach(i => i.setMap(null));
  }

  function createMarkers() {
    if (!markers) {
      return;
    }

    const bounds = new window.google.maps.LatLngBounds();

    markers.forEach(({anchor, coordinates, title}) => {
      const infowindow = new window.google.maps.InfoWindow({
        content: `
          <div class='google-map__info-window-container'>
            <p class='google-map__info-window-title'>${title}</p>
            <a href="#${anchor}" class='button button--filled google-map__info-window-link'>En savoir plus</a>
          </aside>
        `,
      });

      allInfowindows.current.push(infowindow);

      const marker = new window.google.maps.Marker({
        position: getCoordinates(coordinates),
        map: map.current,
      });

      marker.addListener('click', function() {
        allInfowindows.current.forEach(i => i.close());
        infowindow.open(map, marker);
      });

      allMarkers.current.push(marker);

      if (!center || !zoom) {
        const positions = new window.google.maps.LatLng(
          marker.position.lat(),
          marker.position.lng()
        );
        bounds.extend(positions);

        map.current.fitBounds(bounds);
        map.current.panToBounds(bounds);
      }
    });
  }
};

export function getCoordinates(string) {
  const coordinates = string.split(',');
  if (Array.isArray(coordinates) && coordinates.length === 2) {
    return {
      lat: parseFloat(coordinates[0].trim()),
      lng: parseFloat(coordinates[1].trim()),
    };
  }
}

function getZoomValue(zoom) {
  const zoomValue = parseInt(zoom);
  if (zoomValue >= 0 && zoomValue <= 20) {
    return zoomValue;
  }

  // return 12;
}
