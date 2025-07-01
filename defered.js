let shiftStart;
let poolEnd;
let shiftStartinMinutes;
let poolEndinMinutes;
let shiftLength;
let shiftEndTime;
let prefSpot;

function convertToMinutes(t) {
    const [hours, minutes] = t.split(":").map(Number);
    return hours * 60 + minutes;
}

function adjustToNextRotation(timeStr) {
  const rotationMinutes = [17, 37, 57];
  let [hour, minute] = timeStr.split(":").map(Number);
  const nextRotation = rotationMinutes.find(r => r >= minute);

  if (nextRotation !== undefined) {
    minute = nextRotation;
  } else {
    hour = (hour + 1) % 24;  // wrap around midnight
    minute = rotationMinutes[0];
  }
  const pad = n => n.toString().padStart(2, "0");
  return `${pad(hour)}:${pad(minute)}`;
}

function adjustToPrevRotation(timeStr) {
  const rotationMinutes = [17, 37, 57];
  let [hour, minute] = timeStr.split(":").map(Number);

  const possibleRotations = rotationMinutes.filter(r => r <= minute);
  if (possibleRotations.length > 0) {
    minute = Math.max(...possibleRotations);
  } else {
    hour = (hour === 0) ? 23 : hour - 1;
    minute = rotationMinutes[rotationMinutes.length - 1]; // 57
  }
  const pad = n => n.toString().padStart(2, "0");
  return `${pad(hour)}:${pad(minute)}`;
}

document.getElementById('shiftForm').addEventListener('submit', function(e) {
    e.preventDefault();
    shiftStart = document.getElementById('shiftStart').value;
    poolEnd = document.getElementById('poolClose').value;
    shiftStartinMinutes = convertToMinutes(adjustToNextRotation(shiftStart));
    poolEndinMinutes = convertToMinutes(adjustToPrevRotation(poolEnd));
    shiftLength = poolEndinMinutes - shiftStartinMinutes;
    document.getElementById('opDow').textContent = shiftLength;
});