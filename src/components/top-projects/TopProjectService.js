import axios from "axios";
import BASE_URL from "../../apiConfig";

export const getProjectsDataByCity = async (
  setLoading,
  setProjects,
  cityId
) => {
  try {
    setLoading(true);
    const { data } = await axios.get(
      `${BASE_URL}/api/project/project-details/${cityId}`
    );

    setProjects(data);
    setLoading(false);
  } catch (error) {
    console.log(error);
  }
};

export const getTopProjectsByCity = async (cityId) => {
  try {
    const { data } = await axios.get(
      `${BASE_URL}/api/project/projects-by-order/${cityId}`
    );
return data;
  } catch (error) {
    console.log(error);
  }
};
