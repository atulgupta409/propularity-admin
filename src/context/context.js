import React, { useState, useEffect, useContext, createContext } from "react";
import Cookies from "js-cookie";
const AppContext = createContext();

const AppProvider = ({ children }) => {
  //projects states
  const [editProject, setEditProject] = useState({});
  const [showModal, setShow] = useState(false);
  const [country, setCountry] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [token, setToken] = useState("");
  const [checkedAmenities, setCheckedAmenities] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [projects, setProjects] = useState({
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
  const [projectSeo, setprojectSeo] = useState({
    title: "",
    description: "",
    url: "",
    keywords: "",
    robots: "",
    twitterTitle: "",
    twitterDescription: "",
    graphTitle: "",
    graphDescription: "",
    indexed: "noindex, nofollow",
    isChecked: false,
  });
  const [plans, setPlans] = useState([]);
  const [imageData, setImageData] = useState([]);
  const [checkedFor, setCheckedFor] = useState({
    forRent: false,
    forSale: false,
  });
  const [selectedBuilder, setSelectedBuilder] = useState(null);
  const [editorData, setEditorData] = useState({
    project: "",
    highlights: "",
  });
  const [selectedMicroLocation, setSelectedMicroLocation] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [allLocation, setAllLocation] = useState([])
  const [isEditable, setIsEditable] = useState(false);
  const [location, setLocation] = useState({
    address: "",
    longitude: "",
    lattitude: "",
    isChecked: false,
  });
  const login = (userData, authToken) => {
    Cookies.set("token", authToken);
    Cookies.set("userInfo", JSON.stringify(userData));
    setUserInfo(userData);
    setToken(authToken);
  };
  let isLogin = !!Cookies.get("token");
  const logout = () => {
    setUserInfo(null);
    setToken(null);
    Cookies.remove("userInfo");
    Cookies.remove("token");
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //builder states
  const [editBuilder, setEditBuilder] = useState({});
  const [isBuilderEditable, setIsBuilderEditable] = useState(false);
  const [builder, setBuilder] = useState({
    name: "",
    slug: "",
    starting_price: "",
    configuration: "",
    ratings: "",
    estb_year: "",
    residential_num: "",
    commercial_num: "",
    coming_soon: "",
  });
  const [builderSeo, setBuilderSeo] = useState({
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
  const [footer_des, setFooter_des] = useState("");
  const [builderImage, setBuilderImage] = useState([]);

  const allValues = {
    userInfo,
    token,
    login,
    handleClose,
    handleShow,
    showModal,
    isLogin,
    logout,
    country,
    setCountry,
    checkedAmenities,
    setCheckedAmenities,
    contacts,
    setContacts,
    projects,
    setProjects,
    plans,
    setPlans,
    imageData,
    setImageData,
    projectSeo,
    setprojectSeo,
    checkedFor,
    setCheckedFor,
    selectedBuilder,
    setSelectedBuilder,
    editorData,
    setEditorData,
    selectedMicroLocation,
    setSelectedMicroLocation,
    selectedState,
    setSelectedState,
    selectedCountry,
    setSelectedCountry,
    selectedCity,
    setSelectedCity,
    location,
    setLocation,
    editProject,
    setEditProject,
    isEditable,
    setIsEditable,
    builder,
    setBuilder,
    builderSeo,
    setBuilderSeo,
    footer_des,
    setFooter_des,
    builderImage,
    setBuilderImage,
    editBuilder,
    setEditBuilder,
    isBuilderEditable,
    setIsBuilderEditable,
    allLocation, setAllLocation
  };

  return (
    <AppContext.Provider value={allValues}>{children}</AppContext.Provider>
  );
};

export const GpState = () => {
  return useContext(AppContext);
};

export default AppProvider;
