import axios from "axios";
import BASE_URL from "../../apiConfig";
import { gql } from '@apollo/client';
export const getStateByCountry = async (countryId, setStates) => {
  try {
    const result = await axios.get(
      `${BASE_URL}/api/state/states/priority/${countryId}`,
      {
        country_id: countryId,
      }
    );
    setStates(result.data);
  } catch (error) {
    console.log(error.message);
  }
};
export const getCityByState = async (stateId, setCities) => {
  try {
    await axios
      .post(`${BASE_URL}/api/city/citybystate`, { state_id: stateId })
      .then((result) => {
        setCities(result.data);
      });
  } catch (error) {
    console.log(error);
  }
};

export const getMicrolocationByCity = async (cityId, setMicrolocations) => {
  try {
    await axios
      .get(`${BASE_URL}/api/microlocation/priority-location/${cityId}`)
      .then((result) => {
        setMicrolocations(result.data);
      });
  } catch (error) {
    console.log(error);
  }
};

export const getCountry = async (setCountry) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/api/allCountry/countries`);

    setCountry(data.country);
  } catch (error) {
    console.log(error);
  }
};

export const getBuilderData = async (setbuilders) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/api/builder/builders`);
    setbuilders(data);
  } catch (error) {
    console.log(error);
  }
};
export const getAmenities = async (setAmenities) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/api/amenity/amenities`);

    setAmenities(data);
  } catch (error) {
    console.log(error);
  }
};
export const getCategory = async (setCategories) => {
  try {
    const { data } = await axios.get(
      `${BASE_URL}/api/propertyType/propertyTypes`
    );

    setCategories(data);
  } catch (error) {
    console.log(error);
  }
};

export const getProjectData = async (page, limit) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/api/project/projects-page/?page=${page}&limit=${limit}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const searchedProjects = async (name, city, microlocation, status, page, limit) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/api/project/search-projects?name=${name}&city=${city}&microlocation=${microlocation}&status=${status}&page=${page}&limit=${limit}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const changeProjectStatus = async (
  id,
  action,
  setUpdateTable,
  toast
) => {
  try {
    const { data } = await axios.put(
      `${BASE_URL}/api/project/changeStatus/${id}`,
      { status: action }
    );
    setUpdateTable((prev) => !prev);
    toast({
      title: "Update Successfully!",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
  } catch (error) {
    toast({
      title: "Error Occured!",
      description: "Failed to Saved the Space",
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "bottom-left",
    });
  }
};

export const deleteprojects = async (id, toast, setUpdateTable) => {
  try {
    const { data } = await axios.delete(`${BASE_URL}/api/project/delete/${id}`);
    setUpdateTable((prev) => !prev);
    toast({
      title: "Deleted Successfully!",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
  } catch (error) {
    toast({
      title: "Error Occured!",
      description: error.response.data.message,
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "bottom-left",
    });
  }
};
export const getProjectsById = async (id) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/api/project/projects/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};


export const SEARCH_PROJECTS = gql`
  query SearchProjects($name: String, $city: String, $microlocation: String, $status: String) {
    searchProjects(name: $name, city: $city, microlocation: $microlocation, status: $status) {
      _id 
      name
      slug
      location{
        city{
          name
        }
        micro_location{
          name
        }
      }
      status
      createdAt
    } 
  }
`;


