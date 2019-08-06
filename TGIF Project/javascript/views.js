// getting all democrat members :
function findDemocrats(members) {
    var democrats = [];
    for (var i = 0; i < members.length; i++) {
        if (members[i]["party"] === "D") {
            democrats.push(members[i]);
        }
    }
    return democrats;
}

// getting all republican members :
function findRepublicans(members) {
    var republicans = [];
    for (var i = 0; i < members.length; i++) {
        if (members[i]["party"] === "R") {
            republicans.push(members[i]);
        }
    }
    return republicans;
}

// getting all independent members :
function findIndependents(members) {
    var independents = [];
    for (var i = 0; i < members.length; i++) {
        if (members[i]["party"] === "I") {
            independents.push(members[i]);
        }
    }
    return independents;
}

// finding average for democrats :
function findAvgDemocrats(members) {
    if (members === undefined || members.length == 0) {
        return 0;
    }
    var total = 0.0
    for (var i = 0; i < members.length; i++) {
        var individual = members[i]["votes_with_party_pct"];
        total = total + individual;
    }
    var result = total / members.length;
    return result;
}

// finding average for republicans :
function findAvgRepublicans(members) {
    if (members === undefined || members.length == 0) {
        return 0;
    }
    var total = 0.0
    for (var i = 0; i < members.length; i++) {
        var individual = members[i]["votes_with_party_pct"];
        total = total + individual;
    }
    var result = total / members.length;
    return result;
}

// finding average for independents :
function findAvgIndependents(members) {
    if (members === undefined || members.length == 0) {
        return 0;
    }
    var total = 0.0
    for (var i = 0; i < members.length; i++) {
        var individual = members[i]["votes_with_party_pct"];
        total = total + individual;
    }
    var result = total / members.length;
    return result;
}

// creating senate at a glance table :
function createSenateGlanceTable(statistics) {
    var table = document.getElementById("senate-glance");
    var body = document.getElementById("senate-glance-body");
    var parties = statistics.parties;
    for (var i = 0; i < parties.length; i++) {
        var row = createRow(parties[i]);
        body.appendChild(row);
    }
    table.appendChild(body);
    var loader = document.getElementById("loader");
    loader.remove();
}

