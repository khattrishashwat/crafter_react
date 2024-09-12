import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  useCallback,
} from "react";
import axios from "axios";
import "devextreme/dist/css/dx.light.css";
import Scheduler, { Resource, View } from "devextreme-react/scheduler";
import Toolbar from "devextreme-react/toolbar";
import Draggable from "devextreme-react/draggable";
import "./Planing.css";
import CustomTimeGutterHeader from "./CustomTimeGutterHeader";
import { data, priorityData } from "./datas.js";
import { useTranslation } from "react-i18next";
// import { LanguageContext } from "../../LanguageContext";
import { IoIosPersonAdd } from "react-icons/io";
import { RiTeamFill } from "react-icons/ri";
import moment from "moment/moment.js";
import Swal from "sweetalert2";
import { BackgroundColor } from "devextreme-react/cjs/chart.js";

const TasksScheduler = () => {
  const draggingGroupName = "appointmentsGroup";
  const [selectedCells, setSelectedCells] = useState([]);
  const [pointerDown, setPointerDown] = useState(false);
  const [currentView, setCurrentView] = useState("day");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [activeData, setActiveData] = useState("");
  const [clientOrder, setClientOrder] = useState([]);
  const [inventory, setInventory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [memberteam, setMemberteam] = useState([]);
  const [memberidclick, setMemberidclick] = useState();
  const [isNewTeamVisible, setIsNewTeamVisible] = useState(false);
  const [isExistingTeamVisible, setIsExistingTeamVisible] = useState(false);
  const [teamMembers, setTeamMembers] = useState([]);
  const [newTeamName, setNewTeamName] = useState("");
  const [teamdropmatch, setteamdropmatch] = useState([]);
  const [newTeamMembers, setNewTeamMembers] = useState(Array(5).fill(""));
  const [CalenderData, setCalenderData] = useState([]);
  const [groups, setGroups] = useState(["priorityId", "priorityIds"]);
  const [viewType, setViewType] = useState("week");

  const handleViewChange = (type) => {
    console.log("type---", type);
    setViewType(type);
  };
  const handleRemoveField = (id) => {
    setDropdownFields(dropdownFields.filter((field) => field.id !== id));
  };

  const { t } = useTranslation();
  // const { selectedLanguage } = useContext(LanguageContext);

  const [groupmemeber, setGruopMemeber] = useState([]);

  const currentDate = new Date();

  const [memberiddata, setMemberid] = useState([]);
  const [useDataDropdown, seuserDataDropdown] = useState([]);

  const [dropdownFields, setDropdownFields] = useState([{ id: "", value: "" }]);

  const handleAddField = () => {
    const newField = { id: dropdownFields.length + 1, value: "" };
    setDropdownFields((prevFields) => {
      if (prevFields.some((field) => field.value === newField.value)) {
        console.log("Duplicate value not allowed");
        return prevFields;
      }
      return [...prevFields, newField];
    });
  };

  const handleDropdownChange = (id, event) => {
    const newValue = event.target.value;
    setDropdownFields((prevFields) => {
      if (
        prevFields.some((field) => field.id !== id && field.value === newValue)
      ) {
        Swal.fire({
          icon: "error",
          title: t("Member already in this team"),
          showConfirmButton: false,
          timer: 2000,
        });
        return prevFields;
      }
      const newDropdownFields = prevFields.map((field) => {
        if (field.id === id) {
          return { ...field, value: newValue };
        }
        return field;
      });
      return newDropdownFields;
    });
  };

  const showClientStockData = () => {
    setActiveData("clientStock");
  };

  const showPlannedStockData = () => {
    setActiveData("plannedStock");
  };

  const uselistData = useCallback(async () => {
    const resp = await axios.get(`/workmen/user-list/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    seuserDataDropdown(resp.data.data.external_employee);
  }, [useDataDropdown]);

  const token = localStorage.getItem("WorkMen-Token");

  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };

  const Memberidfun = (getid) => {
    setMemberidclick(getid);

    setIsTeamModalOpen(false);
    console.log("setMember----", getid);
  };

  const teammemberData = useCallback(async () => {
    // const resp = await axios.get(`/crafter/placeorder/?lang=en`, {

    const resps = await axios.get(`/workmen/team/?team_id=`, {
      headers: headers,
    });
    // console.log("calender data 2----->", resp.data.data);

    setTeamMembers(resps.data.data);

    const allTeams = resps.data.data;

    const lastTeam = allTeams[allTeams.length - 1];
    const defaultTeamId = lastTeam ? lastTeam.id : 2;
    const teamIdToFetch =
      memberidclick !== undefined ? memberidclick : defaultTeamId;

    // const memeberidcondition = memberidclick === undefined ? 2 : memberidclick;

    // console.log("memeberidcondition------", memeberidcondition);

    const resp = await axios.get(`/workmen/team/?team_id=${teamIdToFetch}`, {
      headers: headers,
    });
    console.log("calender data member----->", resp.data.data);
    console.log("calender data----->", resp.data.data[0].member);
    setteamdropmatch(resp.data.data[0].member);

    const transformedData = resp.data.data.flatMap((team) =>
      team.member.flatMap((member) =>
        member.work_orders
          .filter((order) => order.start_date && order.end_date)
          .map((order) => ({
            text: `${team.team_name}`,
            // startDate: new Date("2024-04-26T19:00:00Z"),
            // endDate: new Date("2024-04-26T20:00:00Z"),
            startDate: new Date(order.start_date),
            endDate: new Date(order.end_date),
            description: order.project_name,
            priorityId: team.id,
            priorityIds: [member.id],
            projectId: order.id,
          }))
      )
    );

    console.log("ttt----", transformedData);
    setCalenderData(transformedData);
    setGruopMemeber(resp.data.data);
  }, [groupmemeber, CalenderData, teamMembers, teamdropmatch, memberidclick]);

  const teamDatapost = async (startdata, enddate, externalid, mainid) => {
    try {
      const Dataform = new FormData();
      Dataform.append("start_date", startdata);
      Dataform.append("end_date", enddate);
      Dataform.append("external_employee", externalid);
      Dataform.append("id", mainid);

      const resp = await axios.patch("/workmen/create-agenda/", Dataform, {
        headers: headers,
      });

      console.log("data", resp);
    } catch (e) {
      console.log("error", e);
    }
  };

  const workeload = useCallback(async () => {
    const token = localStorage.getItem("WorkMen-Token");
    try {
      // const response = await axios.get(`crafter/workload/?lang=en&page=1`, {
      const response = await axios.get(`/workmen/work-load/?type=${1}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("cons----->", response.data.data);

      setClientOrder(response.data.data);

      const responseinventry = await axios.get(`/workmen/work-load/?type=`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setInventory(responseinventry.data.data);

      console.log("cons inventry----->", responseinventry.data.data);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  }, [clientOrder, inventory]);

  useEffect(() => {
    uselistData();
    teammemberData();
  }, [memberidclick]);

  useEffect(() => {
    workeload();
  }, []);

  const showHideDiv = (elementId) => {
    if (elementId === "newTeam") {
      setIsNewTeamVisible(!isNewTeamVisible);
    } else if (elementId === "existingTeam") {
      setIsExistingTeamVisible(!isExistingTeamVisible);
    }
  };

  const handleTeamNameChange = (e) => {
    setNewTeamName(e.target.value);
  };

  const saveNewTeam = async () => {
    const valuedata = dropdownFields.map((item) => {
      return item.value;
      // setMemberid(value.id);
    });
    if (Array.isArray(valuedata)) {
      // Check if any element in the array is an empty string
      if (valuedata.some((value) => value === "")) {
        console.log("looooooo11111111", valuedata);
        Swal.fire({
          icon: "error",
          title: t("Please fill data into field"),
          showConfirmButton: false,
          timer: 2000,
        });
      } else {
        try {
          const response = await axios.post(
            //  `/crafter/team/?lang=${selectedLanguage}`,
            // `/crafter/team/?lang=en`,
            `/workmen/team/`,

            {
              team_name: newTeamName,
              member: valuedata,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log("Team saved successfully:", response.data);
          Swal.fire({
            icon: "success",
            title: t("Team saved successfully"),
            showConfirmButton: false,
            timer: 2000,
          });
          // Optionally, close the modal or show a success message here
          closeTeamModal();
        } catch (error) {
          console.error("Error saving team:", error);
        }
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const clearSelection = () => {
    selectedCells.forEach((element) => element.classList.remove("selection"));
    setSelectedCells([]);
  };

  const closeTeamModal = () => {
    console.log("hhhhhhhhhhh");
    setIsExistingTeamVisible(false);
    setIsNewTeamVisible(false);
    setIsTeamModalOpen(false);
    setNewTeamName("");

    setDropdownFields([]);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openTeamModal = () => {
    setIsTeamModalOpen(true);
  };

  const handleDragStart = (e) => {
    console.log("Drag Start:", e);
    teamDatapost(
      moment(e.itemData.startDate).toISOString(),
      moment(e.itemData.endDate).toISOString(),
      e.itemData.priorityIds,
      e.itemData.projectId
    );
  };

  const handleDragEnd = (e) => {
    console.log("Drag End:", e.itemData);
  };

  const transformPriorityData = (data) => {
    return data.map((team) => ({
      text: team.team_name,
      id: team.id,
      color: team.id === 1 ? "#1e90ff" : "#ff9747",
    }));
  };

  const transformPriorityDatasecond = (data) => {
    return data.flatMap((team) =>
      team.member.map((member) => ({
        text: `${member.name}`,
        id: member.id,
        color: member.id,
      }))
    );
  };

  const transformedData = transformPriorityData(groupmemeber);
  const transformedDataSecond = transformPriorityDatasecond(groupmemeber);

  const viewsdata = [
    {
      type: "month",
      name: "Auto Mode",
      maxAppointmentsPerCell: "auto",
    },
    {
      type: "month",
      name: "Unlimited Mode",
      maxAppointmentsPerCell: "unlimited",
    },
    {
      type: "month",
      name: "Numeric Mode",
      maxAppointmentsPerCell: 2,
    },
  ];

  return (
    <>
      <div style={{ paddingLeft: "787px" }}>
        <Toolbar
          items={[
            {
              widget: "dxButton",
              color: "red",
              options: {
                text: "Day",
                onClick: () => handleViewChange("day"),
              },
            },
            {
              widget: "dxButton",
              options: {
                text: "Week",
                onClick: () => handleViewChange("week"),
              },
            },
            {
              widget: "dxButton",
              options: {
                text: "Month",
                onClick: () => handleViewChange("month"),
              },
            },
            {
              widget: "dxButton",
              options: {
                text: "Team",
                onClick: () => openTeamModal("team"),
              },
            },
            {
              widget: "dxButton",
              options: {
                text: "Work Order",
                onClick: () => openModal("workload"),
              },
            },
          ]}
        />
      </div>
      <div
        className={`customization_popup ${isModalOpen ? "is-visible" : ""}`}
        role="alert"
      >
        <div className="customization_popup_container">
          <button
            className="customization_popup_close img-replace"
            onClick={closeModal}
          >
            X
          </button>
          <div className="mt-5 pop-box-contain">
            <h3>Work Order</h3>
            <div className="workedload_item">
              <div className="workload_button_first">
                <button
                  onClick={showClientStockData}
                  className={
                    activeData === "plannedStock"
                      ? "workload_button active"
                      : "workload_button"
                  }
                >
                  Client Stock
                </button>
              </div>
              <div className="workload_button_second">
                <button
                  onClick={showPlannedStockData}
                  className={
                    activeData === "plannedStock"
                      ? "workload_button"
                      : "workload_button active"
                  }
                >
                  To Be Planned Stock
                </button>
              </div>
            </div>
            <div>
              {activeData === "clientStock" ? (
                <div className="dx-viewport demo-container">
                  <div id="scroll">
                    <div id="list">
                      <div id="list">
                        <div className="mt-5 pop-box-contain1">
                          <div
                            style={{
                              justifyContent: "space-between",
                              display: "flex",
                            }}
                          ></div>
                          {
                            clientOrder.length <= 0 ? (
                              <h5>Data Not Avaliable</h5>
                            ) : (
                              <div style={{ display: "block" }}>
                                <div className="plne">
                                  <h6>Client </h6>
                                  <h6>Project name</h6>
                                </div>

                                {clientOrder.map((item, index) => (
                                  // <Draggable
                                  //   group={draggingGroupName}
                                  //   key={index}
                                  //   data={item}
                                  //   clone={true}
                                  //   onDragEnd={(e) => {
                                  //     if (e.toData) {
                                  //       e.cancel = true;
                                  //     }
                                  //     // console.log("drag-----", e)
                                  //   }}
                                  //   onDragStart={(e) => {
                                  //     e.itemData = e.fromData;
                                  //   }}
                                  // >
                                  //   <div className="item dx-card dx-theme-background-color dx-theme-text-color">
                                  //     <div className="pop-body-text d-flex justify-content-between">
                                  //       <p>{item.client}</p>
                                  //       <p>{item.project_name}</p>
                                  //     </div>
                                  //   </div>
                                  // </Draggable>

                                  <div className="item dx-card dx-theme-background-color dx-theme-text-color">
                                    <div className="pop-body-text d-flex justify-content-between">
                                      <p>{item.client}</p>
                                      <p>{item.project_name}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )
                            // <h2>Data here</h2>
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                  <div id="scheduler"></div>
                </div>
              ) : (
                <div className="dx-viewport demo-container">
                  <div id="scroll">
                    <div id="list">
                      <div className="mt-5 pop-box-contain">
                        {inventory.length <= 0 ? (
                          <h5>Data Not Avaliable in Stock</h5>
                        ) : (
                          <div style={{ display: "block" }}>
                            <div className="plne">
                              <h6>Client </h6>
                              <h6>Project name</h6>
                            </div>
                            {inventory.map((item, index) => (
                              <Draggable
                                group={draggingGroupName}
                                key={index}
                                data={item}
                                clone={true}
                                onDragEnd={(e) => {
                                  if (e.toData) {
                                    e.cancel = true;
                                  }
                                  // console.log("drag-----", e)
                                }}
                                onDragStart={(e) => {
                                  e.itemData = e.fromData;
                                  // console.log("drag-----", e)
                                }}
                              >
                                <div className="item dx-card dx-theme-background-color dx-theme-text-color">
                                  <div className="pop-body-text d-flex justify-content-between">
                                    <p>{item.client}</p>
                                    <p>{item.project_name}</p>
                                  </div>
                                </div>
                              </Draggable>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div id="scheduler"></div>
                </div>
                // </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div
        className={`modal fade ${isTeamModalOpen ? "show" : ""}`}
        id="add-price"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="add-price"
        aria-modal="true"
        style={{ display: isTeamModalOpen ? "block" : "none" }}
        role="dialog"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="add-price">
                Team
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={closeTeamModal}
              />
            </div>
            <div className="modal-body">
              <div>
                <button
                  className="btn btn-primary"
                  onClick={() => showHideDiv("newTeam")}
                >
                  <IoIosPersonAdd />
                  Add New Team
                </button>
                <div
                  id="newTeam"
                  style={{ display: isNewTeamVisible ? "block" : "none" }}
                >
                  <div className="te">
                    <i className="fa fa-user" aria-hidden="true"></i>
                    <input
                      value={newTeamName}
                      onChange={handleTeamNameChange}
                      placeholder="Enter Team Name"
                    />
                  </div>
                  {dropdownFields.map((field) => (
                    <>
                      <div key={field.id} className="flex-btn">
                        <select
                          value={field.value}
                          onChange={(event) =>
                            handleDropdownChange(field.id, event)
                          }
                          style={{ marginBottom: "10px" }}
                        >
                          <option value="">Select an option</option>
                          {useDataDropdown.map((option, index) => (
                            <option key={index} value={option.id}>
                              {option.user}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="clas">
                        <a onClick={() => handleRemoveField(field.id)}>
                          <i className="fa fa-trash" aria-hidden="true"></i>
                        </a>
                      </div>
                    </>
                  ))}
                  <button className="plus" onClick={handleAddField}>
                    +
                  </button>
                  <div className="sav">
                    <button onClick={saveNewTeam}>Save</button>
                  </div>
                </div>
              </div>
              <div className="mt-5">
                <button
                  className="btn btn-primary"
                  onClick={() => showHideDiv("existingTeam")}
                >
                  <RiTeamFill /> Existing Team
                </button>
                <div
                  id="existingTeam"
                  style={{
                    display: isExistingTeamVisible ? "block" : "none",
                  }}
                >
                  {teamMembers.length > 0 ? (
                    teamMembers.map((member) => (
                      <div
                        key={member.id}
                        className="member"
                        onClick={() => Memberidfun(member.id)}
                        style={{ cursor: "pointer" }}
                      >
                        <i className="fa fa-user" aria-hidden="true"></i>{" "}
                        {member.team_name}
                      </div>
                    ))
                  ) : (
                    <div>No team members found.</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Scheduler
        timeZone="America/Los_Angeles"
        // dataSource={data}
        dataSource={CalenderData}
        groups={groups}
        defaultCurrentView="Vertical Grouping"
        defaultCurrentDate={currentDate}
        startDayHour={6}
        endDayHour={24}
        crossScrollingEnabled={false}
        showAllDayPanel={false}
        allowMultiple={true}
        appointmentDragging={{
          group: draggingGroupName,
          onRemove: (e) => {
            e.component.deleteAppointment(e.itemData);
            setSelectedCells([...selectedCells, e.itemData]);
          },

          onDragStart: handleDragStart,
          onDragEnd: handleDragEnd,
          onAdd: (e) => {
            const selection = e.component.option("selectedCellData");
            e.component.addAppointment(e.itemData);
            e.itemElement.remove();
            clearSelection();
            console.log("eeeeeee", e);
            // teamDatapost(e.itemData.startDate,e.itemData.endDate)
            teamDatapost(
              moment(e.itemData.startDate).toISOString(),
              moment(e.itemData.endDate).toISOString(),
              e.itemData.priorityIds,
              e.itemData.id
            );
          },
        }}
        onContextMenu={() => clearSelection()}
        onPointerDown={() => {
          setPointerDown(true);
          clearSelection();
        }}
        onPointerMove={(e) => {
          if (pointerDown) {
            setSelectedCells([...selectedCells, e.target]);
            e.target.classList.add("selection");
          }
        }}
        // onPointerUp={() => setPointerDown(false)}
        onPointerUP={() => {
          console.log("onPointerUp");
          setPointerDown(false);
        }}
        onAppointmentClick={(e) => (e.cancel = true)}
        onAppointmentDblClick={(e) => (e.cancel = true)}
      >
        <View
          name="Vertical Grouping"
          type={viewType}
          groupOrientation="vertical"
          workWeek={false}
        />
        <View name="Horizontal Grouping" type={viewType} workWeek={false} />

        <Resource
          fieldExpr="priorityId"
          allowMultiple={true}
          dataSource={transformedData}
          label="priorityId"
          style={{ marginTop: "20px" }}
        />
        <Resource
          fieldExpr="priorityIds"
          allowMultiple={true}
          dataSource={transformedDataSecond}
          label="priorityIds"
        />
      </Scheduler>
    </>
  );
};

export default TasksScheduler;
