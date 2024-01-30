const axiosInstance = axios.create({
  baseURL: "https://crudcrud.com/api/5b20cb5aeea44c3e9db4b8cf0eee7d6b",
});

document.addEventListener("DOMContentLoaded", function () {
  axiosInstance.get("/appointmentData").then((res) => {
    showAppointment(res.data);
  });
});

function showAppointment(data) {
  const ul = document.getElementById("appointment");
  for (let i = 0; i < data.length; i++) {
    const { name, email, phonenumber, date, time } = data[i];
    // const deleteButton = document.createElement("button");
    // deleteButton.className = "delete-btn";
    // deleteButton.innerText = "delete";
    // deleteButton.addEventListener("click", handleDelete);
    // const editButton = document.createElement("button");
    // editButton.className = "edit-btn";
    // editButton.innerText = "edit";
    // editButton.addEventListener("click", handleEdit);
    const list = document.createElement("li");
    list.className = "user";
    list.innerText = `${name} - ${email} - ${phonenumber} - ${date} - ${time} `;
    // list.appendChild(deleteButton);
    // list.appendChild(editButton);
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
