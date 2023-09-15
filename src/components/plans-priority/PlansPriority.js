import React, { useEffect, useState } from "react";
import Mainpanelnav from "../mainpanel-header/Mainpanelnav";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Spinner,
} from "@chakra-ui/react";
import axios from "axios";
import Select from "react-select";
import BASE_URL from "../../apiConfig";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  getTopProjectsByPlanType,
  getProjectsDataByPlanType,
} from "./PlansPriorityService";
import { getPropertyTypes } from "./PlansPriorityService";
function BuilderPriority() {
  const [loading, setLoading] = useState(false);
  const [projects, setprojects] = useState([]);
  const [updateTable, setUpdateTable] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedprojects, setSearchedprojects] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [planTypes, setPlanTypes] = useState([]);
  const [selectedPlanType, setSelectedPlanType] = useState(null);
  const [priorityprojects, setPriorityprojects] = useState([]);
  const [loadingTable, setLoadingTable] = useState(false);
  const handleFetchTypes = async () => {
  const data =  await getPropertyTypes();
  setPlanTypes(data)
  };
  const handleFetchProjects = async (planTypeId) => {
  setLoading(true)
  const data = await getProjectsDataByPlanType(planTypeId);
  setprojects(data)
  setLoading(false)
   setSearchTerm("");
  };
  const handleFetchTopProjects = async (planTypeId) => {
    setLoadingTable(true)
    const data = await getTopProjectsByPlanType(planTypeId)
    setPriorityprojects(data)
    setLoadingTable(false)
  };
  const onChangeOptionHandler = (selectedOption, dropdownIdentifier) => {
    switch (dropdownIdentifier) {
      case "PlanType":
        setSelectedPlanType(selectedOption);

        handleFetchProjects(selectedOption ? selectedOption.value : null);
        handleFetchTopProjects(
          selectedOption ? selectedOption.value : null
        );
        break;
      default:
        break;
    }
  };
  const allPlans = ["6501889687a793abe11b9090", "6501889f87a793abe11b9095", "6501887887a793abe11b9081", "65018a3c87a793abe11b90a0", "6501860d87a793abe11b8fdb", '6501861387a793abe11b8fe0', '650185fc87a793abe11b8fd1', '650185ef87a793abe11b8fcc', '6501887e87a793abe11b9086', '6501888d87a793abe11b908b', ]

