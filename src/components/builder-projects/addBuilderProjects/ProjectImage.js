import React, { useState, useEffect, Fragment } from "react";
import { AiFillDelete } from "react-icons/ai";
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
      }));
      setImageData([...editProject?.images, ...combinedArray]);
      setPdf(editProject?.brochure)
    } else {
      const combinedArray = images.map((image, index) => ({
        image,
        name: fileName[index],
        alt: fileName[index],
      }));
      setImageData([...combinedArray]);
      setPdf("")
    }
  }, [images, fileName, editProject?.images]);

 
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
                  <Tbody>
                    {imageData?.map((img, index) => (
                      <Fragment key={index}>
                        <Tr>
                          <Td>{index + 1}</Td>
                          <Td>
                            <img
                              src={img.image}
                              alt="media"
                              width="500px"
                              height="250px"
                            />
                          </Td>
                          <Td>
                            <input
                              type="text"
                              className="form-control"
                              style={{ color: "#000" }}
                              value={img.name}
                            />
                          </Td>
                          <Td>
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
                            <AiFillDelete
                              onClick={() => removePreviewImage(index)}
                              className="icon"
                              style={{ color: "red" }}
                            />
                          </Td>
                        </Tr>
                      </Fragment>
                    ))}
                  </Tbody>
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
