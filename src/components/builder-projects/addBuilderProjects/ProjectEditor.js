import React, { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import { GpState } from "../../../context/context";

const ProjectEditor = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const { editorData, setEditorData, editProject, isEditable } = GpState();
  const [editorState2, setEditorState2] = useState(() =>
    EditorState.createEmpty()
  );

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };
  const onEditorStateChange2 = (editorState) => {
    setEditorState2(editorState);
  };

  useEffect(() => {
    if (editProject?.description && isEditable) {
      const blocksFromHtml = htmlToDraft(editProject?.description || "empty");
      const { contentBlocks, entityMap } = blocksFromHtml;
      const contentState = ContentState.createFromBlockArray(
        contentBlocks,
        entityMap
      );
      const initialEditorState = EditorState.createWithContent(contentState);
      setEditorState(initialEditorState);
    } else {
      setEditorState(() => EditorState.createEmpty());
    }
  }, [editProject?.description]);
  useEffect(() => {
    if (editProject?.highlights && isEditable) {
      const blocks = htmlToDraft(editProject?.highlights || "empty");
      const { contentBlocks, entityMap } = blocks;
      const contentState = ContentState.createFromBlockArray(
        contentBlocks,
        entityMap
      );
      const initialEditorState = EditorState.createWithContent(contentState);
      setEditorState2(initialEditorState);
    } else {
      setEditorState2(() => EditorState.createEmpty());
    }
  }, [editProject?.highlights]);

  useEffect(() => {
    if (editorState) {
      setEditorData((prev) => ({
        ...prev,
        project: draftToHtml(convertToRaw(editorState.getCurrentContent())),
      }));
    }
    if (editorState2) {
      setEditorData((prev) => ({
        ...prev,
        highlights: draftToHtml(convertToRaw(editorState2.getCurrentContent())),
      }));
    }
  }, [editorState, editorState2]);

  return (
    <>
      {" "}
      <div className="row top-margin">
        <div className="col-md-12">
          <h4 className="property_form_h4">About Project</h4>
        </div>
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
      <div className="row top-margin">
        <div className="col-md-12">
          <h4 className="property_form_h4">Project Highlights</h4>
        </div>
        <div className="col-md-12">
          <Editor
            editorState={editorState2}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={onEditorStateChange2}
          />
        </div>
      </div>
    </>
  );
};

export default ProjectEditor;
