'use strict';

var itemsImages = ['bathroom.jpg','bubblegum.jpg','dog-duck.jpg','pet-sweep.jpg','sweep.png', 'usb.gif', 'bag.jpg', 'boots.jpg','chair.jpg','dragon.jpg','scissors.jpg','tauntaun.jpg', 'water-can.jpg', 'banana.jpg', 'breakfast.jpg', 'cthulhu.jpg', 'pen.jpg', 'shark.jpg', 'unicorn.jpg', 'wine-glass.jpg'];

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
var totalClicks = 0;
var currntImages = [];
var previousImages = [];



// make a div
var divEl = document.createElement('div');

var pEl = document.createElement('p');
pEl.innerText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
// event listner to take submit
inputForm.addEventListener('submit', getValues);



/// function for dorm submit
function getValues(event) {
  event.preventDefault();
  groupImageSection.innerHTML = '';
  var h3El = document.createElement('h3');
  h3El.innerHTML = 'please select the element that you like';
  groupImageSection.appendChild(h3El);
  groupImageSection.appendChild(divEl);
  groupImageSection.appendChild(pEl);
  console.log(event);
  inputImeges = Number(event.target.numOfImages.value);
  loops = Number(event.target.numOfLoops.value);
  // enter datat , remove form , dispaly text , call function pickrandom image
  pickRandomImages();
}



// to dispaly th images
function pickRandomImages() {
  imagGeneration();
// to diplay image by input times
  for (let numOfimges = 0; numOfimges < inputImeges; numOfimges++){
    console.log(currntImages);
    var imgEl = document.createElement('img');
    var oo = items[currntImages[numOfimges]].urlImage;
    imgEl.setAttribute('src',oo);
    imgEl.setAttribute('alt',items[currntImages[numOfimges]].name);
    items[currntImages[numOfimges]].showing();
    console.log(items[currntImages[numOfimges]].showen);
    imageTodisplay.push(imgEl);
    divEl.appendChild(imgEl);
    console.log('passed');
  }
  previousImages = currntImages ;
  currntImages = [];
}


// to genaret numbers withou depublic and not from previous
function imagGeneration() {
  do{
    currntImages = [];
    for (let index = 0; index < inputImeges; index++){
      currntImages.push(randomNumber(0, itemsImages.length-1));
    }

  }
  while (currntImages.some(r => previousImages.includes(r)) || hasDuplicates(currntImages));

}

// this for duplicate from array to array
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


// counstractur for itemes
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









for (var i = 0; i < itemsImages.length; i++) {
  new Item(itemsImages[i]);//we pass the name of the items from the array
}
// pickRandomImages();
console.log(items);



// event listener for click on pics
groupImageSection.addEventListener('click', clickImage);

// function on cleck , identefiy the clicked image by title and name of object incremant number of click
// if number of click retch the max number remove the event and display chart
function clickImage(e) {
  for (let index = 0; index < previousImages.length; index++) {
    if(items[previousImages[index]].name===e.target.alt){
      totalClicks++;
      items[previousImages[index]].click();
      
      if (totalClicks === loops) {
      //remove event listener
        groupImageSection.removeEventListener('click', clickImage);
        console.log('finished');
        var secEl = document.getElementById('aside');
        
        for (var i = 0; i < itemsImages.length; i++) {
          var pEl = document.createElement('p');
          pEl.innerText = `${items[i].name} had a ${items[i].clicked} votes and was showen ${items[i].showen} times`;
          secEl.appendChild(pEl);
          darw();
  
        }

      }
      divEl.innerHTML = '';
      pickRandomImages();
    }
  
  }
  
}



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
