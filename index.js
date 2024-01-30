const axiosInstance = axios.create({
  baseURL: "https://crudcrud.com/api/5b20cb5aeea44c3e9db4b8cf0eee7d6b",
});

document.addEventListener("DOMContentLoaded", function () {
  axiosInstance
    .get("/appointmentData")
    .then((res) => {
      showAppointment(res.data);
    })
    .catch((err) => console.log(err));
});

function showAppointment(data) {
  const ul = document.getElementById("appointment");
  for (let i = 0; i < data.length; i++) {
    const { _id, name, email, phonenumber, date, time } = data[i];
    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-btn";
    deleteButton.innerText = "delete";
    deleteButton.addEventListener("click", handleDelete);
    const list = document.createElement("li");
    list.id = _id;
    list.className = "user";
    list.innerText = `${name} - ${email} - ${phonenumber} - ${date} - ${time} `;
    list.appendChild(deleteButton);
    ul.appendChild(list);
  }
}
function handleSubmit(e) {
  e.preventDefault();
  const name = e.target.name.value;
  const email = e.target.email.value;
  const phonenumber = e.target.phonenumber.value;
  const date = e.target.date.value;
  const time = e.target.time.value;

  axiosInstance
    .post("/appointmentData", {
      name,
      email,
      phonenumber,
      date,
      time,
    })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
}
function handleDelete(e) {
  e.preventDefault();
  const ul = document.getElementById("appointment");
  const _id = e.target.parentNode.id;
  ul.removeChild(e.target.parentNode);
  axiosInstance
    .delete(`/appointmentData/${_id}`)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => console.log(err));
}
