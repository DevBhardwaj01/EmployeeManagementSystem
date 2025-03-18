import React, { useEffect } from "react";
import "./EmployeeLogin.css";
import EmployeeData from "./EmployeeData.js";

const EmployeeLogin = ({ Logout, User, id }) => {
  const LogoutBtn = () => {
    Logout("LogoutUser");
  };
  useEffect(() => {
    const UserData = JSON.parse(localStorage.getItem("userdata")) || [];
    const cardContainer = document.querySelector(".ActiveTask");
    cardContainer.innerHTML = "";

    if (EmployeeData[id].EmployeeName === User) {
      UserData.forEach((item) => {
        if (EmployeeData[id].EmployeeName === item.AsignTo.toLowerCase()) {
          const cardCont = document.createElement("div");
          cardCont.className = "GivenTask";
          cardCont.innerHTML = `
            <div class="card">
              <div class="tickbox"></div>
              <div class="cardbox">
                <div class="headcont">
                  <span class="category">${
                    item.Category.charAt(0).toUpperCase() +
                    item.Category.slice(1)
                  }</span>
                  <span class="date">${item.Date}</span>
                </div>
                <h2 class="TaskTitle">${
                  item.Title.charAt(0).toUpperCase() + item.Title.slice(1)
                }</h2>
                <p class="TaskDescription">${
                  item.Description.charAt(0).toUpperCase() +
                  item.Description.slice(1)
                }</p>
              </div>
              <div class="taskAction">
              <button class="AcceptBtn">Accept Task</button>
                <button class="completeBtn">
                  <span>Mark as Completed</span>
                </button>
                <button class="failedBtn">
                  <span>Mark as Failed</span>
                </button>
              </div>
            </div>`;
          cardContainer.appendChild(cardCont);
        }
      });
    }
    // Update new task count
    document.querySelector(".newtask").textContent =
      document.querySelectorAll(".GivenTask").length;
  }, [User, id]);

  useEffect(() => {
    const updateStats = (key, value) => {
      const current = parseInt(localStorage.getItem(`${User}_${key}`) || 0);
      localStorage.setItem(`${User}_${key}`, current + value);
      document.querySelector(`.${key}`).textContent = current + value;
    };

    const saveCardState = () => {
      const cardStates = [];
      document.querySelectorAll(".card").forEach((card, index) => {
        cardStates.push({
          accepted: card.querySelector(".AcceptBtn").style.display === "none",
          completed: card.classList.contains("activeComplete"),
          failed: card.classList.contains("activefailed"),
        });
      });
      localStorage.setItem(`${User}_cardStates`, JSON.stringify(cardStates));
    };

    const loadCardState = () => {
      const cardStates =
        JSON.parse(localStorage.getItem(`${User}_cardStates`)) || [];
      cardStates.forEach((state, index) => {
        if (state.accepted) {
          document.querySelectorAll(".AcceptBtn")[index].style.display = "none";
        }
        if (state.completed) {
          document
            .querySelectorAll(".card")
            [index].classList.add("activeComplete");
          document
            .querySelectorAll(".tickbox")
            [index].classList.add("activerighttick");
        }
        if (state.failed) {
          document
            .querySelectorAll(".card")
            [index].classList.add("activefailed");
          document
            .querySelectorAll(".tickbox")
            [index].classList.add("activewrongtick");
        }
      });
    };

    loadCardState();

    document.querySelectorAll(".AcceptBtn").forEach((btn) => {
      btn.onclick = () => {
        btn.style.display = "none";
        updateStats("acceptValue", 1);
        saveCardState();
      };
    });

    document.querySelectorAll(".completeBtn").forEach((btn, index) => {
      btn.onclick = () => {
        btn.disabled = true;
        document
          .querySelectorAll(".card")
          [index].classList.add("activeComplete");
        document
          .querySelectorAll(".tickbox")
          [index].classList.add("activerighttick");
        updateStats("CompleteValue", 1);
        saveCardState();
      };
    });

    document.querySelectorAll(".failedBtn").forEach((btn, index) => {
      btn.onclick = () => {
        btn.disabled = true;
        document.querySelectorAll(".card")[index].classList.add("activefailed");
        document
          .querySelectorAll(".tickbox")
          [index].classList.add("activewrongtick");
        updateStats("failedValue", 1);
        saveCardState();
      };
    });
  }, [User]);

  return (
    <div>
      <header className="header2">
        <div className="center">
        <h2 className="employeeLogo">Hello {User} 👋</h2>
        <button className="Btn" onClick={LogoutBtn}>
          <div className="sign">
            <svg viewBox="0 0 512 512">
              <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
            </svg>
          </div>
          <div className="text">Logout</div>
        </button>
        </div>
      </header>

      <div className="TaskSec">
        <div className="taskContainer2">
          <div className="TaskInfo" id="taskinfo">
            <div className="gradient-border">
              <p className="num newtask">0</p>
              <p className="num">New Task</p>
            </div>
            <div className="gradient-border">
              <p className="num CompleteValue">
                {localStorage.getItem(`${User}_CompleteValue`) || 0}
              </p>
              <p className="num">Completed Task</p>
            </div>
            <div className="gradient-border">
              <p className="num acceptValue">
                {localStorage.getItem(`${User}_acceptValue`) || 0}
              </p>
              <p className="num">Accepted Task</p>
            </div>
            <div className="gradient-border">
              <p className="num failedValue">
                {localStorage.getItem(`${User}_failedValue`) || 0}
              </p>
              <p className="num">Failed Task</p>
            </div>
          </div>
          <div className="ActiveTask"></div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeLogin;
