// Functions for Table
function createRow(member) {
    var row = document.createElement("tr");
    var firstNameCell = createCell(member["first_name"]);
    var middleNameCell = createCell(member["middle_name"]);
    var lastNameCell = createCell(member["last_name"]);
    var partyCell = createCell(member["party"]);
    var stateCell = createCell(member["state"]);
    var senCell = createCell(member["seniority"]);
    var percentageCell = createCell(member["votes_with_party_pct"] + '%');

    row.appendChild(firstNameCell);
    row.appendChild(middleNameCell);
    row.appendChild(lastNameCell);
    row.appendChild(partyCell);
    row.appendChild(stateCell);
    row.appendChild(senCell);
    row.appendChild(percentageCell);

    return row;
}

function createCell(memberData) {
    var cell = document.createElement("td");
    // ternary operator; to check for empty or undefined string in memberData
    var cellText = document.createTextNode(memberData ? memberData : "");
    cell.appendChild(cellText);

    return cell
}

// Looping Table
var members = data.results[0]["members"];

var table = document.getElementById("senate-data");
var body = document.createElement("tbody");

for (var i = 0; i < members.length; i++) {
    var row = createRow(members[i]);
    body.appendChild(row);
}
table.appendChild(body);
