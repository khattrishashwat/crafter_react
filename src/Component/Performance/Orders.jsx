import React, { useEffect, useState, useContext, useCallback } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import Loader from "../Loader/Loader";
import { useTranslation } from "react-i18next";
import { LanguageContext } from "../../LanguageContext";
import axios from "axios";

function Orders() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [searchClient, setSearchClient] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedProjectType, setSelectedProjectType] = useState("");
  const [apiData, setApiData] = useState([]);
  const [actives, setActives] = useState("MakeNote");
  const [activeTab, setActiveTab] = useState("WorkOrder");
  const [activestabs, setActiveStabs] = useState("Everything");
  const [loading, setLoading] = useState(false);

  const [doc, setDoc] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [photo, setPhoto] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [homeOrder, setHomeOrder] = useState("");
  const [currentStatus, setCurrentStatus] = useState(null);
  const [taskDescription, setTaskDescription] = useState("");
  const [checklists, setChecklists] = useState([]);
  const [articleNames, setArticleNames] = useState([]);
  const [status, setStatus] = useState("");
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState([]);
  const [apiId, setApiId] = useState();
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showCompletionForm, setShowCompletionForm] = useState(false);
  const [showArticleForm, setShowArticleForm] = useState(false);
  const [showTimeForm, setShowTimeForm] = useState(false);
  const [workId, setWorkId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 15;

  const [invoice, setInvoice] = useState(null);
  const { t } = useTranslation();
  const { selectedLanguage } = useContext(LanguageContext);
  const [formOpen, setFormOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [actions, setActions] = useState([]);
  const [employee, setEmployee] = useState([]);
  const [responsibleNotes, setResponsibleNotes] = useState([]);
  const [actionDate, setActionDate] = useState([]);
  const [mails, setMails] = useState([]);
  const [mail, setMail] = useState([]);

  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
    setFormOpen(!formOpen);
  };
  const openModal = async (id, status) => {
    if (id !== null && id !== undefined) {
      setWorkId(id);
    }
    setCurrentStatus(status);
    // setApiId(id.id);

    setModalOpen(true);
  };
  console.log("idss", workId);

  const handleTabClick = (tabName, event) => {
    setActiveStabs(tabName);
  };

  const handle = (tabName) => {
    setActives(tabName);
  };
  const closeModal = () => {
    setModalOpen(false);
    setShowTaskForm(false);
    setFormData(false);
    setShowArticleForm(false);
    setFoData([
      {
        id: "",
        name: "",
        article_number: "",
        quantity: "",
        selling_price: "",
        vat_percentage: "",
      },
    ]);
    setNotes("");
    // window.location.reload();
  };
  const openPage = (pageName, event) => {
    setActiveTab(pageName);
  };

  useEffect(() => {
    document.getElementById("defaultOpen").click();
  }, []);

  {
    /*----ORDER APIS */
  }
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("WorkMen-Token");
      if (!token) {
        console.error("Error: No token found");
        return;
      }

      try {
        setIsLoading(true);
        let response;

        if (
          searchClient ||
          startDate ||
          endDate ||
          selectedEmployee ||
          selectedStatus ||
          selectedProjectType
        ) {
          response = await axios.get(
            `workmen/work-order/?client=${searchClient}&start_date=${startDate}&end_date=${endDate}&craftsman=${selectedEmployee}&status=${selectedStatus}&project_number=${selectedProjectType}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        } else {
          response = await axios.get(`workmen/work-order/`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        }

        setData(response.data.data || []);
        // Assuming homeOrder is part of the response data
        setHomeOrder(response.data.homeOrder || {});
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [
    searchClient,
    startDate,
    endDate,
    selectedStatus,
    selectedEmployee,
    selectedProjectType,
  ]);

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(data.length / postsPerPage);

  const handleDelete = async (id) => {
    try {
      console.log("Deleting item with ID:", id);

      const token = localStorage.getItem("WorkMen-Token");
      await axios.delete(`workmen/work-order/?id=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const newData = data.filter((item) => item.id !== id);
      console.log(newData);
      setData(newData);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleDeleteClick = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this project?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(id, data, setData);
      }
    });
  };

  {
    /*-----PoP UP APIS */
  }

  const fetchPopData = useCallback(async () => {
    setLoading(true); // Set loading to true when fetching starts
    const token = localStorage.getItem("WorkMen-Token");
    try {
      const response = await axios.get(`workmen/pop/?id=${workId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response) {
        console.log("workorder11", response.data);
        setHomeOrder(response.data);
      }
    } catch (error) {
      if (error.response) {
        console.error("Error fetching data:", error.response.data.message);
      } else if (error.request) {
        console.error(
          "Error fetching data, no response received:",
          error.request
        );
      } else {
        console.error("Error setting up the request:", error.message);
      }
    } finally {
      setLoading(false); // Set loading to false regardless of success or failure
    }
  }, [workId]);

  useEffect(() => {
    if (!workId) return;
    fetchPopData();
  }, [workId]);

  {
    /*---------------------------*/
  }
  const getDocumentPath = (path) => {
    const parts = path.split("/").slice(0, 25); // Use slice to get the first 25 parts
    return `/${parts.slice(-1).join("/")}`; // Get the last part and join it with a "/"
  };
  {
    /*---Workorder CheckList- */
  }
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    checklist: "",
  });
  const handleToggleForm = () => {
    if (showTaskForm) {
      // Reset form data and other related states when closing the form
      setFormData([]); // Reset form data to an empty array or initial state
      setShowTaskForm(false); // Reset the task form state if applicable
    }
    setShowTaskForm(!showTaskForm);
  };
  const Clean = (e) => {
    setShowTaskForm(false);
    setFormData(false);
  };
  useEffect(() => {
    const fetchChecklists = async () => {
      const token = localStorage.getItem("WorkMen-Token");
      try {
        const response = await axios.get(`workmen/checklist/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("check", response.data.data);
        setChecklists(response.data.data);
      } catch (error) {
        console.error("Error fetching checklists", error);
      }
    };

    fetchChecklists();
  }, []);

  useEffect(() => {
    if (workId) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        work_order: workId,
      }));
    }
  }, [workId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handeldes = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const token = localStorage.getItem("WorkMen-Token");
      const response = await axios.post(`/employee/task/`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Form submitted successfully:", response.data);
      await fetchPopData();
      setShowTaskForm(false);
      setFormData({
        title: "",
        description: "",
        checklist: "",
      }); // Reset the form data
    } catch (error) {
      console.error("Error submitting form:", error);
      // Optionally: set an error message to display to the user
    } finally {
      setIsLoading(false); // Set loading to false after form submission
    }
  };
  {
    /*--------------------*/
  }
  const [foData, setFoData] = useState([
    {
      id: "",
      name: "",
      article_number: "",
      quantity: "",
      selling_price: "",
      vat_percentage: "",
    },
  ]);
  const handleArticletoggle = () => {
    if (showArticleForm) {
      setShowArticleForm(false);
      setFoData([
        {
          id: "",
          name: "",
          article_number: "",
          quantity: "",
          selling_price: "",
          vat_percentage: "",
        },
      ]);
    }
    setShowArticleForm(!showArticleForm);
  };
  const ArticleClean = (e) => {
    setShowArticleForm(false);
    setFoData([
      {
        id: "",
        name: "",
        article_number: "",
        quantity: "",
        selling_price: "",
        vat_percentage: "",
      },
    ]);
  };

  useEffect(() => {
    const fetchMatData = async () => {
      try {
        const token = localStorage.getItem("WorkMen-Token");
        const response = await axios.get(`workmen/material-list/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setArticleNames(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchMatData();
  }, []);

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const newFoData = [...foData];
    newFoData[index][name] = value;

    if (name === "id") {
      const selectedArticle = articleNames.find(
        (article) => article.id.toString() === value
      );

      if (selectedArticle) {
        newFoData[index] = {
          ...newFoData[index],
          name: selectedArticle.name,
          article_number: selectedArticle.article_number,
          selling_price: selectedArticle.selling_price,
          vat_percentage: selectedArticle.vat_percentage,
        };
      }
    }

    setFoData(newFoData);
  };

  const handleArticleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading to true when submitting form
    try {
      const token = localStorage.getItem("WorkMen-Token");
      const currentDate = new Date();
      const formattedDate = `${currentDate.getFullYear()}-${(
        "0" +
        (currentDate.getMonth() + 1)
      ).slice(-2)}-${("0" + currentDate.getDate()).slice(-2)}`;

      for (const form of foData) {
        const response = await axios.post(
          `employee/material/`,
          {
            quantity: form.quantity,
            date: formattedDate,
            work_order: workId,
            material_name: form.id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Form submitted successfully:", response.data);
      }
      await fetchPopData();
      setShowArticleForm(false);
      setFoData([]);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsLoading(false); // Set loading to false after form submission
    }
  };

  const addForm = () => {
    setFoData([
      ...foData,
      {
        id: "",
        name: "",
        article_number: "",
        quantity: "",
        selling_price: "",
        vat_percentage: "11",
      },
    ]);
  };

  const removeForm = (index) => {
    setFoData(foData.filter((_, i) => i !== index));
  };

  const totalVAT = (selling_price, vat_percentage) =>
    ((selling_price * vat_percentage) / 100).toFixed(2);
  {
    /*--------------*/
  }

  const DocDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You are about to delete this document. This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        console.log("Deleting item with Doc ID:", id);
        const token = localStorage.getItem("WorkMen-Token");
        setLoading(true); // Start loader
        await axios.request({
          url: `employee/document/`,
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: { id: id },
        });
        await fetchPopData();
      } catch (error) {
        console.error("Error deleting item:", error);
      } finally {
        setLoading(false); // Stop loader
      }
    }
  };

  const PicDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You are about to delete this Image. This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        console.log("Deleting item with Pic ID:", id);
        const token = localStorage.getItem("WorkMen-Token");
        setLoading(true); // Start loader
        await axios.request({
          url: `employee/photo/`,
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: { id: id },
        });
        await fetchPopData();
      } catch (error) {
        console.error("Error deleting item:", error);
      } finally {
        setLoading(false); // Stop loader
      }
    }
  };

  {
    /*------------*/
  }

  useEffect(() => {
    if (!workId) return;

    const fetchStatus = async () => {
      const token = localStorage.getItem("WorkMen-Token");
      try {
        const response = await axios.get(
          `workmen/order-status/?work_order=${workId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response) {
          console.log("Status", response.data.data);
          setStatus(response.data.data);
        }
      } catch (error) {
        if (error.response) {
          console.error("Error fetching data:", error.response.data.message);
        } else if (error.request) {
          console.error(
            "Error fetching data, no response received:",
            error.request
          );
        } else {
          console.error("Error setting up the request:", error.message);
        }
      }
    };

    fetchStatus();
  }, [workId]);
  {
    /*-----Notes Gets & Post-------*/
  }

  const handleNoteChange = (e) => {
    console.log("e----", e);
    setNotes(e.target.value);
  };

  const handleSave = async () => {
    if (!String(notes).trim()) {
      Swal.fire({
        icon: "warning",
        title: "Note is empty",
        text: "Please fill in the note before saving.",
      });
      return;
    }

    try {
      const token = localStorage.getItem("WorkMen-Token");
      if (!token) {
        throw new Error("No token found in localStorage.");
      }

      setIsLoading(true);

      const formData = new FormData();
      formData.append("notes", notes);
      formData.append("work_order", workId);

      const response = await axios.post("workmen/notes/", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (Array.isArray(response.data.data)) {
        setNote(response.data.data);
      } else {
        console.error("Response data is not an array");
      }

      await fetchNotes();
      setNotes("");
    } catch (error) {
      console.error("Error during the save request:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchNotes = async () => {
    setIsLoading(true);
    const token = localStorage.getItem("WorkMen-Token");
    try {
      const response = await axios.get(`/workmen/notes/?work_order=${workId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response) {
        console.log("Note", response.data.data);
        setNote(response.data.data);
      }
    } catch (error) {
      if (error.response) {
        console.error("Error fetching data:", error.response.data.message);
      } else if (error.request) {
        console.error(
          "Error fetching data, no response received:",
          error.request
        );
      } else {
        console.error("Error setting up the request:", error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!workId) return;
    fetchNotes();
  
  }, [workId]);
const actionTypeOptions = [
  { value: "1", label: "Ask" },
  { value: "2", label: "Order" },
  { value: "3", label: "To do" },
  { value: "4", label: "Send email" },
  { value: "5", label: "Schedule" },
  { value: "6", label: "Check" },
  { value: "7", label: "Meeting" },
];

  const ActionSave = async () => {
    if (!String(actions).trim()) {
      Swal.fire({
        icon: "warning",
        title: "Action is empty",
        text: "Please fill in the action before saving.",
      });
      return;
    }

    try {
      const token = localStorage.getItem("WorkMen-Token");
      if (!token) {
        throw new Error("No token found in localStorage.");
      }

      setIsLoading(true);

      const formData = new FormData();
      formData.append("description", actions);
      formData.append("work_order", workId);
      formData.append("date", actionDate);
      formData.append("action_type", employee);
      // formData.append("responsible", responsibleNotes);

      const response = await axios.post("workmen/work-action/", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (Array.isArray(response.data.data)) {
        setMails(response.data.data);
      } else {
        console.error("Response data is not an array");
      }
      await fetchActions();
      setMail("");

    } catch (error) {
      console.error("Error during the save request:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

    const fetchActions = async () => {
    setIsLoading(true);
    const token = localStorage.getItem("WorkMen-Token");
    try {
      const response = await axios.get(`/workmen/work-action/?work_order=${workId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response) {
        console.log("Note", response.data.data);
        setMails(response.data.data);
      }

    } catch (error) {
      if (error.response) {
        console.error("Error fetching data:", error.response.data.message);
      } else if (error.request) {
        console.error(
          "Error fetching data, no response received:",
          error.request
        );
      } else {
        console.error("Error setting up the request:", error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };
    useEffect(() => {
    if (!workId) return;
    fetchActions();
  }, [workId]);
  return (
    <div>
      <div className="big-container bg-1">
        <div className="small-container">
          <div className="same-as-head">
            <ul>
              <li>
                <Link to="/planning">{t("Planning")}</Link>
              </li>
              <li>
                <Link to="/projects">{t("Projects")}</Link>
              </li>
              <li>
                <Link to="/orders" className="actives">
                  {t("Work Orders")}
                </Link>
              </li>
              <li>
                <Link to="/action">{t("Action")}</Link>
              </li>
              <li>
                <Link to="/gps">GPS</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bg">
        <div className="work-flex">
          <div className="work">
            <h4>{t("Work Orders")} </h4>
          </div>
          <div className="fields">
            <div className="input-1">
              <input
                type="text"
                placeholder={t("Search Client")}
                value={searchClient}
                onChange={(e) => setSearchClient(e.target.value)}
              />
            </div>
            <div className="input-1">
              <input
                type="date"
                id="s_date"
                name="s_date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="input-1">
              <input
                type="date"
                id="e_date"
                name="e_date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <div className="input-1">
              <input
                type="text"
                placeholder={t("Search Employee")}
                value={selectedEmployee}
                onChange={(e) => setSelectedEmployee(e.target.value)}
              />
            </div>
            <div className="input-1">
              <select
                id="status"
                name="status"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="">All Statuses</option>
                <option>created</option>
                <option>planned</option>
                <option>in progress</option>
                <option>completed</option>
                <option>invoice</option>
              </select>
            </div>
            <div className="input-1">
              <input
                type="text"
                placeholder={t("Search Project No")}
                value={selectedProjectType}
                onChange={(e) => setSelectedProjectType(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <section className="intro mt-6">
          <div className="bg-image h-100">
            <div className="mask d-flex align-items-center h-100">
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-12">
                    <div className="card shadow-2-strong">
                      <div className="card-body">
                        <div className="table-responsive">
                          <table className="table table-borderless mb-0">
                            <thead className="my-thead-1">
                              <tr>
                                <th className="pd-right my-padding">
                                  {t("Project no")}
                                </th>
                                <th scope="col" className="pd-right my-padding">
                                  {t("Order no")}
                                </th>
                                <th scope="col" className="pd-right my-padding">
                                  {t("Project Name")}
                                </th>
                                <th scope="col" className="pd-right my-padding">
                                  {t("Client")}
                                </th>
                                <th scope="col" className="pd-right my-padding">
                                  {t("Work Location")}
                                </th>
                                <th scope="col" className="pd-right my-padding">
                                  {t("Description")}
                                </th>
                                <th scope="col" className="pd-right my-padding">
                                  {t("External Employee")}
                                </th>
                                <th scope="col" className="pd-right my-padding">
                                  {t("Start Date")}
                                </th>
                                <th scope="col" className="pd-right my-padding">
                                  {t("End Date")}
                                </th>
                                <th scope="col" className="pd-right my-padding">
                                  {t("Status")}
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {isLoading ? (
                                <tr>
                                  <td colSpan="10" className="text-center">
                                    <Loader />
                                  </td>
                                </tr>
                              ) : data.length === 0 ? (
                                <tr>
                                  <td colSpan="10" className="text-center">
                                    No data found
                                  </td>
                                </tr>
                              ) : (
                                currentPosts.map((item, index) => (
                                  <tr key={item.id}>
                                    <td className="pd-right">
                                      {item.project_number}
                                    </td>
                                    <td className="pd-right">
                                      {item.order_number}
                                    </td>
                                    <td className="pd-right">
                                      {item.project_name}
                                    </td>
                                    <td className="pd-right">{item.client}</td>
                                    <td className="pd-right">
                                      {item.work_location?.substring(0, 20) +
                                        "......"}
                                    </td>
                                    <td className="pd-right">
                                      {item.description?.substring(0, 30) +
                                        "......"}
                                    </td>
                                    <td className="pd-right">
                                      {item.craftsman}
                                    </td>
                                    <td className="pd-right">
                                      {item.start_date &&
                                      typeof item.start_date === "string"
                                        ? item.start_date.slice(0, 10)
                                        : ""}
                                    </td>
                                    <td className="pd-right">
                                      {item.end_date &&
                                      typeof item.end_date === "string"
                                        ? item.end_date.slice(0, 10)
                                        : ""}
                                    </td>
                                    <td className="pd-right">
                                      <a
                                        className={
                                          item.status.toLowerCase() ===
                                          "created"
                                            ? "progress"
                                            : item.status.toLowerCase() ===
                                              "invoice"
                                            ? "progresblue progress-1"
                                            : item.status.toLowerCase() ===
                                              "completed"
                                            ? "progresgreen progress-1"
                                            : item.status.toLowerCase() ===
                                              "planned"
                                            ? "progresorange progress-1"
                                            : item.status.toLowerCase() ===
                                              "in progress"
                                            ? "progressyellow progress-1"
                                            : item.status.toLowerCase() ===
                                              "incomplete"
                                            ? "progressred progress-1"
                                            : ""
                                        }
                                        onClick={() => {
                                          console.log(
                                            "Item status:",
                                            item.status
                                          );
                                          console.log("Item ID:", item.id);
                                          openModal(item.id, item.status);
                                        }}
                                      >
                                        {item.status.charAt(0).toUpperCase() +
                                          item.status.slice(1).toLowerCase()}
                                      </a>
                                    </td>
                                    <td>
                                      <Link to="" className="project">
                                        <i
                                          className="fa-solid fa-trash"
                                          onClick={() =>
                                            handleDeleteClick(item.id)
                                          }
                                        />
                                      </Link>
                                    </td>
                                  </tr>
                                ))
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <nav className="checkout-pagination">
          <ul className="pagination">
            {[...Array(totalPages).keys()].map((pageNumber) => (
              <li
                key={pageNumber + 1}
                className={`page-item ${
                  currentPage === pageNumber + 1 ? "active" : ""
                }`}
              >
                <a
                  className="page-link"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePagination(pageNumber + 1);
                  }}
                >
                  {pageNumber + 1}
                </a>
              </li>
            ))}
            {currentPage < totalPages && (
              <li className="page-item">
                <a
                  className="next page-link"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePagination(currentPage + 1);
                  }}
                >
                  »
                </a>
              </li>
            )}
          </ul>
        </nav>
      </div>

      <div
        className={`modal1 fade  ${isModalOpen ? "show" : ""}`}
        // className="modal fade show"
        id="add-pdf-template"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="add-pdf-template"
        aria-hidden="true"
        style={{ display: isModalOpen ? "block" : "none" }}
      >
        <div className="modal-dialog pdfmodal">
          <div className="modal-content">
            <div className="modal-header border-0 gap-3">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={closeModal}
              />
            </div>
            <div className="steps mb-4">
              {currentStatus === "created" && (
                <React.Fragment>
                  <div className="step">
                    <div className="step__title">Created</div>
                  </div>
                </React.Fragment>
              )}
              {currentStatus === "planned" && (
                <React.Fragment>
                  <div className="step">
                    <div className="step__title">Created</div>
                  </div>
                  <div className="step">
                    <div className="step__title">Planned</div>
                  </div>
                </React.Fragment>
              )}
              {currentStatus === "in progress" && (
                <React.Fragment>
                  <div className="step">
                    <div className="step__title">Created</div>
                  </div>
                  <div className="step">
                    <div className="step__title">Planned</div>
                  </div>
                  <div className="step">
                    <div className="step__title">In progress</div>
                  </div>
                </React.Fragment>
              )}
              {currentStatus === "completed" && (
                <React.Fragment>
                  <div className="step">
                    <div className="step__title">Created</div>
                  </div>
                  <div className="step">
                    <div className="step__title">Planned</div>
                  </div>
                  <div className="step">
                    <div className="step__title">In progress</div>
                  </div>
                  <div className="step">
                    <div className="step__title">Completed</div>
                  </div>
                </React.Fragment>
              )}
              {currentStatus === "incomplete" && (
                <React.Fragment>
                  <div className="step">
                    <div className="step__title">Created</div>
                  </div>
                  <div className="step">
                    <div className="step__title">Clanned</div>
                  </div>
                  <div className="step">
                    <div className="step__title">Incomplete</div>
                  </div>
                </React.Fragment>
              )}
              {currentStatus === "invoice" && (
                <React.Fragment>
                  <div className="step">
                    <div className="step__title">Created</div>
                  </div>
                  <div className="step">
                    <div className="step__title">Planned</div>
                  </div>
                  <div className="step">
                    <div className="step__title">In progress</div>
                  </div>
                  <div className="step">
                    <div className="step__title">Completed</div>
                  </div>
                  <div className="step">
                    <div className="step__title">Invoice</div>
                  </div>
                </React.Fragment>
              )}
            </div>
            <div className="big-containe bg-1">
              <div className="container">
                <div className="same-as-head d-flex justify-content-between align-items-center">
                  <ul className="maintabhead">
                    <li
                      className={`tablink ${
                        activeTab === "WorkOrder" ? "active" : ""
                      }`}
                      onClick={(e) => openPage("WorkOrder", e)}
                      id="defaultOpen"
                      style={{
                        borderBottom:
                          activeTab === "WorkOrder" ? "2px solid #f06522" : "",
                      }}
                    >
                      {t("Work order")}
                    </li>
                    <li
                      className={`tablink ${
                        activeTab === "Appointments" ? "active" : ""
                      }`}
                      onClick={(e) => openPage("Appointments", e)}
                      style={{
                        borderBottom:
                          activeTab === "Appointments"
                            ? "2px solid #f06522"
                            : "",
                      }}
                    >
                      {t("Appointments")}
                    </li>
                    <li
                      className={`tablink ${
                        activeTab === "Documents" ? "active" : ""
                      }`}
                      onClick={(e) => openPage("Documents", e)}
                      style={{
                        borderBottom:
                          activeTab === "Documents" ? "2px solid #f06522" : "",
                      }}
                    >
                      {t("Document")}
                    </li>
                    <li
                      className={`tablink ${
                        activeTab === "Photos" ? "active" : ""
                      }`}
                      onClick={(e) => openPage("Photos", e)}
                      style={{
                        borderBottom:
                          activeTab === "Photos" ? "2px solid #f06522" : "",
                      }}
                    >
                      {t("Photos")}
                    </li>
                    <li
                      className={`tablink ${
                        activeTab === "Checklists" ? "active" : ""
                      }`}
                      onClick={(e) => openPage("Checklists", e)}
                      style={{
                        borderBottom:
                          activeTab === "Checklists" ? "2px solid #f06522" : "",
                      }}
                    >
                      {t("Checklists")}
                    </li>
                  </ul>
                  <ul className="maintabhead">
                    {currentStatus === "Checked" && (
                      <>
                        <a className="add reds">Reopen</a>
                        <a className="add blues">Invoice</a>
                        <a className="add blues">Do not Invoice</a>
                      </>
                    )}
                    {currentStatus === "Completed" && (
                      <a className="add greens">Checked</a>
                    )}
                  </ul>
                </div>
              </div>
            </div>

            <div className="modal-body ">
              <div className="row">
                <div className="col-md-8">
                  <div
                    id="Home"
                    className="tabcontentt"
                    style={{
                      display: activeTab === "WorkOrder" ? "block" : "none",
                    }}
                  >
                    <div className="Institution-grid-2 bg">
                      <hr />
                      <div className="row">
                        <div className="col-md-8">
                          <div>
                            <img
                              src={`${process.env.PUBLIC_URL}/Image/logo.png`}
                              className="w-100"
                              alt="Company Logo"
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="text-right">
                            <p>Crafter B.V.</p>
                            <p>Keizergracht 127</p>
                            <p>1017 (C) Amsterdam</p>
                            <p>admin@crafter.com</p>
                            <p>0548512156</p>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="text-left">
                            <p>{homeOrder?.work_order?.name}</p>
                            <p>{homeOrder?.work_order?.email}</p>
                            <p>{homeOrder?.work_order?.contact_number}</p>
                            {/* <p>
                              {homeOrder?.work_order?.address},
                              {homeOrder?.work_order?.location}
                            </p>
                            <p>{homeOrder?.work_order?.zipcode}</p> */}
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="text-left">
                            <h3>
                              {t("Work Order")} W
                              {homeOrder?.work_order?.order_number}
                            </h3>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="text-left">
                            <h4>{t("Location data")}</h4>
                            <hr />
                            <div className="justify-content-between">
                              <p>
                                <strong>{t("Name")}</strong>
                              </p>
                              <p>{homeOrder?.work_order?.name}</p>
                            </div>
                            <div className="justify-content-between">
                              <p>
                                <strong>{t("Work Location")}</strong>
                              </p>
                              <p>{homeOrder?.work_order?.work_location}</p>
                            </div>
                            <div className="justify-content-between">
                              <p>
                                <strong>{t("Email")}</strong>
                              </p>
                              <p>{homeOrder?.work_order?.email}</p>
                            </div>
                            <div className="justify-content-between">
                              <p>
                                <strong>{t("Phone")}</strong>
                              </p>

                              <p>{homeOrder?.work_order?.contact_number}</p>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="text-left">
                            <h4>{t("Work Order details")}</h4>
                            <hr />
                            <div className="justify-content-between">
                              <p>
                                <strong>{t("Order number")}</strong>
                              </p>
                              <p> {homeOrder?.work_order?.order_number}</p>
                              <p className="text-right">
                                {/* <i className="fa fa-pencil" /> */}
                              </p>
                            </div>
                            <div className="justify-content-between">
                              <p>
                                <strong>{t("Refrence")}</strong>
                              </p>
                              <p> {homeOrder?.work_order?.reference}</p>
                              <p className="text-right">
                                {/* <i className="fa fa-pencil" /> */}
                              </p>
                            </div>
                            <div className="justify-content-between">
                              <p>
                                <strong>{t("Description")}</strong>
                              </p>
                              <p>
                                {" "}
                                {homeOrder?.work_order?.project_description}
                              </p>
                              <p className="text-right">
                                {/* <i className="fa fa-pencil" /> */}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="text-left">
                            <h3>{t("Task")}</h3>
                            <hr />
                            <div className="justify-content-between">
                              <p>
                                <strong>{t("Add Services")}</strong>
                              </p>
                              <p className="text-right">
                                <i
                                  className="fa fa-pencil"
                                  // onClick={() => setShowTaskForm(!showTaskForm)}
                                  onClick={handleToggleForm}
                                />
                              </p>
                            </div>
                            {showTaskForm && (
                              <div className="data form-field-open">
                                <form onSubmit={handeldes}>
                                  <div className="fields customer_records">
                                    <div className="input-1 work-order">
                                      <label>{t("Task title")}</label>
                                      <input
                                        type="text"
                                        name="title"
                                        placeholder="Task title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        required
                                      />
                                    </div>
                                    <div className="input-1 work-order">
                                      <label>{t("Task Description")}</label>
                                      <input
                                        type="text"
                                        name="description"
                                        placeholder="Task Description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        required
                                      />
                                    </div>
                                    <div className="input-1 work-order">
                                      <label>{t("Checklist")}</label>
                                      <select
                                        name="checklist"
                                        value={formData.checklist}
                                        onChange={handleChange}
                                        required
                                      >
                                        <option value="">
                                          Select a checklist
                                        </option>
                                        {checklists.map((checklist, index) => (
                                          <option
                                            key={index}
                                            value={checklist.id}
                                          >
                                            {checklist.name}
                                          </option>
                                        ))}
                                      </select>
                                    </div>
                                  </div>
                                  <div className="customer_records_dynamic" />
                                  <div className="option-btn d-flex justify-content-between">
                                    <div className="d-flex gap-3 justify-content-end">
                                      <button
                                        type="button"
                                        className="add btn-danger px-2"
                                        onClick={Clean}
                                      >
                                        {t("Cancel")}
                                      </button>
                                      <button
                                        type="submit"
                                        className="add btn-success px-2"
                                        disabled={isLoading}
                                      >
                                        {isLoading ? t("Saving...") : t("Save")}
                                      </button>
                                    </div>
                                  </div>
                                </form>
                              </div>
                            )}
                            {isLoading ? (
                              <Loader />
                            ) : (
                              <>
                                {homeOrder?.task?.map((task) => (
                                  <div key={task.id} className="task-item mb-3">
                                    <div className="justify-content-between">
                                      <p>
                                        {" "}
                                        <strong>
                                          {t("Type of service")} -
                                        </strong>{" "}
                                        {task.title}
                                      </p>
                                    </div>
                                    <div className="justify-content-between">
                                      <p>
                                        <strong>{t("Description")}-</strong>{" "}
                                        {task.description.substring(0, 30)}{" "}
                                        {task.description.substring(30, 60)}
                                      </p>
                                    </div>
                                    <div className="justify-content-between">
                                      <p>
                                        {" "}
                                        <strong>
                                          {t("CheckList")} -{" "}
                                        </strong>{" "}
                                        {task.checklist}
                                      </p>
                                      <p>
                                        <i className="fa fa-check-circle" />{" "}
                                        {task.is_completed
                                          ? "Completed"
                                          : "Not Completed"}
                                        <span className="text-right float-end"></span>
                                      </p>
                                    </div>
                                  </div>
                                ))}
                              </>
                            )}
                          </div>
                        </div>

                        <div className="col-md-12">
                          <div className="text-left">
                            <h3>{t("Articles")}</h3>
                            <hr />
                            <div className="justify-content-between pt-2">
                              <p>
                                <strong>{t("Name")}</strong>
                              </p>
                              <div className="d-grid justify-content-between article">
                                <p className="text-right"> {t("Article_no")}</p>
                                <p className="text-right">
                                  {t("Number of Unit")}
                                </p>
                                <span className="text-right float-end">
                                  <span className="text-right float-end">
                                    <i
                                      className="fa fa-pencil"
                                      // onClick={() =>
                                      //   setShowArticleForm(!showArticleForm)
                                      // }
                                      onClick={handleArticletoggle}
                                    />
                                  </span>{" "}
                                </span>
                              </div>
                            </div>
                            {showArticleForm && (
                              <div className="data form-field-open">
                                <form onSubmit={handleArticleSubmit}>
                                  {foData.map((form, index) => (
                                    <div
                                      key={index}
                                      className="fields customer_records-extra"
                                    >
                                      <div className="input-1 work-order article">
                                        <label>{t("Name")}</label>
                                        <select
                                          name="id"
                                          value={form.id}
                                          onChange={(e) =>
                                            handleInputChange(index, e)
                                          }
                                        >
                                          <option value="">
                                            {t("Select Article Name")}
                                          </option>
                                          {articleNames.map((article, idx) => (
                                            <option
                                              key={idx}
                                              value={article.id}
                                            >
                                              {article.name}
                                            </option>
                                          ))}
                                        </select>
                                      </div>
                                      <div className="input-1 work-order article">
                                        <label>{t("Article number")}</label>
                                        <select
                                          name="article_number"
                                          value={form.article_number}
                                          onChange={(e) =>
                                            handleInputChange(index, e)
                                          }
                                        >
                                          <option value="">
                                            Select Article Number
                                          </option>
                                          {articleNames.map((article, idx) => (
                                            <option
                                              key={idx}
                                              value={article.article_number}
                                            >
                                              {article.article_number}
                                            </option>
                                          ))}
                                        </select>
                                      </div>
                                      <div className="input-1 work-order">
                                        <label>{t("Number Unit")}</label>
                                        <input
                                          type="text"
                                          name="quantity"
                                          value={form.quantity}
                                          onChange={(e) =>
                                            handleInputChange(index, e)
                                          }
                                          placeholder="1"
                                        />
                                      </div>
                                      <div className="input-1 work-order">
                                        <label>{t("Amount")}</label>
                                        <input
                                          type="text"
                                          name="selling_price"
                                          value={form.selling_price}
                                          onChange={(e) =>
                                            handleInputChange(index, e)
                                          }
                                          placeholder="0"
                                        />
                                      </div>
                                      <div className="input-1 work-order">
                                        <label>{t("Total VAT")}</label>
                                        <div className="d-flex">
                                          <span>
                                            {/* $
                                            {totalVAT(
                                              form.selling_price,
                                              form.vat_percentage
                                            )} */}
                                          </span>
                                          <input
                                            type="number"
                                            name="vat_percentage"
                                            value={form.vat_percentage}
                                            onChange={(e) =>
                                              handleInputChange(index, e)
                                            }
                                            placeholder="21%"
                                          />
                                        </div>
                                      </div>
                                      {index > 0 && (
                                        <a
                                          type="button"
                                          className="remove-field btn-remove-customer"
                                          onClick={() => removeForm(index)}
                                        />
                                      )}
                                    </div>
                                  ))}
                                  <div className="option-btn d-flex justify-content-between">
                                    <div
                                      className="add task extra-fields-customer"
                                      onClick={addForm}
                                    >
                                      <span>+{t("Articles")}</span>
                                    </div>
                                    <div className="d-flex gap-3 justify-content-end">
                                      <button
                                        type="button"
                                        className="add btn-danger px-2"
                                        onClick={ArticleClean}
                                      >
                                        {t("Cancel")}
                                      </button>
                                      <button
                                        type="submit"
                                        className="add btn-success px-2"
                                      >
                                        {t("Save")}
                                      </button>
                                    </div>
                                  </div>
                                </form>
                              </div>
                            )}
                            {isLoading ? (
                              <Loader />
                            ) : (
                              <>
                                {homeOrder?.materials?.map(
                                  (materials, index) => {
                                    const {
                                      article_number,
                                      material_name,
                                      quantity,
                                      price,
                                    } = materials;
                                    return (
                                      <div
                                        key={index}
                                        className="justify-content-between pt-2"
                                      >
                                        <p>{material_name}</p>
                                        <div className="d-grid justify-content-between article">
                                          <p className="text-right">
                                            {article_number}
                                          </p>
                                          <p className="text-right">
                                            {quantity}
                                          </p>
                                          <p className="text-right">{price}</p>
                                        </div>
                                      </div>
                                    );
                                  }
                                )}
                              </>
                            )}
                          </div>
                        </div>

                        <div className="col-md-12">
                          <div className="text-left">
                            <h3>{t("Times")}</h3>
                            <hr />
                            <div className="d-grid times">
                              <p>
                                <strong>{t("Type")}</strong>
                              </p>
                              <p>
                                <strong>{t("Employee/Equipment")}</strong>
                              </p>
                              <p>
                                <strong>{t("Date")}</strong>
                              </p>
                              <p>
                                <strong>{t("Time")}</strong>
                              </p>
                              <p>
                                {/* <span className="text-right float-end">
                                  <i
                                    className="fa fa-pencil"
                                    onClick={() =>
                                      setShowTimeForm(!showTimeForm)
                                    }
                                  />
                                </span> */}
                              </p>
                            </div>
                            {homeOrder?.working_status?.length === 0 ? (
                              <div className="d-grid times">
                                <p>{t("task Not Started")}</p>
                              </div>
                            ) : (
                              homeOrder?.working_status?.map((time, index) => (
                                <div className="d-grid times" key={index}>
                                  <p>{time.status}</p>
                                  <p>{time.employee}</p>
                                  <p>
                                    {time.start_time
                                      ? time.start_time.substring(0, 10)
                                      : null}
                                  </p>

                                  <p>
                                    {time.total_time === 0
                                      ? "0.00"
                                      : time.total_time}
                                  </p>
                                </div>
                              ))
                            )}
                          </div>
                        </div>

                        <div className="col-md-12 mt-4">
                          <div className="d-flex-pop">
                            {homeOrder?.reports?.map(
                              (item, index) =>
                                index === 0 && (
                                  <React.Fragment key={index}>
                                    <div className="signature-img">
                                      <h5>Customer Signature</h5>
                                      <img
                                        src={`https://staging.webmobrildemo.com:8003${item.customer_signature}`}
                                        alt={`Customer Signature`}
                                      />
                                    </div>
                                    <div className="signature-img">
                                      <h5>Craftsman Signature</h5>
                                      <img
                                        src={`https://staging.webmobrildemo.com:8003${item.employee_signature}`}
                                        alt={`Employee Signature`}
                                      />
                                    </div>
                                  </React.Fragment>
                                )
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    id="Appointments"
                    className="tabcontentt"
                    style={{
                      display: activeTab === "Appointments" ? "block" : "none",
                    }}
                  >
                    <div className="Institution-grid-2 bg">
                      <div className="row">
                        <div className="col-md-12">
                          <Formik
                            initialValues={{
                              place_work_order: apiId,
                              date: "",
                              type: "",
                              starttime: "",
                              endtime: "",
                              pause: "",
                              description: "",
                              status: "",
                            }}
                          >
                            {() => (
                              <Form className="table border-none">
                                <thead>
                                  <tr>
                                    <th>Date</th>
                                    <th>Craftsman/Equipment</th>
                                    <th>Start Time</th>
                                    <th>End Time</th>
                                    <th>Pause</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>
                                      <Field
                                        className="form-control"
                                        type="text"
                                        name="date"
                                        disabled={isSubmitting}
                                      />
                                      <ErrorMessage
                                        name="date"
                                        component="div"
                                        className="text-danger"
                                      />
                                    </td>
                                    <td>
                                      <Field
                                        as="select"
                                        className="form-control"
                                        name="type"
                                        disabled={isSubmitting}
                                      >
                                        <option value="">
                                          Select Craftsman
                                        </option>
                                        <option value="Theo de winter">
                                          Theo de winter
                                        </option>
                                      </Field>
                                      <Field
                                        type="text"
                                        className="form-control"
                                        name="description"
                                        disabled={isSubmitting}
                                      />
                                    </td>
                                    <td>
                                      <Field
                                        className="form-control"
                                        type="text"
                                        name="starttime"
                                        disabled={isSubmitting}
                                      />
                                    </td>
                                    <td>
                                      <Field
                                        className="form-control"
                                        type="text"
                                        name="endtime"
                                        disabled={isSubmitting}
                                      />
                                    </td>
                                    <td>
                                      <Field
                                        className="form-control"
                                        type="text"
                                        name="pause"
                                        disabled={isSubmitting}
                                      />
                                    </td>
                                    <td>
                                      <Field
                                        className="form-control"
                                        as="select"
                                        name="status"
                                        disabled={isSubmitting}
                                      >
                                        <option value="">Select Status</option>
                                        <option value="Created">Created</option>
                                        <option value="Planned">Planned</option>
                                        <option value="In Progress">
                                          In Progress
                                        </option>
                                        <option value="Completed">
                                          Completed
                                        </option>
                                        <option value="Invoice">Invoice</option>
                                      </Field>
                                    </td>
                                    <td>
                                      <button
                                        type="button"
                                        className="text-black"
                                        style={{
                                          color: "red",
                                          border: "none",
                                          background: "none",
                                        }}
                                        onClick={() => {
                                          // Handle delete action
                                        }}
                                        disabled={isSubmitting} // Disable button during submission
                                      >
                                        <i className="fa fa-trash fs-4 pt-1" />
                                      </button>
                                    </td>
                                  </tr>
                                </tbody>

                                <div className="text-right">
                                  <a className="btn btn-dark float-start">
                                    <i className="fa fa-plus" /> Appointment
                                  </a>
                                  <a href="#!" className="btn btn-secondary">
                                    Edit
                                  </a>

                                  <a
                                    type="submit"
                                    className="btn btn-success"
                                    disabled={isSubmitting}
                                  >
                                    Save
                                  </a>
                                  {isSubmitting && (
                                    <div className="loader">
                                      <Loader />
                                    </div>
                                  )}
                                </div>
                              </Form>
                            )}
                          </Formik>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    id="Documents"
                    className="tabcontentt"
                    style={{
                      display: activeTab === "Documents" ? "block" : "none",
                    }}
                  >
                    <div className="Institution-grid-2 bg">
                      {homeOrder?.documents?.map((item, index) => (
                        <div className="row" key={index}>
                          <div className="col-md-4">
                            <div>
                              <h5>Private Filename</h5>
                              <p>
                                <a
                                  href={`https://staging.webmobrildemo.com:8003${item.document}`}
                                  className="doc-link"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {getDocumentPath(item.document)}
                                </a>
                              </p>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div>
                              <h5>Date</h5>
                              <p>{item.created_at}</p>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div>
                              <h5>By</h5>
                              <p>
                                {item.user}
                                <span className="float-end">
                                  <i
                                    className="fa fa-trash"
                                    onClick={() => {
                                      DocDelete(item.id);
                                    }}
                                  />
                                </span>
                              </p>
                            </div>
                          </div>
                          <hr />
                        </div>
                      ))}
                      {/* <Formik
                        initialValues={{
                          hyperlinkText: "",
                          url: "",
                          uploaded_doc: null,
                        }}
                        onSubmit={DocSubmit}
                      >
                        {({ setFieldValue }) => (
                          <Form>
                            <div className="col-md-12">
                             
                            </div>
                            <div className="row">
                              <div className="col-md-6">
                                <label className="mb-2">
                                  Hyperlink text (Optional)
                                </label>
                                <Field
                                  type="text"
                                  name="hyperlinkText"
                                  placeholder="Hyperlink text"
                                  className="first-inp mt-0 mb-2"
                                />
                                <ErrorMessage
                                  name="hyperlinkText"
                                  component="div"
                                  className="error"
                                />
                              </div>
                              <div className="col-md-6">
                                <label className="mb-2">Hyperlink URL</label>
                                <Field
                                  type="text"
                                  name="url"
                                  placeholder="Hyperlink URL"
                                  className="first-inp mt-0 mb-2"
                                />
                                <ErrorMessage
                                  name="url"
                                  component="div"
                                  className="error"
                                />
                              </div>
                            </div>
                            <button type="submit" className="btn btn-primary">
                              Submit
                            </button>
                          </Form>
                        )}
                      </Formik> */}
                    </div>
                  </div>
                  <div
                    id="Photos"
                    className="tabcontentt"
                    style={{
                      display: activeTab === "Photos" ? "block" : "none",
                    }}
                  >
                    <div className="Institution-grid-2 bg">
                      {isLoading ? (
                        <div>
                          <Loader />
                        </div>
                      ) : (
                        homeOrder?.photos?.map((photo) => (
                          <div className="row" key={photo.id}>
                            <div className="col-md-12">
                              <div>
                                <hr />
                              </div>
                            </div>
                            <div className="col-md-3">
                              <div>
                                <h5>Image</h5>
                                <img
                                  src={`https://staging.webmobrildemo.com:8003${photo.image}`}
                                  className="w-100"
                                  alt={photo.doc}
                                />
                              </div>
                            </div>
                            <div className="col-md-3">
                              <div>
                                <h5>Description</h5>
                                <p className="doc-link">{photo.description}</p>
                              </div>
                            </div>
                            <div className="col-md-3">
                              <div>
                                <h5>Date </h5>
                                <p>{photo.created_at}</p>
                              </div>
                            </div>
                            <div className="col-md-3">
                              <div>
                                <h5>By</h5>
                                <p>
                                  {photo.user}
                                  <span className="float-end">
                                    <i
                                      className="fa fa-trash"
                                      onClick={() => PicDelete(photo.id)}
                                    />
                                  </span>
                                </p>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                  <div
                    id="Checklists"
                    className="tabcontentt"
                    style={{
                      display: activeTab === "Checklists" ? "block" : "none",
                    }}
                  >
                    <div className="Institution-grid-2 bg">
                      <div className="row">
                        <div className=" col-md-8">
                          <div className="">
                            <img
                              src={`${process.env.PUBLIC_URL}/Image/logo.png`}
                              className="w-100"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    id="Invoice"
                    className="tabcontentt"
                    style={{
                      display: activeTab === "Invoice" ? "block" : "none",
                    }}
                  >
                    {loading && (
                      <div className="loader">
                        <Loader />
                      </div>
                    )}
                    <div className="Institution-grid-2 bg">
                      <div className="compan">
                        <a
                          className="btn-primary position-relative"
                          // onClick={DownloadInvoice}
                        >
                          Download PDF
                        </a>
                        {/* <a href="" className="btn-primary position-relative">
                          Duplicate
                        </a>
                        <span>
                          <input
                            type="number"
                            className="form-input"
                            placeholder="Exd.Show VAT"
                          />
                        </span>
                        <span>
                          <input
                            type="number"
                            className="form-input"
                            placeholder="Exd.Edit VAT"
                          />
                        </span> */}
                      </div>
                      <hr />
                      <div className="row">
                        <div className=" col-md-8">
                          <div className="">
                            <img
                              src={`${process.env.PUBLIC_URL}/Image/logo.png`}
                              className="w-100"
                              alt="Company Logo"
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="text-right">
                            <p>Cooling system</p>
                            <p>Village street 12 </p>
                            <p>1012ab Amsterdam</p>
                            <p>jim@koelemaninstallaties.ni</p>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="text-left">
                            <p>
                              {invoice?.data?.clientorderdata?.first_name}
                              {invoice?.data?.clientorderdata?.last_name}
                            </p>
                            <p>{invoice?.data?.clientorderdata?.email}</p>
                            <p>{invoice?.data?.clientorderdata?.phoneno}</p>
                            <p>
                              {invoice?.data?.clientorderdata?.address},
                              {invoice?.data?.clientorderdata?.location}
                            </p>
                            <p>{invoice?.data?.clientorderdata?.zipcode}</p>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="text-left">
                            <div className="d-flex justify-content-between align-items-center">
                              <h4>Invoice Concept W{invoice?.data?.orderno}</h4>
                              <div className="invoice-date">
                                <span className="d-block">
                                  Invoice date: 27-10-2022{" "}
                                  <i className="fa fa-pencil " />
                                </span>
                                <span className="">
                                  Expiration: 26-11-2022{" "}
                                  <i className="fa fa-pencil " />
                                </span>
                              </div>
                            </div>
                            <hr />
                            <div className="d-flex">
                              <p>Refrence: </p>
                              <p>
                                {invoice?.data?.clientorderdata?.reference}

                                {/* <i className="fa fa-pencil " /> */}
                              </p>
                            </div>
                            <div className="d-flex">
                              <p>Work Location: </p>
                              <p>{invoice?.data?.worklocation}</p>
                            </div>
                            <div className="d-flex">
                              <p>Amsterdam Manager: </p>
                              <p>
                                Jim koeleman <i className="fa fa-pencil " />
                              </p>
                            </div>
                            <div className="d-flex">
                              <p>Location / brand: </p>
                              <p>
                                {invoice?.data?.clientorderdata?.location}
                                {/* <i className="fa fa-pencil " /> */}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-12">
                          <div className="text-left">
                            <div className="d-flex justify-content-between align-items-center">
                              <h4>
                                Activities on {invoice?.data?.date} (W
                                {invoice?.data?.orderno})
                              </h4>
                            </div>
                            <hr />
                            <p>Kettel does not heat up, gladly disolve</p>
                            <div className="d-flex justify-content-between">
                              <span>Number of Descriptions</span>
                              <div className="d-flex gap-3">
                                <span>Amount</span>
                                <span>Total</span>
                                <span>Vat</span>
                                <i className="fa fa-pencil" />
                              </div>
                            </div>
                            {invoice?.article?.map((item) => (
                              <div
                                className="d-flex justify-content-between mt-3"
                                key={item.id}
                              >
                                <div className="d-flex gap-3">
                                  <span>{item.item}</span>
                                  <span>{item.name}</span>
                                  <span>{item.article_number}</span>
                                </div>
                                <div className="d-flex gap-3">
                                  <span>${item.price}</span>
                                  <span>${item.total_price}</span>
                                  <span>21%</span>
                                  <i className="fa fa-pencil" />
                                </div>
                              </div>
                            ))}
                            <div className="text-right total mt-3">
                              <span>Subtotal: $1,346.93</span>
                            </div>
                            <div className="text-right total mt-3">
                              <span>21% VAT: $282.86</span>
                            </div>
                            <div className="text-right total mt-3">
                              <span>Total: $1,629.93</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div id="parent">
                    <div className="menu border">
                      <div className="d-flex gap-4 p-2 m-0">
                        <button
                          className={`tablinks ${
                            actives === "MakeNote" ? "active" : ""
                          }`}
                          onClick={() => handle("MakeNote")}
                        >
                          <i className="fa fa-book" /> Make note
                        </button>
                        <button
                          className={`tablinks ${
                            actives === "NewAction" ? "active" : ""
                          }`}
                          onClick={() => handle("NewAction")}
                        >
                          <i className="fa fa-check-square" /> New action
                        </button>
                        <button
                          className={`tablinks ${
                            actives === "SendEmail" ? "active" : ""
                          }`}
                          onClick={() => handle("SendEmail")}
                        >
                          <i className="fa fa-envelope" /> Send email
                        </button>
                      </div>
                    </div>

                    <div className="tabs">
                      <div
                        className={`tab tabv ${
                          actives === "MakeNote" ? "active" : ""
                        }`}
                      >
                        <div className="input-1 pt-4 px-2">
                          <textarea
                            className="input-group"
                            style={{ padding: "9px" }}
                            value={notes}
                            onChange={handleNoteChange}
                            placeholder="Type your note here..."
                          />
                        </div>
                        <div className="d-flex gap-3 justify-content-end mt-4">
                          <a
                            className="add btn-danger px-2"
                            onClick={toggleForm}
                          >
                            Cancel
                          </a>
                          <a
                            className="add btn-success px-2"
                            onClick={handleSave}
                          >
                            Save
                          </a>
                        </div>
                      </div>
                      <div
                        className={`tab tabv ${
                          actives === "NewAction" ? "active" : ""
                        }`}
                      >
                        <div className="row px-2">
                          <div className="input-1 pt-4 px-2">
                            <textarea
                              className="input-group"
                              style={{ padding: "9px" }}
                              value={actions}
                              onChange={(e) => setActions(e.target.value)}
                              placeholder="Description...."
                            />
                          </div>
                          <div className="col-md-6">
                            <select
                              className="first-inp"
                              value={employee}
                              onChange={(e) => setEmployee(e.target.value)}
                            >
                              <option value="" disabled>
                                Select action
                              </option>
                              {actionTypeOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="col-md-6">
                            <input
                              type="date"
                              className="first-inp"
                              value={actionDate}
                              onChange={(e) => setActionDate(e.target.value)}
                            />
                          </div>
                          <div className="col-md-12 mt-2">
                            <label>Responsible</label>
                            <textarea
                              className="input-group"
                              style={{ padding: "9px" }}
                              // value={responsibleNotes}
                              // onChange={(e) =>
                              //   setResponsibleNotes(e.target.value)
                              // }
                              placeholder="Type your action note here..."
                            />
                          </div>
                          <div className="d-flex gap-3 justify-content-end mt-4">
                            <a
                              className="add btn-danger px-2"
                              onClick={toggleForm}
                            >
                              Cancel
                            </a>
                            <a
                              className="add btn-success px-2"
                              onClick={ActionSave}
                            >
                              Save
                            </a>
                          </div>
                        </div>
                      </div>
                      <div
                        className={`tab tabv ${
                          actives === "SendEmail" ? "active" : ""
                        }`}
                      >
                        <div className="input-1 pt-4 px-2">
                          <input className="form-control w-100"></input>
                        </div>
                        <div className="input-1 pt-4 px-2">
                          <input className="form-control w-100"></input>
                        </div>
                        <div className="input-1 pt-4 px-2">
                          <textarea
                            className="input-group"
                            style={{ padding: "9px" }}
                            placeholder="Type your email here..."
                          />
                        </div>
                        <div class="mt-4">
                          <input
                            class="form-control"
                            type="file"
                            id="formFile"
                          />
                        </div>
                        <div className="d-flex gap-3 justify-content-end mt-4">
                          <a
                            className="add btn-danger px-2"
                            onClick={toggleForm}
                          >
                            Cancel
                          </a>
                          <a className="add btn-success px-2">Save</a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="same-as-head tabinner">
                    <ul className="tab">
                      <li
                        className={`tablinks ${
                          activestabs === "Everything" ? "active" : ""
                        }`}
                        onClick={(event) => handleTabClick("Everything", event)}
                        id="defaultOpen"
                      >
                        Everything
                      </li>
                      <li
                        className={`tablinks ${
                          activestabs === "Notes" ? "active" : ""
                        }`}
                        onClick={(event) => handleTabClick("Notes", event)}
                      >
                        Notes
                      </li>
                      <li
                        className={`tablinks ${
                          activestabs === "Actions" ? "active" : ""
                        }`}
                        onClick={(event) => handleTabClick("Actions", event)}
                      >
                        Actions
                      </li>
                      <li
                        className={`tablinks ${
                          activestabs === "Remark" ? "active" : ""
                        }`}
                        onClick={(event) => handleTabClick("Remark", event)}
                      >
                        External Exployee Remark
                      </li>
                    </ul>
                  </div>
                  <div
                    id="Everything"
                    className="tabcontentt"
                    style={{
                      display: activestabs === "Everything" ? "block" : "none",
                    }}
                  >
                    {isLoading ? (
                      <Loader />
                    ) : (
                      <div className="Institution-grid-2 bg">
                        <div className="submenu">
                          <ul>
                            {status.length > 0 ? (
                              status.map((status) => (
                                <li className="border-inn" key={status.id}>
                                  <div className="roundd category-button">
                                    <p>{status.status}</p>
                                    <br />
                                    <p>
                                      {new Date(
                                        status.created_at
                                      ).toLocaleString()}
                                    </p>
                                  </div>
                                </li>
                              ))
                            ) : (
                              <li className="border-inn">No Status</li>
                            )}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>

                  <div
                    id="Notes"
                    className="tabcontentt"
                    style={{
                      display: activestabs === "Notes" ? "block" : "none",
                    }}
                  >
                    {isLoading ? (
                      <Loader />
                    ) : (
                      <div className="Institution-grid-2 bg">
                        <div className="submenu">
                          <ul>
                            {Array.isArray(note) && note.length > 0 ? (
                              note.map((noteItem) => (
                                <li className="border-inn" key={noteItem.id}>
                                  <div className="roundd category-button">
                                    <p>{noteItem.notes}</p>
                                    <br />
                                    <p>
                                      {new Date(
                                        noteItem.created_at
                                      ).toLocaleString()}
                                    </p>
                                  </div>
                                </li>
                              ))
                            ) : (
                              <li className="border-inn">No Notes</li>
                            )}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                  <div
                    id="Actions"
                    className="tabcontentt"
                    style={{
                      display: activestabs === "Actions" ? "block" : "none",
                    }}
                  >
                    {isLoading ? (
                      <Loader />
                    ) : (
                      <div className="Institution-grid-2 bg">
                        <div className="submenu">
                          <ul>
                            {Array.isArray(mails) && mails.length > 0 ? (
                              mails.map((mailItem) => (
                                <li className="border-inn" key={mailItem.id}>
                                  <div className="roundd category-button">
                                    <p>{mailItem.notes}</p>
                                    <br />
                                    <p>
                                      {new Date(
                                        mailItem.created_at
                                      ).toLocaleString()}
                                    </p>
                                  </div>
                                </li>
                              ))
                            ) : (
                              <li className="border-inn">No Notes</li>
                            )}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                  <div
                    id="Remark"
                    className="tabcontentt"
                    style={{
                      display: activestabs === "Remark" ? "block" : "none",
                    }}
                  >
                    {isLoading ? (
                      <Loader />
                    ) : (
                      <div className="Institution-grid-2 bg">
                        <div className="submenu">
                          <ul>
                            {homeOrder?.remark?.length > 1 ? (
                              homeOrder?.remark.map((remark) => (
                                <li className="border-inn" key={status.id}>
                                  <div className="roundd category-button">
                                    <p>{remark.remark}</p>
                                    <br />
                                  </div>
                                </li>
                              ))
                            ) : (
                              <li className="border-inn">No Remark</li>
                            )}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Orders;
