const profileImgElem = document.querySelector('#flexContainer .profile.w300.pointer');
const modalElem = document.querySelector('section .modal');
const modalCloseElem = document.querySelector('section .modal .modal_close');

//모든 no-main-profile 아이콘에 이벤트를 걸어준다.
//이벤트는 메인 이미지 변경처리
const profileImgParentList = document.querySelectorAll('.profile-img-parent');
profileImgParentList.forEach(item => {
    const iElem = item.querySelector('i');
    if(iElem != null) {
        addIElemEvent(iElem);
    }
});

//메인이미지 바꾸기 아이콘에 이벤트 설정
function addIElemEvent(target) {
    target.addEventListener('click', () => {
        const iprofile = target.parentNode.dataset.iprofile;
        console.log(iprofile);
        changeMainProfile(iprofile);
    });
}

//메인 이미지 변경
function changeMainProfile(iprofile) { //iprofile: 3
    fetch(`/user/mainProfile?iprofile=${iprofile}`)
        .then(res => res.json())
        .then(myJson => {
            switch(myJson.result) {
                case 0:
                    alert('메인 이미지 변경에 실패하였습니다.'); break;
                case 1:
                    setMainProfileIcon(iprofile);
                    //바뀐 메인 이미지 img 값을 찾기
                    //const findParentDiv = profileImgParentList.find(item => item.dataset.iprofile === iprofile);
                    /*
                    const findParentDiv = profileImgParentList.find(function(item) {
                        return item.dataset.iprofile === iprofile;
                    });
                    */
                    let findParentDiv = null;
                    for(let i=0; i<profileImgParentList.length; i++) {
                        const item = profileImgParentList[i];
                        if(item.dataset.iprofile === iprofile) {
                            findParentDiv = item;
                            break;
                        }
                    }

                    const containerElem = findParentDiv.parentNode;
                    const imgElem = containerElem.querySelector('img');

                    //section에 있는 프로필 이미지 변경
                    profileImgElem.src = imgElem.src;

                    //헤더에 있는 프로필 이미지 변경
                    const headerProfileImgElem = document.querySelector('header .span__profile img');
                    headerProfileImgElem.src = imgElem.src;
                    break;
            }
        });
}
//현재 mainProfile로 바뀐 iprofile값 입니다.
function setMainProfileIcon(iprofile) {
    profileImgParentList.forEach(item => {
        item.innerHTML = '';
        const itemIprofile = item.dataset.iprofile;
        if(iprofile !== itemIprofile) {
            const iElem = document.createElement('i');
            iElem.className = 'no-main-profile pointer fas fa-bell';
            item.append(iElem);
            addIElemEvent(iElem);
        }
    });
}
//모달창 띄우기
profileImgElem.addEventListener('click', () => {
    modalElem.classList.remove('hide');
});
//모달창 닫기
modalCloseElem.addEventListener('click', () => {
    modalElem.classList.add('hide');
    //location.reload();
});