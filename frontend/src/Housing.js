

// import React, { useContext, useEffect, useState } from 'react';
// import axios from 'axios';
// import Header from './Header';
// import HeroSection from './HeroSection';
// import Categories from './Categories';
// import { AuthContext } from './AuthContext';
// import { useNavigate } from 'react-router';
// import './Housing.css';

// function Housing() {
//     const { isLoggedIn } = useContext(AuthContext);
//     const navigate = useNavigate();
//     const [properties, setProperties] = useState([]);
//     const [overlayVisible, setOverlayVisible] = useState(false);
//     const [selectedProperty, setSelectedProperty] = useState(null);

//     useEffect(() => {
//         const fetchProperties = async () => {
//             const apiURL = 'https://api.gateway.attomdata.com/propertyapi/v1.0.0/property/snapshot';
//             const apiKey = 'e0990e94bb2db91d9fe1152cd2bdabc4';
//             try {
//                 const response = await axios.get(apiURL, {
//                     headers: { 'apikey': apiKey },
//                     params: {
//                         postalcode: '95616',
//                         page: 1,
//                         pagesize: 10,
//                     },
//                 });
//                 setProperties(response.data.property);
//             } catch (error) {
//                 console.error('Failed to fetch properties:', error);
//             }
//         };

//         if (isLoggedIn) {
//             fetchProperties();
//         } else {
//             navigate("/");
//         }
//     }, [isLoggedIn, navigate]);

//     const handlePropertyClick = (property) => {
//         setSelectedProperty(property);
//         setOverlayVisible(true);
//     };

//     const renderPropertyDetails = (property) => (
//         <>
//             <h4>{property.address.oneLine}</h4>
//             <p>Property ID: {property.identifier.Id}</p>
//             <p>Type: {property.summary.propclass}</p>
//             <p>Bedrooms: {property.building.rooms.beds}</p>
//             <p>Bathrooms: {property.building.rooms.bathstotal}</p>
//             <p>Size: {property.building.size.universalsize} sqft</p>
//             {/* Add more property details here */}
//         </>
//     );

//     return (
//         <div className="housing-container">
//             <Header />
//             <Categories />
//             <div className="housing-banner">
//                 <HeroSection screen='housing' />
//             </div>
//             <div className="property-list">
//                 {properties.map((property, index) => (
//                     <div key={index} className="property-item" onClick={() => handlePropertyClick(property)}>
//                         <p>{property.address.oneLine}</p>
//                         <p>{property.building.rooms.beds} BR | {property.building.rooms.bathstotal} Bath | {property.building.size.universalsize} sqft</p>
//                     </div>
//                 ))}
//             </div>
//             {overlayVisible && (
//                 <div className="overlay" onClick={() => setOverlayVisible(false)}>
//                     <div className="overlay-content" onClick={e => e.stopPropagation()}>
//                         {selectedProperty ? renderPropertyDetails(selectedProperty) : <p>Loading...</p>}
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default Housing;
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Header from './Header';
import HeroSection from './HeroSection';
import Categories from './Categories';
import { AuthContext } from './AuthContext';
import { useNavigate } from 'react-router';
import './Housing.css';

function Housing() {
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
      return;
    }

    const fetchProperties = async () => {
      const snapshotUrl = 'https://api.gateway.attomdata.com/propertyapi/v1.0.0/property/snapshot';
      try {
        const response = await axios.get(snapshotUrl, {
          headers: { 'apikey': 'e0990e94bb2db91d9fe1152cd2bdabc4' },
          params: {
            postalcode: '95616',
            page: 1,
            pagesize: 1000,
          },
        });

        const fetchedProperties = response.data.property;
        console.log('Fetched Properties:', fetchedProperties); // Logs all fetched properties

        // Filter properties for mixed or commercial use
        const filteredProperties = fetchedProperties.filter(property => {
          const isMixedOrCommercial = property.summary.propclass === "Mixed" || property.summary.propclass === "Commercial";
          console.log(`${property.address.oneLine}: isMixedOrCommercial = ${isMixedOrCommercial}`); // Logs whether each property is mixed or commercial
          return isMixedOrCommercial;
        });

        setProperties(filteredProperties); // Sets state with filtered properties
      } catch (error) {
        console.error('Failed to fetch properties:', error);
      }
    };

    fetchProperties();
  }, [isLoggedIn, navigate]);

  const handlePropertyClick = (property) => {
    setSelectedProperty(property);
    setOverlayVisible(true);
  };

  const renderPropertyDetails = (property) => (
    <>
      <h4>{property.address.oneLine}</h4>
      <p>Property ID: {property.identifier.Id}</p>
      <p>Type: {property.summary.propclass}</p>
      <p>Bedrooms: {property.building.rooms.beds}</p>
      <p>Bathrooms: {property.building.rooms.bathstotal}</p>
      <p>Size: {property.building.size.universalsize} sqft</p>
      {/* Add more property details here */}
    </>
  );

  return (
    <div className="housing-container">
      <Header />
      <Categories />
      <div className="housing-banner">
        <HeroSection screen='housing' />
      </div>
      <div className="property-list">
        {properties.map((property, index) => (
          <div key={index} className="property-item" onClick={() => handlePropertyClick(property)}>
            <p>{property.address.oneLine}</p>
            <p>{property.building.rooms.beds} BR | {property.building.rooms.bathstotal} Bath | {property.building.size.universalsize} sqft</p>
          </div>
        ))}
      </div>
      {overlayVisible && (
        <div className="overlay" onClick={() => setOverlayVisible(false)}>
          <div className="overlay-content" onClick={e => e.stopPropagation()}>
            {selectedProperty ? renderPropertyDetails(selectedProperty) : <p>Loading...</p>}
          </div>
        </div>
      )}
    </div>
  );
}

export default Housing;
