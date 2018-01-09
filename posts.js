var baseURL = "https://intern-connect.herokuapp.com";
var posts = document.querySelector("div");
var pulledMajors = [];
var pulledCoData = [];
var matchedData = [];



fetch(baseURL + "/newStudentsData")
  .then(response => response.json())
  .then(response => {
    for (var i = 0; i < response.length; i++) {
      var pulledStudentMajors = {};
      pulledStudentMajors.name = response[i].contactName;
      pulledStudentMajors.major = response[i].major;
      pulledMajors.push(pulledStudentMajors);
    }
  })
  .then(
    fetch(baseURL + "/company")
      .then(response => response.json())
      .then(response => {
        var data = response.companyData;
        for (var i = 0; i < data.length; i++) {
          var pulledCoMajors = {};
          pulledCoMajors.major = data[i].type;
          pulledCoMajors.name = data[i].companyName;
          pulledCoMajors.website = data[i].websiteLink;
          pulledCoMajors.payment = data[i].payment;
          pulledCoData.push(pulledCoMajors);
        }
        matching(pulledMajors, pulledCoData);
      }));


function matching(pulledMajors, pulledCoData) {
  for (var k = 0; k < pulledCoData.length; k++) {
    for (var j = 0; j < pulledMajors.length; j++) {
      if (pulledCoData[k].major === pulledMajors[j].major) {
        matchedData.push(pulledCoData[k]);
      }
    }
  }
  var filteredMatchedData = matchedData.filter(function(elem, pos) {
    return matchedData.indexOf(elem) == pos;
  });

  function addPosts() {
    for (var i = 0; i < filteredMatchedData.length; i++) {
      var newPosts = document.createElement("div");
      newPosts.id = i;

      var coName = document.createElement("h1");
      coName.textContent = "Company Name: " + filteredMatchedData[i].name;
      var x = document.createElement("HR");
      coName.appendChild(x);
      newPosts.appendChild(coName);


      var coWebsite = document.createElement("a");
      coWebsite.href = filteredMatchedData[i].website;
      coWebsite.textContent = "Website: " + filteredMatchedData[i].website;
      var y = document.createElement("HR");
      y.classList.add("smaller");
      coWebsite.appendChild(y);
      newPosts.appendChild(coWebsite);

      var internType = document.createElement("p");
      internType.textContent = "Intern Wanted: " + filteredMatchedData[i].major;
      var z = document.createElement("HR");
      z.classList.add("smaller");
      internType.appendChild(z);
      newPosts.appendChild(internType);

      var payment = document.createElement("p");
      payment.textContent = "Paid or for Credit: " + filteredMatchedData[i].payment;
      var q = document.createElement("HR");
      q.classList.add("smaller");
      payment.appendChild(q);
      newPosts.appendChild(payment);

      posts.appendChild(newPosts);
    }
  }
  addPosts();
}
