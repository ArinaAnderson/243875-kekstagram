'use strict';
// var MIN_PIC_NUMBER = 1;
var MAX_PIC_NUMBER = 25;
var MIN_LIKES = 15;
var MAX_LIKES = 200;
var MIN_COMMENTS = 1;
var MAX_COMMENTS = 2;

var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var DESCRIPTION = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'
];

var mainSection  = document.querySelector('main');
var pictures = [];
var picturesSection = document.querySelector('.pictures');
var picTemplate = document.querySelector('#picture').content.querySelector('a');

// alternative to shuffleArray + slice();
function pickRandomComments(commentList) {
  var number = getRandomNum(MIN_COMMENTS, MAX_COMMENTS + 1);
  var comments = [];
  for (var i = 0; i < number; i++) {
  	var commentIndex = getRandomNum(0, commentList.length);
  	while (comments.indexOf(commentList[commentIndex]) >= 0) {
      commentIndex = getRandomNum(0, commentList.length);
  	}
    comments.push(commentList[commentIndexm]);
  }

  return comments;
}// переделать в DO WHILE:
/*var generateUrl = function (count, usedUrls) {
  do {
    var randomUrl = 'photos/' + getRandomInRange(1, count) + '.jpg';
  } while (usedUrls.indexOf(randomUrl) !== -1);
  usedUrls.push(randomUrl);
  return randomUrl;
};*/


function shuffleArray(list) {
  for (var i = list.length - 1; i > 0; i--) {
  	var randomIndex = Math.floor(Math.random() * (i + 1));
  	var actualItem = list[i];
  	list[i] = list[randomIndex];
  	list[randomIndex] = actualItem;
  }

  return list;
}

function createPhotoUrl(num) {
  return 'photos/' + (num + 1) + '.jpg';
}

function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function createPicData(num) {
  return {
  	'url': createPhotoUrl(num),
  	'likes': getRandomNum(MIN_LIKES, MAX_LIKES + 1),
  	'comments': shuffleArray(COMMENTS).slice(0, getRandomNum(1, 3)),
  	'decription': DESCRIPTION[getRandomNum(0, DESCRIPTION.length)]
  }
}

function renderPic(picData) {
  var pic = picTemplate.cloneNode(true);
  pic.querySelector('.picture__img').src = picData.url;
  pic.querySelector('.picture__likes').textContent = picData.likes;
  pic.querySelector('.picture__comments').textContent = picData.comments;

  return pic;
}

function renderPictures(picList) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < picList.length; i++) {
  	var pic = renderPic(picList[i]);
  	fragment.appendChild(pic);
  }
  picturesSection.appendChild(fragment);
}

function createPicturesList(num) {
  var picturesList = [];
  for (var i = 0; i < num; i++) {
    picturesList.push(createPicData(i));
  }

  return picturesList;
}

var bigPic = document.querySelector('.big-picture');

function addLi(text) {
  var newLi = document.createElement('li');
  newLi.classList.add('social__comment');

  var newImg = document.createElement('img');
  newImg.classList.add('social__picture');
  newImg.src = 'img/avatar-' + getRandomNum(1, 7) + '.svg'
  newImg.alt = 'Аватар комментатора фотографии';
  newImg.width = '35';
  newImg.height = '35';
  newLi.appendChild(newImg);

  var newText = document.createElement('p');
  newText.classList.add('social__text');
  newText.textContent = text;
  newLi.appendChild(newText);

  return newLi;
}

function fillBigPic(picData) {
  bigPic.querySelector('.big-picture__img').querySelector('img').src = picData.url;

  bigPic.querySelector('.likes-count').textContent = picData.likes.toString();

  bigPic.querySelector('.comments-count').textContent = picData.comments.length;

  bigPic.querySelector('.social__caption').textContent = picData.decription;

  var commentFragment = document.createDocumentFragment();
  for (var i = 0; i < picData.comments.length; i++) {
  	var newLi = addLi(picData.comments[i]);
  	commentFragment.appendChild(newLi);
  }
  bigPic.querySelector('.social__comments').appendChild(commentFragment);
}

/* function renderBigPics(picList) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < picList.length; i++) {
    //var bigPicElem = fillBigPic(picList[i]);
    fillBigPic(picList[i]);
    //fragment.appendChild(bigPicElem);
  }
  //main.appendChild(bigPicElem);
}*/

pictures = createPicturesList(MAX_PIC_NUMBER);
renderPictures(pictures);
// renderBigPics(pictures);
fillBigPic(pictures[2]);
bigPic.classList.remove('hidden');