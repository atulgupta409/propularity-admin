import React, { useState, useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import Mainpanelnav from "../../mainpanel-header/Mainpanelnav";
import Location from "./Location";
import BASE_URL from "../../../apiConfig";
import FloorPlans from "./FloorPlans";
import ProjectImage from "./ProjectImage";
import ProjectSeo from "./ProjectSeo";
import ProjectAmenities from "./ProjectAmenities";
import ProjectDetails from "./ProjectDetails";
import ProjectEditor from "./ProjectEditor";
import ContactDetails from "./ContactDetails";
import { GpState } from "../../../context/context";
import ImageUpload from "../../../ImageUpload";
import { uploadFile } from "../../../services/Services";
import { useParams } from "react-router-dom";
import { getProjectsById } from "../ProjectService";
import Loader from "../../loader/Loader";
function AddBuilderprojects() {
  const [isUploaded, setIsUploaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [images, setImages] = useState([]);
  const {
    checkedAmenities,
    projects,
    contacts,
    plans,
    projectSeo,
    imageData,
    selectedBuilder,
    checkedFor,
    selectedCountry,
    selectedState,
    selectedCity,
    selectedMicroLocation,
    location,
    editorData,
    isEditable,
    setIsEditable,
    allLocation
  } = GpState();
  const [loading, setLoading] = useState(false);

  const { editProject, setEditProject } = GpState();
  const { address, longitude, lattitude, isChecked } = location;
  const toast = useToast();
  const { id } = useParams();
  const handleFetchDatabyId = async () => {
    setLoading(true);
    const data = await getProjectsById(id);
    setEditProject(data);
    setLoading(false);
    setIsEditable(true);
  };
  const previewFile = (data) => {
    const allimages = images;
    setImages(allimages.concat(data));
  };

  const handleUploadFile = async (files) => {
    await uploadFile(files, setProgress, setIsUploaded, previewFile);
  };
  useEffect(() => {
    if (id) {
      handleFetchDatabyId();
    } else {
      setEditProject({});
      setIsEditable(false);
    }
  }, []);
  const allData = {
    name: projects?.name,
    builder: selectedBuilder?.value,
    project_type: projects?.type,
    slug: projects?.slug,
    starting_price: projects?.starting_price,
    configuration: projects?.configuration,
    ratings: projects?.ratings,
    coming_soon: projects?.coming_soon,
    project_status: projects?.status,
    project_size: projects?.project_size,
    short_descrip: projects?.short_descrip,
    for_rent: checkedFor?.forRent,
    for_sale: checkedFor?.forSale,
    images: imageData,
    amenties: checkedAmenities,
    master_plan: images[0],
    highlights: editorData?.highlights,
    description: editorData?.project,
    seo: {
      title: projectSeo?.title,
      description: projectSeo?.description,
      robots: projectSeo?.indexed,
      index: projectSeo?.isChecked,
      keywords: projectSeo?.keywords,
      twitter: {
        title: projectSeo?.twitterTitle,
        description: projectSeo?.twitterDescription,
      },
      open_graph: {
        title: projectSeo?.graphTitle,
        description: projectSeo?.graphDescription,
      },
    },
    location: {
      address,
      country: selectedCountry?.value,
      state: selectedState?.value,
      city: selectedCity?.value,
      micro_location: allLocation,
      longitude,
      latitude: lattitude,
      is_near_metro: isChecked,
    },
    plans,
    contact_details: contacts,
  };
  const handleSaveProject = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${BASE_URL}/api/project`, allData);

      toast({
        title: "Saved Successfully!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Saved the Space",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const handleUpdateProject = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${BASE_URL}/api/project/edit-project/${id}`,
        allData
      );

      toast({
        title: "Update Successfully!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Saved the Space",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };
  if (loading && isEditable) {
    return <Loader />;
  }

  return (
    <div className="mx-5 mt-3">
      <Mainpanelnav />
      <div className="container form-box">
        <form
          style={{ textAlign: "left" }}
          onSubmit={isEditable ? handleUpdateProject : handleSaveProject}
        >
          <div className="container">
            <ContactDetails />
            <ProjectDetails />
            <Location />
            <FloorPlans />
            <div className="row top-margin">
              <div className="col-md-12">
                <h4 className="property_form_h4">Master Plan</h4>
              </div>
              <div className="col-md-6">
                <ImageUpload
                  images={images}
                  setImages={setImages}
                  progress={progress}
                  setProgress={setProgress}
                  uploadFile={handleUploadFile}
                  isUploaded={isUploaded}
                />
              </div>
              <img src={editProject?.master_plan} style={{ width: "25%" }} />
            </div>

            <ProjectAmenities />
            <ProjectEditor />

            <ProjectImage />
            <ProjectSeo />
          </div>
          <div className="form-footer">
            <button type="submit" className="saveproperty-btn">
              {isEditable ? "UPDATE" : "SAVE"}
            </button>
            <button className="cancel-btn">CANCEL</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddBuilderprojects;
