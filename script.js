fuction formatDate(date)
{
  let d = date.getDate().toString().padStart(2, "0");
  let m = (date.getMonth()+1).toString().padStart(2, "0");
  let y = date.getFullYear();
  return `${d}/${m}/${y}`;
}  
function calculateInterest() {
  const startDate = new Date(document.getElementById("startDate").value);
  const endDateInput = document.getElementById("endDate").value;
  const endDate = endDateInput ? new Date(endDateInput) : new Date();
  const principal = parseFloat(document.getElementById("principal").value);
  const rate = parseFloat(document.getElementById("rate").value) / 100;

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
