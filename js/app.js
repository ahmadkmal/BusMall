'use strict';

/*
  Practice domain modeling by planning out an app w that allows users to choose their favorite between two goats
  Let students participate by suggesting the steps needed to make the app run
  App Flow:
  - Welcome and instructions
  - Randomly put 2 goats on the screen
    - Random number generator
    - a function to display goats
  - A user clicks on a goat
    - event listener needs to be on the image to fire the event handler
    - the event handler firesx
      - ? check if total clicks is 5 ?
      - stop letting the user click
    - if the user reach 5 tries remove image section for goats and display to the user you fininshed.
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

var goatsImages = [
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
var leftGoatImage = document.querySelector('#left_goat_img');
var rightGoatImage = document.querySelector('#right_goat_img');
var centerGoatImage = document.querySelector('#center_goat_img');
var groupImageSection = document.getElementById('all_goats');
var goats = [];//an array to store all goats object
var totalClicks = 1;
var currntPic = [];
var num1;
var num2;
var num3;
// leftGoatImage.src = `images/${goatsImages[0]}.jpg`;
// leftGoatImage.alt = goatsImages[0];

// rightGoatImage.src = `images/${goatsImages[1]}.jpg`;
// rightGoatImage.alt = goatsImages[1];

//constructor function to generate dynamic goats objects
function Goat(name){
  this.name = name.slice(0, -4);
  this.urlImage = `assets/${name}`;
  this.showen = 0;
  this.clicked = 0;
  goats.push(this);//this its refer to the object that im created
}
Goat.prototype.showing = function(){
  this.showen++;
};
Goat.prototype.click =function(){
  this.clicked++;
};
function pickRandomImages(){
  do{
    num1 =randomNumber(0 , goats.length-1 );
  }while(currntPic.includes(num1));
  do{
    num2 =randomNumber(0 , goats.length-1 );
  }
  while(currntPic.includes(num2)||num1 === num2);
  do{
    num3 =randomNumber(0 , goats.length-1 );
  }
  while(currntPic.includes(num3)||num1 === num3||num2 === num3);
  currntPic = [];
  currntPic.push(num1);
  currntPic.push(num2);
  currntPic.push(num3);
  var leftImageRandom =  goats[num1];
  var centerImageRandom = goats[num2];
  var rightImageRandom =  goats[num3];
  goats[num1].showing();
  goats[num2].showing();
  goats[num3].showing();
  leftGoatImage.setAttribute('src' , leftImageRandom.urlImage);
  leftGoatImage.setAttribute('alt' , leftImageRandom.name);
  centerGoatImage.setAttribute('src' , centerImageRandom.urlImage);
  centerGoatImage.setAttribute('alt' , centerImageRandom.urlImage);
  rightGoatImage.setAttribute('src' , rightImageRandom.urlImage);
  rightGoatImage.setAttribute('alt' ,rightImageRandom.name);

}

for(var i = 0; i< goatsImages.length ; i++){
  new Goat(goatsImages[i]);//we pass the name of the goats from the array
}
pickRandomImages();
console.log(goats);

// Variables to store the goats already on the page
// the allImages array is a property of the GoatPicture constructor
function clickImage(e){

  if( e.target.id === 'left_goat_img' ){
    pickRandomImages();
    totalClicks++;
    goats[num1].click();
  }
  if(e.target.id === 'right_goat_img'){
    pickRandomImages();
    goats[num1].click();
    totalClicks++;
  }
  if(e.target.id === 'center_goat_img')
  {
    pickRandomImages();
    goats[num1].click();
    totalClicks++;
  }
  if(totalClicks === 26){
    //remove event listener
    groupImageSection.removeEventListener('click', clickImage);
    leftGoatImage.remove();
    centerGoatImage.remove();
    rightGoatImage.remove();
    console.log('finished');
    var secEl = document.getElementById('aside');
    for(var i = 0; i< goatsImages.length ; i++){
      var pEl =document.createElement('p');
      pEl.innerText =`${goats[i].name} had a ${goats[i].clicked} votes and was showen ${goats[i].showen} times`;
      secEl.appendChild (pEl);
    }
  }
}

groupImageSection.addEventListener('click' , clickImage);

//when they reach total max clicks, remove the clicky function



// Instantiate my image objects
//helper functions
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
