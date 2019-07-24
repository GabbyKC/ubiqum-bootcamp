x = 45567;

function reverse(num) {
    return (
        parseFloat(
            num
            .toString()
            .split('')
            .reverse()
            .join('')
        )
    )
}

x = 'webmaster';

function alpha(x) {
    return (
        x
        .split('')
        .sort()
        .join('')
    )
}

str = 'prince of persia';

function titleCase(str) {
  str = str.toLowerCase().split(' ');
  for (var i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
  }
  return str.join(' ');
}


x = 'Web Development Tutorial';

function findLongestWord(str) {
  var strSplit = str.split(' ');
  var longestWord = 0;
  for(var i = 0; i < strSplit.length; i++){
    if(strSplit[i].length > longestWord){
	longestWord = strSplit[i].length;
     }
  }
  return longestWord;
}
