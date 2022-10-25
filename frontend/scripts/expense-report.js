let report = document.getElementById("report");

async function fetchData(month) {
  report.innerHTML = "";
  try {
    let response = await axios({
      method: "get",
      url: api + "expense/month/" + month,
    });

    let data = response.data.data;
    console.log(data);
    let dt = "";
    let incomeAmount = 0;
    let expenseAmount = 0;
    for (const d of data) {
      let category = d.category.category;
      let income = category === "income" ? d.amount : "-";
      let amount = category !== "income" ? d.amount : "-";
      incomeAmount += category === "income" ? d.amount : 0;
      expenseAmount += category !== "income" ? d.amount : 0;

      let structure = `  <tr>
        <td>${d.createdAt.split("T")[0]}</td>

        <td>${d.description}</td>

        <td>${
          d.category.category[0].toUpperCase() + d.category.category.substr(1)
        }</td>

        <td>${income}</td>

        <td>${amount}</td>
      </tr>`;
      dt += structure;
    }

    let footer = `         <tr><td></td> <td></td> <td></td>
    <td>Saving</td>
    <td>${incomeAmount - expenseAmount}</td>
        </tr>`;

    let monthlyData = `
 
    <div class="container d-flex justify-content-center fs-1">
      Monthly Expense
    </div>
    <div
      class="container d-flex justify-content-center mt-5 table-responsive"
    >
      <table
        class="table table-bordered table-hover table-style table-striped"
      >
        <thead>
          <tr>
            <th>Date</th>

            <th>Description</th>

            <th>Category</th>

            <th>Income</th>

            <th>Expense</th>
          </tr>
        </thead>
        <tbody>
            ${dt}
        </tbody>
        <tfoot class="table-secondary">
      ${footer}
        </tfoot>
      </table>
    </div>`;
    let monthExpense = document.createElement("div");
    monthExpense.setAttribute("id", "monthly-report");
    monthExpense.setAttribute("class", "mt-5");
    monthExpense.innerHTML = monthlyData;
    report.appendChild(monthExpense);

    //generateYearlyReport();
  } catch (err) {
    console.log(err);
  }
}

function generateExpenseReport(e) {
  console.log(e.value);
  fetchData(e.value);
}

function logout() {
  localStorage.removeItem("token");
  window.location = "./login.html";
}
