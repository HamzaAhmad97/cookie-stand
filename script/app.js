'use strict';

let tbody = document.createElement('tbody');

let hours = ['6:00am','7:00am','8:00am','9:00am','10:00am','11:00am','12:00am','1:00pm','2:00pm','3:00pm','4:00pm','5:00pm','6:00pm','7:00pm'];



createHeaderAndFooter();

function getRandCustPerHour(min, max) { //std alone function to return a random number of users
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function updateLastRow(obj) {
  let lastrow = document.getElementById('lastrow');
  let lastRowElems = lastrow.children;
  for (let i = 0 ; i < obj.CpH.length; i++) {
    lastRowElems[i].textContent = Number(lastRowElems[i].textContent) + Number(obj.CpH[i]);
  }
}

function createHeaderAndFooter() { //std alone
  let main = document.getElementById('main');
  let table = document.createElement('table');
  let thead = document.createElement('thead');
  let tfoot = document.createElement('tfoot');
  let trHead = document.createElement('tr');
  let trFoot = document.createElement('tr');
  main.appendChild(table);
  table.append(thead, tbody, tfoot);
  thead.appendChild(trHead);
  tfoot.appendChild(trFoot);

  let trFootLeftCell = document.createElement('th');
  trFootLeftCell.textContent = '';
  trFoot.appendChild(trFootLeftCell);

  trFoot.setAttribute('id', 'lastrow');

  let thHeadLeftCell = document.createElement('th');
  thHeadLeftCell.textContent = '';
  trHead.appendChild(thHeadLeftCell);

  for (let i = 0; i < hours.length ; i++) {
    let bodyCell = document.createElement('th');
    bodyCell.textContent = hours[i];
    trHead.appendChild(bodyCell);

    let footerCell = document.createElement('th'); // setting an initial value for the cells in the foot to 0 which will get updated everytime an object is rendered
    footerCell.textContent = 0;
    trFoot.appendChild(footerCell);
  }
  let thHTotal = document.createElement('th');
  thHTotal.textContent = 'Total';
  trHead.appendChild(thHTotal);

  // let first = document.querySelector('lastrow th:first-child');
  // let d = document.createElement('th');
  // d.textContent = 'ffff';
  // trFoot.insertBefore(d,trFoot.children[1]);
}

function City(name, minC,maxC, avgCpC) { // the constructor
  this.name = name;
  this.minC = minC;
  this.maxC = maxC;
  this.avgCpC = avgCpC;
  this.CpH = [];
}

City.prototype.render = function() {
  let tr = document.createElement('tr'); // creating a row for the city
  tbody.appendChild(tr);

  let td = document.createElement('td'); // adding the city to the first cell
  td.textContent = this.name;
  tr.appendChild(td);

  for (let i = 0; i < this.CpH.length; i++) { // adding the corresponding number of cookies for each city per hour
    let td = document.createElement('td');
    td.textContent = this.CpH[i];
    tr.appendChild(td);
  }
  updateLastRow(this); // calling to update the last rwo which containd the total per each hour
};

City.prototype.genRandCpH = function() {
  let total = 0;
  for (let i = 0; i < hours.length; i++){
    let randCustNo = getRandCustPerHour(this.minC, this.maxC);
    let cookPerHr = Math.ceil(randCustNo * this.avgCpC);
    this.CpH.push(cookPerHr); // adding the total number of cookies sold per hour to a list
    total += cookPerHr; // updating the total per day for the city
    // totPerHr[i] += cookPerHr;
  }
  this.CpH.push(total); // appending the total per day for each city to the end of the row
};


// creating instances of the City class/ constructor
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


// console.log(totPerHr);
// updateLastRow(seattle);
