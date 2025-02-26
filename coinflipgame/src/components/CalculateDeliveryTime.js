export function CalculateDeliveryTime(gametime, playerstarttime) {
  if (playerstarttime === "0:00") {
    return gametime;
  }
  if (theTimeSendIsValid(gametime, playerstarttime) === "Not a number") {
    return "Not a number";
  }

  if (playerstarttimeIsGreaterThanGametime(gametime, playerstarttime)) {
    return "0:00";
  }
  if (playerstarttime !== "0:00") {
    return CalculateDeliveryTimeFromString(gametime, playerstarttime);
  }
  return "0:00";
}

function CalculateDeliveryTimeFromString(gametime, playerstarttime) {
  const totaldeliverytimerinseconds = getTotalDeliveryInSeconds(
    gametime,
    playerstarttime
  );
  const delivertimerminutes = Math.floor(totaldeliverytimerinseconds / 60);
  const delivertimerseconds = totaldeliverytimerinseconds % 60;
  const deliverytimer =
    delivertimerseconds < 10
      ? delivertimerminutes + ":0" + delivertimerseconds
      : delivertimerminutes + ":" + delivertimerseconds;
  return deliverytimer;
}

function theTimeSendIsValid(gametime, playerstarttime) {
  if (
    theTimeSentIsaLongString(gametime) &&
    theTimeSentIsaLongString(playerstarttime)
  ) {
    return "Not a number";
  }
  if (theTimeSentisTime(gametime) && theTimeSentisTime(playerstarttime)) {
    return "Not a number";
  }
}

function playerstarttimeIsGreaterThanGametime(gametime, playerstarttime) {
  return getTimeInSeconds(gametime) < getTimeInSeconds(playerstarttime);
}

function getTotalDeliveryInSeconds(gametime, playerstarttime) {
  return getTimeInSeconds(gametime) - getTimeInSeconds(playerstarttime);
}
function theTimeSentIsaLongString(timesent) {
  const timesentvalues = timesent.toString().split(":");
  for (let i = 0; i < timesentvalues.length; i++) {
    if (isNaN(timesentvalues[i])) {
      return true;
    }
  }
}
function theTimeSentisTime(timesent) {
  return isNaN(timesent.toString().split(":")[0]);
}
function getTimeInSeconds(playertime) {
  const timesplit = playertime.toString().split(":");
  const mintoseconds = Number(timesplit[0]) * 60;
  const totalseconds = mintoseconds + Number(timesplit[1]);
  return totalseconds;
}
