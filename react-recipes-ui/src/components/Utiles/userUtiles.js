function getUserName() {
  const user = localStorage.getItem("user");
  const userJson = JSON.parse(user);
  console.log(userJson);
  return userJson["name"];
}

function getUserEmail() {
  const user = localStorage.getItem("user");
  const userJson = JSON.parse(user);
  return userJson["email"];
}
