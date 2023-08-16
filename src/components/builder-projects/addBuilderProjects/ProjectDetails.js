import React, { useState, useEffect } from "react";
import { getBuilderData } from "../ProjectService";
import Select from "react-select";
import { GpState } from "../../../context/context";
const ProjectDetails = () => {
  const {
    projects,
    setProjects,
    checkedFor,
    setCheckedFor,
    selectedBuilder,
    setSelectedBuilder,
    editProject,
    isEditable,
  } = GpState();
  const [builders, setbuilders] = useState([]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProjects({
      ...projects,
      [name]: value,
    });
  };
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckedFor({ ...checkedFor, [name]: checked });
  };
  const builderOptions = builders?.map((builder) => ({
    value: builder._id,
    label: builder.name,
  }));
  const onChangeOptionHandler = (selectedOption, dropdownIdentifier) => {
    switch (dropdownIdentifier) {
      case "builder":
        setSelectedBuilder(selectedOption);
        break;
      default:
        break;
    }
  };
  const handleFetchbuilders = async () => {
    await getBuilderData(setbuilders);
  };

  useEffect(() => {
    handleFetchbuilders();
  }, []);
  useEffect(() => {
    if (editProject && isEditable) {
      setProjects({
        name: editProject?.name,
        type: editProject?.project_type,
        slug: editProject?.slug,
        starting_price: editProject?.starting_price,
        configuration: editProject?.configuration,
        status: editProject?.project_status,
        project_size: editProject?.project_size,
        ratings: editProject?.ratings,
        coming_soon: editProject?.coming_soon,
        short_descrip: editProject?.short_descrip,
      });
      setCheckedFor({
        forRent: editProject?.for_rent,
        forSale: editProject?.for_sale,
      });
    } else {
      setProjects({
        name: "",
        type: "",
        slug: "",
        starting_price: "",
        configuration: "",
        status: "",
        project_size: "",
        ratings: "",
        coming_soon: "",
        short_descrip: "",
      });
      setCheckedFor({
        forRent: false,
        forSale: false,
      });
    }
  }, [editProject]);
  useEffect(() => {
    const initialBuilder = builderOptions.find(
      (option) => option.value === editProject?.builder
    );
    if (initialBuilder && isEditable) {
      setSelectedBuilder(initialBuilder);
    } else {
      setSelectedBuilder(null);
    }
  }, [builders]);
  console.log(selectedBuilder);

  return (
    <>
      {" "}
      <div className="row top-margin">
        <div className="col-md-12">
          <h4>Projects Details</h4>
        </div>
      </div>
      <div className="row d-flex align-items-baseline">
        <div className="col-md-4">
          <div>
            <Select
              placeholder="Builder"
              value={selectedBuilder}
              options={builderOptions}
              onChange={(selectedOption) =>
                onChangeOptionHandler(selectedOption, "builder")
              }
              isSearchable
            />
          </div>
        </div>
        <div className="col-md-4">
          <div className="form-floating border_field">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="Name*"
              name="name"
              value={projects.name}
              onChange={handleInputChange}
              required
            />
            <label htmlFor="floatingInput">Name of Project</label>
          </div>
        </div>

        <div className="col-md-4">
          <div
            style={{
              borderBottom: "1px solid #cccccc",
            }}
          >
            <select
              className="form-select"
              value={projects.type}
              name="type"
              onChange={handleInputChange}
              aria-label="Default select example"
            >
              <option>Type</option>
              <option value="RESIDENTIAL">RESIDENTIAL</option>
              <option value="COMMERCIAL">COMMERCIAL</option>
              <option value="RETAIL">RETAIL</option>
              <option value="SERVICE APARTMENT">SERVICE APARTMENT</option>
              <option value="STUDIO APARTMENT">STUDIO APARTMENT</option>
              <option value="INDEPENDENT / BUILDER FLOOR">
                INDEPENDENT / BUILDER FLOOR
              </option>
              <option value="INDEPENDENT / VILLA / HOUSE">
                INDEPENDENT / VILLA / HOUSE
              </option>
              <option value="FARM HOUSE">FARM HOUSE</option>
              <option value="PLOT / RESIDENTIAL LAND">
                PLOT / RESIDENTIAL LAND
              </option>
            </select>
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-4">
          <div className="form-floating border_field">
            <input
              type="text"
              className="form-control"
              id="floatingInputSlug"
              placeholder="Slug*"
              name="slug"
              value={projects.slug}
              onChange={handleInputChange}
              required
            />
            <label htmlFor="floatingInputSlug">Slug</label>
          </div>
        </div>
        <div className="col-md-4">
          <div className="form-floating border_field">
            <input
              type="text"
              className="form-control"
              id="floatingInputAddress"
              placeholder="Starting Prices*"
              name="starting_price"
              value={projects.starting_price}
              onChange={handleInputChange}
              required
            />
            <label htmlFor="floatingInputAddress">Starting Price*</label>
          </div>
        </div>
        <div className="col-md-4">
          <div className="form-floating border_field">
            <input
              type="text"
              className="form-control"
              id="floatingInputAddress"
              placeholder="Configuration*"
              name="configuration"
              value={projects.configuration}
              onChange={handleInputChange}
              required
            />
            <label htmlFor="floatingInputAddress">Configuration*</label>
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-4">
          <div className="form-floating border_field">
            <select
              className="form-select property-input"
              name="status"
              aria-label="Default select example"
              value={projects.status}
              onChange={handleInputChange}
              required
            >
              <option>Project Status</option>
              <option>Ready To Move</option>
              <option>Under Construction</option>
              <option>New Launch</option>
            </select>
          </div>
        </div>
        <div className="col-md-4">
          <div className="form-floating border_field">
            <input
              type="text"
              className="form-control"
              id="floatingInputAddress"
              placeholder="Project Size"
              name="project_size"
              value={projects.project_size}
              onChange={handleInputChange}
              required
            />
            <label htmlFor="floatingInputAddress">Project Size*</label>
          </div>
        </div>
        <div className="col-md-4">
          <div className="form-floating border_field">
            <input
              type="text"
              className="form-control"
              id="floatingInputAddress"
              placeholder="Ratings"
              name="ratings"
              value={projects.ratings}
              onChange={handleInputChange}
              required
            />
            <label htmlFor="floatingInputAddress">Ratings</label>
          </div>
        </div>
      </div>
      <div className="row mt-4 d-flex align-items-baseline">
        <div className="col-md-4">
          <div className="form-floating border_field">
            <input
              type="text"
              className="form-control"
              id="floatingInputAddress"
              placeholder="Coming Soon"
              name="coming_soon"
              value={projects.coming_soon}
              onChange={handleInputChange}
              required
            />
            <label htmlFor="floatingInputAddress">Coming Soon</label>
          </div>
        </div>
        <div className="col-md-4">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="flexCheckDefault"
              name="forRent"
              checked={checkedFor.forRent}
              onChange={handleCheckboxChange}
            />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              For Rent
            </label>
          </div>
        </div>
        <div className="col-md-4">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="flexCheckDefault"
              name="forSale"
              checked={checkedFor.forSale}
              onChange={handleCheckboxChange}
            />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              For Sale
            </label>
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-12">
          <div className="form-floating border_field">
            <textarea
              type="text"
              className="form-control"
              id="floatingInputAddress"
              placeholder="Short Description About Project"
              name="short_descrip"
              value={projects.short_descrip}
              onChange={handleInputChange}
            ></textarea>
            <label htmlFor="floatingInputAddress">
              Short Description About Project
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectDetails;
