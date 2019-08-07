var members = [];

function responseCallback() {
  var data = JSON.parse(this.responseText);
  members = data.results[0].members;

  createTable(members);
  createStateDropdown(members);
}

function errorCallback(err) {
  console.log('oh snap, summit went wrong', err);
}

var urlParams = new URLSearchParams(window.location.search);
var source = urlParams.get('source');

var ajaxRequest = new XMLHttpRequest();
ajaxRequest.onload = responseCallback;
ajaxRequest.onerror = errorCallback;
ajaxRequest.open('get', `https://api.propublica.org/congress/v1/116/${source}/members.json`, true);
ajaxRequest.setRequestHeader('X-API-Key', 'a9w0MsdnBU28edFlltNLnVKJ4B14yol4Rwx1lO7i');
ajaxRequest.setRequestHeader('Accept', 'application/json');
ajaxRequest.send();

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

    var state = document.getElementById("stateDropdown").value;

    createTable(members, {
        "democrat": isDemocratChecked,
        "republican": isRepublicanChecked,
        "independent": isIndependentChecked,
        "state": state
    });
}

// adding event listener to the State Dropdown :
var stateDropdown = document.getElementById("stateDropdown");

stateDropdown.addEventListener("change", function(event) {
    var democratCheckbox = document.getElementById("democrat");
    var republicanCheckbox = document.getElementById("republican");
    var independentCheckbox = document.getElementById("independent");

    var isDemocratChecked = democratCheckbox.checked
    var isRepublicanChecked = republicanCheckbox.checked
    var isIndependentChecked = independentCheckbox.checked

    var selectedOption = event.target;
    var state = selectedOption.value;

    createTable(members, {
        "democrat": isDemocratChecked,
        "republican": isRepublicanChecked,
        "independent": isIndependentChecked,
        "state": state
    });
});


// creating the actual table :
// filters is an object that is used to represent which parties and state to filter by :
function createTable(members, filters) {
    var democratIsChecked = filters ? filters.democrat : false;
    var republicanIsChecked = filters ? filters.republican : false;
    var independentIsChecked = filters ? filters.independent : false;
    var stateSelected = filters ? filters.state : "";
// if you dont pass filters, it will default all checkboxes to false :
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

        var state = members[i]["state"];
        if (stateSelected === "" || state === stateSelected) {
            // making sure that all members are displayed when no filters are checked :
            if (!democratIsChecked && !republicanIsChecked && !independentIsChecked) {
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
    }
    table.appendChild(body);
    var loader = document.getElementById("loader");
    loader.remove();
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

function createStateDropdown(members) {
    var groupedStates = {};

    for (var i = 0; i < members.length; i++) {
        var key = members[i]["state"];
        if (groupedStates[key]) {
            groupedStates[key].push(members[i]);
        } else {
            groupedStates[key] = [members[i]];
        }
    }

    var groupedStatesKeys = Object.keys(groupedStates);
    groupedStatesKeys.sort();

    var stateDropdown = document.getElementById("stateDropdown");
    for (var i = 0; i < groupedStatesKeys.length; i++) {
        var option = createOption(groupedStatesKeys[i]);
        stateDropdown.appendChild(option);
    }
}

function createOption(groupedStatesKeys){
    var option = document.createElement("option");
    var state = document.createTextNode(groupedStatesKeys);
    option.appendChild(state);

    return option;
}
