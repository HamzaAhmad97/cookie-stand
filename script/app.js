/* eslint-disable eqeqeq */
'use strict';
let arrOfObjects = [];
let hours = ['City\\Hour','6:00am','7:00am','8:00am','9:00am','10:00am','11:00am','12:00pm','1:00pm','2:00pm','3:00pm','4:00pm','5:00pm','6:00pm','7:00pm', 'Total'];

createHeaderAndFooter();
////////////////////////////////////////////////////////
function getRandCustPerHour(min, max) { //std alone function to return a random number of users
  return Math.floor(Math.random() * (max - min + 1) + min);
}
////////////////////////////////////////////////////////
function createHeaderAndFooter() { //std alone

  let main = document.getElementById('main');
  let table = document.createElement('table');
  let tbody = document.createElement('tbody');
  tbody.setAttribute('id', 'tbody');
  let thead = document.createElement('thead');
  let tfoot = document.createElement('tfoot');
  tfoot.setAttribute('id', 'foot');
  main.appendChild(table);
  table.append(thead, tbody, tfoot);

  for (let i = 0; i < hours.length; i++) {
    let headCell = document.createElement('th');
    headCell.textContent = hours[i];
    thead.appendChild(headCell);
  }
  for (let i = 0; i < hours.length; i++) {
    let footCell = document.createElement('th');
    if (i == 0) {
      footCell.textContent = 'City/Total per hour';
      tfoot.appendChild(footCell);
    } else {
      footCell.textContent = '';
      tfoot.appendChild(footCell);
    }
  }
}
////////////////////////////////////////////////////////
function updateLastRow(obj){
  let tfoot = document.getElementById('foot');
  let tfootCell = tfoot.children;
  // console.log(tfootCell);
  for (let i = 1; i < hours.length; i++) {
    tfootCell[i].textContent = Number(tfootCell[i].textContent) + obj.CpH[i];
  }
}
////////////////////////////////////////////////////////
function City(name, minC,maxC, avgCpC) { // the constructor
  this.name = name;
  this.minC = minC;
  this.maxC = maxC;
  this.avgCpC = avgCpC;
  this.CpH = [];
}
////////////////////////////////////////////////////////
City.prototype.render = function() {
  let tbody = document.getElementById('tbody');
  let tableRow = document.createElement('tr'); // creating a row for the city
  tbody.appendChild(tableRow);

  this.CpH.unshift(this.name);
  for (let i = 0; i < this.CpH.length; i++) { // adding the corresponding number of cookies for each city per hour
    let tableCell = document.createElement('td');
    tableCell.textContent = this.CpH[i];
    tableRow.appendChild(tableCell);
  }

  updateLastRow(this); // calling to update the last rwo which containd the total per each hour
};

//////////////////////////////////////////////////////////

////////////////////////////////////////////////////////
City.prototype.genRandCpH = function() {
  let total = 0;
  for (let i = 0; i < hours.length - 2; i++){
    let randCustNo = getRandCustPerHour(this.minC, this.maxC);
    let cookPerHr = Math.ceil(randCustNo * this.avgCpC);
    this.CpH.push(cookPerHr); // adding the total number of cookies sold per hour to a list
    total += cookPerHr; // updating the total per day for the city
    // totPerHr[i] += cookPerHr;
  }
  this.CpH.push(total); // appending the total per day for each city to the end of the row

};
////////////////////////////////////////////////////////////
let seattle = new City('Seattle',23,65,6.3);
seattle.genRandCpH();
seattle.render();
let tokyo = new City('Tokyo',3,24,1.2);
tokyo.genRandCpH();
tokyo.render();
let dubai = new City('Dubai',11,38,3.7);
dubai.genRandCpH();
dubai.render();
let paris = new City('Paris',20,38,2.3);
paris.genRandCpH();
paris.render();
let lima = new City('Lima',2,16,4.6);
lima.genRandCpH();
lima.render();
////////////////////////////////////////////////////////
let submitButton = document.getElementById('submit');
let resetButton = document.getElementById('reset');
let message = document.getElementById('message');

function changeTheme(arg) {

  let th = document.getElementById('theme');
  let selected = th.options[th.selectedIndex].text;
  console.log(selected);
  let m = document.getElementById('main');
  let h = document.getElementById('header');
  let f = document.getElementById('footer');
  switch(selected) {
  case 'Default':
    m.style.background = '#6b5340';
    h.style.background = 'wheat';
    f.style.background = 'wheat';
    m.style.color = 'black';
    break;
  case 'Black/White':
    m.style.background = 'black';
    h.style.background = 'white';
    f.style.background = 'white';
    m.style.color = 'white';
    message.textContent = '';
    submitButton.style.backgroundColor = 'white';
    resetButton.style.backgroundColor = 'white';
    break;
  case 'Mono':
    m.style.background = 'gray';
    h.style.background = 'gray';
    f.style.background = 'gray';
    m.style.color = 'black';
    message.textContent = '';
    submitButton.style.background = 'white';
    resetButton.style.backgroundColor = 'white';
    break;
  default:
    m.style.background = '#6b5340';
    h.style.background = 'wheat';
    f.style.background = 'wheat';
    m.style.color = 'black';
    break;
  }
}
//////////////////////////////////////////////////////////
let form = document.getElementById('form');
form.addEventListener('submit', addCity);


function addCity(e) {
  console.log('in addCity');
  e.preventDefault();

  let n = document.getElementById('fName').value;
  let minc = Number(document.getElementById('fminC').value);
  let maxc = Number(document.getElementById('fmaxC').value);
  let apc = Number(document.getElementById('avgCpC').value);

  console.log(Number(n),'\t', minc,'\t',maxc,'\t',apc);
  if (n == 0 || !isNaN(Number(n)) || minc ==0 || maxc == 0 || apc == 0) {
    // console.log('error');
    submitButton.style.background = 'red';
    message.textContent = 'Please make sure you filled all fields correctly, all numbers should be above 0 and the city name should only contain letters!';
    message.style.color = 'red';

  } else {
    let newCity = new City(n,minc,maxc,apc);
    arrOfObjects.push(newCity);
    // console.log('not error');
    submitButton.style.background = 'green';
    submitButton.textContent = 'City added succesfully!';
    newCity.genRandCpH();
    newCity.render();
    setTimeout(() => { updateButton(); }, 1000); // I just googled how to make js wait

  }
}
////////////////////////////////////////////////////
function resetthings(e) {
  submitButton.textContent = 'Add City';
  submitButton.style.background = 'wheat';
  message.style.color = '#6b5340';
}
///////////////////////////////////////////////////////////////
form.addEventListener('reset', resetthings);

function updateButton() {
  submitButton.textContent = 'Add City';
  submitButton.style.background = 'wheat';
  // form.reset();
  resetthings();
}

