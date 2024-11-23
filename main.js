let myForm = document.getElementById("myform");
let myInputs = document.querySelectorAll("input");
let btn = document.getElementById("btn");
let myTasks = document.getElementById("my-tasks");
//popup
function popup() {
  //get elements
  let popup = document.createElement("div");
  popup.id = "popup";
  popup.className = "main-popup popup";
  let btn = document.createElement("button");
  btn.id = "btn";
  btn.className = "close-btn";
  btn.textContent = "Ok";
  let titleEl = document.createElement("h3");
  titleEl.className = "title popup";
  titleEl.textContent = "Hello Sir";
  let popupContent = document.createElement("p");
  popupContent.className = "content popup";
  popupContent.textContent = "Failed can't Be Empty";
  popup.append(btn, titleEl, popupContent);
  document.body.append(popup);
  // create and decleare  over lay in page
  let overLay = document.createElement("div");
  overLay.className = "over-lay";
  overLay.id = "over-lay";
  popup.before(overLay);
  //start time to appear message
  popup.style.cssText = `z-index: 5; opacity: 1;`;
  overLay.style.cssText = ` z-index: 2; opacity: 1;`;
  // btn click to close message
  btn.addEventListener("click", function () {
    popup.style.cssText = ` z-index: -5; opacity: 0;`;
    overLay.style.cssText = ` z-index: -4; opacity: 0;`;
    //time to remove popup and over lay from page
    setTimeout(() => {
      popup.remove();
      overLay.remove();
    }, 1000);
  });
  // document click anywhaer to close message
  overLay.addEventListener("click", (e) => {
    if (!e.target.classList.contains("popup")) {
      popup.style.cssText = ` z-index: -5; opacity: 0;`;
      overLay.style.cssText = ` z-index: -4; opacity: 0;`;
      //time to remove popup and over lay from page
      setTimeout(() => {
        popup.remove();
        overLay.remove();
      }, 1000);
    }
  });
}
//add tasks
window.onload = ()=>{myInputs[0].focus();};
function addTasks() {
  myForm.addEventListener("submit", (e) => {
    e.preventDefault();
    //create task container
    let taskEl = document.createElement("div");
    taskEl.className = "task";
    // create task data
    let taskInfo = document.createElement("div");
    taskInfo.className = "task-info";
    // taskInfo.disabled = true;
    // taskInfo.setAttribute("value", myInputs[0].value);
    taskInfo.textContent = myInputs[0].value;
    //delete button
    let btnContainer = document.createElement("div");
    btnContainer.className = "btn-container";
    let delBtn = document.createElement("button");
    delBtn.className = "del-btn";
    delBtn.textContent = "delete";
    //edit button
    let editBtn = document.createElement("button");
    editBtn.className = "edit-btn";
    editBtn.textContent = "edit";
    btnContainer.append(editBtn, delBtn);
    //append ====================================
    if (myInputs[0].value !== "") {
      //append elements
      taskEl.append(taskInfo, btnContainer);
      myTasks.append(taskEl);
      //store to local storage
      window.localStorage.tasks = myTasks.innerHTML;
    }else{
      popup();
    }
    // end append ===========================================
    myInputs[0].value = "";
  });
}
// remove task
function removeTasks() {
  myTasks.addEventListener("click", (e) => {
    if (e.target.classList.contains("del-btn")) {
      e.target.parentElement.parentElement.remove();
      window.localStorage.tasks = myTasks.innerHTML;
    }
  });
}
//edit tasks
function editTasks() {
  myTasks.addEventListener("click", (edit) => {
    if (edit.target.classList.contains("edit-btn")) {
      edit.target.parentElement.parentElement.firstElementChild.setAttribute("contenteditable","true")
      edit.target.parentElement.parentElement.firstElementChild.focus();
      edit.target.parentElement.parentElement.firstElementChild.style.cssText = `background-color: #0075ff;
       color:#fff;`;
      let doneEdit = document.createElement("button");
      doneEdit.className = "done";
      doneEdit.textContent = "done";
      edit.target.parentElement.firstElementChild.after(doneEdit);
      edit.target.style.display = "none";
      doneEdit.addEventListener("click", (done) => {
        if (
          done.target.parentElement.parentElement.firstElementChild.innerText !== ""
        ) {
          edit.target.parentElement.parentElement.firstElementChild.removeAttribute("contenteditable")
          done.target.parentElement.parentElement.firstElementChild.setAttribute(
            "value",
            done.target.parentElement.parentElement.firstElementChild.value
          );
          done.target.remove();
          edit.target.style.display = "inline";
          edit.target.parentElement.parentElement.firstElementChild.style.cssText = `background-color: transparent;
          color:white;`;
          window.localStorage.tasks = myTasks.innerHTML;
        } else {
          popup();
        }
      });
    }
  });
}
//append tasks from local Storage
if (localStorage.getItem("tasks")) {
  myTasks.innerHTML = window.localStorage.getItem("tasks");
}
// call function
addTasks();
removeTasks();
editTasks();
