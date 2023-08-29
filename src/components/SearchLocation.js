import React, { useEffect, useRef, useState } from "react";
import { Search } from "@material-ui/icons";

const apiKey = "AIzaSyBrSfRwjxOJYPgeHH9nt8LUgtlBp4TDzBI";
const mapApiJs = "https://maps.googleapis.com/maps/api/js";
// const geocodeJson = "https://maps.googleapis.com/maps/api/geocode/json";

// load google map api js

function loadAsyncScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    Object.assign(script, {
      type: "text/javascript",
      async: true,
      src,
    });
    script.addEventListener("load", () => resolve(script));
    document.head.appendChild(script);
  });
}

const extractAddress = (place) => {
  const address = {
    city: "",
    state: "",
    zip: "",
    country: "",
    plain() {
      const city = this.city ? this.city + ", " : "";
      const zip = this.zip ? this.zip + ", " : "";
      const state = this.state ? this.state + ", " : "";
      return city + zip + state + this.country;
    },
  };

  if (!Array.isArray(place?.address_components)) {
    return address;
  }

  place.address_components.forEach((component) => {
    const types = component.types;
    const value = component.long_name;

    if (types.includes("locality")) {
      address.city = value;
    }

    if (types.includes("administrative_area_level_2")) {
      address.state = value;
    }

    if (types.includes("postal_code")) {
      address.zip = value;
    }

    if (types.includes("country")) {
      address.country = value;
    }
  });

  return address;
};

function SearchLocation(props) {
  const searchInput = useRef(null);
  const [address, setAddress] = useState({});
  const [localLat, setLocalLat] = useState();
  const [localLon, setLocalLon] = useState();
  const { city, region } = props;

  useEffect(() => {
    props.onCityChange(address.city, address.state, localLat, localLon);
    console.log(address);
  }, [address]);

  // init gmap script
  const initMapScript = () => {
    // if script already loaded
    if (window.google) {
      return Promise.resolve();
    }
    const src = `${mapApiJs}?key=${apiKey}&libraries=places&v=weekly`;
    return loadAsyncScript(src);
  };

  // do something on address change
  const onChangeAddress = (autocomplete) => {
    const place = autocomplete.getPlace();
    const lat = place.geometry.location.lat();
    const lon = place.geometry.location.lng();
    setLocalLat(lat);
    setLocalLon(lon);
    setAddress(extractAddress(place));
  };

  // init autocomplete
  const initAutocomplete = () => {
    if (!searchInput.current) return;

    const autocomplete = new window.google.maps.places.Autocomplete(
      searchInput.current
    );
    autocomplete.setFields(["address_component", "geometry"]);
    autocomplete.addListener("place_changed", () =>
      onChangeAddress(autocomplete)
    );
  };

  // load map script after mounted
  useEffect(() => {
    initMapScript().then(() => initAutocomplete());
  }, []);

  return (
    <div className="App">
      <div>
        <div className="search">
          <span>
            <Search />
          </span>
          <input
            ref={searchInput}
            type="text"
            placeholder={`${city}, ${region}`}
          />
        </div>
      </div>
    </div>
  );
}

export default SearchLocation;
