var members = [];
var statistics = {};

var urlParams = new URLSearchParams(window.location.search);
var source = urlParams.get('source');
var attendance = urlParams.get('attendance');


function responseCallback() {
  var data = JSON.parse(this.responseText);
  members = data.results[0].members;

  var democratMembers = findDemocrats(members);
  var republicanMembers = findRepublicans(members);
  var independentMembers = findIndependents(members);
  var avgDemocrats = findAvgDemocrats(democratMembers);
  var avgRepublicans = findAvgRepublicans(republicanMembers);
  var avgIndependents = findAvgIndependents(independentMembers);
  var leastEngagedMembers = getMemberEngagment(members, false);
  var mostEngagedMembers = getMemberEngagment(members, true);
  var leastLoyalMembers = getMemberLoyalty(members, false);
  var mostLoyalMembers = getMemberLoyalty(members, true);

  statistics = {
      "parties": [
          {
              "name": "Democrats",
              "total": democratMembers.length,
              "avgNumVoters": avgDemocrats.toFixed(2)+'%'
          },
          {
              "name": "Republicans",
              "total": republicanMembers.length,
              "avgNumVoters": avgRepublicans.toFixed(2)+'%'
          },
          {
              "name": "Independents",
              "total": independentMembers.length,
              "avgNumVoters": avgIndependents.toFixed(2)+'%'
          }
      ],
      "leastEngagedMembers": leastEngagedMembers,
      "mostEngagedMembers": mostEngagedMembers,
      "leastLoyalMembers": leastLoyalMembers,
      "mostLoyalMembers": mostLoyalMembers
  }
  createGlanceTable(statistics);

  if (attendance) {
      createLeastEngagedTable(statistics);
      createMostEngagedTable(statistics);
  } else {
      createLeastLoyalTable(statistics);
      createMostLoyalTable(statistics);
  }
}

function errorCallback(err) {
  console.log('oh snap, summit went wrong', err);
}

var ajaxRequest = new XMLHttpRequest();
ajaxRequest.onload = responseCallback;
ajaxRequest.onerror = errorCallback;
ajaxRequest.open('get', `https://api.propublica.org/congress/v1/116/${source}/members.json`, true);
ajaxRequest.setRequestHeader('X-API-Key', 'a9w0MsdnBU28edFlltNLnVKJ4B14yol4Rwx1lO7i');
ajaxRequest.setRequestHeader('Accept', 'application/json');
ajaxRequest.send();
