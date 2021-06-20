const currencyEl_one = document.getElementById('currency-one');
const currencyEl_two = document.getElementById('currency-two');
const amountEl_one = document.getElementById('amount-one');
const amountEl_two = document.getElementById('amount-two');

const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');

// Fetch exchange rates and update the dom
// Using this free exchange api url
// https://exchangerate.host/#/docs
function calculate() {
  const currencyOne = currencyEl_one.value;
  const currencyTwo = currencyEl_two.value;

  fetch(
    `https://api.exchangerate.host/convert?from=${currencyOne}&to=${currencyTwo}`
  )
    .then((res) => res.json())
    .then((res) => {
      const rate = res.info.rate;
      rateEl.innerText = `1 ${currencyOne} -- ${rate} ${currencyTwo}`;

      amountEl_two.value = (amountEl_one.value * rate).toFixed(4);
    });
}

// Event listeners
currencyEl_one.addEventListener('change', calculate);
amountEl_one.addEventListener('input', calculate);
currencyEl_two.addEventListener('change', calculate);
amountEl_two.addEventListener('input', calculate);

swap.addEventListener('click', () => {
  const temp = currencyEl_one.value;
  currencyEl_one.value = currencyEl_two.value;
  currencyEl_two.value = temp;

  calculate();
});

calculate();
