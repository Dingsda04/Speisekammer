const headerTitles = ["Name", "Regal", "Stückzahl", "Erforderlich", "Verbrauch /Monat", "Hält noch (Monate)", "Kategorie"];
const btnNewElement = document.getElementById("ne");
const tableHeaderContainer = document.getElementById("table-header-container");
let isPopupOpen = false;
let set = document.getElementById('set');
let get = document.getElementById('get');
let click = 0;

let cells;

btnNewElement.onclick = function () {

  if (isPopupOpen) return; // Prüfen, ob das Popup bereits geöffnet ist

  // erstelle das Popup
  const popup = document.createElement("div");
  popup.classList.add("popup");

  // erstelle die Inputfelder für die Tabellenzelle
  const inputs = [];
  for (let i = 0; i < headerTitles.length; i++) {
    const input = document.createElement("input");
    input.type = "text";
    input.classList.add("table-cell");
    input.placeholder = headerTitles[i];
    inputs.push(input);
    popup.appendChild(input);
  }

  // erstelle die Buttons
  const btnCancel = document.createElement("button");
  btnCancel.classList.add("btn");
  btnCancel.textContent = "Abbrechen";
  popup.appendChild(btnCancel);

  const btnFinish = document.createElement("button");
  btnFinish.classList.add("btn");
  btnFinish.textContent = "Fertig";
  popup.appendChild(btnFinish);

  // füge das Popup dem Dokument hinzu
  tableHeaderContainer.appendChild(popup);

  // lege den Fokus auf das erste Inputfeld
  inputs[0].focus();

  // Funktion, die aufgerufen wird, wenn der Fertig-Button geklickt wird
  btnFinish.onclick = function () {
    const name = inputs[0].value;
    const shelf = inputs[1].value;
    const quantity = inputs[2].value;
    const required = inputs[3].value;
    const consum = inputs[4].value;
    const category = inputs[6].value;

    for (let i = 0; i < inputs.length; i++) {
      try {
        inputs[i].classList.remove('error');
      } catch (error) {}
    }

    if (name == "Name" || name == '') {
      inputs[0].classList.add("error");
      alert("Bitte geben Sie einen Namen ein.");
      return;
    }
    if (shelf == "Regalfach" ||  shelf == '') {
      inputs[1].classList.add("error");
      alert("Bitte geben Sie ein Regalfach an.");
      return;
    }
    if (quantity == "Stückzahl" ||  quantity == '') {
      inputs[2].classList.add("error");
        alert("Bitte geben Sie eine vorhandene Stückzahl an.");
      return;
    }
    if (required == "Erforderlich" ||  required == '') {
      inputs[3].classList.add("error");
      alert("Bitte geben Sie die erforderliche Stückzahl an.");
      return;
    }
    if (category == "Kategorie" ||  category == '') {
      inputs[4].classList.add("error");
      alert("Bitte geben Sie eine Kategorie ein.");
      return;
    }

    if (!isNaN(name)) {
      inputs[0].classList.add("error");
      alert('Name muss als Text eingegeben werden');
      return;
    }
    
    if (!isNaN(category)) {
      inputs[4].classList.add("error");
      alert('Kategorie muss als Text eingegeben werden');
      return;
    }
    
    if (isNaN(required)) {
      inputs[3].classList.add("error");
      alert('Erforderlich muss eine Zahl sein');
      return;
    }
    
    if (isNaN(quantity)) {
      inputs[2].classList.add("error");
      alert('Stückzahl muss eine Zahl sein');
      return;
    }

    if (isNaN(consum)) {
      inputs[2].classList.add("error");
      alert('Verbrauch muss eine Zahl sein');
      return;
    }
    
    createTableHeader(name, shelf, quantity, required, consum, null, category);
  
    // entferne das Popup
    tableHeaderContainer.removeChild(popup);

    isPopupOpen = false;

    for (let i = 0; i < inputs.length; i++) {
      try {
        inputs[i].classList.remove('error');
      } catch (error) {}
    }
  };
  // Funktion, die aufgerufen wird, wenn der Abbrechen-Button geklickt wird
  btnCancel.onclick = function () {
  // entferne das Popup
  tableHeaderContainer.removeChild(popup);

  isPopupOpen = false; // Das Popup wurde geschlossen
};
isPopupOpen = true; // Das Popup wurde geöffnet
};

