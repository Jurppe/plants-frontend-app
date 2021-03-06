export const DateDiff = {

  inDays: function (d1: Date, d2: Date) {
    var t2 = d2.getTime();
    var t1 = d1.getTime();

    return Math.floor((t2 - t1) / (24 * 3600 * 1000));
  },

  inWeeks: function (d1: Date, d2: Date) {
    var t2 = d2.getTime();
    var t1 = d1.getTime();

    return Math.floor((t2 - t1) / (24 * 3600 * 1000 * 7));
  },

  inMonths: function (d1: Date, d2: Date) {
    var d1Y = d1.getFullYear();
    var d2Y = d2.getFullYear();
    var d1M = d1.getMonth();
    var d2M = d2.getMonth();

    return (d2M + 12 * d2Y) - (d1M + 12 * d1Y);
  },

  inYears: function (d1: Date, d2: Date) {
    return d2.getFullYear() - d1.getFullYear();
  },

  autoUnit: function (d1: Date, d2: Date) {
    var t2 = d2.getTime();
    var t1 = d1.getTime();

    var days = Math.floor((t2-t1)/(24*3600*1000));
    var unit = ''
    var value = 0

    if (days > 365) {
      value = Math.floor(days / 365)
      value == 1 ? unit = 'year' : unit = 'years'
      return {
        ageUnit: unit, 
        ageValue: Math.floor(days / 365)
      }
    }
    else if (days > 30) {
      value = Math.floor(days / 30)
      value == 1 ? unit = 'month' : unit = 'months'
      return {
        ageUnit: unit, 
        ageValue: Math.floor(days / 30)
      }
    }
    else {
      return {
        ageUnit: unit, 
        ageValue: days
      }
    }
  }

}

export const WateringFunctions = {
  
  wateringStatusToString: function (daysTillNextWatering: Number) {
    if (daysTillNextWatering > 3) {
      return {wateringString: 'ok', wateringIcon: 'battery-4', wateringIconColor: 'green'}
    }
    else if (daysTillNextWatering > 0) {
      return {wateringString: 'neutral', wateringIcon: 'battery-2', wateringIconColor: 'green'}
    }
    else if (daysTillNextWatering >= -3) {
      return {wateringString: 'bad', wateringIcon: 'battery-1', wateringIconColor: 'orange'}
    }
    else if (daysTillNextWatering < -3) {
      return {wateringString: 'hopeless', wateringIcon: 'battery-0', wateringIconColor: 'red'}
    }
    else {
      return {wateringString: 'unknown', wateringIcon: 'question-circle-o', wateringIconColor: 'gray'}
    }
  },

  overallStatusToString: function (isAlive: boolean, daysTillNextWatering: Number) {
    if (isAlive && daysTillNextWatering > 0) {
      return {statusIcon: 'smile-o', statusColor: 'green'}
    }
    else if (isAlive && daysTillNextWatering <= 0) {
      return {statusIcon: 'meh-o', statusColor: 'orange'}
    }
    else if (!isAlive) {
      return {statusIcon: 'frown-o', statusColor: 'red'}
    }
    else {
      return {statusIcon: 'question', statusColor: 'black'}
    }
  },

}