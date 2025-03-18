import React, { useEffect, useState } from "react";
import "./HRLogin.css";
import HRLogo from "./HRLogo.jpg";

const HRLogin = ({ Logout }) => {
  const [tasks, setTasks] = useState([]);
  const [Title, setTitle] = useState("");
  const [Date, setDate] = useState("");
  const [Asign, setAsign] = useState("");
  const [Category, setCategory] = useState("");
  const [Desc, setDesc] = useState("");
  const [searchUser, setSearchUser] = useState("");
  const [userStats, setUserStats] = useState(null);

  const LogoutBtn = () => {
    Logout("LogoutUser");
  };

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) setTasks(JSON.parse(storedTasks));
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const createTask = () => {
    const newTask = {
      Title,
      Date,
      AsignTo: Asign.toLowerCase(),
      Category,
      Description: Desc,
    };

    if (!Title || !Date || !Asign || !Category || !Desc) { return; };

    const UserData = JSON.parse(localStorage.getItem("userdata")) || [];
    UserData.push(newTask);
    localStorage.setItem("userdata", JSON.stringify(UserData));

    const taskIndex = tasks.findIndex(
      (task) => task.name === Asign.toLowerCase()
    );
    if (taskIndex !== -1) {
      const updatedTasks = [...tasks];
      updatedTasks[taskIndex].newtask += 1;
      setTasks(updatedTasks);
    } else {
      setTasks((prev) => [
        ...prev,
        {
          name: Asign.toLowerCase(),
          newtask: 1,
          completedtask: 0,
          acceptedtask: 0,
          failedtask: 0,
        },
      ]);
    }

    // Clear form fields
    setTitle("");
    setDate("");
    setAsign("");
    setCategory("");
    setDesc("");
  };

  const checkBtn = () => {
    const username = searchUser.trim().toLowerCase();
    if (!username) return;

    // Get task counts from both localStorage and component state
    const userTasks = tasks.find((task) => task.name === username);
    const completed = parseInt(
      localStorage.getItem(`${username}_CompleteValue`) || 0
    );
    const accepted = parseInt(
      localStorage.getItem(`${username}_acceptValue`) || 0
    );
    const failed = parseInt(
      localStorage.getItem(`${username}_failedValue`) || 0
    );

    setUserStats({
      newTasks: userTasks?.newtask || 0,
      completed,
      accepted,
      failed,
    });
  };

  return (
    <div className="ManagerContainer">
      <header className="header" id="header">
        <img src={HRLogo} alt="HR Logo" className="hrLogo" id="hr" />
        <button className="Btn" id="logoutbtn" onClick={LogoutBtn}>
          <div className="sign">
            <svg viewBox="0 0 512 512">
              <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
            </svg>
          </div>
          <div className="text">Logout</div>
        </button>
      </header>

      <div className="TaskSection">
        {/* Task Creation Form */}
        <div className="taskContainer">
          <div className="InputSec">
            <div className="input-container">
              <input
                type="text"
                required="required"
                value={Title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <label className="label">Task Title</label>
              <div className="underline"></div>
            </div>
            <div className="input-date">
              <label className="label">Date</label>
              <input
                type="date"
                value={Date}
                className="select-date"
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="input-container">
              <input
                type="text"
                required
                value={Asign}
                onChange={(e) => setAsign(e.target.value.toLowerCase())}
              />
              <label className="label">Assign to</label>
              <div className="underline"></div>
            </div>
            <div className="input-container">
              <input
                type="text"
                required
                value={Category}
                onChange={(e) => setCategory(e.target.value)}
              />
              <label className="label">Category</label>
              <div className="underline"></div>
            </div>
          </div>
          <div className="TaskActionCont">
            <div className="inputDesc">
              <label className="label">Description</label>
              <textarea
                cols="65"
                rows="11"
                id="TaskDesc"
                value={Desc}
                onChange={(e) => setDesc(e.target.value)}
              ></textarea>
            </div>
            <button className="SubmitBtn" id="submitbtn" onClick={createTask}>
              <span>Create Task</span>
            </button>
          </div>
        </div>

        {/* User Search Section */}
        <div className="userSearchSection">
          <div className="input-container" id="inputContainer">
            <input
              type="text"
              required="required"
              value={searchUser}
              id="searchInput"
              onChange={(e) => setSearchUser(e.target.value)}
            />
            <label className="label">Search Employee</label>
            <div className="underline"></div>
          </div>
          <button className="clickme" id="search" onClick={checkBtn}>Search</button>
        </div>
        {userStats && (
          <div className="userStats">
            <h3>Task Statistics for {searchUser}</h3>
            <table>
              <tbody>
                <tr>
                  <td>New Tasks:</td>
                  <td>{userStats.newTasks}</td>
                </tr>
                <tr>
                  <td>Completed Tasks:</td>
                  <td>{userStats.completed}</td>
                </tr>
                <tr>
                  <td>Accepted Tasks:</td>
                  <td>{userStats.accepted}</td>
                </tr>
                <tr>
                  <td>Failed Tasks:</td>
                  <td>{userStats.failed}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* Employee Task Table */}
        <div className="EmployeeTaskSec">
          <table>
            <thead>
              <tr>
                <th>No.</th>
                <th>Employee</th>
                <th>New Task</th>
                <th>Completed Task</th>
                <th>Accepted Task</th>
                <th>Failed Task</th>
              </tr>
            </thead>
            <tbody className="tableBody">
              {tasks.map((task, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{task.name}</td>
                  <td>{task.newtask}</td>
                  <td>
                    {localStorage.getItem(`${task.name}_CompleteValue`) || 0}
                  </td>
                  <td>
                    {localStorage.getItem(`${task.name}_acceptValue`) || 0}
                  </td>
                  <td>
                    {localStorage.getItem(`${task.name}_failedValue`) || 0}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HRLogin;
