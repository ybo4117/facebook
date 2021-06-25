const profileImgElem = document.querySelector('#flexContainer .profile.w300.pointer');
const modalElem = document.querySelector('section .modal');
const modalCloseElem = document.querySelector('section .modal .modal_close');

const profileImgParentList = document.querySelector('.profile-img-parent');

//모든 no-main-profile 아이콘에 이벤트를 걸어준다.
//이벤트는 메인 이미지 변경처리
const noMainProfileList = document.querySelectorAll('.no-main-profile');
noMainProfileList.forEach((item) => {
    item.addEventListener('click', () => {
        const iprofile = item.dataset.iprofile;
        changeMainProfile(iprofile);
    });
});

//메인 이미지 변경
function changeMainProfile(iprofile) {
    fetch(`/user/mainProfile?iprofile=${iprofile}`)
        .then(res => res.json())
        .then(myJson => {
            console.log(myJson.result);
        });
}


//모달창 띄우기
profileImgElem.addEventListener('click', () => {
    modalElem.classList.remove('hide');
});

//모달창 닫기
modalCloseElem.addEventListener('click', () => {
    modalElem.classList.add('hide');
})