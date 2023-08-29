import { Route, Routes, Navigate } from "react-router";
import "./App.css";
import Sidebar from "./components/sidebar/Sidebar";
import ListingSpace from "./components/listing-space/ListingSpace";
import BuilderPlan from "./components/builder-plan/BuilderPlan";
import Media from "./components/media/Media";
import Country from "./components/country/Country";
import State from "./components/state/State";
import City from "./components/city/City";
import Microlocation from "./components/microlocation/Microlocation";
import Amenities from "./components/amenities/Amenities";
import Login from "./components/login-page/Login";
import React, { useEffect, useState } from "react";
import { GpState } from "./context/context";
import AddBuilderprojects from "./components/builder-projects/addBuilderProjects/AddBuilderprojects";
import BuilderProjects from "./components/builder-projects/BuilderProjects";
import Builder from "./components/builders/Builder";
import Seo from "./components/SEO/Seo";
import AddSeoForm from "./components/SEO/AddSeoForm";
import EditSeo from "./components/SEO/EditSeo";
import ImageUpload from "./ImageUpload";
import OurClient from "./components/ourClients/OurClient";
import PriorityProjects from "./components/priorityProjects/PriorityProjects"
import PriorityMicrolocation from "./components/priorityMicrolocation/PriorityMicrolocation";
import TopProjects from "./components/top-projects/TopProjects";
import ForgotPassword from "./components/login-page/ForgotPassword";
import PasswordReset from "./components/login-page/PasswordReset";
import AddBuilder from "./components/builders/addbuilders/AddBuilder";
import BuilderPriority from "./components/builder-priority/BuilderPriority";
import PlansPriority from "./components/plans-priority/PlansPriority"
function App() {
  const { isLogin } = GpState();
  return (
    <div style={{ overflowX: "hidden" }}>
      <div className="row admin_main">
        <div className={isLogin ? "col-md-3" : "d-none"}>
          <Sidebar />
        </div>
        <div className={isLogin ? "col-md-9 table-aria" : "col-md-12"}>
          <div>
            <Routes>
              <Route
                path="/listing-space"
                element={isLogin ? <ListingSpace /> : <Navigate to="/" />}
              />
              <Route
                path="/builder-projects"
                element={isLogin ? <BuilderProjects /> : <Navigate to="/" />}
              />
              <Route
                path="/builder-plan"
                element={isLogin ? <BuilderPlan /> : <Navigate to="/" />}
              />
              <Route
                path="/media"
                element={isLogin ? <Media /> : <Navigate to="/" />}
              />
              <Route
                path="/"
                element={
                  !isLogin ? <Login /> : <Navigate to="/builder-projects" />
                }
              />
              <Route
                path="/country"
                element={isLogin ? <Country /> : <Navigate to="/" />}
              />
              <Route
                path="/state"
                element={isLogin ? <State /> : <Navigate to="/" />}
              />
              <Route
                path="/city"
                element={isLogin ? <City /> : <Navigate to="/" />}
              />
              <Route
                path="/microlocation"
                element={isLogin ? <Microlocation /> : <Navigate to="/" />}
              />
              <Route
                path="/amenities"
                element={isLogin ? <Amenities /> : <Navigate to="/" />}
              />
              <Route
                path="/seo"
                element={isLogin ? <Seo /> : <Navigate to="/" />}
              />
              <Route
                path="/builder-projects/add-builder-projects"
                element={isLogin ? <AddBuilderprojects /> : <Navigate to="/" />}
              />
              <Route
                path="/seo/add-seo"
                element={isLogin ? <AddSeoForm /> : <Navigate to="/" />}
              />
              <Route
                path="/builder"
                element={isLogin ? <Builder /> : <Navigate to="/" />}
              />
              <Route
                path="/seo/editseo/:id"
                element={isLogin ? <EditSeo /> : <Navigate to="/" />}
              />
              <Route
                path="/builder/add-builder"
                element={isLogin ? <AddBuilder /> : <Navigate to="/" />}
              />
              <Route
                path="/builder/edit-builder/:id"
                element={isLogin ? <AddBuilder /> : <Navigate to="/" />}
              />
              <Route
                path="/builder-projects/edit-project/:id"
                element={isLogin ? <AddBuilderprojects /> : <Navigate to="/" />}
              />
              <Route
                path="/image"
                element={isLogin ? <ImageUpload /> : <Navigate to="/" />}
              />
              <Route
                path="/clients"
                element={isLogin ? <OurClient /> : <Navigate to="/" />}
              />
              <Route
                path="/priority"
                element={isLogin ? <PriorityProjects /> : <Navigate to="/" />}
              />
              <Route
                path="/priority-microlocation"
                element={
                  isLogin ? <PriorityMicrolocation /> : <Navigate to="/" />
                }
              />
              <Route
                path="/top-projects"
                element={isLogin ? <TopProjects /> : <Navigate to="/" />}
              />
                <Route
                path="/builder-priority"
                element={isLogin ? <BuilderPriority /> : <Navigate to="/" />}
              />
              <Route
                path="/plans-priority"
                element={isLogin ? <PlansPriority /> : <Navigate to="/" />}
              />
              <Route path="/password-reset" element={<PasswordReset />} />
              <Route
                path="/forgotpassword/:id/:token"
                element={<ForgotPassword />}
              />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
