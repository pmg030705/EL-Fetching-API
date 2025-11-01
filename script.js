document.addEventListener("DOMContentLoaded", () => {
  const inputForm = document.getElementById("input-form");
  const nameInput = document.querySelector("#name");
  const errorBox = document.querySelector(".error-box");
  const fetchBtn = document.querySelector("#fetch-btn");
  const fetchedDetailsDiv = document.querySelector(".fetched-details");
  const username = document.querySelector("#userName");
  const useremail = document.querySelector("#userEmail");
  const useraddress = document.querySelector("#userAddress");

  nameInput.addEventListener("click", () => {
    nameInput.placeholder = "";
    nameInput.value = "";
  });

  inputForm.addEventListener("submit", (e) => {
    e.preventDefault();
    // location.reload();
  });

  fetchBtn.addEventListener("click", async () => {
    // console.log(nameInput.value.trim());

    if (nameInput.value.trim() === "") {
      fetchedDetailsDiv.classList.add("hidden");
      errorBox.classList.remove("hidden");
      errorBox.innerHTML = "Please enter the Full Name..!";
      return;
    }

    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      if (!response.ok) throw new Error("Error new fetching API");

      const users = await response.json();
      let userFound = false;
      //   console.log(user);
      users.forEach((user) => {
        if (user.name === nameInput.value.trim()) {
          errorBox.classList.add("hidden");
          nameInput.value = "";
          nameInput.placeholder = "Enter your full name";
          fetchedDetailsDiv.classList.remove("hidden");
          username.innerHTML = user.name;
          useremail.innerHTML = user.email;
          useraddress.innerHTML = `${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`;
          userFound = true;
        }
      });
      if (!userFound) {
        fetchedDetailsDiv.classList.add("hidden");
        errorBox.classList.remove("hidden");
        errorBox.innerHTML = "User not found..!";
      }
    } catch (err) {
      console.log(err);
    }
  });
});