// creating house at a glance table :
function createHouseGlanceTable(statistics) {
    var table = document.getElementById("house-glance");
    var body = document.getElementById("house-glance-body");
    var parties = statistics.parties;
    for (var i = 0; i < parties.length; i++) {
        var row = createRow(parties[i]);
        body.appendChild(row);
    }
    table.appendChild(body);
    var loader = document.getElementById("loader");
    loader.remove();
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

// creating least engaged table :
function createLeastEngagedTable(statistics) {
    var table = document.getElementById("least-engaged");
    var body = document.getElementById("least-engaged-body");
    var information = statistics.leastEngagedMembers;
    for (var i = 0; i < information.length; i++) {
        var row = createNewRow(information[i]);
        body.appendChild(row);
    }
    table.appendChild(body);
}

// creating most engaged table :
function createMostEngagedTable(statistics) {
    var table = document.getElementById("most-engaged");
    var body = document.getElementById("most-engaged-body");
    var information = statistics.mostEngagedMembers;
    for (var i = 0; i < information.length; i++) {
        var row = createNewRow(information[i]);
        body.appendChild(row);
    }
    table.appendChild(body);
}

// creating least loyal table :
function createLeastLoyalTable(statistics) {
    var table = document.getElementById("least-loyal");
    var body = document.getElementById("least-loyal-body");
    var information = statistics.leastLoyalMembers;
    for (var i = 0; i < information.length; i++) {
        var row = createNewRow(information[i]);
        body.appendChild(row);
    }
    table.appendChild(body);
}

// creating most loyal table :
function createMostLoyalTable(statistics) {
    var table = document.getElementById("most-loyal");
    var body = document.getElementById("most-loyal-body");
    var information = statistics.mostLoyalMembers;
    for (var i = 0; i < information.length; i++) {
        var row = createNewRow(information[i]);
        body.appendChild(row);
    }
    table.appendChild(body);
}

function createNewRow(information) {
    var nameCell = document.createElement("td");
    var nameCellText = document.createTextNode(information.fullName);
    nameCell.appendChild(nameCellText);

    var votesCell = document.createElement("td");
    var votesCellText = document.createTextNode(information.numOfVotes);
    votesCell.appendChild(votesCellText);

    var votesPercCell = document.createElement("td");
    var votesPercCellText = document.createTextNode(information.percentageOfVotes);
    votesPercCell.appendChild(votesPercCellText);


    var row = document.createElement("tr");
    row.appendChild(nameCell);
    row.appendChild(votesCell);
    row.appendChild(votesPercCell);

    return row;
}

// generating member engagement :
// this function is going to use missed_votes as a key in an object and we are going to map members based on that
// key. We will then sort that mapping depending on least/ most engagment, then taking 10% of that sorted list and
// simply displaying the menbers that are associated with those keys.
// Engagment = boolean value..if param true is passed -> Most Engaged.
function getMemberEngagment(members, engagement) {

    var percentage = 10;
    var groupedMembers = {};

    // loop that creates an ojbect that groups members with the same number of missed_votes(key)
    for (var i = 0; i < members.length; i++) {
        var key = members[i]["missed_votes"];
        if (groupedMembers[key]) {
            groupedMembers[key].push(members[i]);
        } else {
            groupedMembers[key] = [members[i]];
        }
    }
    var groupedMemberKeys = Object.keys(groupedMembers);
    var sortedGroupMembers = engagement ? groupedMemberKeys.sort(function(a, b){return a-b}) : groupedMemberKeys.sort(function(a, b){return b-a});
    var numOfRelevantMembers = Math.ceil((groupedMemberKeys.length / 100) * percentage);

    sortedGroupMembers = sortedGroupMembers.slice(0, numOfRelevantMembers);

    var engagedMembers = [];
    for (var i = 0; i < sortedGroupMembers.length; i++) {
        var missedVotesKey = sortedGroupMembers[i];
        for (var j = 0; j < groupedMembers[missedVotesKey].length; j++) {
            var currentMember = groupedMembers[missedVotesKey][j];
            var firstName = currentMember["first_name"] ? currentMember["first_name"] : "";
            var middleName = currentMember["middle_name"] ? currentMember["middle_name"] : "";
            var lastName = currentMember["last_name"] ? currentMember["last_name"] : "";
            var fullName = firstName +" "+middleName+" "+lastName;
            var numOfVotes = currentMember["missed_votes"];
            var percentageOfVotes = currentMember["missed_votes_pct"];
            engagedMembers.push({
                "fullName": fullName,
                "numOfVotes": numOfVotes,
                "percentageOfVotes": percentageOfVotes
            });
        }
    }
    return engagedMembers;
}

// //////////////////////////////////

function getMemberLoyalty(members, loyalty) {

    var percentage = 10;
    var groupedMembers = {};

    for (var i = 0; i < members.length; i++) {
        var key = members[i]["votes_with_party_pct"];
        if (groupedMembers[key]) {
            groupedMembers[key].push(members[i]);
        } else {
            groupedMembers[key] = [members[i]];
        }
    }
    var groupedMemberKeys = Object.keys(groupedMembers);
    var sortedGroupMembers = loyalty ? groupedMemberKeys.sort(function(a, b){return b-a}) : groupedMemberKeys.sort(function(a, b){return a-b});
    var numOfRelevantMembers = Math.ceil((groupedMemberKeys.length / 100) * percentage);

    sortedGroupMembers = sortedGroupMembers.slice(0, numOfRelevantMembers);

    var loyalMembers = [];
    for (var i = 0; i < sortedGroupMembers.length; i++) {
        var missedVotesKey = sortedGroupMembers[i];
        for (var j = 0; j < groupedMembers[missedVotesKey].length; j++) {
            var currentMember = groupedMembers[missedVotesKey][j];
            var firstName = currentMember["first_name"] ? currentMember["first_name"] : "";
            var middleName = currentMember["middle_name"] ? currentMember["middle_name"] : "";
            var lastName = currentMember["last_name"] ? currentMember["last_name"] : "";
            var fullName = firstName +" "+middleName+" "+lastName;
            var numOfVotes = currentMember["total_votes"];
            var percentageOfVotes = currentMember["votes_with_party_pct"];
            loyalMembers.push({
                "fullName": fullName,
                "numOfVotes": numOfVotes,
                "percentageOfVotes": percentageOfVotes
            });
        }
    }
    return loyalMembers;
}
