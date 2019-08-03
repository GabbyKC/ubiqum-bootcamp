x = 45567;

function reverse(num) {
    var str = num.toString();

    var result = '';
    for (var i = str.length-1; i >= 0; i--) {
        result = result.concat(str.charAt(i));
    }

    return Number(result);
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

function titleCase(sentence) {
  var words = sentence.toLowerCase().split(' ');
  for (var i = 0; i < words.length; i++) {
    words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
  }
  return words.join(' ');
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
