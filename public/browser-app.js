const formDOM = document.querySelector(".form");
const emailInputDOM = document.querySelector("#email");
const passwordInputDOM = document.querySelector("#password");
const password1InputDOM = document.querySelector("#password1");
const password2InputDOM = document.querySelector("#password2");

formDOM.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = emailInputDOM.value;
  const password = passwordInputDOM.value;
  logIn();
});

const logIn = async () => {
  try {
    // const res = await axios.post("/api/v1/login", {
    //   email,
    //   password,
    // });
    const res = await axios.get(
      "http://www.7timer.info/bin/api.pl?lon=113.17&lat=23.09&product=astro&output=json"
    );
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

console.log("working");
