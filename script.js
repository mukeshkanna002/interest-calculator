function calculateInterest() {
  const startDate = new Date(document.getElementById("start").value);
  const endInput = document.getElementById("end").value;
  const endDate = endInput ? new Date(endInput) : new Date();
  const principal = parseFloat(document.getElementById("amount").value);
  const rate = parseFloat(document.getElementById("rate").value);

  if (!startDate || isNaN(principal) || isNaN(rate)) {
    document.getElementById("result").innerHTML = "<p>Please fill all fields correctly.</p>";
    return;
  }

  // Calculate duration
  let years = endDate.getFullYear() - startDate.getFullYear();
  let months = endDate.getMonth() - startDate.getMonth();
  let days = endDate.getDate() - startDate.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(endDate.getFullYear(), endDate.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  // Convert total duration into months & days
  let totalMonths = years * 12 + months;
  let extraDays = days;

  // Rule: If extraDays > 5 → add half month, if > 17 → add full month
  if (extraDays > 17) {
    totalMonths += 1;
    extraDays = 0;
  } else if (extraDays > 5) {
    extraDays = 15;
  }

  // Calculate interest
  let monthlyRate = rate / 100;
  let interest = (principal * monthlyRate * totalMonths);
  if (extraDays === 15) {
    interest += principal * monthlyRate * 0.5;
  }

  // Totals
  let total = principal + interest;
  let oneMonthInterest = principal * monthlyRate;
  let newTotal = total - oneMonthInterest;

  document.getElementById("result").innerHTML = `
    <p><strong>Duration:</strong> ${years} years, ${months} months, ${days} days</p>
    <p><strong>Interest:</strong> ₹${interest.toFixed(2)}</p>
    <p><strong>Total:</strong> ₹${total.toFixed(2)}</p>
    <p style="color:green;"><strong>New Total (1 month less):</strong> ₹${newTotal.toFixed(2)}</p>`;
}