// Funktionsaufruf bei jedem Speichern
function saveTableHeaders() {
    const headers = document.querySelectorAll(".table-header");
    const headerData = [];
  
    for (let i = 0; i < headers.length; i++) {
      const cells = headers[i].querySelectorAll(".table-cell");
      const cellData = [];
  
      for (let j = 0; j < cells.length; j++) {
        cellData.push(cells[j].textContent);
      }
  
      headerData.push(cellData);
    }
  
    localStorage.setItem("tableHeaders", JSON.stringify(headerData));

    // const headers_list = document.querySelectorAll(".table-header-list");
    // const headerData_list = [];
  
    // for (let i = 0; i < headers_list.length; i++) {
    //   const cells = headers_list[i].querySelectorAll(".table-cell-list");
    //   const cellData = [];
  
    //   for (let j = 0; j < cells.length; j++) {
    //     cellData.push(cells[j].textContent);
    //   }
  
    //   headerData_list.push(cellData);
    // }
  
    // localStorage.setItem("tableHeadersList", JSON.stringify(headerData_list));
  }

  // Funktionsaufruf beim Laden der Seite
  function loadTableHeaders() {
    const headerData = JSON.parse(localStorage.getItem("tableHeaders"));
  
    if (headerData) {
      for (let i = 0; i < headerData.length; i++) {
        if(headerData[i][0] !== 'Name'){
            createTableHeader(...headerData[i]);
        }
      }
    }
    createTableHeader(...headerTitles);
  }
  
  loadTableHeaders();
  
  function createTableHeader(name, shelf, quantity, required, consum, until, category) {
    const newTableHeader = document.createElement("div");
    newTableHeader.classList.add("table-header");

    const headerValues = [name, shelf, quantity, required, consum, until, category];
  
        for (let i = 0; i < headerTitles.length; i++) {
          const cell = document.createElement("div");
          cell.classList.add("table-cell");
          cell.textContent = headerValues[i];
          newTableHeader.appendChild(cell);
          cell.style.cursor = 'pointer';

          if(cell.textContent !== headerTitles[i]){
            cell.addEventListener('dblclick', function() {
              cell.setAttribute('contentEditable', true); // In den Editiermodus wechseln
              cell.focus(); // Fokus auf die Zelle setzen
              cell.style.cursor = 'text';
            });

            cell.addEventListener('blur', function() {
              cell.setAttribute('contentEditable', false); // Editiermodus beenden
              saveTableHeaders(); // Änderungen speichern
              location.reload();
            });

          } else {
            cell.addEventListener('click', ()=>{
              sort(cell.textContent);
            });

            cell.addEventListener("selectstart", function(e){
              e.preventDefault();
            }, false);
          }
        }
  
    tableHeaderContainer.appendChild(document.createElement('br'));
    if(headerValues[0] !== headerTitles[0]){
        tableHeaderContainer.appendChild(newTableHeader);
    } else {
        tableHeaderContainer.insertBefore(newTableHeader, tableHeaderContainer.firstChild);
    }
    saveTableHeaders();
  }

  function initate_cells(){
    cells = document.querySelectorAll('.table-cell');
  
    let counter = 0;
    let clean = 0;
    cells.forEach(cell => {
      counter++;
      if(counter < 7){
        if(cell.textContent == ''){
          clean++;
        }
      } else {
        if(clean == 6){
          cell.parentElement.remove();
        }
        clean = 0;
        counter = 0;
      }
    })
  }

  initate_cells();

  try {    
    if(cells[5].innerText.toUpperCase() > cells[10].innerText.toUpperCase() && localStorage.getItem('by') == 'Name'){
      sort('Name');
    }
    if(cells[9].innerText.toUpperCase() > cells[14].innerText.toUpperCase() && localStorage.getItem('by') == 'Kategorie'){
      sort('Kategorie');
    }
    if(cells[6].innerText.toUpperCase() > cells[11].innerText.toUpperCase() && localStorage.getItem('by') == 'Regal'){
      sort('Regal');
    }
  } catch (error) {}

  function sort(by){
    click++;
    initate_cells();
    if (by == ('Stückzahl' || 'Erforderlich')) return;
    localStorage.setItem('by', by);

    let formatted_cells = [];
    let row = [];
    cells.forEach(function(cell, index) {
      row.push(cell);
    
      if ((index + 1) % 7 === 0 || index === cells.length - 1) {
        formatted_cells.push(row);
        row = [];
      }
    });

    if(by == 'Name'){

    // Sortieren der Rows basierend auf dem Textinhalt der ersten Zelle
    formatted_cells.sort(function(a, b) {
      let textA = a[0].textContent.toUpperCase();
      let textB = b[0].textContent.toUpperCase();
      return textA.localeCompare(textB);
    });
  
    // Löschen des Elternelements der ersten Zelle (Row) und Aufruf von createTableHeader
    formatted_cells.forEach(function(row) {
      row[0].parentNode.remove()
      createTableHeader(...row.map(cell => cell.textContent));
    });
    } else 

    if(by == 'Regal'){
  
    formatted_cells.sort(function(a, b) {
      let textA = a[1].textContent.toUpperCase();
      let textB = b[1].textContent.toUpperCase();
      return textA.localeCompare(textB);
    });
  
    // Löschen des Elternelements der ersten Zelle (Row) und Aufruf von createTableHeader
    formatted_cells.forEach(function(row) {
      row[0].parentNode.remove()
      createTableHeader(...row.map(cell => cell.textContent));
    });
    } else

    if(by == 'Kategorie'){

      formatted_cells.sort(function(a, b) {
        let textA = a[6].textContent.toUpperCase();
        let textB = b[6].textContent.toUpperCase();
        return textA.localeCompare(textB);
      });
    
      // Löschen des Elternelements der ersten Zelle (Row) und Aufruf von createTableHeader
      formatted_cells.forEach(function(row) {
        row[0].parentNode.remove()
        createTableHeader(...row.map(cell => cell.textContent));
      });
    }
    if(click > 1){
      location.reload();
    }
  }


  let list_elem = [];
  function shoppingList(){
    initate_cells();

    document.getElementById('shopping_list').innerHTML = '<h1>Einkaufszettel</h1><button id="print" onclick="print()">Drucken</button>';


    let name_cells = [];
    let a = 0;
    let b = 0;
    cells.forEach(cell => {
      a++;
      if (a == 1) {
        name_cells.push([cell]);
      } else if (a == 7) {
        name_cells[b].push(cell);
        a = 0;
        b++;
      } else {
        name_cells[b].push(cell);
        return;
      }
    })

    for(let i = 0; i < name_cells.length; i++){
      let existing = parseInt(name_cells[i][2].innerText);
      let required = parseInt(name_cells[i][3].innerText);
      if(name_cells[i][0].innerText !== 'Name'){
        if(existing >= required){} else {
          createShoppingList(name_cells[i]);
          list_elem.push(name_cells[i]);
        }
      }
    }
  }
  function createShoppingList(e){
    document.getElementById('shopping_list').classList.remove('hidden');

    let elem = document.createElement('div');
    elem.classList.add('table-header-list');
    let div1 = document.createElement('div');
    let div2 = document.createElement('div');

    div1.classList.add('table-cell-list');
    div2.classList.add('table-cell-list');

    div1.innerText = e[0].innerText;
    div2.innerText = parseInt(e[3].innerText)-parseInt(e[2].innerText) + 'x';

    div1.addEventListener('dblclick', function() {
      div1.setAttribute('contentEditable', true); // In den Editiermodus wechseln
      div1.focus(); // Fokus auf die Zelle setzen
      div1.style.cursor = 'text';
    });

    div1.addEventListener('blur', function() {
      div1.setAttribute('contentEditable', false); // Editiermodus beenden
      saveTableHeaders(); // Änderungen speichern
    });

    div2.addEventListener('dblclick', function() {
      div2.setAttribute('contentEditable', true); // In den Editiermodus wechseln
      div2.focus(); // Fokus auf die Zelle setzen
      div2.style.cursor = 'text';
    });

    div2.addEventListener('blur', function() {
      div2.setAttribute('contentEditable', false); // Editiermodus beenden
      saveTableHeaders(); // Änderungen speichern
    });

    elem.appendChild(div1);
    elem.appendChild(div2);
    
    document.getElementById('shopping_list').appendChild(elem);
  }
  function until(){
    let name_cells = [];
    let a = 0;
    let b = 0;
    cells.forEach(cell => {
      a++;
      if (a == 1) {
        name_cells.push([cell]);
      } else if (a == 7) {
        name_cells[b].push(cell);
        a = 0;
        b++;
      } else {
        name_cells[b].push(cell);
        return;
      }
    });

    for(let i = 0; i < name_cells.length; i++){
      if(name_cells[i][0].innerText !== 'Name'){
        let existing = parseInt(name_cells[i][2].innerText);
        let consum = parseInt(name_cells[i][4].innerText);
        let until = existing/consum;
        let k;

        try {
          k = until.toString().split('.')[1].length;
        } catch (error) {
          k = 0;
        }

        if(k == 0){
          name_cells[i][5].innerText = until;
        } else {
          name_cells[i][5].innerText = until*30 + ' Tage';
        }
      }
    }
  }
  until();

