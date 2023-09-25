import React, { useEffect, useState } from "react";
import "./BuilderProject.css";
import Mainpanelnav from "../mainpanel-header/Mainpanelnav";
import Addpropertybtn from "../add-new-btn/Addpropertybtn";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import { AiOutlineEye } from "react-icons/ai";
import { changeProjectStatus, getProjectData, searchedProjects } from "./ProjectService";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { Link } from "react-router-dom";
import Delete from "../delete/Delete";
import { AiFillEdit } from "react-icons/ai";
import Desable from "../delete/Desable";
import Approve from "../delete/Approve";
import BASE_URL from "../../apiConfig";


function BuilderProjects() {
  const [projects, setprojects] = useState([]);
  const [updateTable, setUpdateTable] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [citySearchTerm, setCitySearchTerm] = useState("");
  const [microLocationSearchTerm, setMicroLocationSearchTerm] = useState("");
  const [searchedprojects, setSearchedprojects] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [searchOption, setSearchOption] = useState("");
   const [isLoading, setIsLoading] = useState(false)
   const [curPage, setCurPage] = useState(1);
   const [selectItemNum, setSelectItemNum] = useState(10);
   const [totalCount, setTotalCount] = useState(0)
   const [searchCount, setSearchCount] = useState(0)
   const [loading, setLoading] = useState(false)
   const toast = useToast()
  
  const getProjectDataWithPagination = async() => {
    setIsLoading(true)
    const data = await getProjectData(curPage, selectItemNum)
    setprojects(data?.projects)
    setTotalCount(data?.totalCount)
    setShowAll(false)
    setIsLoading(false)
  }

const getSearchProjects = async() => {
  setLoading(true)
  const data = await searchedProjects(searchTerm, citySearchTerm, microLocationSearchTerm, searchOption, curPage, selectItemNum)
  setSearchedprojects(data?.projects)
  setSearchCount(data?.totalCount)
  setLoading(false)
}
useEffect(() => {
  if (searchTerm || citySearchTerm || microLocationSearchTerm || searchOption) {
    getSearchProjects();
    setShowAll(true)
  }
  
  else if(searchTerm === "" || citySearchTerm === "" || microLocationSearchTerm === ""){
  getProjectDataWithPagination();
  setShowAll(false)
  }
  else{
    getProjectDataWithPagination();
    setShowAll(false)
  }
}, [searchTerm, citySearchTerm, microLocationSearchTerm, searchOption]);


  useEffect(() => {
    getProjectDataWithPagination();
  }, [curPage, selectItemNum]);   
  
  const handleDeleteprojects = async (id) => {
    try {
      const { data } = await axios.delete(
        `${BASE_URL}/api/project/delete/${id}`
      );
      setUpdateTable((prev) => !prev);
      getProjectDataWithPagination();
      toast({
        title: "Deleted Successfully!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const handleApprove = async (id) => {
    await changeProjectStatus(id, "approve", setUpdateTable, toast);
    if(showAll){
      getSearchProjects();
    }
    else{
      getProjectDataWithPagination()
    }
   
  };
  const handleReject = async (id) => {
    await changeProjectStatus(id, "reject", setUpdateTable, toast);
    if(showAll){
      getSearchProjects();
    }
    else{
      getProjectDataWithPagination()
    }
  };
  const itemsPerPageHandler = (e) => {
    setSelectItemNum(e.target.value);
  };
  
  const recordsPerPage = selectItemNum;
  const lastIndex = curPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const nPage = Math.ceil(
    (showAll ? searchCount : totalCount) / selectItemNum
  );
  if (firstIndex > 0) {
    var prePage = () => {
      if (curPage !== firstIndex) {
        setCurPage(curPage - 1);
      }
    };
  }

  var nextPage = () => {
    const lastPage = Math.ceil(
      (showAll ? searchCount : totalCount) / selectItemNum
    );
    if (curPage < lastPage) {
      setCurPage((prev) => prev + 1);
    }
  };

  const getFirstPage = () => {
    setCurPage(1);
  };

  const getLastPage = () => {
    setCurPage(nPage);
  };
  return (
    <div className="mx-5 mt-3">
      <Mainpanelnav />
      <Link to="/builder-projects/add-builder-projects" className="btnLink mt-2">
        <Addpropertybtn buttonText={"ADD Project"} />
      </Link>
      <div className="table-box space-table-box">
        <div className="table-top-box">Projects Module</div>
        <TableContainer overflowX="hidden">
          <div className="row my-5">
            <div className="col-md-3">
              <div className="form-floating border_field">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  placeholder="Search by name"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <label htmlFor="floatingInput">Search By Name</label>
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-floating border_field">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  placeholder="Search by city"
                  value={citySearchTerm}
                  onChange={(e) => setCitySearchTerm(e.target.value)}
                />
                <label htmlFor="floatingInput">Search By City</label>
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-floating border_field">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  placeholder="Search by microlocation"
                  value={microLocationSearchTerm}
                  onChange={(e) => setMicroLocationSearchTerm(e.target.value)}
                />
                <label htmlFor="floatingInput">Search By Location</label>
              </div>
            </div>

            <div className="col-md-3">
              <div className="form-floating">
                <select
                  className="form-select"
                  id="floatingSelectGrid"
                  aria-label="Floating label select example"
                  value={searchOption}
                  onChange={(e) => setSearchOption(e.target.value)}
                >
                  <option value="All">All</option>
                  <option value="pending">pending</option>
                  <option value="reject">reject</option>
                  <option value="approve">approve</option>
                </select>
                <label htmlFor="floatingSelectGrid">Search By Status</label>
              </div>
            </div>
          </div>
          <div className="data_table">
            <div className="row">
              <div className="col-md-12">
                <Table variant="simple">
                  <Thead>
                    <Tr className="table_heading_row">
                      <Th className="name_heading">NAME</Th>
                      <Th className="city_heading">CITY</Th>
                      <Th className="micro_heading">LOCATION</Th>
                      <Th className="time_heading">ADDED ON</Th>
                      <Th className="status_heading">STATUS</Th>
                      <Th className="edit_heading">EDIT</Th>
                      <Th className="preview_heading">PREVIEW</Th>
                      <Th className="action_heading">ACTION</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {(showAll ? loading : isLoading) ? (
  <Tr>
    <Td colSpan={8} textAlign="center">
      <Spinner size="lg" />
    </Td>
  </Tr>
) : (
  (showAll ? searchedprojects : projects)
    .map((project) => (
      <Tr className="table_data_row" key={project._id}>
        <Td className="name_heading">{project.name}</Td>
        <Td className="city_heading">{project.location.city.name}</Td>
        <Td className="micro_heading">
          {project.location.micro_location[0]?.name}
        </Td>
        <Td className="time_heading">
          {new Intl.DateTimeFormat("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          }).format(new Date(project.createdAt))}
        </Td>
        <Td className="status_heading" textAlign="center">
          {project.status === "approve"
            ? "AP"
            : project.status === "reject"
            ? "RJ"
            : project.status === "pending"
            ? "PD"
            : ""}
        </Td>
        <Td className="edit_heading">
          <Link
            to={`/builder-projects/edit-project/${project._id}`}
            target="_blank"
          >
            <AiFillEdit
              style={{
                marginLeft: "0.5rem",
                fontSize: "20px",
              }}
            />
          </Link>
        </Td>
        <Td className="preview_heading">
          <Link
            to={`https://propularity.in/${project?.builder?.name?.toLowerCase()}/${project?.location?.city?.name?.toLowerCase()}/${project.slug}`}
            target="_blank"
          >
            <AiOutlineEye
              style={{
                margin: "auto",
                fontSize: "20px",
                cursor: "pointer",
              }}
            />
          </Link>
        </Td>
        <Td className="action_heading">
          <div
            className="d-flex justify-content-between align-items-center main-div w-100"
          >
            <Approve isEnabled={project.status === "reject" || project.status === "pending"} handleFunction={() => handleApprove(project._id)} />
            <Desable isEnabled={project.status === "approve" || project.status === "pending"} handleFunction={() => handleReject(project._id)} />
            <Delete handleFunction={() => handleDeleteprojects(project._id)} />
          </div>
        </Td>
      </Tr>
    ))
)}
{/* {(!loading && !((showAll ? projects : searchedprojects)
  .slice((curPage - 1) * selectItemNum, curPage * selectItemNum).length)) && (
  <Tr>
    <Td colSpan={8}>No matching results found.</Td>
  </Tr>
)} */}
                  </Tbody>
                </Table>
              </div>
            </div>
          </div>
        </TableContainer>
        <nav className="mt-5">
          <div
            className="d-flex align-items-center justify-content-between"
            style={{ width: "51%" }}
          >
            <p className="mb-0">Items per page: </p>
            <div style={{ borderBottom: "1px solid gray" }}>
              <select
                className="form-select"
                aria-label="Default select example"
                value={selectItemNum}
                onChange={itemsPerPageHandler}
              >
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </div>
            <div style={{ width: "110px" }}>
              {firstIndex + 1} -{" "}
               {projects.length + firstIndex}
               {" "}  
              of {(showAll ? searchCount : totalCount)}
            </div>

            <div className="page-item">
              <BiSkipPrevious onClick={getFirstPage} />
            </div>
            <div className="page-item">
              <GrFormPrevious onClick={prePage} />
            </div>
            <div className="page-item">
              <GrFormNext onClick={nextPage} />
            </div>
            <div className="page-item">
              <BiSkipNext onClick={getLastPage} />
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default BuilderProjects;