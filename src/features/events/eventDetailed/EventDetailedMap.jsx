import React from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { Segment } from 'semantic-ui-react'

 

export default function EventDetailedMap({lat, lng, address}) {
  const position = [lat, lng]
  return (
    <Segment attached='bottom' style={{padding: 0}}>
        <div style={{height: 300, width: '100%'}}>
            <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{height: '100%', width: '100%'}}>
                <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                    <Popup>{address}</Popup>
                </Marker>
            </MapContainer>
        </div>
    </Segment>
  )
}
