import axios from "axios";

import BASE_URL from "../../apiConfig";

export const getbuildersData = async (setbuilders, setLoading) => {
  try {
    setLoading(true);
    const { data } = await axios.get(`${BASE_URL}/api/builder/builders`);
    const newData = data.reverse();

    setbuilders(newData);
    setLoading(false);
  } catch (error) {
    console.log(error);
  }
};

export const getCity = async (setAllCity) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/api/city/cities`);
    setAllCity(data);
  } catch (error) {
    console.log(error);
  }
};

export const getbuildersDataById = async (id) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/api/builder/builders/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
