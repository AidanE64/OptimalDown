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
let chosenPositions;
let rotationTime;
let rotationType;
let changeNumber;
let WLength;
//Constants
const AIOSpositions = ["Down Before Lap", "Lap Chair", "Lap Walking", "Therapy", "Down Before Windows", "Windows", "Peninsula"];
const AIWPpositions = ["Down Before Windows", "Windows", "Peninsula"]
const AIMGpositions = ["Down Before Lap", "Lap Chair", "Therapy"]
let LordsPositions;
let WindPositions;
//Overridable Variables
const AIOSrotationMinutes = [17, 37, 57];
const AIMGrotationMinutes = [27, 57];
const LProtationMinutes = [15, 35, 55];


// Event listener for the form submission
document.getElementById('shiftForm').addEventListener('submit', function(e) {
  // Prevent the default form submission behavior
  e.preventDefault();
  ////////rotation types
  //find the rotation type & rotations
  chosenPositions = AIOSpositions;
  rotationTime = AIOSrotationMinutes;
  ///////////Start & End
  // Get the start & End from the form inputs
  start = document.getElementById('shiftStart').value;
  end = document.getElementById('poolClose').value;
  // Convert the start and end times to minutes
  startData = convertToMinutes(start);
  endData = convertToMinutes(end);
  //////////////Pref Spots
  // Get the preferred spot from the dropdown
  prefSpot = document.getElementById('prefEndSelect')?.value.trim();
  console.log("Selected preferedEnd", prefSpot);
  rotationType = parseInt(document.getElementById('rotationTypes')?.value);
  console.log("RotationType:", rotationType)
  /////////////////End Data
  //Below is the end data stuff
  //gets the difference between the desired time and the last rotation before it, stores info in endData[1]
  endData[1] = timeDown(endData[1]);
  //needed number is now in endData[0]
  endData[0] -= endData[1];
  ////////////////Start Data
  //Below is the start data stuff
  //instead of creating a function to round up, we just add 19 min cuz itl do the same thing unless someone starts on the minute, in which case itl use that start
  startData[1] = timeUp(startData[1]);
  startData[0] += startData[1];
  //////////////Math
  //find actual working time:
  workLength = endData[0] - startData[0];
  //Run the rotation logic for the pref spot
  WLength = workLength
  rotationLogic(prefSpot, WLength);
  document.getElementById("1Spot").textContent = chosenPositions[changeNumber];
  //Continues Rotaiton Logic for other spots
  console.log("rotations:", rotations);
  console.log("changeNumber:", changeNumber);
  console.log("result:", chosenPositions[changeNumber])

  for (let i = 0; i < chosenPositions.length; i++){
    let spot = chosenPositions[i];
    WLength = workLength
    if (spot === prefSpot){

    }else {
      rotationLogic(spot, WLength);
      addToList(spot);
      console.log(chosenPositions[changeNumber], " : ", spot);
    }
  }
  document.getElementById("resultsContainer").style.display = "inline-block";
});

function addToList(spot){
  document.getElementById("resultsContainer").innerHTML += "<p>" + chosenPositions[changeNumber] + " : " + spot + "</p>";
}

function rotationLogic(spot, WLength){
  rotations = 0;
  changeNumber = chosenPositions.indexOf(spot);
  while (WLength >= rotationType){
    rotations++;
    changeNumber--;
    WLength -= rotationType;
    if (changeNumber < 0){
      changeNumber += chosenPositions.length;
    }
    
  }
}

// Function to convert time in "HH:MM" format to total minutes
function convertToMinutes(t) {
    const [hours, minutes] = t.split(":").map(Number);
    return [hours * 60 + minutes, minutes];
}

// Fuction to find minutes to nearest SOONER rotation
function timeDown(t){
  let calcArray = [];
  for (let i = 0; i < rotationTime.length; i++){
    calcArray.push(t - rotationTime[i])
  }
  calcArray = calcArray.filter(num => num >= 0);
  if (calcArray.length === 0){
    return 3 + t;
  } else{
    calcArray = Math.min(...calcArray);
    return calcArray;
  }
}

//Function to find minutes to nearest LATER rotation
function timeUp(t){
  let calcArray = [];
  for (let i = 0; i < rotationTime.length; i++){
    calcArray.push(rotationTime[i] - t);
  }
  calcArray = calcArray.filter(num => num >= 0);
  if (calcArray.length === 0){
    return 60 - t + rotationTime[0];
  } else{
    calcArray = Math.min(...calcArray);
    return calcArray;
  }
}