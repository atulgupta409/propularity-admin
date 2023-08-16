import React, { useEffect, useState } from "react";
import { getAmenities } from "../ProjectService";
import { EditProjectState } from "../../../context/EditProjectContext";
const ProjectAmenities = () => {
  const { checkedAmenities, setCheckedAmenities, editProject } =
    EditProjectState();
  const [amenities, setAmenities] = useState([]);
  const allAmenities = editProject?.amenties;
  const handleFetchAmenity = async () => {
    await getAmenities(setAmenities);
  };
  useEffect(() => {
    if (allAmenities) {
      setCheckedAmenities(allAmenities);
    }
  }, [allAmenities]);
  const handleCheckboxChange = (event) => {
    const checkedAmenityId = event.target.value;
    const isChecked = event.target.checked;
    if (isChecked) {
      setCheckedAmenities((prevCheckedAmenities) => [
        ...prevCheckedAmenities,
        checkedAmenityId,
      ]);
    } else {
      setCheckedAmenities((prevCheckedAmenities) =>
        prevCheckedAmenities.filter((id) => id !== checkedAmenityId)
      );
    }
  };

  useEffect(() => {
    handleFetchAmenity();
  }, []);

  return (
    <>
      {" "}
      <div className="row top-margin">
        <h4 className="property_form_h4">Project Amenities</h4>
        <div className="form-check" style={{ marginLeft: "9px" }}>
          {amenities?.map((amenity) => (
            <div key={amenity._id}>
              <input
                className="form-check-input"
                type="checkbox"
                value={amenity._id}
                id="flexCheckDefault"
                name="amenity"
                onChange={handleCheckboxChange}
                checked={checkedAmenities.includes(amenity._id)}
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                {amenity.name}
              </label>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProjectAmenities;
