const axiosInstance = axios.create({
  baseURL: "https://crudcrud.com/api/5b20cb5aeea44c3e9db4b8cf0eee7d6b",
});
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
