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

        fetch(`${this.url}?page=${page}&limit=${this.limit}`)
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
    hideLoading: function () {
        this.loadingElem.classList.add('hide');
    },
    showLoading: function () {
        this.loadingElem.classList.remove('hide');
    }
}