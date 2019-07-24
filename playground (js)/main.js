console.log("starting JS");

var myName = "Gabby";
console.log(myName);

var myAge = 32;
console.log(myAge);

var ignasiAge = 32;
console.log(ignasiAge);

var ageDiff = myAge - ignasiAge;
console.log(ageDiff);


if (myAge > 21) {
    console.log("you are older than 21");
} else {
    console.log("you are younger than 21");
}

if (myAge === ignasiAge) {
    console.log("you are the same age!");
} else if (myAge > ignasiAge) {
    console.log("you are older than ignasi");
} else {
    console.log("you are younger than ignasi");
}

var team = ["Lucas", "Ottavia", "Johannes", "Rodrigo", "Burcu"];

team.sort();
console.log(team[0]);
console.log(team[4]);

for (var i = 0; i < team.length; i++) {
    console.log(team[i]);
}

var ages = [26, 27, 28, 23, 30];
var i = 0;

// logging all ages with while
while (i < ages.length) {
    console.log(ages[i]);
    i++;
}

// add condition with while
while (i < ages.length) {
    if (i % 2 === 0) {
        console.log(ages[i]);
    }
    i++;
}

// logging all ages with for
for (var i = 0; i < ages.length; i++) {
    console.log(ages[i]);
}

// adding condition with for
for (var i = 0; i < ages.length; i++) {
    if (ages[i] % 2 === 0) {
        console.log(ages[i]);
    }
}