const filteredPlanType = planTypes.filter(item => {

    return allPlans.includes(item._id)
  
});
  const planTypesOptions = filteredPlanType?.map((type) => ({
    value: type._id,
    label: type.name,
  }));

  const handleSearch = () => {
    const filteredprojects = projects.filter((workproject) => {
      const matchName =
        workproject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        searchTerm.toLowerCase().includes(workproject.name.toLowerCase());
      return matchName;
    });

    setSearchedprojects(filteredprojects);
    setCurPage(1);
  };

  useEffect(() => {
    handleSearch();
    handleFetchTypes();
    setShowAll(searchTerm === "");
  }, [updateTable, searchTerm]);

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
      (showAll ? projects.length : searchedprojects.length) / selectItemNum
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
  const handleCheckboxChange = async (event, project) => {
    const { checked } = event.target;

    try {
      const selectedPlanTypeId = selectedPlanType?.value;
      const activePriorityProjects = projects.filter((space) => space.plans_priority.some(p =>{
        if(p.plans_type && p.plans_type === selectedPlanTypeId) {
          return p.is_active === true
        }
      }));
      const updatedProject = {
        is_active: checked,
        order: checked ? activePriorityProjects.length + 1 : 1000,
        plans_type: selectedPlanTypeId,
      };

      await axios.put(
        `${BASE_URL}/api/project/plans-order/${project._id}`,
        updatedProject
      );
      //  projects.map((p) => {
      //   if (p._id === project._id) {
      //     p.plans_priority.forEach(priority => {
      //     priority.is_active = checked;
      //     priority.order = updatedProject.order;
      //     priority.plans_type = selectedPlanTypeId;
      //     });
      //   }
      //   return p;
      // });
      project.plans_priority.forEach(priority => {
       return  priority.is_active = checked;
      //  priority.order = updatedProject.order;
      //  priority.plans_type = selectedPlanTypeId;
        });
      console.log(projects)
      setprojects([...projects]);
      handleFetchTopProjects(selectedPlanTypeId);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  const onDragEnd = async (result) => {
    const { destination, source } = result;

    if (!destination) return;
    if (destination.index === source.index) return;

    const reorderedprojects = Array.from(priorityprojects);
    const [movedproject] = reorderedprojects.splice(source.index, 1);
    reorderedprojects.splice(destination.index, 0, movedproject);

    const updatedOrderPayload = reorderedprojects.map((project, index) => ({
      _id: project._id,
      plans_priority: {
        order: index + 1,
        plans_type: selectedPlanType?.value
      },
    }));

    setPriorityprojects(reorderedprojects);
    try {
      const response = await axios.put(
        `${BASE_URL}/api/project/plans-priority`,
        updatedOrderPayload
      );
    } catch (error) {
      console.error("Error updating priority order:", error);
    }
  };
  return (
    <div className="mx-5 mt-3">
      <Mainpanelnav />
      <div className="table-box table_top_header">
        <div className="table-top-box">Projects Priority by Builder Module</div>
        <div className="row my-5">
          <div className="col-md-3">
            <Select
              placeholder="PlanTypes*"
              value={selectedPlanType}
              options={planTypesOptions}
              onChange={(selectedOption) =>
                onChangeOptionHandler(selectedOption, "PlanType")
              }
              isSearchable
              required
            />
          </div>
        </div>
      </div>
      <div className="table_container">
        <div className="table-box top_table_box1">
          <div className="table-top-box">Projects Module</div>
          <TableContainer style={{ overflowX: "hidden" }}>
            <div className="row search_input">
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
                  <label htmlFor="floatingInput">Search by name</label>
                </div>
              </div>
            </div>
            <div className="data_table">
              <div className="row">
                <div className="col-md-12">
                  <Table variant="simple" className="table_border">
                    <Thead>
                      <Tr className="table_heading_row">
                        <Th>Select</Th>
                        <Th>Name</Th>
                        <Th>MicroLocation</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {loading ? (
                        <Tr>
                          <Td colSpan={8} textAlign="center">
                            <Spinner size="lg" />
                          </Td>
                        </Tr>
                      ) : (showAll ? projects : searchedprojects)?.slice(
                            (curPage - 1) * selectItemNum,
                            curPage * selectItemNum
                          )

                          .map((project) => (
                            <Tr key={project._id}>
                              <Td>
                                <input
                                  type="checkbox"
                                  checked={project.plans_priority.some((prev) =>{ if(prev.plans_type && prev.plans_type === selectedPlanType?.value){
                                    return prev.is_active
                                  }} )}
                    onChange={(event) =>
                                    handleCheckboxChange(event, project)
                                  }
                                />
                              </Td>
                              <Td>
                                {project?.name.length > 20
                                  ? project?.name.slice(0, 15) + "..."
                                  : project?.name}
                              </Td>
                              <Td>
                                {project.location?.micro_location
                                  ? project.location?.micro_location[0]?.name
                                  : ""}
                              </Td>
                            </Tr>
                          ))
                      
                      }
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
              style={{ width: "70%" }}
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
                  <option value="20">20</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                </select>
              </div>
              <div style={{ width: "110px" }}>
                {firstIndex + 1} -{" "}
                {showAll
                  ? projects.slice(
                      (curPage - 1) * selectItemNum,
                      curPage * selectItemNum
                    ).length + firstIndex
                  : searchedprojects?.slice(
                      (curPage - 1) * selectItemNum,
                      curPage * selectItemNum
                    ).length + firstIndex}{" "}
                of {showAll ? projects?.length : searchedprojects.length}
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
        <div className="table-box top_table_box2">
          <div className="table-top-box">Priority Projects Module</div>
          <TableContainer style={{ overflowX: "hidden" }}>
            <div className="data_table">
              <div className="row">
                <div className="col-md-12">
                  <Table variant="simple" className="table_border">
                    <Thead>
                      <Tr>
                        <Th>Order</Th>
                        <Th>Name</Th>
                      </Tr>
                    </Thead>

                    <DragDropContext onDragEnd={onDragEnd}>
                      <Droppable droppableId="projectss">
                        {(provided) => (
                          <Tbody
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                          >
                            {loadingTable ? (
                              <Tr>
                                <Td colSpan={3} textAlign="center">
                                  <Spinner size="lg" />
                                </Td>
                              </Tr>
                            ) : (
                              priorityprojects.map((project, index) => (
                                <Draggable
                                  key={project._id}
                                  draggableId={project._id}
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
                                        {project?.name}
                                      </Td>
                                    </Tr>
                                  )}
                                </Draggable>
                              ))
                            )}
                            {provided.placeholder}
                          </Tbody>
                        )}
                      </Droppable>
                    </DragDropContext>
                  </Table>
                </div>
              </div>
            </div>
          </TableContainer>
        </div>
      </div>
    </div>
  );
}

export default BuilderPriority;
