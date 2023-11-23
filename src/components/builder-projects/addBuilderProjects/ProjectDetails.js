import React, { useState, useEffect } from "react";
import { getBuilderData } from "../ProjectService";
import Select from "react-select";
import { GpState } from "../../../context/context";
import { getPropertyTypes } from "../../plans-priority/PlansPriorityService";
const ProjectDetails = () => {
  const {
    projects,
    setProjects,
    checkedFor,
    setCheckedFor,
    selectedCategory, setSelectedCategory,
    setSelectedPlanId,
    selectedBuilder,
    setSelectedBuilder,
    editProject,
    isEditable,
  } = GpState();
  const [builders, setbuilders] = useState([]);
  const [planType, setPlanType] = useState([])
  const [selectedPlanName, setSelectedPlanName] = useState('');
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
const handleFetchPlanType = async () => {
  const data = await getPropertyTypes();
  setPlanType(data);
}
const handleItemSelect = (e) => {
  const selectedItemValue = e.target.value;
  const selectedPlan = filteredPlanType.find(
    (item) => item.name === selectedItemValue
  );
if (selectedPlan) {
    setSelectedPlanId(selectedPlan._id); 
    setSelectedPlanName(selectedPlan.name);
  } else {
    setSelectedPlanId(null);
    setSelectedPlanName("");
  }
};
const residentialPlan = ["6501887887a793abe11b9081", "65018a3c87a793abe11b90a0","6530b4079c394a3277094380", "6501860d87a793abe11b8fdb", '6501861387a793abe11b8fe0', '650185fc87a793abe11b8fd1', '650185ef87a793abe11b8fcc', '6501887e87a793abe11b9086', '6501888d87a793abe11b908b', ]
const commercialPlan = ["6501889687a793abe11b9090", "6501889f87a793abe11b9095", "655f4a500bb98dbecc38ad75"]
const filteredPlanType = planType.filter(item => {
  if (selectedCategory === 'residential') {
    return residentialPlan.includes(item._id)
  } else if (selectedCategory === 'commercial') {
    return commercialPlan.includes(item._id)
  }
  return true; 
});


useEffect(() => {
  if (editProject?.plans_type && isEditable) {
    const selectedPlan = planType.find((item) => item._id === editProject?.plans_type);
      if (selectedPlan && true) {
        setSelectedPlanId(selectedPlan._id);
        setSelectedPlanName(selectedPlan.name);
      } 
  }
}, [editProject, planType]);
  useEffect(() => {
    handleFetchbuilders();
    handleFetchPlanType();
  }, []);
  useEffect(() => {
    if (editProject && isEditable) {
      setProjects({ 
        name: editProject?.name,
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
      setSelectedCategory(editProject?.project_type)
     
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
        forSale: true,
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


  return (
    <>
      {" "}
      <div className="row top-margin">
        <div className="col-md-12">
          <h4>Projects Details</h4>
        </div>
      </div>
      <div className="row d-flex align-items-baseline">
        <div className="col-md-3">
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

        <div className="col-md-2">
          <div
            style={{
              borderBottom: "1px solid #cccccc",
            }}
          >
               <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="residential">Residential</option>
        <option value="commercial">Commercial</option>
      </select>
          </div>
        </div>
        <div className="col-md-3">
          <div
            style={{
              borderBottom: "1px solid #cccccc",
            }}
          >
              <select value={selectedPlanName} onChange={handleItemSelect}>
              <option>
             Select Plan
             </option>
             {filteredPlanType.map((item) => (
          <option key={item._id} value={item.name}>
            {item.name}
          </option>
        ))}
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
              name="forSale"
              checked={checkedFor.forSale}
              onChange={handleCheckboxChange}
            />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              For Sale
            </label>
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
