import React, { useState, useEffect, Fragment } from "react";
import { uploadFile, uploadPdfFile } from "../../../services/Services";

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import { GpState } from "../../../context/context";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import axios from "axios";
import BASE_URL from "../../../apiConfig";
import Delete from "../../delete/Delete";
const ProjectImage = () => {
  const [fileName, setFileName] = useState([]);
  const [progress, setProgress] = useState(0);
  const [images, setImages] = useState([]);
  const { imageData, setImageData, editProject, isEditable, pdf, setPdf } = GpState();
  const [isUploaded, setIsUploaded] = useState(false);
  const removePreviewImage = (index) => {
    const updatedImages = [...imageData];
    updatedImages.splice(index, 1);
    setImageData(updatedImages);
  };
  const previewFile = (data) => {
    setImages((prevImages) => [...prevImages, ...data]);
  };
  const previewPdf = (data) => {
    setPdf(data[0]);
  };
  const handleUploadFile = async (files) => {
    await uploadFile(files, setProgress, setIsUploaded, previewFile);
  };
  const handleInputByClick = (e) => {
    const files = Array.from(e.target.files);
    handleUploadFile(files);
    const fileNames = files.map((file) => file.name);
    setFileName(fileNames);
  };
  const handleUploadPdf = (e) => {
    const files = Array.from(e.target.files);
    uploadPdfFile(files, previewPdf);
  };
  const handleAltChange = (event, index) => {
    const updatedArray = [...imageData]; // Create a copy of the mergedArray
    updatedArray[index].alt = event.target.value; // Update the alt value at the specified index

    setImageData(updatedArray);
  };

  useEffect(() => {
    if (editProject?.images && isEditable) {
      const combinedArray = images.map((image, index) => ({
        image,
        name: fileName[index],
        alt: fileName[index],
        order: index+1
      }));
      setImageData([...editProject?.images, ...combinedArray]);
      setPdf(editProject?.brochure)
    } else {
      const combinedArray = images.map((image, index) => ({
        image,
        name: fileName[index],
        alt: fileName[index],
        order: index+1
      }));
      setImageData([...combinedArray]);
      setPdf("")
    }
  }, [images, fileName, editProject?.images]);
  const onDragEnd = async (result) => {
    const { destination, source } = result;

    if (!destination) return; // Dropped outside the list
    if (destination.index === source.index) return; // Dropped in the same position

    const recordedimage = Array.from(imageData);
    const [movedSpace] = recordedimage.splice(source.index, 1);
    recordedimage.splice(destination.index, 0, movedSpace);

    const updatedOrderPayload = recordedimage.map((image, index) => ({
      _id: image._id,
       order: index + 1,
       image: image.image,
       alt: image.alt,
       name: image.name
    }));
    setImageData(updatedOrderPayload);
    const updateImages = {
      _id: editProject?._id,
      updateImage: updatedOrderPayload
    }
    try {
      const response = await axios.put(
        `${BASE_URL}/api/project/drag-images`,
        updateImages
      );

    } catch (error) {
      console.error("Error updating priority order:", error);
      // Handle error (e.g., show an error message to the user)
    }
    };
    const handleDelete = async (imageId ) => {
      try {
        const response = await axios.delete(`${BASE_URL}/api/project/${editProject?._id}/images/${imageId}`);
        setImageData((prevImages) => prevImages.filter((image) => image._id !== imageId));
         
      } catch (error) {
        console.error('Error deleting image:', error.message);
      }
    };
  return (
    <>
      <div className="row top-margin image-border">
        <h4 className="property_form_h4">Project Images</h4>
        <div className="container">
          <label className="file">
            <input
              type="file"
              id="file-input"
              multiple
              aria-label="File browser example"
              onChange={handleInputByClick}
            />
          </label>

          {progress ? (
            <div>
              <p className="mx-auto">
                <strong>Uploading Progress</strong>
              </p>
              <div className="progress mx-auto">
                <div
                  id="progress-bar"
                  className="progress-bar progress-bar-striped bg-info"
                  role="progressbar"
                  aria-valuenow="40"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  style={{ width: `${progress}%` }}
                >
                  {progress}%
                </div>
              </div>
            </div>
          ) : isUploaded ? (
            <h5>Uploaded</h5>
          ) : (
            ""
          )}
          <div id="preview" className="mt-3 d-flex align-items-center">
            <div
              className="table-box"
              style={{
                width: "100%",
                marginTop: "0px",
                marginBottom: "0px",
              }}
            >
              <h3>Images</h3>
              <TableContainer variant="striped" color="teal">
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>No.</Th>
                      <Th>Image</Th>
                      <Th>Name</Th>
                      <Th>Alt</Th>

                      <Th>Delete</Th>
                    </Tr>
                  </Thead>
                     <DragDropContext onDragEnd={onDragEnd}>
                      <Droppable droppableId="images">
                        {(provided) => (
                          <Tbody
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                          >
                            { imageData.map((img, index) => (
                                <Draggable
                                  key={img._id}
                                  draggableId={img._id}
                                  index={index}
                                >
                                  {(provided) => (
                                    <Tr
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                    >
                                      <Td {...provided.dragHandleProps}>
                                        {index + 1}
                                      </Td>
                                      <Td {...provided.dragHandleProps}>
                                      <img
                              src={img.image}
                              alt="media"
                              width="500px"
                              height="250px"
                            />
                                      </Td>
                                      <Td {...provided.dragHandleProps}>
                                   
                            <input
                              type="text"
                              className="form-control"
                              style={{ color: "#000" }}
                              value={img.name}
                            />
                       
                                      </Td>
                                      <Td {...provided.dragHandleProps}>
                              <input
                              type="text"
                              className="form-control"
                              style={{ color: "#000", minWidth: "200px" }}
                              value={img.alt?.split(".")[0]}
                              onChange={(event) =>
                                handleAltChange(event, index)
                              }
                            />
                                      </Td>
                                      <Td>
                                   
                                      {/* <AiFillDelete
                              onClick={() => handleDelete(img._id)}
                              className="icon"
                              style={{ color: "red" , cursor: "pointer"}}
                            /> */}
                            <Delete handleFunction={() => handleDelete(img._id)}/>
                                   </Td>
                                    </Tr>
                                  )}
                                </Draggable>
                              ))
                            }
                            {provided.placeholder}
                          </Tbody>
                        )}
                      </Droppable>
                    </DragDropContext>
                </Table>
              </TableContainer>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-5">
      <h4 className="property_form_h4">Upload Brochure</h4>
      <input
        type="file"
        accept=".pdf"
        onChange={handleUploadPdf}
      />
      {(editProject?.brochure || pdf) &&  <a href={pdf} download>
        Download {editProject?.name} Brochure
      </a>
      }
      </div>
    </>
  );
};

export default ProjectImage;
