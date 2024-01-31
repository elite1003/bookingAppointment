const axiosInstance = axios.create({
  baseURL: "https://crudcrud.com/api/036854be3e5c41a5a658023b0f7ca55b",
});
let selectedId = null;
const ul = document.getElementById("appointment");
document.addEventListener("DOMContentLoaded", function () {
  axiosInstance
    .get("/appointmentData")
    .then((res) => {
      for (let i = 0; i < res.data.length; i++) showAppointment(res.data[i]);
    })
    .catch((err) => console.log(err));
});

function showAppointment(data) {
  const { _id, name, email, phonenumber, date, time } = data;
  const deleteButton = document.createElement("button");
  deleteButton.className = "delete-btn";
  deleteButton.innerText = "delete";
  deleteButton.addEventListener("click", handleDelete);
  const editButton = document.createElement("button");
  editButton.className = "edit-btn";
  editButton.innerText = "edit";
  editButton.addEventListener("click", handleEdit);
  const list = document.createElement("li");
  list.id = _id;
  list.className = "user";
  list.innerText = `${name} ${email} ${phonenumber} ${date} ${time} `;
  list.appendChild(deleteButton);
  list.appendChild(editButton);
  ul.appendChild(list);
}
function handleFormUpdate(customerAppointmentData) {
  const li = document.getElementById(selectedId);
  ul.removeChild(li);
  axiosInstance
    .put(`/appointmentData/${selectedId}`, customerAppointmentData)
    .then((res) => {
      console.log("resource updated successfully");
      showAppointment(customerAppointmentData);
    })
    .catch((err) => console.log(err));
  selectedId = null;
}
function handleSubmit(e) {
  e.preventDefault();
  const name = e.target.name.value;
  const email = e.target.email.value;
  const phonenumber = e.target.phonenumber.value;
  const date = e.target.date.value;
  const time = e.target.time.value;
  const customerAppointmentData = {
    name,
    email,
    phonenumber,
    date,
    time,
  };
  if (selectedId) {
    handleFormUpdate(customerAppointmentData);
  } else {
    axiosInstance
      .post("/appointmentData", customerAppointmentData)
      .then((res) => showAppointment(res.data))
      .catch((err) => console.log(err));
  }
}
function handleDelete(e) {
  e.preventDefault();
  const _id = e.target.parentNode.id;
  ul.removeChild(e.target.parentNode);
  axiosInstance
    .delete(`/appointmentData/${_id}`)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => console.log(err));
}

function handleEdit(e) {
  console.log("handleEdit");
  const li = e.target.parentNode;
  selectedId = li.id;
  const appointmentData = li.innerText.split(" ");
  document.getElementById("name").value = appointmentData[0];
  document.getElementById("email").value = appointmentData[1];
  document.getElementById("phonenumber").value = appointmentData[2];
  document.getElementById("date").value = appointmentData[3];
  document.getElementById("time").value = appointmentData[4];
}
