function autoFormatDate(input) {
  let value = input.value.replace(/[^0-9]/g, ""); // allow only digits

  if (value.length >= 2 && value.length <= 4) {
    value = value.slice(0, 2) + "/" + value.slice(2);
  } else if (value.length > 4) {
    value = value.slice(0, 2) + "/" + value.slice(2, 4) + "/" + value.slice(4, 8);
  }

  // restrict length to 10 (dd/mm/yyyy)
  input.value = value.slice(0, 10);
}

// ✅ validate if the date is real
function isValidDate(dateString) {
  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(dateString)) return false;

  const [day, month, year] = dateString.split("/").map(Number);
  const date = new Date(year, month - 1, day);

  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
}

function getTodayDate() {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();
  return `${day}/${month}/${year}`;
}

function calculateInterest() {
  const startDate = new Date(document.getElementById("startDate").value);
  const endDateInput = document.getElementById("endDate").value;
  const endDate = endDateInput ? new Date(endDateInput) : new Date();
  const principal = parseFloat(document.getElementById("principal").value);
  const rate = parseFloat(document.getElementById("rate").value) / 100;
let start = document.getElementById("start").value;
let end = document.getElementById("end").value;

// validate start date
if (!isValidDate(start)) {
  alert("Please enter a valid Start Date (dd/mm/yyyy)");
  return;
}

// if end date empty → default to today
if (!end) {
  end = getTodayDate();
  document.getElementById("end").value = end; // auto-fill in UI
} else if (!isValidDate(end)) {
  alert("Please enter a valid End Date (dd/mm/yyyy)");
  return;
}

  if (!startDate || isNaN(principal) || principal <= 0) {
    document.getElementById("result").innerHTML = "⚠️ Please fill all fields correctly.";
    return;
  }

  if (endDate <= startDate) {
    document.getElementById("result").innerHTML = "⚠️ End date must be after start date.";
    return;
  }

  let diffDays = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));

  let months = Math.floor(diffDays / 30);
  let days = diffDays % 30;

  let extraInterestMonths = 0;
  if (days > 17) {
    extraInterestMonths = 1;
  } else if (days > 5) {
    extraInterestMonths = 0.5;
  }

  let totalMonths = months + extraInterestMonths;

  let interest = principal * rate * totalMonths;
  let total = principal + interest;

  let oneMonthInterest = principal * rate;
  let newTotal = total - oneMonthInterest;
  if (newTotal < principal) newTotal = principal;

  document.getElementById("result").innerHTML =
    `📅 Duration: ${months} month(s) ${days} day(s)<br>` +
    `💰 Interest @ ${rate * 100}%: <b>${interest.toFixed(2)}</b><br>` +
    `📊 Total: <b>${newTotal.toFixed(2)}</b><br>` +
    `✨ NEW Total : <b>${total.toFixed(2)}</b>`;
}
