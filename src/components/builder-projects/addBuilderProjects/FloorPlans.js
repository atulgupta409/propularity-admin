import React, { useState, useEffect, Fragment } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { AiFillDelete } from "react-icons/ai";
import { getCategory } from "../ProjectService";
import { uploadFile } from "../../../services/Services";
import { GpState } from "../../../context/context";

const FloorPlans = () => {
  const { plans, setPlans, editProject, isEditable } = GpState();
  const [categories, setCategories] = useState([]);
  const [isUploaded, setIsUploaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesByRow, setImagesByRow] = useState([]);
  const allplans = editProject?.plans;
  const handleFetchCategory = async () => {
    await getCategory(setCategories);
  };
  useEffect(() => {
    if (!isEditable) {
      defautcreatePlans();
    }
  }, [categories]);

  const defautcreatePlans = () => {
    const defaultRowCount = 4;
    const newRows = [];
    const newImagesByRow = []; // Initialize the array for imagesByRow

    for (let i = 0; i < defaultRowCount; i++) {
      const newRow = {
        id: i + 1,
        category: categories.length >= i + 1 ? categories[i]._id : "",
        price: "",
        size: "",
        size_sq: "",
        image: [],
      };
      newRows.push(newRow);
      newImagesByRow.push([]); // Push an empty array for each row
    }

    setPlans(newRows);
    setImagesByRow(newImagesByRow); // Set the initial state for imagesByRow
  };

  const createPlans = () => {
    const newRow = {
      id: plans.length + 1,
      category: "",
      price: "",
      size: "",
      size_sq: "",
      image: [],
    };

    setPlans((prevRows) => [...prevRows, newRow]);
    setImagesByRow((prevImagesByRow) => [...prevImagesByRow, []]);
  };
  useEffect(() => {
    if (allplans && isEditable) {
      setPlans(allplans);
      setImagesByRow(allplans?.map((plan) => plan.image));
    }
  }, [allplans]);

  const removePlan = (id) => {
    setPlans((prevRows) => prevRows.filter((row) => row.id !== id));
  };
  const onChangePlanHandler = (e, id) => {
    const { name, value } = e.target;
    setPlans((prevRows) =>
      prevRows.map((row) => (row.id === id ? { ...row, [name]: value } : row))
    );
  };

  const handleInputPlanChange = (e, id) => {
    const { name, value } = e.target;
    setPlans((prevRows) =>
      prevRows.map((row) => {
        if (row.id === id) {
          return { ...row, [name]: value };
        }
        return row;
      })
    );
  };
  const previewFile = (data, rowId) => {
    const imageUrl = data;

    setImagesByRow((prevImagesByRow) => {
      const updatedImages = [...prevImagesByRow];
      updatedImages[rowId - 1] = [imageUrl];
      return updatedImages;
    });

    setPlans((prevPlans) =>
      prevPlans.map((row) => {
        if (row.id === rowId) {
          return { ...row, image: imageUrl };
        }
        return row;
      })
    );
  };

  const handleUploadFile = async (files, rowId) => {
    await uploadFile(files, setProgress, setIsUploaded, (data) =>
      previewFile(data, rowId)
    );
  };

  const handleInputByClick = (e, rowId) => {
    const files = Array.from(e.target.files);
    handleUploadFile(files, rowId);
  };

  useEffect(() => {
    handleFetchCategory();
  }, []);
  return (
    <>
      <div className="d-flex w-50 justify-content-between align-items-center top-margin">
        <h4 className="property_form_h4">Floor Plans & Pricing</h4>
        <IoIosAddCircle
          onClick={createPlans}
          className="icon"
          style={{ cursor: "pointer" }}
        />
      </div>
      <div className="mb-5">
        {plans.map((row, id) => (
          <div className="row" key={row.id}>
            <div className="col-md-2">
              <div
                style={{
                  borderBottom: "1px solid #cccccc",
                  margin: "20px 0",
                }}
              >
                <select
                  className="form-select"
                  aria-label="Default select example"
                  name="category"
                  value={row.category}
                  onChange={(e) => onChangePlanHandler(e, row.id)}
                  required
                >
                  <option>Select Category*</option>
                  {categories?.map((category) => (
                    <option
                      id={category._id}
                      key={category._id}
                      value={category._id}
                    >
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-md-2">
              <div
                className="form-floating border_field"
                style={{ marginTop: "6px" }}
              >
                <input
                  type="text"
                  className="form-control"
                  id="floatingInputPrice"
                  placeholder="Price*"
                  name="price"
                  value={row.price}
                  onChange={(e) => handleInputPlanChange(e, row.id)}
                  required
                />
                <label htmlFor="floatingInputPrice">Price*</label>
              </div>
            </div>
            <div className="col-md-2">
              <div
                className="form-floating border_field"
                style={{ marginTop: "6px" }}
              >
                <input
                  type="text"
                  className="form-control"
                  id="floatingInputPrice"
                  placeholder="Area*"
                  name="size"
                  value={row.size}
                  onChange={(e) => handleInputPlanChange(e, row.id)}
                  required
                />
                <label htmlFor="floatingInputPrice">Area</label>
              </div>
            </div>
            <div className="col-md-2">
              <div
                style={{
                  borderBottom: "1px solid #cccccc",
                  margin: "20px 0",
                }}
              >
                <select
                  className="form-select"
                  aria-label="Default select example"
                  name="size_sq"
                  value={row.size_sq}
                  onChange={(e) => handleInputPlanChange(e, row.id)}
                  required
                >
                  <option>Sq.Ft.</option>
                  <option>Sq.Yd.</option>
                  <option>Ft.</option>
                </select>
              </div>
            </div>
            <div className="col-md-2">
              <label className="file">
                <input
                  type="file"
                  id={`file-input-${row.id}`}
                  aria-label="File browser example"
                  onChange={(e) => handleInputByClick(e, row.id)}
                />
              </label>

              <div
                id={`preview-${row.id}`}
                className="mt-3 d-flex align-items-center"
              >
                {imagesByRow[row.id - 1]?.map((img, index) => (
                  <Fragment key={index}>
                    <img src={img} alt="media" width="50%" />
                  </Fragment>
                ))}
              </div>
            </div>

            <div className="col-md-2 d-flex align-items-center">
              <AiFillDelete
                className="icon"
                style={{ cursor: "pointer" }}
                onClick={() => removePlan(row.id)}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default FloorPlans;
