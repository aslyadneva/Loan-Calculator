//Listen for submit
document.querySelector('#loan-form').addEventListener('submit', (event) => {
  event.preventDefault(); 

  // Hide results 
  document.querySelector('#results').style.display = 'none'; 

  // Show loader 
  document.querySelector('#loading').style.display = 'block'; 

  setTimeout(calculateResults, 2000)
}); 


// Calculate results
function calculateResults (event) {
  // UI elements 
  const amount = document.querySelector('#amount'); 
  const interest = document.querySelector('#interest');
  const years = document.querySelector('#years');

  const monthlyPayment = document.querySelector('#monthly-payment');
  const totalPayment = document.querySelector('#total-payment');
  const totalInterest = document.querySelector('#total-interest');

  //Calculations
  // parseFloat turns the input value string into a number type 
  const principal = parseFloat(amount.value); 
  const calculatedInterest = parseFloat(interest.value) /100 /12; 
  const calculatedPayments = parseFloat(years.value) *12;

  const x = Math.pow(1 + calculatedInterest, calculatedPayments); 
  const monthly = (principal * x * calculatedInterest) / (x - 1)

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2); 
    totalPayment.value = (monthly * calculatedPayments).toFixed(2); 
    totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2)

    // Show results div on UI and hide loader
    document.querySelector('#results').style.display = 'block'; 
    document.querySelector('#loading').style.display = 'none'; 

  } else {
    // Hide loader and results divs from UI 
    document.querySelector('#results').style.display = 'none'; 
    document.querySelector('#loading').style.display = 'none'; 

    // Show error message 
    showError('Check your numbers')
  }
}

// Show error 
function showError(error) {
  

  // Create a div
  const errorDiv = document.createElement('div'); 

  // Add bootstrap error class 
  errorDiv.className = 'alert alert-danger'; 

  // Create text node and append to div 
  errorDiv.appendChild(document.createTextNode(error)); 

  // Insert error div into DOM 
  const card = document.querySelector('.card'); 
  const heading = document.querySelector('.heading'); 

    // insert error above heading 
  card.insertBefore(errorDiv, heading);

  // Clear error after 3 seconds 
  setTimeout(clearError, 3000);
}

//Clear error 
function clearError () {
  document.querySelector('.alert').remove();
}