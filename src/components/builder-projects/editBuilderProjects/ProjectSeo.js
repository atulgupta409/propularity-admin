import React, { useEffect, useState } from "react";
import { EditProjectState } from "../../../context/EditProjectContext";

const ProjectSeo = () => {
  const { projectSeo, setprojectSeo, editProject } = EditProjectState();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setprojectSeo({
      ...projectSeo,
      [name]: value,
    });
  };

  const handleCheckboxChange2 = (event) => {
    const { checked } = event.target;
    setprojectSeo((prev) => ({
      ...prev,
      isChecked: checked,
    }));
    setprojectSeo((prev) => ({
      ...prev,
      indexed: checked ? "index, follow" : "noindex, nofollow",
    }));
  };
  useEffect(() => {
    if (editProject) {
      setprojectSeo({
        title: editProject?.seo?.title,
        description: editProject?.seo?.description,
        keywords: editProject?.seo?.keywords,
        robots: editProject?.seo?.indexed,
        twitterTitle: editProject?.seo?.twitter?.title,
        twitterDescription: editProject?.seo?.twitter?.description,
        graphTitle: editProject?.seo?.open_graph?.title,
        graphDescription: editProject?.seo?.open_graph?.description,
        indexed: editProject?.seo?.robots,
        isChecked: editProject?.seo?.index,
      });
    }
  }, [editProject]);

  return (
    <>
      {" "}
      <div className="row top-margin">
        <h4 className="property_form_h4">SEO Details</h4>
        <div className="col-md-6">
          <div className="form-floating border_field">
            <input
              type="text"
              className="form-control"
              id="floatingInputTitle"
              placeholder="Title"
              name="title"
              value={projectSeo.title}
              onChange={handleInputChange}
            />
            <label htmlFor="floatingInput">Title</label>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="form-floating border_field">
            <input
              type="text"
              className="form-control"
              id="floatingInputKeywords"
              placeholder="Keywords"
              name="keywords"
              value={projectSeo.keywords}
              onChange={handleInputChange}
            />
            <label htmlFor="floatingInput">Keywords</label>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="form-floating border_field">
            <textarea
              type="text"
              className="form-control"
              id="floatingInputDescription"
              placeholder="Description"
              name="description"
              value={projectSeo.description}
              onChange={handleInputChange}
            />
            <label htmlFor="floatingInputDescription">Description</label>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="form-floating border_field">
            <input
              type="text"
              className="form-control"
              id="floatingInputTwitter"
              placeholder="Twitter Title"
              name="twitterTitle"
              value={projectSeo.twitterTitle}
              onChange={handleInputChange}
            />
            <label htmlFor="floatingInputTwitter">Twitter Title</label>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="form-floating border_field">
            <textarea
              type="text"
              className="form-control"
              id="floatingInputTwitDesc"
              placeholder="Twitter Description"
              name="twitterDescription"
              value={projectSeo.twitterDescription}
              onChange={handleInputChange}
            />
            <label htmlFor="floatingInputTwitDesc">Twitter Description</label>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="form-floating border_field">
            <input
              type="text"
              className="form-control"
              id="floatingInputOgTitle"
              placeholder="Open Graph Title"
              name="graphTitle"
              value={projectSeo.graphTitle}
              onChange={handleInputChange}
            />
            <label htmlFor="floatingInputOgTitle">Open Graph Title</label>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="form-floating border_field">
            <textarea
              type="text"
              className="form-control"
              id="floatingInputOgDesc"
              placeholder="Open Graph Description"
              name="graphDescription"
              value={projectSeo.graphDescription}
              onChange={handleInputChange}
            />
            <label htmlFor="floatingInputOgDesc">Open Graph Description</label>
          </div>
        </div>
      </div>
      <div className="row pt-3">
        <div className="col-md-6">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="flexCheckDefault"
              checked={projectSeo.isChecked}
              onChange={handleCheckboxChange2}
            />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              Check for indexing this Page
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectSeo;
