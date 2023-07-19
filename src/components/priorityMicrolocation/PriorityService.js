import axios from "axios";
import BASE_URL from "../../apiConfig";

export const getMicrolocationWithPriority = async (
  setLoading,
  setPriorityMicrolocation,
  cityId
) => {
  try {
    setLoading(true);
    const { data } = await axios.get(
      `${BASE_URL}/api/microlocation/priority/${cityId}`
    );

    setPriorityMicrolocation(data);
    setLoading(false);
  } catch (error) {
    console.log(error);
  }
};

export const getMicrolocationByCity = async (
  cityId,
  setMicrolocations,
  setLoading
) => {
  try {
    setLoading(true);
    await axios
      .post(`${BASE_URL}/api/microlocation/microbycity`, { city_id: cityId })
      .then((result) => {
        setMicrolocations(result.data);
        setLoading(false);
      });
  } catch (error) {
    console.log(error);
  }
};
