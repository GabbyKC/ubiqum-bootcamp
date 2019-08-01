var members = data.results[0]["members"];

// generating members on page load :
createTable(members);
//

// grabbing checkboxes for party filtering by ID:
var democratCheckbox = document.getElementById("democrat");
var republicanCheckbox = document.getElementById("republican");
var independentCheckbox = document.getElementById("independent");

// adding eventListener to each checkbox :
democratCheckbox.addEventListener("change", checkboxChange);
republicanCheckbox.addEventListener("change", checkboxChange);
independentCheckbox.addEventListener("change", checkboxChange);

// callback function for above eventListener :
function checkboxChange(e) {
    var isDemocratChecked = democratCheckbox.checked
    var isRepublicanChecked = republicanCheckbox.checked
    var isIndependentChecked = independentCheckbox.checked

    createTable(members, {
        "democrat": isDemocratChecked,
        "republican": isRepublicanChecked,
        "independent": isIndependentChecked,
    });
}

// creating the actual table :
// partyFilters is an object that is used to represent which parties to filter by :
function createTable(members, partyFilters) {
    var democratIsChecked = partyFilters ? partyFilters.democrat : false;
    var republicanIsChecked = partyFilters ? partyFilters.republican : false;
    var independentIsChecked = partyFilters ? partyFilters.independent : false;
// if you dont pass partyFilters, it will default all checkboxes to false :

    var table = document.getElementById("senate-data");

    var existingBody = table.querySelector("tbody")
    if (existingBody) {
        existingBody.remove();
    }

    var body = document.createElement("tbody");
    for (var i = 0; i < members.length; i++) {
        var isDemocrat = members[i]["party"] === "D";
        var isRepublican = members[i]["party"] === "R";
        var isIndependent = members[i]["party"] === "I";

// making sure that all members are displayed when no filters are checked :
        if(!democratIsChecked && !republicanIsChecked && !independentIsChecked) {
            var row = createRow(members[i]);
            body.appendChild(row);
        }

        if (democratIsChecked && isDemocrat) {
            var row = createRow(members[i]);
            body.appendChild(row);
        } else if (republicanIsChecked && isRepublican) {
            var row = createRow(members[i]);
            body.appendChild(row);
        } else if (independentIsChecked && isIndependent) {
            var row = createRow(members[i]);
            body.appendChild(row);
        }
    }
    table.appendChild(body);
}

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

    return cell;
}
