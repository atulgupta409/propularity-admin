import BASE_URL from "../../apiConfig";
import axios from "axios";

export const getPropertyTypes = async () => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/api/propertyType/propertyTypes`
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  };
export const getProjectsDataByPlanAndCity = async (plansId, city) => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/api/project/projects-by-plans/${plansId}/${city}`
      );
  
     return data;
    } catch (error) {
      console.log(error);
    }
  };
  
  export const getTopProjectsByPlanType = async (plansId, city) => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/api/project/plans-projects/${plansId}/${city}`
      );
  return data;
    } catch (error) {
      console.log(error);
    }
  };
  