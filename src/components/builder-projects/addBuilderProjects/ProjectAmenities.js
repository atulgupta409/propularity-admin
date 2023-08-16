import React, { useEffect, useState } from "react";
import { getAmenities } from "../ProjectService";
import { GpState } from "../../../context/context";
const ProjectAmenities = () => {
  const { checkedAmenities, setCheckedAmenities, editProject, isEditable } =
    GpState();
  const [amenities, setAmenities] = useState([]);
  const handleFetchAmenity = async () => {
    await getAmenities(setAmenities);
  };
  const allAmenities = editProject?.amenties;
  const checkedAmenityIds = [
    "649ea04d58693a1c3a52f7b4",
    "649ea05d58693a1c3a52f7b8",
    "649ea06f58693a1c3a52f7bc",
    "649ea08158693a1c3a52f7c0",
    "649ea09658693a1c3a52f7c4",
    "649ea0ad58693a1c3a52f7c8",
    "649ea0d858693a1c3a52f7cc",
    "649ea13558693a1c3a52f7d0",
    "649ea18658693a1c3a52f7d4",
    "649ea1a458693a1c3a52f7d8",
  ];
  useEffect(() => {
    if (!isEditable) {
      setCheckedAmenities(checkedAmenityIds);
    }
  }, [amenities]);
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
    if (allAmenities && isEditable) {
      setCheckedAmenities(allAmenities);
    }
  }, [editProject]);

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
