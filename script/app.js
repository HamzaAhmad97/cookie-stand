'use strict';

let seattle = {
  name: 'Seattle',
  minCust: 23,
  maxCust: 65,
  avgCookiePerCustomer : 6.3,
  cookiePerHour: []
};

let tokyo = {
  name: 'Tokyo',
  minCust: 3,
  maxCust: 24,
  avgCookiePerCustomer : 1.2,
  cookiePerHour: []
};

let dubai = {
  name: 'Dubai',
  minCust: 11,
  maxCust: 38,
  avgCookiePerCustomer : 3.7,
  cookiePerHour: []
};

let paris = {
  name: 'Paris',
  minCust: 20,
  maxCust: 38,
  avgCookiePerCustomer : 2.3,
  cookiePerHour: []
};

let lima = {
  name: 'Lima',
  minCust: 2,
  maxCust: 16,
  avgCookiePerCustomer : 4.6,
  cookiePerHour: []
};

let cities = [seattle,tokyo, dubai, paris, lima];

function getRandomCustomersPerHour(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function cookiesPerHourArr(obj) {
  for (let i = 6 ; i <= 11; i++){
    obj.cookiePerHour.push([`${i}am : `, Math.trunc(getRandomCustomersPerHour(obj.minCust, obj.maxCust)*obj.avgCookiePerCustomer)]);
  }

  obj.cookiePerHour.push(['12pm : ', Math.trunc(getRandomCustomersPerHour(obj.minCust, obj.maxCust)*obj.avgCookiePerCustomer)]);

  for (let j = 1 ; j <= 7; j++) {
    obj.cookiePerHour.push([`${j}pm : `, Math.trunc(getRandomCustomersPerHour(obj.minCust, obj.maxCust)*obj.avgCookiePerCustomer)]);
  }

  let total = 0;
  for (let i = 0 ; i < obj.cookiePerHour.length; i++) {
    total+= obj.cookiePerHour[i][1];
  }

  obj.cookiePerHour.push(['total: ', total]);
}

cookiesPerHourArr(seattle);
cookiesPerHourArr(tokyo);
cookiesPerHourArr(dubai);
cookiesPerHourArr(paris);
cookiesPerHourArr(lima);

console.log(cities[0].cookiePerHour);
let main = document.getElementById('main');
for (let i = 0 ; i < cities.length; i++) {
  let city = document.createElement('h2');
  city.textContent = cities[i].name;
  main.appendChild(city);
  let uList = document.createElement('ul');
  for (let j = 0; j < cities[i].cookiePerHour.length ; j++) {
    let li = document.createElement('li');
    li.textContent = cities[i].cookiePerHour[j].join('') + ' cookies';
    uList.appendChild(li);
  }
  main.appendChild(uList);
}

