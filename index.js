const axiosInstance = axios.create({
  baseURL: "https://crudcrud.com/api/c87d9a76057d4956965c813dd3b12f91",
});
let selectedId = null;
const ul = document.getElementById("appointment");
const form = document.getElementById("patientdetails");
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
  list.innerText = `${name} \u200B ${email} \u200B${phonenumber}\u200B ${date}\u200B ${time} `;
  list.appendChild(deleteButton);
  list.appendChild(editButton);
  ul.appendChild(list);
}
function handleFormUpdate(customerAppointmentData) {
  const { name, email, phonenumber, date, time } = customerAppointmentData;
  const li = document.getElementById(selectedId);
  li.firstChild.data = `${name} \u200B ${email} \u200B${phonenumber}\u200B ${date}\u200B ${time} `;
  axiosInstance
    .put(`/appointmentData/${selectedId}`, customerAppointmentData)
    .then((res) => {
      console.log("resource updated successfully");
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
  form.reset();
}
function handleDelete(e) {
  e.preventDefault();
  const _id = e.target.parentNode.id;
  ul.removeChild(e.target.parentNode);
  axiosInstance
    .delete(`/appointmentData/${_id}`)
    .then((res) => {
      console.log("deleted successfully");
    })
    .catch((err) => console.log(err));
}
function handleEdit(e) {
  console.log("handleEdit");
  const li = e.target.parentNode;
  selectedId = li.id;
  const appointmentData = li.innerText.split("\u200B");
  document.getElementById("name").value = appointmentData[0];
  document.getElementById("email").value = appointmentData[1];
  document.getElementById("phonenumber").value = appointmentData[2];
  document.getElementById("date").value = appointmentData[3];
  document.getElementById("time").value = appointmentData[4];
}
function handleReset() {
  console.log("handleReset");
  selectedId = null;
}
