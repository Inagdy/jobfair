"use strict"
let main =document.querySelector("#main");
let input =document.querySelector('#filterInput');
let customer= [];
let trans =[];
let myNewUbject;
let cartona;

function cleanHTML(){
  cartona ="" 
  main.innerHTML=""
} 
google.charts.load('current', {'packages':['bar']});
google.charts.setOnLoadCallback(drawChart);

async function getdata(){
    let data = await fetch("../data.json");
    data =await data.json();
    function getCustomersAndTransactions(data) {
        return {
          customers: data.customers,
          transactions: data.transactions
        };
      }
      
      const result = getCustomersAndTransactions(data);
      
    //   console.log(result.customers);
    //   console.log(result.transactions);
    
     displayData(result.customers,result.transactions)
}
getdata();

let obj =[];

function displayData(x,y){

    for (let index = 0; index < y.length; index++) {
         for (let i = 0; i < x.length; i++) {
          if (y[index].customer_id== x[i].id) {
           
            myNewUbject ={"name":x[i].name,"date":y[index].date,"amount":y[index].amount};
            obj.push(myNewUbject)
            cartona +=`
            <tr>
            <td>${x[i].name}</td>
            <td>${y[index].date}</td>
            <td>${y[index].amount}</td>
            <td> <div id="barchart_material" style="width: 9px; height: 9px;"></div></td>
            <tr> 
            `
          }
        }
        main.innerHTML =cartona
      }
}



function searchByName(){

    // display only in inner html the same name 
    for (let i = 0; i < obj.length; i++) {
      if (obj[i].name == input.value) {
        console.log(obj[i].name,obj[i].date,obj[i].amount)
        cartona +=`
        <tr>
        <td>${obj[i].name}</td>
        <td>${obj[i].date}</td>
        <td>${obj[i].amount}</td>
        <tr> 
        `
      }
      main.innerHTML =cartona 
    }
    // return cartona;
}
function searchByAmount(){

 // display only in inner html the same Amount 
 for (let i = 0; i < obj.length; i++) {
   if (obj[i].amount == input.value) {
     console.log(obj[i].name,obj[i].date,obj[i].amount)
     cartona +=`
     <tr>
     <td>${obj[i].name}</td>
     <td>${obj[i].date}</td>
     <td>${obj[i].amount}</td>
     <tr> 
     `
   }
  }
  main.innerHTML =cartona 
//  return cartona;
}
//  function searchBName(){
//   let parsedNum = parseFloat(input);
//   if (typeof input.value !== " " ) {
//     cleanHTML();
//     searchByName();  
//   }   
//   if(isNaN(parsedNum)){
//     cleanHTML();
//     searchByAmount();
//   } 
 
//   console.log(typeof input.value);
//  }

 function validateInput(){
   let regextext = /[A-z]|[a-z]/
   let regexNumber =/[0-9]/
  console.log(regextext.test(input.value));
  console.log(regexNumber.test(input.value));
  if (regextext) {
         cleanHTML();
         searchByName();  
      // Handle string input logic
  } 
  if (regexNumber) {
         cleanHTML();
         searchByAmount();  
       // Handle numeric input logic
  }
  if (regexNumber == false && regextext == false ) {
    cleanHTML();
      getdata()
      // Handle other types of input (optional)
  }
}


input.addEventListener("change",searchBName);
{}

function drawChart() {
  var data = google.visualization.arrayToDataTable([
    ['Year', 'Sales', 'Expenses', 'Profit'],
    ['2014', 1000, 400, 200],
    ['2015', 1170, 460, 250],
    ['2016', 660, 1120, 300],
    ['2017', 1030, 540, 350]
  ]);

  var options = {
    chart: {
      title: 'Company Performance',
      subtitle: 'Sales, Expenses, and Profit: 2014-2017',
    },
    bars: 'horizontal' // Required for Material Bar Charts.
  };

  var chart = new google.charts.Bar(document.getElementById('barchart_material'));

  chart.draw(data, google.charts.Bar.convertOptions(options));
}
