var members = data.results[0]["members"];

var democratMembers = findDemocrats(members);
function findDemocrats(members) {
    var democrats = [];
    for (var i = 0; i < members.length; i++) {
        if (members[i]["party"] === "D") {
            democrats.push(members[i]);
        }
    }
    return democrats;
}


var republicanMembers = findRepublicans(members);
function findRepublicans(members) {
    var republicans = [];
    for (var i = 0; i < members.length; i++) {
        if (members[i]["party"] === "R") {
            republicans.push(members[i]);
        }
    }
    return republicans;
}


var independentMembers = findIndependents(members);
function findIndependents(members) {
    var independents = [];
    for (var i = 0; i < members.length; i++) {
        if (members[i]["party"] === "I") {
            independents.push(members[i]);
        }
    }
    return independents;
}


var avgDemocrats = findAvgDemocrats(democratMembers);
function findAvgDemocrats(members) {
    var total = 0.0
    for (var i = 0; i < members.length; i++) {
        var individual = members[i]["votes_with_party_pct"];
        total = total + individual;
    }
    var result = total / members.length;
    return result;
}


var avgRepublicans = findAvgRepublicans(republicanMembers);
function findAvgRepublicans(members) {
    var total = 0.0
    for (var i = 0; i < members.length; i++) {
        var individual = members[i]["votes_with_party_pct"];
        total = total + individual;
    }
    var result = total / members.length;
    return result;
}


var avgIndependents = findAvgIndependents(independentMembers);
function findAvgIndependents(members) {
    var total = 0.0
    for (var i = 0; i < members.length; i++) {
        var individual = members[i]["votes_with_party_pct"];
        total = total + individual;
    }
    var result = total / members.length;
    return result;
}


var statistics = {
    "parties": [
        {
            "name": "Democrats",
            "total": democratMembers.length,
            "avgNumVoters": avgDemocrats.toFixed(2)
        },
        {
            "name": "Republicans",
            "total": republicanMembers.length,
            "avgNumVoters": avgRepublicans.toFixed(2)
        },
        {
            "name": "Independents",
            "total": independentMembers.length,
            "avgNumVoters": avgIndependents.toFixed(2)
        }
    ]
}


function createRow(party) {
    var nameCell = document.createElement("td");
    var nameCellText = document.createTextNode(party.name);
    nameCell.appendChild(nameCellText);

    var totalCell = document.createElement("td");
    var totalCellText = document.createTextNode(party.total);
    totalCell.appendChild(totalCellText);

    var avgCell = document.createElement("td");
    var avgCellText = document.createTextNode(party.avgNumVoters);
    avgCell.appendChild(avgCellText);

    var row = document.createElement("tr");
    row.appendChild(nameCell);
    row.appendChild(totalCell);
    row.appendChild(avgCell);

    return row;
}


var table = document.getElementById("senate-glance");
var body = document.getElementById("senate-glance-body");

function createSenateGlanceTable(statistics) {
    var parties = statistics.parties;
    for (var i = 0; i < parties.length; i++) {
        var row = createRow(parties[i]);
        body.appendChild(row);
    }
    table.appendChild(body);
}

createSenateGlanceTable(statistics);
