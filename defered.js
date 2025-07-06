//Declare variables
///Needed Input Variables
let start;
let end;
///Calculated Variables
let startData;
let endData;
let workLength;
let prefSpot;
let rotations;
//Constants
const AIpositions = ["Down Before Lap", "Lap", "Therapy", "Down Before Windows", "Windows", "Peninsula"];
let LordsPositions;
let WindPositions;
//Overridable Variables
let rotationMinutes = [17, 37, 57]


// Event listener for the form submission
document.getElementById('shiftForm').addEventListener('submit', function(e) {
  // Prevent the default form submission behavior
  e.preventDefault();
  // Get the values from the form inputs
  start = document.getElementById('shiftStart').value;
  end = document.getElementById('poolClose').value;
  // Convert the start and end times to minutes
  startData = convertToMinutes(start);
  endData = convertToMinutes(end);
  // Get the preferred spot from the dropdown
  prefSpot = document.querySelector('input[name="preferedEndR"]:checked')?.value;

  //Below is the end data stuff
  //gets the difference between the desired time and the last rotation before it, stores info in endData[1]
  endData[1] = timeDown(endData[1]);
  //needed number is now in endData[0]
  endData[0] -= endData[1];
  //Below is the start data stuff
  //instead of creating a function to round up, we just add 19 min cuz itl do the same thing unless someone starts on the minute, in which case itl use that start
  startData[1] = timeUp(startData[1]);
  startData[0] += startData[1]; 

  //find actual working time:
  workLength = endData[0] - startData[0];
  rotations = 0;
  while (workLength >= 20){
    rotations++;
    workLength -= 20;
    /*
    if (rotations > 5){
      rotations = 0;
    }
    */
  }
  console.log(rotations);
});


// Function to convert time in "HH:MM" format to total minutes
function convertToMinutes(t) {
    const [hours, minutes] = t.split(":").map(Number);
    return [hours * 60 + minutes, minutes];
}

// Fuction to find minutes to nearest LOWER time change
function timeDown(t){
  let calcArray = [];
  for (let i = 0; i < rotationMinutes.length; i++){
    calcArray.push(t - rotationMinutes[i])
  }
  calcArray = calcArray.filter(num => num >= 0);
  if (calcArray.length === 0){
    return 3 + t;
  } else{
    calcArray = Math.min(...calcArray);
    return calcArray;
  }
}

//Function to find minutes to nearest GREATER time change
function timeUp(t){
  let calcArray = [];
  for (let i = 0; i < rotationMinutes.length; i++){
    calcArray.push(rotationMinutes[i] - t);
  }
  calcArray = calcArray.filter(num => num >= 0);
  if (calcArray.length === 0){
    return 60 - t + rotationMinutes[0];
  } else{
    calcArray = Math.min(...calcArray);
    return calcArray;
  }
}