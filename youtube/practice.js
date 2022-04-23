"use strict;"


// LikeButton and UnlikeButton Click Evenet
const likeBtn = document.getElementById('like');
const unlikeBtn = document.getElementById('unlike');
let like_sign = 0;
let unlike_sign = 0;

function clickLikeBtn() {
  if (likeBtn.classList.contains('active')) {
      likeBtn.classList.remove('active');
      like_sign = 0;
  }
  else {
    if (unlike_sign == 1)
      alert("이미 싫어요를 눌렀습니다.");
    else {
      likeBtn.classList.add('active');
      like_sign = 1;
    }
  }
}

function clickUnlikeBtn() {
  if (unlikeBtn.classList.contains('active')) {
    unlikeBtn.classList.remove('active');
    unlike_sign = 0;
  }
  else {
    if (like_sign == 1)
      alert("이미 좋아요를 눌렀습니다.");
    else {
      unlikeBtn.classList.add('active');
      unlike_sign = 1;
    }
  }
}

likeBtn.addEventListener('click', () => clickLikeBtn());
unlikeBtn.addEventListener('click', () => clickUnlikeBtn());



// MoreButton and SimpleButton Click Event
const moreBtn = document.getElementById('moreBtn');
const moreContent = document.getElementById('content');
const hideBtn = document.getElementById('content-hide');

function clickMoreBtn() {
  moreBtn.style.display = 'none';
  moreContent.style.display = 'inline';
  hideBtn.style.display = 'inline';
}

function clickHideBtn() {
  moreBtn.style.display = '';
  moreContent.style.display = '-webkit-box';
  hideBtn.style.display = 'none';
}

moreBtn.addEventListener('click', () => clickMoreBtn());
hideBtn.addEventListener('click', () => clickHideBtn());



// Channel Subscribe Button Event
const subscribeBtn = document.getElementById('subscribe');

subscribeBtn.addEventListener('click', () => {
  if (subscribeBtn.classList.contains('active')) {
    subscribeBtn.classList.remove('active');
    subscribeBtn.innerText = '구독';
  }
  else {
    subscribeBtn.classList.add('active');
    subscribeBtn.innerText = '구독중';
  }
});
