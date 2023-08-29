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
export const getProjectsDataByPlanType = async (plansId) => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/api/project/projects-by-plans/${plansId}`
      );
  
     return data;
    } catch (error) {
      console.log(error);
    }
  };
  
  export const getTopProjectsByPlanType = async (plansId) => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/api/project/plans-projects/${plansId}`
      );
  return data;
    } catch (error) {
      console.log(error);
    }
  };
  