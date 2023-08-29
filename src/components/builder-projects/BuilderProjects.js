import React, { useEffect, useState } from "react";
import "./BuilderProject.css";
import Mainpanelnav from "../mainpanel-header/Mainpanelnav";
import Addpropertybtn from "../add-new-btn/Addpropertybtn";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import { AiOutlineEye } from "react-icons/ai";
import { changeProjectStatus } from "./ProjectService";
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
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';
const GET_PROJECTS = gql`
  query {
    projects {
        _id 
      name
      slug
      location{
        city{
          name
        }
        micro_location{
          name
        }
      }
      status
      createdAt
    }
  }
`;

function BuilderProjects() {
  const { loading, error, data } = useQuery(GET_PROJECTS);
  const [projects, setprojects] = useState([]);
  const [updateTable, setUpdateTable] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [citySearchTerm, setCitySearchTerm] = useState("");
  const [microLocationSearchTerm, setMicroLocationSearchTerm] = useState("");
  const [searchedprojects, setSearchedprojects] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [searchOption, setSearchOption] = useState("");

  const toast = useToast()
  useEffect(() => {
    if(data?.projects){
      setprojects(data?.projects)
    }
  }, [data?.projects]);   
  const handleSearch = () => {
    const filteredprojects = projects?.filter((project) => {
      const cityName = project.location.city[0]?.name || "city";
      const microLocationName =
        project.location.micro_location[0]?.name || "microlocation";
      const statusName = project.status;
      const matchName =
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        searchTerm.toLowerCase().includes(project.name.toLowerCase());

      const matchCity =
        cityName.toLowerCase().includes(citySearchTerm.toLowerCase()) ||
        citySearchTerm.toLowerCase().includes(cityName.toLowerCase());

      const matchMicroLocation =
        microLocationName
          .toLowerCase()
          .includes(microLocationSearchTerm.toLowerCase()) ||
        microLocationSearchTerm
          .toLowerCase()
          .includes(microLocationName.toLowerCase());
      const matchStatus =
        statusName.includes(searchOption) || searchOption === "All"
          ? project
          : "";
      return matchName && matchCity && matchMicroLocation && matchStatus;
    });

    setSearchedprojects(filteredprojects);
    setCurPage(1);
  };

  useEffect(() => {
    handleSearch();
    setShowAll(
      searchTerm === "" &&
        citySearchTerm === "" &&
        microLocationSearchTerm === "" &&
        searchOption === ""
    );
  }, [
    updateTable,
    searchTerm,
    citySearchTerm,
    microLocationSearchTerm,
    searchOption,
  ]);
  const handleDeleteprojects = async (id) => {
    try {
      const { data } = await axios.delete(
        `${BASE_URL}/api/project/delete/${id}`
      );
      setUpdateTable((prev) => !prev);
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
    setSearchTerm("");
    setCitySearchTerm("");
    setMicroLocationSearchTerm("");
    setSearchOption("");
  };
  const handleReject = async (id) => {
    await changeProjectStatus(id, "reject", setUpdateTable, toast);
    setSearchTerm("");
    setCitySearchTerm("");
    setMicroLocationSearchTerm("");
    setSearchOption("");
  };
  const [selectItemNum, setSelectItemNum] = useState(10);
  const itemsPerPageHandler = (e) => {
    setSelectItemNum(e.target.value);
  };
  const [curPage, setCurPage] = useState(1);
  const recordsPerPage = selectItemNum;
  const lastIndex = curPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const nPage = Math.ceil(
    (showAll ? projects?.length : searchedprojects?.length) / selectItemNum
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
      (showAll ? projects?.length : searchedprojects?.length) / selectItemNum
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
                    {loading ? (
  <Tr>
    <Td colSpan={8} textAlign="center">
      <Spinner size="lg" />
    </Td>
  </Tr>
) : (
  (showAll ? projects : searchedprojects)
    .slice((curPage - 1) * selectItemNum, curPage * selectItemNum)
    .map((project) => (
      <Tr className="table_data_row" key={project._id}>
        <Td className="name_heading">{project.name}</Td>
        <Td className="city_heading">{project.location.city[0]?.name}</Td>
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
            to={`https://spacite.com/coworking/${project.slug}`}
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
            className="d-flex justify-content-between align-items-center main-div"
            style={{ width: "100px !important" }}
          >
            <Approve handleFunction={() => handleApprove(project._id)} />
            <Desable handleFunction={() => handleReject(project._id)} />
            <Delete handleFunction={() => handleDeleteprojects(project._id)} />
          </div>
        </Td>
      </Tr>
    ))
)}
{(!loading && !((showAll ? projects : searchedprojects)
  .slice((curPage - 1) * selectItemNum, curPage * selectItemNum).length)) && (
  <Tr>
    <Td colSpan={8}>No matching results found.</Td>
  </Tr>
)}
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
              {showAll
                ? projects?.slice(
                    (curPage - 1) * selectItemNum,
                    curPage * selectItemNum
                  ).length + firstIndex
                : searchedprojects?.slice(
                    (curPage - 1) * selectItemNum,
                    curPage * selectItemNum
                  ).length + firstIndex}{" "}
              of {showAll ? projects?.length : searchedprojects?.length}
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