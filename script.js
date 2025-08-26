function calculateInterest() {
  const startDate = new Date(document.getElementById("startDate").value);
  const endDate = new Date(document.getElementById("endDate").value);
  const principal = parseFloat(document.getElementById("principal").value);
  const rate = parseFloat(document.getElementById("rate").value) / 100;

  if (!startDate || !endDate || isNaN(principal) || principal <= 0) {
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

  document.getElementById("result").innerHTML =
    `📅 Duration: ${months} month(s) ${days} day(s)<br>` +
    `💰 Interest @ ${rate * 100}%: <b>${interest.toFixed(2)}</b>`;
}
