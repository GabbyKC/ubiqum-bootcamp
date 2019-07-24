function addBands (array) {
    for (var i = 0; i < array.length; i++) {
        var li = document.createElement("LI");
        var node = document.createTextNode(array[i]);
        li.appendChild(node);

        var lists = document.getElementById("band-list");
        lists.appendChild(li);
    }
}

addBands(["Nirvana","Blink"]);
addBands(['Dire Straits', 'Kansas', 'Steely Dan']);


function addMultTable(rows, cols){
  var table = document.createElement('table');
  var ref = document.getElementById("heading");
  ref.after(table);

  for(var x = 0; x < rows; x++){
    var tr = document.createElement('tr');

    for(var y = 0; y < cols; y++){
      var td = document.createElement('td');
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
}

addMultTable(10,2);
