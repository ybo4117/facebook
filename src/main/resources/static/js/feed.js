// 날짜정보
function getDataTimeInfo(dt) {
    const nowDt = new Date();
    const targetDt = new Date(dt);

    const nowDtsec = parseInt(nowDt.getTime() / 1000);
    const targetDtSec = parseInt(targetDt.getTime() / 1000);

    const diffSec = nowDtsec - targetDtSec;
    if (diffSec < 120) {
        return '방금 전';
    } else if (diffSec < 3600) { // 분 단위
        return `${parseInt(diffSec / 60)}분 전`;
    } else if (diffSec < 86400) { // 시간 단위
        return `${parseInt(diffSec / (60 * 60))}시간 전`;
    } else if (diffSec < 604800) { // 일 단위
        return `${parseInt(diffSec / (60 * 60 * 24))}일 전`;
    }
    return targetDt.toLocaleString();
}

const feedObj = {
    limit: 5,
    itemLength: 0,
    currentPage: 1,
    url: '',
    iuser: 0,
    swiper: null,
    containerElem: document.querySelector('#feedContainer'),
    loadingElem: document.querySelector('.loading'),

    makeFeedList: function (data) {
        if (data.length == 0) {
            return;
        }

        for (let i = 0; i < data.length; i++) {
            const item = data[i];

            const itemContainer = document.createElement('div');
            itemContainer.classList.add('item');

            // 글쓴이 정보 영역
            const regDtInfo = getDataTimeInfo(item.regdt);
            const topDiv = document.createElement('div');
            topDiv.classList.add('top')
            topDiv.innerHTML = `
            <div class="itemProfileCont">
                <img src="/pic/profile/${item.iuser}/${item.mainProfile}">
            </div>
            <div>
                <div>${item.writer} - ${regDtInfo}</div>
                <div>${item.location == null ? '' : item.location}</div>
            </div>            
        `;

            //이미지영역
            const imgDiv = document.createElement('div');
            imgDiv.classList.add('itemImg');

            const swiperContainerDiv = document.createElement('div');
            swiperContainerDiv.classList.add('swiper-container');

            const swiperWrapperDiv = document.createElement('div');
            swiperWrapperDiv.classList.add('swiper-wrapper');

            swiperContainerDiv.append(swiperWrapperDiv);
            imgDiv.append(swiperContainerDiv);

            for (let z = 0; z < item.imgList.length; z++) {
                const imgObj = item.imgList[z];

                const swiperSlideDiv = document.createElement('div');
                swiperSlideDiv.classList.add('swiper-slide');

                const img = document.createElement('img');
                img.src = `/pic/feed/${item.ifeed}/${imgObj.img}`;
                swiperSlideDiv.append(img);
                swiperWrapperDiv.append(swiperSlideDiv);
            }

            itemContainer.append(topDiv);
            itemContainer.append(imgDiv);

            //좋아요 영역
            const favDiv = document.createElement('div');
            favDiv.classList.add('favCont');
            const heartIcon = document.createElement('i'); // 하트모양
            heartIcon.className = 'fa-heart pointer';

            if (item.isFav === 1) { // 좋아요 o
                heartIcon.classList.add('fas');
            } else { // 좋아요 x
                heartIcon.classList.add('far');
            }

            const heartCntSpan = document.createElement('span');
            heartCntSpan.innerText = item.favCnt;

            heartIcon.addEventListener('click', () => {
                item.isFav = 1 - item.isFav;
                fetch(`fav?ifeed=${item.ifeed}&type=${item.isFav}`)
                    .then(res => res.json())
                    .then(myJson => {
                        if (myJson === 1) {
                            switch (item.isFav) {
                                case 0: // o > x
                                    heartIcon.classList.remove('fas');
                                    heartIcon.classList.add('far');
                                    heartCntSpan.innerText--;
                                    break;
                                case 1: // x > 0
                                    heartIcon.classList.remove('far');
                                    heartIcon.classList.add('fas');
                                    heartCntSpan.innerText++;
                                    break;
                            }
                        }
                    })
            });
            favDiv.append(heartIcon);
            favDiv.append(heartCntSpan);

            itemContainer.append(favDiv);

            //글내용 영역
            if (item.ctnt != null) {
                const ctntDiv = document.createElement('div');
                ctntDiv.innerText = item.ctnt;
                ctntDiv.classList.add('itemCtnt');
                itemContainer.append(ctntDiv);
            }

            //댓글 영역
            const cmtDiv = document.createElement('div');
            const cmtListDiv = document.createElement('div');
            const cmtFormDiv = document.createElement('div')
            cmtDiv.append(cmtListDiv);
            if (item.cmt != null && item.cmt.isMore === 1) {
                const changeCmtDiv = document.createElement('div');
                const moreCmtSpan = document.createElement('span');
                const lessCmtSpan = document.createElement('span');
                moreCmtSpan.className = 'pointer';
                moreCmtSpan.innerText = '댓글 더보기';

                lessCmtSpan.className = 'pointer';
                lessCmtSpan.innerText = '댓글 접기';
                lessCmtSpan.classList.add('hide');

                moreCmtSpan.addEventListener('click', () => {
                    moreCmtSpan.classList.add('hide');
                    lessCmtSpan.classList.remove('hide');
                    fetch(`cmt?ifeed=${item.ifeed}`)
                        .then(res => res.json())
                        .then(myJson => {
                            myJson.forEach(cmtItem => {
                                const cmtItemContainerDiv = this.makeCmtItem(cmtItem);
                                cmtListDiv.append(cmtItemContainerDiv);
                            })
                        });
                });
                lessCmtSpan.addEventListener('click', () => {
                    lessCmtSpan.classList.add('hide');
                    moreCmtSpan.classList.remove('hide');
                    cmtListDiv.innerHTML = '';
                    const cmtItemContainerDiv = this.makeCmtItem(item.cmt);
                    cmtListDiv.append(cmtItemContainerDiv);
                });

                changeCmtDiv.append(moreCmtSpan);
                changeCmtDiv.append(lessCmtSpan);
                cmtDiv.append(changeCmtDiv);

            }
            cmtDiv.append(cmtFormDiv);

            const cmtInput = document.createElement('input');
            cmtInput.type = 'text';
            cmtInput.placeholder = '댓글 입력하셈';
            cmtInput.addEventListener('keyup', (e)=>{
               if(e.key === 'Enter'){
                   cmtBtn.click();
               }
            });

            if (item.cmt != null) { // 댓글이 있음
                const cmtItemContainerDiv = this.makeCmtItem(item.cmt);
                cmtListDiv.append(cmtItemContainerDiv);
            }

            const cmtBtn = document.createElement('input');
            cmtBtn.type = 'button';
            cmtBtn.value = '등록';

            cmtBtn.addEventListener('click', () => {
                const cmt = cmtInput.value;
                if (cmt.length === 0) {
                    alert('댓글을 작성해 주세요');
                    return;
                }

                const param = {
                    ifeed: item.ifeed,
                    cmt: cmt
                };

                fetch('cmt', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(param)
                })
                    .then(res => res.json())
                    .then(myJson => {
                        console.log(myJson);
                        switch (myJson) {
                            case 0:
                                alert('댓글을 등록할 수 없습니다.');
                                break;
                            case 1:
                                alert('댓글을 등록 성공');
                                const globalConstElem = document.querySelector('#globalConst'); // 헤더에 필요한 값을 담아주기위해 HTML에서 받아옴
                                const param = {...globalConstElem.dataset}; //객체만들기
                                param.cmt = cmtInput.value; // 버튼에 등록된 cmt값을 넣어줌

                                const cmtItemDiv = this.makeCmtItem(param)
                                cmtListDiv.append(cmtItemDiv);

                                cmtInput.value = '';
                                break;
                        }
                    })
                    .catch(err => {
                        console.log("err : " + err);
                    });
            });


            cmtFormDiv.append(cmtInput);
            cmtFormDiv.append(cmtBtn);

            itemContainer.append(cmtDiv);
            this.containerElem.append(itemContainer);
        }
        if (this.swiper != null) {
            this.swiper = null;
        }
        this.swiper = new Swiper('.swiper-container', {
            direction: 'horizontal',
            loop: false,
        });
    },
    setScrollInfinity: function (target) {
        target.addEventListener('scroll', () => {
            const {
                scrollTop,
                scrollHeight,
                clientHeight
            } = document.documentElement;

            if (scrollTop + clientHeight >= scrollHeight - 5 && this.itemLength === this.limit) {
                this.itemLength = 0;
                this.getFeedList(++this.currentPage);
            }
        }, {passive: true});
    },
    getFeedList: function (page) {
        this.showLoading();

        fetch(`${this.url}?iuserForMyFeed=${this.iuser}&page=${page}&limit=${this.limit}`)
            .then(res => res.json())
            .then(myJson => {
                console.log(myJson);
                this.itemLength = myJson.length;
                this.makeFeedList(myJson);
            }).catch(err => {
            console.log(err);
        }).then(() => {
            this.hideLoading();
        });
    },
    makeCmtItem: function ({iuser, writerProfile, writer, cmt, regdt}) {
        const cmtItemContainerDiv = document.createElement('div');
        cmtItemContainerDiv.className = 'cmtItemCont';

        //프로필
        const cmtItemProfileDiv = document.createElement('div');
        cmtItemProfileDiv.className = 'cmtItemProfile';
        const cmtItemWriterProfileImg = document.createElement('img');
        cmtItemWriterProfileImg.src = `/pic/profile/${iuser}/${writerProfile}`;
        cmtItemWriterProfileImg.className = 'profile w30';

        cmtItemProfileDiv.append(cmtItemWriterProfileImg);
        cmtItemContainerDiv.append(cmtItemProfileDiv);

        //댓글
        const cmtItemCtntDiv = document.createElement('div');
        cmtItemCtntDiv.className = 'cmtItemCtnt';
        cmtItemCtntDiv.innerHTML = `<div>${writer}</div> <div class="mainflex"><div>${cmt}</div><div class="regdtflex">${regdt}</div></div>`;
        cmtItemContainerDiv.append(cmtItemCtntDiv);

        return cmtItemContainerDiv;
    },
    hideLoading: function () {
        this.loadingElem.classList.add('hide');
    },
    showLoading: function () {
        this.loadingElem.classList.remove('hide');
    },
}

