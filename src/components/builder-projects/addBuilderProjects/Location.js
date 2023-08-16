import React, { useState, useEffect } from "react";
import {
  getCityByState,
  getCountry,
  getMicrolocationByCity,
  getStateByCountry,
} from "../ProjectService";
import Select from "react-select";
import { GpState } from "../../../context/context";
const Location = () => {
  const {
    selectedMicroLocation,
    setSelectedMicroLocation,
    selectedState,
    setSelectedState,
    selectedCountry,
    setSelectedCountry,
    selectedCity,
    setSelectedCity,
    location,
    setLocation,
    isEditable,
    editProject,
  } = GpState();
  const [microlocations, setMicrolocations] = useState([]);
  const [cities, setCities] = useState([]);
  const [country, setCountry] = useState([]);
  const [states, setStates] = useState([]);

  const { address, longitude, lattitude, isChecked } = location;
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocation({
      ...location,
      [name]: value,
    });
  };
  const handleCheckboxChange = (event) => {
    const { checked } = event.target;
    setLocation((prevLocation) => ({
      ...prevLocation,
      isChecked: checked,
    }));
  };
  const handleFetchCity = async (stateId) => {
    await getCityByState(stateId, setCities);
  };
  const handleFetchStates = async (countryId) => {
    await getStateByCountry(countryId, setStates);
  };
  const handleFetchMicrolocation = async (cityId) => {
    await getMicrolocationByCity(cityId, setMicrolocations);
  };

  const handleFetchCountry = async () => {
    await getCountry(setCountry);
  };
  const onChangeOptionHandler = (selectedOption, dropdownIdentifier) => {
    switch (dropdownIdentifier) {
      case "country":
        setSelectedCountry(selectedOption);

        handleFetchStates(selectedOption ? selectedOption.value : null);
        break;
      case "city":
        setSelectedCity(selectedOption);

        handleFetchMicrolocation(selectedOption ? selectedOption.value : null);
        break;

      case "state":
        setSelectedState(selectedOption);

        handleFetchCity(selectedOption ? selectedOption.value : null);
        break;
      case "microLocation":
        setSelectedMicroLocation(selectedOption);

        break;
      default:
        break;
    }
  };
  const microLocationOptions = microlocations?.map((microLocation) => ({
    value: microLocation._id,
    label: microLocation.name,
  }));
  const stateOptions = states?.map((state) => ({
    value: state._id,
    label: state.name,
  }));
  const countryOptions = country?.map((item) => ({
    value: item._id,
    label: item.name,
  }));
  const cityOptions = cities?.map((city) => ({
    value: city._id,
    label: city.name,
  }));
  useEffect(() => {
    const defaultCountryOption = countryOptions.find(
      (option) => option.label === "India"
    );
    if (defaultCountryOption) {
      setSelectedCountry(defaultCountryOption);
      handleFetchStates(defaultCountryOption.value);
    }
  }, [country]);
  useEffect(() => {
    const initialCountry = countryOptions.find(
      (option) => option.value === editProject?.location?.country
    );
    if (initialCountry && isEditable) {
      setSelectedCountry(initialCountry);
      handleFetchCity(editProject?.location?.state);
      handleFetchMicrolocation(editProject?.location?.city);
    }
  }, [country]);
  useEffect(() => {
    const initialState = stateOptions.find(
      (option) => option.value === editProject?.location?.state
    );
    if (initialState && isEditable) {
      setSelectedState(initialState);
    } else {
      setSelectedState(null);
    }
  }, [states]);
  useEffect(() => {
    const initialCity = cityOptions.find(
      (option) => option.value === editProject?.location?.city
    );
    if (initialCity && isEditable) {
      setSelectedCity(initialCity);
    } else {
      setSelectedCity(null);
    }
  }, [cities]);
  useEffect(() => {
    const initialMicroLocation = microLocationOptions.find(
      (option) => option.value === editProject?.location?.micro_location
    );
    if (initialMicroLocation && isEditable) {
      setSelectedMicroLocation(initialMicroLocation);
    } else {
      setSelectedMicroLocation(null);
    }
  }, [microlocations]);
  useEffect(() => {
    handleFetchCountry();
  }, []);
  useEffect(() => {
    if (editProject && isEditable) {
      setLocation({
        address: editProject?.location?.address,
        longitude: editProject?.location?.longitude,
        lattitude: editProject?.location?.latitude,
        isChecked: editProject?.location?.is_near_metro,
      });
    } else {
      setLocation({
        address: "",
        longitude: "",
        lattitude: "",
        isChecked: false,
      });
    }
  }, [editProject]);
  useEffect(() => {
    handleFetchCountry();
  }, []);
  console.log(selectedState);
  return (
    <>
      <div className="row top-margin">
        <h4 className="property_form_h4">Location</h4>
        <div className="col-md-6">
          <div className="form-floating border_field">
            <input
              type="text"
              className="form-control"
              id="floatingInputAddress"
              placeholder="Address"
              name="address"
              value={address}
              onChange={handleInputChange}
            />
            <label htmlFor="floatingInputAddress">Address</label>
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-3">
          <div>
            <Select
              placeholder="Country*"
              value={selectedCountry}
              options={countryOptions}
              onChange={(selectedOption) =>
                onChangeOptionHandler(selectedOption, "country")
              }
              isSearchable
              required
            />
          </div>
        </div>
        <div className="col-md-3">
          <div>
            <Select
              placeholder="State*"
              value={selectedState}
              options={stateOptions}
              onChange={(selectedOption) =>
                onChangeOptionHandler(selectedOption, "state")
              }
              onMenuOpen={handleFetchCity}
              isSearchable
              required
            />
          </div>
        </div>
        <div className="col-md-3">
          <div>
            <Select
              placeholder="City*"
              value={selectedCity}
              options={cityOptions}
              onChange={(selectedOption) =>
                onChangeOptionHandler(selectedOption, "city")
              }
              isSearchable
              required
            />
          </div>
        </div>
        <div className="col-md-3">
          <div>
            <Select
              placeholder="Location*"
              value={selectedMicroLocation}
              options={microLocationOptions}
              onChange={(selectedOption) =>
                onChangeOptionHandler(selectedOption, "microLocation")
              }
              isSearchable
              required
            />
          </div>
        </div>
        <div className="row mt-4 mb-4">
          <div className="col-md-3">
            <div className="form-floating border_field">
              <input
                type="text"
                className="form-control"
                id="floatingInputLatti"
                placeholder="Lattitude"
                name="lattitude"
                value={lattitude}
                onChange={handleInputChange}
                required
              />
              <label htmlFor="floatingInputLatti">Lattitude</label>
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-floating border_field">
              <input
                type="text"
                className="form-control"
                id="floatingInputLongi"
                placeholder="Longitude"
                name="longitude"
                value={longitude}
                onChange={handleInputChange}
                required
              />
              <label htmlFor="floatingInputLongi">Longitude</label>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-12">
          <h4 className="property_form_h4">Metro Details</h4>
        </div>
        <div className="col-md-4">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="flexCheckDefault"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              Is Metro Near
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default Location;
