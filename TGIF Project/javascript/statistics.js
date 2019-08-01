var members = data.results[0]["members"];

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
    ],
    "leastEngagedMembers": leastEngagedMembers,
    "mostEngagedMembers": mostEngagedMembers,
    "leastLoyalMembers": leastLoyalMembers,
    "mostLoyalMembers": mostLoyalMembers
}
