var baseURL = "https://intern-connect.herokuapp.com";
var major = document.getElementById("major");
var year = document.getElementById("year");
var college = document.getElementById("college");
var payment = document.getElementById("payment");
var hours = document.getElementById("hours");
var length = document.getElementById("length");
var summer = document.getElementById("summer");


fetch(baseURL + "/students")
  .then(response => response.json())
  .then(response => {
    var data = response.studentData;
    function filter(param, string) {
      var dataArray = [];
      for (let i = 0; i < data.length; i++) {
        if (dataArray.indexOf(data[i][string])) {
          dataArray.push(data[i][string]);
        }
      }
      var filterData = dataArray.filter(function(elem, pos) {
        return dataArray.indexOf(elem) == pos;
      });
      for (let i = 0; i < filterData.length; i++) {
        var options = document.createElement("option");
        options.value = i + 1;
        options.textContent = filterData[i];
        param.appendChild(options);
      }
    }
    filter(major, "major");
    filter(year, "year");
    filter(college, "college");
    filter(payment, "payment");
    filter(hours, "hours");
    filter(length, "length");
    filter(summer, "summer");
  });


document.querySelector("button").addEventListener("click", event => {
  event.preventDefault();
  sendData();
});



function sendData() {
  fetch(baseURL + "/students", {
    method: "POST",
    body: JSON.stringify(getData()),
    headers: new Headers({
      "Accept": "application/json",
      "Content-Type": "application/json"
    })
  })
    .then(response => response.json())
    .then(response => {
      var receivedMessage = document.querySelector(".receivedMessage");
      receivedMessage.textContent = "Response sent!";
    });
}

function getData() {
  const data = new FormData(document.querySelector("form"));
  return {
    contactName: data.get("name"),
    contactEmail: data.get("email"),
    contactPhone: data.get("phone"),
    preferredContactMethod: data.get("pref"),
    major: document.querySelector("#major").options[data.get("major")].textContent,
    year: document.querySelector("#year").options[data.get("year")].textContent,
    college: document.querySelector("#college").options[data.get("college")].textContent,
    payment: document.querySelector("#payment").options[data.get("payment")].textContent,
    hours: document.querySelector("#hours").options[data.get("hours")].textContent,
    length: document.querySelector("#length").options[data.get("length")].textContent,
    summer: document.querySelector("#summer").options[data.get("summer")].textContent,
    extraLinks: data.get("extraLinks"),
  };
}
