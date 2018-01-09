var baseURL = "https://intern-connect.herokuapp.com";
var industry = document.getElementById("industry");
var age = document.getElementById("age");
var employeeNumber = document.getElementById("employeeNumber");
var type = document.getElementById("type");
var payment = document.getElementById("payment");
var hours = document.getElementById("hours");
var length = document.getElementById("length");
var summer = document.getElementById("summer");




fetch(baseURL + "/company")
  .then(response => response.json())
  .then(response => {
    var data = response.companyData;
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
    filter(industry, "industry");
    filter(age, "age");
    filter(employeeNumber, "employeeNumber");
    filter(type, "type");
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
  fetch(baseURL + "/company", {
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
    companyName: data.get("coName"),
    contactName: data.get("name"),
    contactEmail: data.get("email"),
    contactPhone: data.get("phone"),
    preferredContactMethod: data.get("pref"),
    websiteLink: data.get("website"),
    industry: document.querySelector("#industry").options[data.get("industry")].textContent,
    age: document.querySelector("#age").options[data.get("age")].textContent,
    employeeNumber: document.querySelector("#employeeNumber").options[data.get("employeeNumber")].textContent,
    type: document.querySelector("#type").options[data.get("type")].textContent,
    payment: document.querySelector("#payment").options[data.get("payment")].textContent,
    hours: document.querySelector("#hours").options[data.get("hours")].textContent,
    length: document.querySelector("#length").options[data.get("length")].textContent,
    summer: document.querySelector("#summer").options[data.get("summer")].textContent,
  };
}
