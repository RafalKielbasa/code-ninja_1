const url = "http://localhost:3000/api/products";

async function getData() {
  try {
    const response = await fetch(url, {
      headers: { authorization: "Bearer secret-token-123" },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

function generateTable(itemData) {
  const tableBody = document.getElementById("table-body");
  const tableHead = document.getElementById("table-head");
  const dataHeads = itemData[0];
  const headerNames = Object.keys(dataHeads);
  headerNames.forEach((name) => {
    const th = document.createElement("th");
    th.textContent = name;
    tableHead.appendChild(th);
  });

  itemData.forEach((tableRowData) => {
    const row = document.createElement("tr");
    Object.values(tableRowData).forEach((tableRow) => {
      const cell = document.createElement("td");
      cell.textContent = tableRow;
      row.appendChild(cell);
    });
    tableBody.appendChild(row);
  });
}

async function main() {
  const itemData = await getData();
  generateTable(itemData);
}

main();
