import React, { useState, useEffect } from "react";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import { GpState } from "../../../context/context";
import htmlToDraft from "html-to-draftjs";
const BuilderSeo = () => {
  const {
    builderSeo,
    setBuilderSeo,
    editBuilder,
    isBuilderEditable,
    setFooter_des,
  } = GpState();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBuilderSeo({
      ...builderSeo,
      [name]: value,
    });
  };
  const handleCheckboxChange = (event) => {
    const { checked } = event.target;
    setBuilderSeo((prev) => ({
      ...prev,
      isChecked: checked,
    }));
    setBuilderSeo((prev) => ({
      ...prev,
      indexed: checked ? "index, follow" : "noindex, nofollow",
    }));
  };
  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };
  useEffect(() => {
    if (editBuilder?.description && isBuilderEditable) {
      const blocks = htmlToDraft(editBuilder?.description || "empty");
      const { contentBlocks, entityMap } = blocks;
      const contentState = ContentState.createFromBlockArray(
        contentBlocks,
        entityMap
      );
      const initialEditorState = EditorState.createWithContent(contentState);
      setEditorState(initialEditorState);
    } else {
      setEditorState(() => EditorState.createEmpty());
    }
  }, [editBuilder]);
  useEffect(() => {
    if (editorState) {
      setFooter_des(draftToHtml(convertToRaw(editorState.getCurrentContent())));
    }
  }, [editorState]);
  useEffect(() => {
    if (editBuilder && isBuilderEditable) {
      setBuilderSeo({
        title: editBuilder?.seo?.title,
        descriptionSeo: editBuilder?.seo?.description,
        keywords: editBuilder?.seo?.keywords,
        robots: editBuilder?.seo?.indexed,
        twitterTitle: editBuilder?.seo?.twitter?.title,
        twitterDescription: editBuilder?.seo?.twitter?.description,
        graphTitle: editBuilder?.seo?.open_graph?.title,
        graphDescription: editBuilder?.seo?.open_graph?.description,
        footerTitle: editBuilder?.seo?.footer_title,
        isChecked: editBuilder?.seo?.index,
      });
    } else {
      setBuilderSeo({
        title: "",
        descriptionSeo: "",
        keywords: "",
        twitterTitle: "",
        twitterDescription: "",
        graphTitle: "",
        graphDescription: "",
        footerTitle: "",
        isChecked: false,
        indexed: "noindex, nofollow",
      });
    }
  }, [editBuilder]);
  return (
    <>
      <div className="row mt-5">
        <h4 className="property_form_h4">SEO Details</h4>
        <div className="col-md-6">
          <div className="form-floating border_field">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="Title"
              name="title"
              value={builderSeo.title}
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
              id="floatingInput"
              placeholder="Keywords"
              name="keywords"
              value={builderSeo.keywords}
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
              id="floatingInput"
              placeholder="Description"
              name="descriptionSeo"
              value={builderSeo.descriptionSeo}
              onChange={handleInputChange}
            />
            <label htmlFor="floatingInput">Description</label>
          </div>
        </div>
      </div>

      <div className="row my-2">
        <div className="col-md-12">
          <div className="form-floating border_field">
            <input
              type="text"
              className="form-control"
              id="floatingInputTwitter"
              placeholder="Twitter title"
              name="twitterTitle"
              value={builderSeo.twitterTitle}
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
              name="twitterDescription"
              placeholder="Twitter Description"
              value={builderSeo.twitterDescription}
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
              value={builderSeo.graphTitle}
              onChange={handleInputChange}
            />
            <label htmlFor="floatingInputOgTitle">Open Graph Title</label>
          </div>
        </div>
      </div>
      <div className="row mb-5">
        <div className="col-md-12">
          <div className="form-floating border_field">
            <textarea
              type="text"
              className="form-control"
              id="floatingInputOgDesc"
              placeholder="Open Graph Description"
              name="graphDescription"
              value={builderSeo.graphDescription}
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
              checked={builderSeo.isChecked}
              onChange={handleCheckboxChange}
            />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              Check for indexing this Page
            </label>
          </div>
        </div>
      </div>
      <div className="row">
        <h4 className="property_form_h4">Footer Details</h4>
        <div className="col-md-12">
          <div className="form-floating border_field">
            <input
              type="text"
              className="form-control"
              id="floatingInputTwitter"
              placeholder="Footer Title"
              value={builderSeo.footerTitle}
              name="footerTitle"
              onChange={handleInputChange}
            />
            <label htmlFor="floatingInputTwitter">Footer Title</label>
          </div>
        </div>
      </div>
      <h6 className="mt-4">Footer description</h6>
      <div className="row">
        <div className="col-md-12">
          <Editor
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={onEditorStateChange}
          />
        </div>
      </div>
    </>
  );
};

export default BuilderSeo;
