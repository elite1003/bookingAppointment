const axiosInstance = axios.create({
  baseURL: "http://localhost:4001",
});
let selectedId = null;
const ul = document.getElementById("appointment");
const form = document.getElementById("patientdetails");
document.addEventListener("DOMContentLoaded", function () {
  axiosInstance
    .get("/booking")
    .then((res) => {
      for (let i = 0; i < res.data.length; i++) showAppointment(res.data[i]);
    })
    .catch((err) => console.log(err));
});

function showAppointment(data) {
  const { id, name, email, phonenumber, date, time } = data;
  const deleteButton = document.createElement("button");
  deleteButton.className = "delete-btn";
  deleteButton.innerText = "delete";
  deleteButton.addEventListener("click", handleDelete);
  const editButton = document.createElement("button");
  editButton.className = "edit-btn";
  editButton.innerText = "edit";
  editButton.addEventListener("click", handleEdit);
  const span = document.createElement("span");
  span.className = "text";
  span.innerText = `${name} \u200B ${email} \u200B${phonenumber}\u200B ${date}\u200B ${time} \u200B`;
  const list = document.createElement("li");
  list.id = id;
  list.className = "user";
  list.appendChild(span);
  list.appendChild(deleteButton);
  list.appendChild(editButton);
  ul.appendChild(list);
}

function handleSubmit(e) {
  e.preventDefault();
  const name = e.target.name.value.trim();
  const email = e.target.email.value.trim();
  const phonenumber = e.target.phonenumber.value.trim();
  const date = e.target.date.value.trim();
  const time = e.target.time.value.trim();
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
      .post("/booking", customerAppointmentData)
      .then((res) => showAppointment(res.data))
      .catch((err) => console.log(err));
  }
  form.reset();
}
function handleFormUpdate(customerAppointmentData) {
  const { name, email, phonenumber, date, time } = customerAppointmentData;
  const li = document.getElementById(selectedId);
  li.firstChild.data = `${name} \u200B ${email} \u200B${phonenumber}\u200B ${date}\u200B ${time} \u200B`;
  axiosInstance
    .put(`/booking/${selectedId}`, customerAppointmentData)
    .then((res) => {
      const { id, name, email, phonenumber, date, time } = res.data;
      const spanElement = document.querySelector(`#${CSS.escape(id)} .text`);
      spanElement.innerText = `${name} \u200B ${email} \u200B${phonenumber}\u200B ${date}\u200B ${time} \u200B`;
    })
    .catch((err) => console.log(err));
  selectedId = null;
}
function handleDelete(e) {
  e.preventDefault();
  const id = e.target.parentNode.id;
  ul.removeChild(e.target.parentNode);
  axiosInstance
    .delete(`/booking/${id}`)
    .then((res) => {
      console.log("deleted successfully");
    })
    .catch((err) => console.log(err));
}
function handleEdit(e) {
  const li = e.target.parentNode;
  selectedId = li.id;
  const appointmentData = li.innerText.split("\u200B");
  document.getElementById("name").value = appointmentData[0].trim();
  document.getElementById("email").value = appointmentData[1].trim();
  document.getElementById("phonenumber").value = appointmentData[2].trim();
  document.getElementById("date").value = appointmentData[3].trim();
  document.getElementById("time").value = appointmentData[4].trim();
}
function handleReset() {
  console.log("handleReset");
  selectedId = null;
}
