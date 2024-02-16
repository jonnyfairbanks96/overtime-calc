function addShift() {
  addShiftWithValue('');
}

function addShiftWithValue(inputValue) {
  // Create the div element
  var divElement = document.createElement("div");
  divElement.classList.add("p-2");

  // Create the label element
  var labelElement = document.createElement("label");
  labelElement.textContent = "Shift";

  // Create the input element
  var inputElement = document.createElement("input");
  inputElement.id = "shift";
  inputElement.type = "number";
  inputElement.step = "0.01";
  inputElement.name = "shiftLength";
  inputElement.value = inputValue;

  var brElement = document.createElement("br");
  // Append label and input elements to the div element
  divElement.appendChild(labelElement);
  divElement.appendChild(brElement);
  divElement.appendChild(inputElement);

  // Append the div element to the document body (you can replace document.body with the parent element where you want to append this structure)
  document.querySelector('#shiftsList').appendChild(divElement);
  inputElement.addEventListener('change', recalculateOvertime);
}

function recalculateOvertime() {
  recalculateOvertimeShiftFreeForm();
  recalculateOvertimeShiftInputs();
}

function recalculateOvertimeShiftInputs() {
  var shiftElems = document.querySelectorAll('#shift')
  var shiftLengthElem = document.querySelector('#shiftLength')
  var shiftLengthF = parseFloat(shiftLengthElem.value);

  var totalOverInHours = 0;
  var shiftOverInHours = 0;
  for (var i = 0; i < shiftElems.length; i++) {
    var _shiftLength = parseFloat(shiftElems[i].value);
    if (!isNaN(_shiftLength)) {
      totalOverInHours += _shiftLength- shiftLengthF;

      if (_shiftLength > shiftLengthF) {
        shiftOverInHours += _shiftLength- shiftLengthF;
      }
    }
  }
  document.querySelector('#totalOverHours').innerHTML = totalOverInHours.toFixed(2);
  document.querySelector('#totalOverMinutes').innerHTML = (totalOverInHours * 60).toFixed(2);
  document.querySelector('#shiftOverHours').innerHTML = shiftOverInHours.toFixed(2);
  document.querySelector('#shiftOverMinutes').innerHTML = (shiftOverInHours * 60).toFixed(2);
}

function recalculateOvertimeShiftFreeForm() {
  var totalOverInHours = parseFloat(document.querySelector('#totalOverHours').innerHTML).toFixed(2);
  var shiftOverInHours = parseFloat(document.querySelector('#shiftOverHours').innerHTML).toFixed(2);

  var shiftsFreeForm = document.querySelector('#shiftsFreeForm');

  var cleanedValue = shiftsFreeForm.value.replace(/[^0-9.]/g, ' ');
  var toCreate = cleanedValue.split(' ').filter(n => n);
  for (var i = 0; i < toCreate.length; i++) {
    addShiftWithValue(toCreate[i]);
  }

  document.querySelector('#shiftsFreeForm').value = '';
}

document.addEventListener("DOMContentLoaded", function(){
  document.querySelector('#addShift').addEventListener('click', addShift);
  document.querySelector('#shiftLength').addEventListener('change', recalculateOvertime);
  document.querySelector('#shiftsFreeForm').addEventListener('change', recalculateOvertime);
  var shifts = document.querySelectorAll('#shift')
  for (var i = 0; i < shifts.length; i++) {
    shifts[i].addEventListener('change', recalculateOvertime);
  }

});
