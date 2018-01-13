var baseURL = "https://intern-connect.herokuapp.com";
var posts = document.querySelector("div");
var pulledMajors = [];
var pulledCoData = [];
var matchedData = [];

fetch(baseURL + "/newStudentsData")
  .then(response => response.json())
  .then(response => {
    for (
      var newStudentData = 0;
      newStudentData < response.length;
      newStudentData++
    ) {
      var pulledStudentMajors = {};
      pulledStudentMajors.name = response[newStudentData].contactName;
      pulledStudentMajors.major = response[newStudentData].major;
      pulledMajors.push(pulledStudentMajors);
    }
  })
  .then(
    fetch(baseURL + "/company")
      .then(response => response.json())
      .then(response => {
        var data = response.companyData;
        for (var companyData = 0; companyData < data.length; companyData++) {
          var pulledCoMajors = {};
          pulledCoMajors.major = data[companyData].type;
          pulledCoMajors.name = data[companyData].companyName;
          pulledCoMajors.website = data[companyData].websiteLink;
          pulledCoMajors.payment = data[companyData].payment;
          pulledCoData.push(pulledCoMajors);
        }
        matching(pulledMajors, pulledCoData);
      })
  );

function matching(pulledMajors, pulledCoData) {
  for (var CoData = 0; CoData < pulledCoData.length; CoData++) {
    for (var MajorData = 0; MajorData < pulledMajors.length; MajorData++) {
      if (pulledCoData[CoData].major === pulledMajors[MajorData].major) {
        matchedData.push(pulledCoData[CoData]);
      }
    }
  }
  var filteredMatchedData = matchedData.filter(function(elem, pos) {
    return matchedData.indexOf(elem) == pos;
  });

  function addPosts() {
    for (
      var filteredData = 0;
      filteredData < filteredMatchedData.length;
      filteredData++
    ) {
      var newPosts = document.createElement("div");
      newPosts.id = filteredData;

      var coName = document.createElement("h1");
      coName.textContent =
        "Company Name: " + filteredMatchedData[filteredData].name;
      var x = document.createElement("HR");
      coName.appendChild(x);
      newPosts.appendChild(coName);

      var coWebsite = document.createElement("a");
      coWebsite.href = filteredMatchedData[filteredData].website;
      coWebsite.textContent =
        "Website: " + filteredMatchedData[filteredData].website;
      var y = document.createElement("HR");
      y.classList.add("smaller");
      coWebsite.appendChild(y);
      newPosts.appendChild(coWebsite);

      var internType = document.createElement("p");
      internType.textContent =
        "Intern Wanted: " + filteredMatchedData[filteredData].major;
      var z = document.createElement("HR");
      z.classList.add("smaller");
      internType.appendChild(z);
      newPosts.appendChild(internType);

      var payment = document.createElement("p");
      payment.textContent =
        "Paid or for Credit: " + filteredMatchedData[filteredData].payment;
      var q = document.createElement("HR");
      q.classList.add("smaller");
      payment.appendChild(q);
      newPosts.appendChild(payment);

      posts.appendChild(newPosts);
    }
  }
  addPosts();
}
