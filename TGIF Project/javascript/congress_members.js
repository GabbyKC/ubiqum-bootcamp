var members = data.results[0]["members"];

// Functions for Table
function createRow(member) {
    var row = document.createElement("tr");
    var partyCell = createCell(member["party"]);
    var stateCell = createCell(member["state"]);
    var senCell = createCell(member["seniority"]);
    var percentageCell = createCell(member["votes_with_party_pct"] + '%');
    var firstName = member['first_name'] ? member['first_name'] : "";
    var middleName = member['middle_name'] ? member['middle_name'] : "";
    var lastName = member['last_name'] ? member['last_name'] : "";
    var fullName = firstName+" "+middleName+" "+lastName;
    var fullNameCell = createCell();

    var links = document.createElement("a");
    links.setAttribute('href', member["url"]);
    var linkText = document.createTextNode(fullName);
    links.appendChild(linkText);
    fullNameCell.appendChild(links);

    row.appendChild(fullNameCell);
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
var table = document.getElementById("senate-data");
var body = document.createElement("tbody");

for (var i = 0; i < members.length; i++) {
    var row = createRow(members[i]);
    body.appendChild(row);
}
table.appendChild(body);
