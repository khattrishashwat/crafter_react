import React, { useEffect, useState, useContext, useRef } from "react";
import {
  LoadScript,
  GoogleMap,
  Marker,
  InfoWindow,
  Autocomplete,
} from "@react-google-maps/api";
import { Link } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { LanguageContext } from "../../LanguageContext";
import Swal from "sweetalert2";

const Gps = () => {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [employeeLocations, setEmployeeLocations] = useState("");
  const [markerIcon, setMarkerIcon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [inputCleared, setInputCleared] = useState(false);
  const inputRef = useRef(null);
  const mapRef = useRef(null);
  const { t } = useTranslation();
  const { selectedLanguage } = useContext(LanguageContext);

  const googleMapsApiKey = "AIzaSyA2_7EqTMlAlCJoWEddCLIF7syuSMFJX0w";
  const libraries = ["places"];

  const initializeMapIcon = () => {
    if (window.google && window.google.maps) {
      const image = {
        url: "/Image/Map-logo1.png",
        scaledSize: new window.google.maps.Size(100, 100),
      };
      setMarkerIcon(image);
    }
  };

  const generateOffsetPosition = (lat, lng, index) => {
    const offset = 0.0013;
    return {
      lat: lat + index * offset,
      lng: lng + index * offset,
    };
  };

  const fetchLocations = async () => {
    try {
      const token = localStorage.getItem("WorkMen-Token");
      const response = await axios.get("employee/gps/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.data) {
        console.log("new", response.data.data);

        setLocations(response.data.data);
      }
    } catch (error) {
      Swal.fire("Error", "Error fetching locations", "error");
    }
  };

  const fetchEmployeeLocations = async (latLon) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("WorkMen-Token");
      const response = await axios.get(
        `employee/gps/?longitude=${latLon.longitude}&latitude=${latLon.latitude}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response && response.data.data) {
        console.log(response.data.data);

        setEmployeeLocations(response.data.data);
      }
    } catch (error) {
      Swal.fire("Error", "Error fetching employee locations", "error");
    } finally {
      setLoading(false);
    }
  };

  const onPlaceChanged = () => {
    const place = inputRef.current.getPlace();
    if (place.geometry) {
      const latitude = place.geometry.location.lat();
      const longitude = place.geometry.location.lng();
      const latLon = { latitude, longitude };
      setCurrentPosition({ lat: latitude, lng: longitude });
      mapRef.current.panTo({ lat: latitude, lng: longitude });
      mapRef.current.setZoom(10);
      fetchEmployeeLocations(latLon);
      
    } else if (inputCleared) {
      setInputCleared(false); // Reset input cleared state
    }
  };

  const onLoad = (autocomplete) => {
    inputRef.current = autocomplete;
  };

  const handleMarkerClick = (location) => {
    setSelectedLocation(location);
  };

  useEffect(() => {
    if (window.google && window.google.maps) {
      initializeMapIcon();
    }
  }, [window.google]);
  useEffect(() => {
    // if (window.google && window.google.maps) {

    fetchLocations();
    // }
  }, []);

  const containerStyle = {
    width: "100%",
    height: "120vh",
    disableDefaultUI: false,
  };

  const india = {
    lat: 20.5937,
    lng: 78.9629,
  };

  return (
    <div>
      <div className="big-container bg-1">
        <div className="small-container">
          <div className="same-as-head">
            <ul>
              <li>
                <Link to="/planning">{t("Planning")}</Link>
              </li>
              <li>
                <Link to="/projects">{t("Projects")}</Link>
              </li>
              <li>
                <Link to="/orders">{t("Work Orders")}</Link>
              </li>
              <li>
                <Link to="/action">{t("Action")}</Link>
              </li>
              <li>
                <Link to="/gps" className="actives">
                  GPS
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div style={{ position: "relative" }}>
        <LoadScript googleMapsApiKey={googleMapsApiKey} libraries={libraries}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={currentPosition || india}
            zoom={4}
            onLoad={(map) => {
              mapRef.current = map;
            }}
          >
            {markerIcon &&
              locations.map((location, index) => (
                <Marker
                  key={location.id}
                  position={generateOffsetPosition(
                    parseFloat(location.latitude),
                    parseFloat(location.longitude),
                    index
                  )}
                  icon={markerIcon}
                  onClick={() => handleMarkerClick(location)}
                />
              ))}
            {selectedLocation && (
              <InfoWindow
                position={{
                  lat: parseFloat(selectedLocation.latitude),
                  lng: parseFloat(selectedLocation.longitude),
                }}
                onCloseClick={() => setSelectedLocation(null)}
              >
                <div>
                  <h3>{selectedLocation.name}</h3>
                  <p>{selectedLocation.latitude}</p>
                  <p>{selectedLocation.longitude}</p>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </LoadScript>
        <div
          className="col-sm-3"
          style={{
            position: "absolute",
            top: "8px",
            right: "66px",
            background: "#fff",
            padding: "3px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            zIndex: "1",
          }}
        >
          <LoadScript googleMapsApiKey={googleMapsApiKey} libraries={libraries}>
            <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Location"
                onChange={(e) => {
                  if (!e.target.value) {
                    setInputCleared(true);
                    onPlaceChanged();
                  }
                }}
              />
            </Autocomplete>
          </LoadScript>
          <div className="locname">
            {loading ? (
              <p>Loading...</p>
            ) : (
              employeeLocations &&
              employeeLocations.map((item, index) => (
                <div key={index}>
                  <p
                    style={{ cursor: "pointer" }}
                    onClick={() => handleMarkerClick(item)}
                  >
                    <i className="fa fa-user" aria-hidden="true"></i>{" "}
                    {item.name}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gps;
