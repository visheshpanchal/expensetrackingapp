let getForm = document.getElementById("my-form");
let urlLink = "http://localhost:3000/expense/";
let btn = getForm.lastElementChild;
let PAGE = 1;
let LIMIT = 10;
getForm.addEventListener("submit", store);

// Store Item
function store(e) {
  e.preventDefault();

  let amount = document.getElementById("amount").value;
  let description = document.getElementById("description").value;
  let category = document.getElementById("category");

  let catValue = category.selectedIndex;

  let attr = btn.getAttribute("name");

  if (attr !== "add" && attr !== undefined) {
    let link = urlLink + attr;
    let obj = {};
    obj["amount"] = amount;
    obj["description"] = description;
    obj["category"] = category.options[catValue].value;
    putDataOnCloud(link, obj);
  } else {
    let obj = {};
    obj["amount"] = amount;
    obj["description"] = description;
    obj["category"] = category.options[catValue].value;
    postDataOnCloud(urlLink, obj);
  }
}

// Displaying Stored Item
let table = document.getElementById("my-table");
let pageObject = document.getElementById("pagination");
let premiumUser = document.getElementById("premium-user");
async function storage() {
  table.innerHTML = "";
  pageObject.innerHTML = "";

  try {
    let res = await axios({
      method: "get",
      url: urlLink + `?page=${PAGE}&&limit=${LIMIT}`,
    });
    let count = res.data.totalItems;
    let totalPageNo = Math.ceil(count / LIMIT);
    let jsonData = res.data.data;

    if (jsonData.length > 0) {
      let tableHead = document.createElement("thead");
      tableHead.innerHTML = ` <th>Amount</th> <th>Description</th> <th>Category</th> <th> Delete </th> <th> Edit </th>`;
      table.appendChild(tableHead);

      let tableBody = document.createElement("tbody");

      let rows = "";
      for (let i = 0; i < jsonData.length; i++) {
        let category = jsonData[i]["category"].category;
        let oneRow = `<tr><td>${jsonData[i]["amount"]}</td>
        <td>${jsonData[i]["description"]}</td>
        <td>${category[0].toUpperCase() + category.substr(1)}</td>`;
        oneRow += `<td><button class="btn btn-danger" id="deleteItem" onclick="deleteData(this)" name="${jsonData[i]["_id"]}">Delete</button></td>`;

        oneRow += `<td><button class="btn btn-primary" id="editItem" onclick="editData(this)" name="${jsonData[i]["_id"]}">Edit</button></td></tr>`;
        rows += oneRow;
      }

      tableBody.innerHTML = "<tbody>" + rows + "</tbody>";
      table.appendChild(tableBody);
      // Pagination

      let pageNavbar = document.createElement("nav");

      let totalPage = "";
      for (let i = 0; i < totalPageNo; i++) {
        let activePage = i + 1 == PAGE ? "active" : "";

        let pageNumber = ` <li class="page-item ${activePage}">
        <button class="page-link" onclick="pageChange(this)">${i + 1}</button>
      </li>`;
        totalPage += pageNumber;
      }
      let disabledNextPage = PAGE === totalPageNo ? "disabled" : "";
      let disabledPreviousPage = PAGE === 1 ? "disabled" : "";
      let pagination = `
      <ul class="pagination">
        <li class="page-item ${disabledPreviousPage}">
          <button class="page-link "  aria-label="Previous" onclick="previousPage(this)">
            <span aria-hidden="true" >&laquo;</span>
          </button>
        </li>
       
        ${totalPage}
        <li class="page-item ${disabledNextPage}">
          <button class="page-link "  aria-label="Next" onclick="nextPage(this)">
            <span aria-hidden="true">&raquo;</span>
          </button>
        </li>
      </ul>`;
      pageNavbar.innerHTML = pagination;
      pageObject.appendChild(pageNavbar);
    } else {
      table.style.display = "none";
    }
    console.log(res.data);
    if (res.data.premium === 1) {
      premiumUser.innerHTML = `<a href="./expense-report.html" class="btn text-light bg-dark fs-4 mt-auto">Generate Report</a>`;
    }
  } catch (e) {
    console.log(e);
  }
}
// After DOM Loaded we fetch data from crud crud
window.addEventListener("DOMContentLoaded", (event) => {
  storage();
});

// Some Pagination Methods and Limit Methods
function pageChange(e) {
  let value = Number(e.innerText);
  PAGE = value;
  storage();
}

function changeLimit(e) {
  let value = Number(e.value);
  PAGE = 1;
  LIMIT = value;
  storage();
}

function nextPage(e) {
  PAGE++;
  storage();
}
function previousPage(e) {
  PAGE--;
  storage();
}
// Delete Item By Click
async function deleteData(ele) {
  let number = ele.name;
  let _urlLink = urlLink + number;

  try {
    let res = await axios({ method: "delete", url: _urlLink });

    location.reload();
  } catch (err) {
    console.log(err);
  }
}

// Post Method
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.post["Accept"] = "*/*";
async function postDataOnCloud(urlLink, dataItems) {
  try {
    let res = await axios({
      method: "post",
      url: urlLink,
      data: dataItems,
    });
    if (res.status === 201) {
      location.reload();
    }
  } catch (err) {
    console.log(err);
  }
}

// Put Method

async function editData(ele) {
  let number = ele.name;
  let amount = document.getElementById("amount");
  let description = document.getElementById("description");
  let category = document.getElementById("category");

  let _urlLink = urlLink;
  try {
    let getData = await axios({ method: "get", url: _urlLink + number });

    let data = getData.data.data[0];

    amount.value = data["amount"];
    description.value = data["description"];
    category.selectedIndex = data["category"];
    categoryIndex = data["categoryId"];
    for (const option of category.options) {
      if (option.value === categoryIndex.toString()) {
        category.selectedIndex = option.index;
        break;
      }
    }

    btn.setAttribute("name", number);
    btn.textContent = "Update";
  } catch (err) {
    console.log(err);
  }
}

async function putDataOnCloud(urlLink, _data) {
  try {
    let res = await axios({ method: "put", url: urlLink, data: _data });

    location.reload();
  } catch (err) {
    console.log(err);
  }
}

// Getting All Categories

window.addEventListener("DOMContentLoaded", async function (event) {
  let category = document.getElementById("category");

  try {
    let response = await axios({ method: "get", url: api + "category" });
    let data = response.data.data;

    for (const item of data) {
      let option = document.createElement("option");
      option.setAttribute("value", item.id);
      option.innerText =
        item.category[0].toUpperCase() + item.category.substr(1);
      category.appendChild(option);
    }
  } catch (error) {
    console.log(error);
  }
});

// Logout
function logout() {
  localStorage.removeItem("token");
  window.location = "./login.html";
}
