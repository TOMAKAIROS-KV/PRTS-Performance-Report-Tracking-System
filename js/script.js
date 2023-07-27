const selectedEmployee = document.querySelector(".eresult");
const employeeInfo = document.getElementById("employeeInfo");

const employeeData = [
  {
    FirstName: "Thomas",
    LastName: "Collins",
    Age: 27,
    Gender: "Male",
    Occupation: "Cashier",
    Positive: 0,
    Negative: 0,
  },
  {
    FirstName: "Karlie",
    LastName: "Shay",
    Age: 23,
    Gender: "Female",
    Occupation: "Lead Cashier",
    Positive: 0,
    Negative: 0,
  },
  {
    FirstName: "Brenna",
    LastName: "Morrison",
    Age: 25,
    Gender: "Female",
    Occupation: "Cashier",
    Positive: 0,
    Negative: 0,
  },
  {
    FirstName: "Jack",
    LastName: "Daniels",
    Age: 30,
    Gender: "Male",
    Occupation: "Senior Lead Cashier",
    Positive: 0,
    Negative: 0,
  },
];

const employeeReports = {};

function displayEmployeeInfo(i) {
  const empData = employeeData[i];

  employeeInfo.innerHTML = `
    <div id="eData">
      First Name: ${empData.FirstName}<br>
      Last Name: ${empData.LastName}<br>
      Age: ${empData.Age}<br>
      Gender: ${empData.Gender}<br>
      Occupation: ${empData.Occupation}<br><br>
      (+)Reports: ${empData.Positive}<br>
      (-)Reports: ${empData.Negative}<br>
    </div>
    <div id="rating">
      <h4>Select today's report:</h4>
      <label for="ratingPR">
        <input id="ratingPR" type="radio" name="rating" value="Positive" required>Positive (+)
      </label>
      <label for="ratingNR">
        <input id="ratingNR" type="radio" name="rating" value="Negative" required>Negative (-)
      </label>
      <div id="reportHere" style="display: none;">
        <label for="textInput">Summarize your report:</label>
        <textarea type="text" id="textInput" placeholder="Enter your report." required></textarea>
        <button id="submitBtn" type="submit">Submit</button>
      </div>
    </div>
    <div id="submittedLogs"></div> <!-- This is where we'll display the submitted logs -->
  `;

  const ratingPR = document.getElementById("ratingPR");
  const ratingNR = document.getElementById("ratingNR");
  const reportHere = document.getElementById("reportHere");
  const submittedLogs = document.getElementById("submittedLogs");

  function showReportHere() {
    reportHere.style.display = "flex";
  }

  ratingPR.addEventListener("change", showReportHere);
  ratingNR.addEventListener("change", showReportHere);

  submittedLogs.style.display = "block";
  submittedLogs.innerHTML = `
    <h2>Submitted Reports for ${empData.FirstName} ${empData.LastName}</h2>
    <ul>
      ${employeeReports[i]
        ? employeeReports[i]
            .map(
              (report) => `
                <li>
                  ${report.date} at ${report.time}: (${report.type}) ${report.report}
                </li>
              `
            )
            .join("")
        : "No reports submitted."}
    </ul>
  `;

  const submitBtn = document.getElementById("submitBtn");
  submitBtn.addEventListener("click", (event) => {
    event.preventDefault();

    const textInput = document.getElementById("textInput");
    const reportValue = textInput.value;
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString();
    const formattedTime = currentDate.toLocaleTimeString();

    const reportType = ratingPR.checked ? "Positive" : "Negative";

    if (reportType === "Positive") {
      empData.Positive += 1;
    } else if (reportType === "Negative") {
      empData.Negative += 1;
    }

    if (!employeeReports[i]) {
      employeeReports[i] = [];
    }
    employeeReports[i].push({
      date: formattedDate,
      time: formattedTime,
      type: reportType,
      report: reportValue,
    });

    submittedLogs.innerHTML = `
      <h2>Submitted Reports for ${empData.FirstName} ${empData.LastName}</h2>
      <ul>
        ${employeeReports[i]
          .map(
            (report) => `
              <br />
              <li>
                ${report.date} at ${report.time}: ${report.type === "Positive" ? "(+)" : "(-)"} ${report.report}
              </li>
              <br />
              <hr />
            `
          )
          .join("")}
      </ul>
    `;
  });
}

function selectedResult() {
  const selectedValue = selectedEmployee.value;
  let i;

  if (selectedValue === "4267") {
    i = 0;
  } else if (selectedValue === "4349") {
    i = 1;
  } else if (selectedValue === "4587") {
    i = 2;
  } else if (selectedValue === "4897") {
    i = 3;
  }

  displayEmployeeInfo(i);
}

selectedEmployee.addEventListener("change", selectedResult);
