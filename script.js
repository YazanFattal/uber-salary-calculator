const hourlyWage = 14.70;

function calculateSalary() {
  const hours = parseFloat(document.getElementById("hours").value);
  const orders = parseInt(document.getElementById("orders").value);
  const days = parseInt(document.getElementById("days").value);
  const startTime = document.getElementById("startTime").value;

  if (isNaN(hours) || isNaN(orders) || isNaN(days)) {
    alert("Please enter hours, completed orders, and days worked.");
    return;
  }

  const basePay = hours * hourlyWage;
  const bonus = getBonus(hours, orders, startTime);
  const dailyTotal = basePay + bonus;
  const totalPay = dailyTotal * days;

  document.getElementById("basePay").textContent = `€${basePay.toFixed(2)}`;
  document.getElementById("bonus").textContent = `€${bonus.toFixed(2)}`;
  document.getElementById("daysResult").textContent = days;
  document.getElementById("totalPay").textContent = `€${totalPay.toFixed(2)}`;
}

function getBonus(hours, orders, startTime) {
  const bonusTable = {
    later: {
      3: {8: 8, 10: 14, 11: 20, 12: 28, 13: 36},
      3.5: {10: 10, 12: 17, 13: 23, 14: 32, 15: 42},
      4: {11: 11, 13: 20, 15: 30, 16: 40, 17: 49},
      4.5: {12: 12, 15: 21, 17: 31, 18: 41, 20: 56},
      5: {13: 13, 17: 27, 18: 38, 20: 52, 22: 64}
    },
    earlier: {
      3: {8: 4, 10: 7, 11: 10, 12: 14, 13: 18},
      3.5: {10: 5, 12: 8.5, 13: 11.5, 14: 16, 15: 21},
      4: {11: 5.5, 13: 10, 15: 15, 16: 20, 17: 24.5},
      4.5: {12: 6, 15: 10.5, 17: 15.5, 18: 20.5, 20: 28},
      5: {13: 6.5, 17: 13.5, 18: 19, 20: 26, 22: 32}
    }
  };

  const shiftBonus = bonusTable[startTime][hours];

  if (!shiftBonus) return 0;

  let bonus = 0;

  for (let requiredOrders in shiftBonus) {
    if (orders >= Number(requiredOrders)) {
      bonus = shiftBonus[requiredOrders];
    }
  }

  return bonus;
}