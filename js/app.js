'use strict';

/*
  Practice domain modeling by planning out an app w that allows users to choose their favorite between two items
  Let students participate by suggesting the steps needed to make the app run
  App Flow:
  - Welcome and instructions
  - Randomly put 2 items on the screen
    - Random number generator
    - a function to display items
  - A user clicks on a item
    - event listener needs to be on the image to fire the event handler
    - the event handler firesx
      - ? check if total clicks is 5 ?
      - stop letting the user click
    - if the user reach 5 tries remove image section for items and display to the user you fininshed.
  HTML
    - have a left and right image container in the html
    - Give them id's so we can select them
  We need an Array to hold all image Objects
  function to randomly pick an image{
  }
  click on an image, targetted by id
  add event listener('click', function(){
  })
*/

var itemsImages = [
  'bathroom.jpg',
  'bubblegum.jpg',
  'dog-duck.jpg',
  'pet-sweep.jpg',
  'sweep.png',
  'usb.gif',
  'bag.jpg',
  'boots.jpg',
  'chair.jpg',
  'dragon.jpg',
  'scissors.jpg',
  'tauntaun.jpg',
  'water-can.jpg',
  'banana.jpg',
  'breakfast.jpg',
  'cthulhu.jpg',
  'pen.jpg',
  'shark.jpg',
  'unicorn.jpg',
  'wine-glass.jpg'
];

// Globals
var leftitemImage = document.querySelector('#left_item_img');
var rightitemImage = document.querySelector('#right_item_img');
var centeritemImage = document.querySelector('#center_item_img');
var groupImageSection = document.getElementById('all_items');
var inputForm = document.getElementById('itemform');
var inputImeges = 0;
var loops = 0;
var imageTodisplay = [];
var items = [];//an array to store all items object
var totalClicks = 1;
var currntImages = [];
var previousImages = [];
// var num1;
// var num2;
// var num3;
// leftitemImage.src = `images/${itemsImages[0]}.jpg`;
// leftitemImage.alt = itemsImages[0];

// rightitemImage.src = `images/${itemsImages[1]}.jpg`;
// rightitemImage.alt = itemsImages[1];

//constructor function to generate dynamic items objects
inputForm.addEventListener('submit', getValues);

function getValues(event) {
  event.preventDefault();
  groupImageSection.innerHTML = '';

  console.log(event);
  inputImeges = Number(event.target.numOfImages.value);
  loops = Number(event.target.numOfLoops.value);
  pickRandomImages();
}

function Item(name) {
  this.name = name.slice(0, -4);
  this.urlImage = `assets/${name}`;
  this.showen = 0;
  this.clicked = 0;
  items.push(this);//this its refer to the object that im created
}
Item.prototype.showing = function () {
  this.showen++;
};
Item.prototype.click = function () {
  this.clicked++;
};
function hasDuplicates(array) {
  var valuesSoFar = Object.create(null);
  for (var i = 0; i < array.length; ++i) {
    var value = array[i];
    if (value in valuesSoFar) {
      return true;
    }
    valuesSoFar[value] = true;
  }
  return false;
}
function imagGeneration() {
  do{
    currntImages = [];
    for (let index = 0; index < inputImeges; index++){
      currntImages.push(randomNumber(0, itemsImages.length-1));
    }

  }
  while (currntImages.some(r => previousImages.includes(r)) || hasDuplicates(currntImages));

}
function pickRandomImages() {
  imagGeneration();
  for (let numOfimges = 0; numOfimges < inputImeges; numOfimges++){
    console.log(currntImages);
    var imgEl = document.createElement('img');
    var oo = items[currntImages[numOfimges]].urlImage;
    imgEl.setAttribute('src',oo);
    imgEl.setAttribute('alt',items[currntImages[numOfimges]].name);
    items[currntImages[numOfimges]].showing();
    console.log(items[currntImages[numOfimges]].showen);
    imageTodisplay.push(imgEl);
    groupImageSection.appendChild(imgEl);
    console.log('passed');
  }
  previousImages = currntImages ;
  currntImages = [];
}


for (var i = 0; i < itemsImages.length; i++) {
  new Item(itemsImages[i]);//we pass the name of the items from the array
}
// pickRandomImages();
console.log(items);

// Variables to store the items already on the page
// the allImages array is a property of the itemPicture constructor
function clickImage(e) {
  for (let index = 0; index < previousImages.length; index++) {
    if(items[previousImages[index]].name===e.target.alt){
      totalClicks++;
      groupImageSection.innerHTML = '';
      pickRandomImages();
      items[previousImages[index]].click();
      
      if (totalClicks === loops) {
      //remove event listener
        groupImageSection.removeEventListener('click', clickImage);
        leftitemImage.remove();
        centeritemImage.remove();
        rightitemImage.remove();
        console.log('finished');
        var secEl = document.getElementById('aside');
        
        for (var i = 0; i < itemsImages.length; i++) {
          var pEl = document.createElement('p');
          pEl.innerText = `${items[i].name} had a ${items[i].clicked} votes and was showen ${items[i].showen} times`;
          secEl.appendChild(pEl);
          darw();
  
        }
      }
    }
  
  }
  // if( e.target.id === 'left_item_img' ){
  //   pickRandomImages();
  //   totalClicks++;
  //   items[num1].click();
  // }
  // if(e.target.id === 'right_item_img'){
  //   pickRandomImages();
  //   items[num1].click();
  //   totalClicks++;
  // }
  // if(e.target.id === 'center_item_img')
  // {
  //   pickRandomImages();
  //   items[num1].click();
  //   totalClicks++;
  // }
  // console.log(e);
  // if (totalClicks === loops) {
  //   //remove event listener
  //   groupImageSection.removeEventListener('click', clickImage);
  //   leftitemImage.remove();
  //   centeritemImage.remove();
  //   rightitemImage.remove();
  //   console.log('finished');
  //   var secEl = document.getElementById('aside');
  //   for (var i = 0; i < itemsImages.length; i++) {
  //     var pEl = document.createElement('p');
  //     pEl.innerText = `${items[i].name} had a ${items[i].clicked} votes and was showen ${items[i].showen} times`;
  //     secEl.appendChild(pEl);
  //     darw();

  //   }
  // }
}

groupImageSection.addEventListener('click', clickImage);

//when they reach total max clicks, remove the clicky function

function darw() {
  groupImageSection.innerHTML = '';
  var canvasEl = document.createElement('canvas');
  groupImageSection.appendChild(canvasEl);
  canvasEl.style.width = '300px';
  canvasEl.style.height = '300px';
  var itemsName = [];
  var itemsLikes = [];
  var itemsViwes = [];
  for (let index = 0; index < itemsImages.length; index++) {
    itemsName.push(items[index].name);
    itemsLikes.push(items[index].clicked);
    itemsViwes.push(items[index].showen);
  }
  var myChart = new Chart(canvasEl, {
    type: 'bar',
    data: {
      datasets: [{
        label: '# of click ',
        data: itemsLikes,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderWidth: 1
      },
      {
        label: '# of viwes ',
        data: itemsViwes,
        type: 'line'
      }],
      labels: itemsName,
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
  canvasEl.style.width = '600px';
  canvasEl.style.height = '600px';
}

// Instantiate my image objects
//helper functions
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