window.addEventListener('beforeprint', e => {
  let top = document.getElementById('top');
  let table_header = document.getElementById('table-header-container');
  let print = document.getElementById('print');

  top.style.display = 'none';
  table_header.style.display = 'none';
  print.style.display = 'none';
});

window.addEventListener('afterprint', e => {
  location.reload();
})

function searchNameValue(name){
  initate_cells();

  let name_cells = [];
  let a = 0;
  let b = 0;
  cells.forEach(cell => {
    a++;
    if (a == 1) {
      name_cells.push([cell]);
    } else if (a == 7) {
      name_cells[b].push(cell);
      a = 0;
      b++;
    } else {
      name_cells[b].push(cell);
      return;
    }
  });

    let return_cell = null;
    // name_cells.forEach(cell => {
    //   if((cell[0].textContent).toUpperCase() == name.toUpperCase()){
    //     return_cell = cell;
    //   }
    // })
  for(let i = 0; i < name_cells.length; i++){
    if(name_cells[i][0].textContent !== 'Name'){
      if((name_cells[i][0].textContent).toUpperCase() == name.toUpperCase()){
        return_cell = name_cells[i];
      }
    }
  }
    return return_cell;
}

function sub(){
  let popup = document.createElement('div');
  popup.classList.add('sub');

  let input_1 = document.createElement('input');
  input_1.type = 'text';
  input_1.classList.add('table-cell');
  input_1.placeholder = 'Name';

  let input_2 = document.createElement('input');
  input_2.type = 'text';
  input_2.classList.add('table-cell');
  input_2.placeholder = 'Verbrauch(Positive Zahl)';

  let header = document.createElement('div');
  header.classList.add('table-header');

  header.appendChild(input_1);
  header.appendChild(input_2);

  popup.appendChild(header);

  document.body.appendChild(popup);

  input_1.focus();

  window.addEventListener('keypress', e => {
    if(e.key == 'Enter' && input_1.value !== null && input_2.value !== null){
      let row = searchNameValue(input_1.value);
      row[2].textContent = parseInt(row[2].textContent) - parseInt(input_2.value);

      popup.remove();

      until();
    } else {return}
  })
}

set.addEventListener('click', ()=>{
  let string = prompt();
  if(string !== null){
    localStorage.removeItem('tableHeaders');
    console.log(localStorage.getItem('tableHeaders'), string);
    localStorage.setItem('tableHeaders', string);
    console.log(localStorage.getItem('tableHeaders'));
    location.reload();
  }
})
get.addEventListener('click', ()=>{
  navigator.clipboard.writeText(localStorage.getItem('tableHeaders'))
})