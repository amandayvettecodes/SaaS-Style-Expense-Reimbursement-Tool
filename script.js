const expenseForm = document.getElementById('expenseForm');
const expenseList = document.getElementById('expenseList');

let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

function renderExpenses() {
  expenseList.innerHTML = '';
  expenses.forEach((exp, i) => {
    const tr = document.createElement('tr');
    const receiptLink = exp.receipt ? `<a href="${exp.receipt}" target="_blank">View</a>` : 'No Receipt';
    tr.innerHTML = `
      <td>${exp.description}</td>
      <td>$${parseFloat(exp.amount).toFixed(2)}</td>
      <td>${exp.date}</td>
      <td>${receiptLink}</td>
      <td><button onclick="deleteExpense(${i})">X</button></td>
    `;
    expenseList.appendChild(tr);
  });
  localStorage.setItem('expenses', JSON.stringify(expenses));
}

expenseForm.addEventListener('submit', e => {
  e.preventDefault();
  const description = document.getElementById('description').value.trim();
  const amount = document.getElementById('amount').value;
  const date = document.getElementById('date').value;
  const receiptFile = document.getElementById('receipt').files[0];

  if (receiptFile) {
    const reader = new FileReader();
    reader.onload = function(e) {
      addExpense(description, amount, date, e.target.result);
    };
    reader.readAsDataURL(receiptFile);
  } else {
    addExpense(description, amount, date, null);
  }
});

function addExpense(description, amount, date, receipt) {
  expenses.push({ description, amount, date, receipt });
  renderExpenses();
  expenseForm.reset();
}

function deleteExpense(index) {
  expenses.splice(index, 1);
  renderExpenses();
}

renderExpenses();
