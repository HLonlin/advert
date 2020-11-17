<template>
  <div class="index">
    <div class="slider">
      <!-- slides -->
      <div class="slider__slides">
        <div v-for="(item,i) in adlist" class="slide" :class="{ 's--active': i==0 }" :key="i" :data-slide="i+1"
          :data-type='item.linkType'>
          <div v-if="item.linkType==='image'" class="slide__inner" :style="{backgroundImage: 'url(' + item.imgUrl + ')' }">
            <div class="slide__content__box">
              <!-- <div class="slide__content">
                <h2 class="slide__heading">{{item.heading}}</h2>
                <p class="slide__text">{{item.text}}</p>
              </div> -->
            </div>
          </div>
          <div v-else-if="item.linkType==='video'" class="slide__inner">
            <div class="slide__content__box">
              <video muted controls class="slide__inner--video" :src="item.url">
                您的浏览器不支持播放此视频。
              </video>
            </div>
          </div>
        </div>
      </div>
      <!-- slides end -->
      <!-- <div class="slider__control slider__control--left" @click="controlClickHandler($event,false)">
        <div class="slider__control-line"></div>
        <div class="slider__control-line"></div>
      </div>
      <div class="slider__control slider__control--right" @click="controlClickHandler($event,true)">
        <div class="slider__control-line"></div>
        <div class="slider__control-line"></div>
      </div> -->
    </div>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        adlist: [],
        slidingBlocked: false,
        numOfSlides: 0,
        autoPlayTime: 800,
      };
    },
    beforeCreate() {},
    created() {
      this.getAdlist();
    },
    beforeMount() {},
    mounted() {
      this.silder()
    },
    beforeUpdate() {},
    updated() {},
    beforeDestroy() {},
    destroyed() {},
    methods: {
      getAdlist() { // 获取广告列表
        let that = this;
        that.$axios.get(that.$api.adList, {
          params: {
            'device': '广告屏'
          }
        }).then(res => {
          // let testArr = [];
          // for (let i = 0, imax = 6; i < imax; i++) {
          //   let testItem = {
          //     "indexNum": i,
          //     "endDate": "2020-11-06 18:57:21",
          //     "createTimeStamp": "",
          //     "creatorId": i,
          //     "creatorName": "系统管理员",
          //     "url": "@/assets/video/TXbgAgfaokkA.mp4",
          //     "imgUrl": "@/assets/img/" + (i + 1) + ".jpg",
          //     "createTime": "16:40:55",
          //     "name": "广告",
          //     "linkType": "image",
          //     "id": i,
          //     "device": "设备",
          //     "startDate": "2020-11-06 18:57:20",
          //     "createDate": "2020-11-06",
          //     "status": 0,
          //     "autoPlayTime": 800
          //   };
          //   switch (i) {
          //     case 0:
          //       testItem.imgUrl =
          //         "https://img.zcool.cn/community/0199ff5fb23adc11013fdcc76ab3ff.jpg@3000w_1l_0o_100sh.jpg";
          //       break;
          //     case 1:
          //       testItem.imgUrl =
          //         "https://img.zcool.cn/community/01adc55fb2372711013fdcc7eb1456.jpg@1280w_1l_2o_100sh.jpg";
          //       break;
          //     case 2:
          //       testItem.imgUrl =
          //         "https://img.zcool.cn/community/01def95fb2373611013ee04d46772d.jpg@1280w_1l_2o_100sh.jpg";
          //       break;
          //     case 3:
          //       testItem.imgUrl =
          //         "https://img.zcool.cn/community/0157bd5fb21d8111013ee04db4cd84.jpg@1280w_1l_2o_100sh.jpg";
          //       break;
          //     case 4:
          //       testItem.imgUrl =
          //         "https://img.zcool.cn/community/0141ba5fb21d8111013fdcc799a838.jpg@1280w_1l_2o_100sh.jpg";
          //       break;
          //     case 5:
          //       testItem.imgUrl =
          //         "https://img.zcool.cn/community/01bfc15fb21ca211013ee04d17bf5d.jpg@1280w_1l_2o_100sh.jpg";
          //       testItem.linkType = 'video';
          //       testItem.url =
          //         "https://1252326633.vod2.myqcloud.com/4d86cec3vodcq1252326633/1d04542e5285890809824326316/TXbgAgfaokkA.mp4"
          //       break;
          //   }
          //   testArr.push(testItem);
          //   res.data = testArr;
          // }

          console.log('Handle the success event:', res.data);
          for (let i = 0, imax = res.data.length; i < imax; i++) {
            that.$set(that.adlist, i, res.data[i]);
          }
          that.silder();
        });
      },
      silder() {
        let that = this;
        that.$nextTick(() => {
          let slides = document.getElementsByClassName('slide');
          let controls = document.getElementsByClassName('slider__control');
          let inner = document.getElementsByClassName('slide__inner');
          that.numOfSlides = slides.length;
          for (let i = 0, imax = slides.length; i < imax; i++) {
            let index = i + 1;
            slides[i].classList.add('slide-' + index);
          }
          that.autoPlaySilder();
        });
      },
      // controlClickHandler(event, isRight) { //点击翻页
      //   let that = this;
      //   if (that.slidingBlocked) return;
      //   that.slidingBlocked = true;
      //   let $control = event.target;
      //   let $curActive = document.querySelector('.slide.s--active');
      //   let index = $curActive.dataset.slide;

      //   (isRight) ? index++ : index--;
      //   if (index < 1) index = that.numOfSlides;
      //   if (index > that.numOfSlides) index = 1;
      //   let $newActive = document.querySelector('.slide-' + index);

      //   $control.classList.add('a--rotation');
      //   $curActive.classList.remove('s--active');
      //   $newActive.classList.add('s--active');

      //   setTimeout(function() {
      //     $control.classList.remove('a--rotation');
      //     that.slidingBlocked = false;
      //   }, that.slidingAT);
      // },
      autoPlaySilder() { //自动轮播
        let that = this;
        if (that.slidingBlocked || that.adlist.length <= 0) return;
        that.slidingBlocked = true;
        let $curActive = document.querySelector('.slide.s--active');
        let index = $curActive.dataset.slide;
        let $curAd = that.adlist[index - 1];
        if ($curAd.linkType === "image") {
          that.autoPlayTime = $curAd.autoPlayTime;
          let timer_out = setTimeout(function() {
            index++;
            if (index > that.numOfSlides) index = 1;
            let $newActive = document.querySelector('.slide-' + index);
            $curActive.classList.remove('s--active');
            $newActive.classList.add('s--active');
            that.slidingBlocked = false;
            clearTimeout(timer_out);
            that.autoPlaySilder();
          }, that.autoPlayTime);
        } else if ($curAd.linkType === "video") {
          let videoer = $curActive.children[0].children[0].children[0];
          videoer.play();
          videoer.addEventListener('ended', function() { //结束
            index++;
            if (index > that.numOfSlides) index = 1;
            let $newActive = document.querySelector('.slide-' + index);
            $curActive.classList.remove('s--active');
            $newActive.classList.add('s--active');
            that.slidingBlocked = false;
            that.autoPlaySilder();
          }, false);
        }
      }
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .index {
    overflow: hidden;
  }

  .slider {
    position: relative;
    height: 100vh;
  }

  .slider__slides {
    z-index: 1;
    position: relative;
    height: 100%;
  }

  .slider__control {
    z-index: 2;
    position: absolute;
    top: 50%;
    width: 60px;
    height: 60px;
    margin-top: -30;
    border-radius: 50%;
    background-color: #fff;
    transition: background-color 0.3s;
    cursor: pointer;
  }

  .slider__control--left {
    left: 1.875rem;
  }

  .slider__control--right {
    right: 1.875rem;
  }

  .slider__control:hover {
    background-color: #2da6ff;
  }

  .slider__control-line {
    position: absolute;
    left: 23px;
    top: 50%;
    width: 3px;
    height: 14px;
    transform-origin: 50% 0;
    transform: rotate(-45deg);
  }

  .slider__control-line:nth-child(2) {
    transform: translateY(1px) rotate(-135deg);
  }

  .slider__control--right>.slider__control-line {
    left: 37px;
    transform-origin: 1px 0;
    transform: rotate(45deg);
  }

  .slider__control--right>.slider__control-line:nth-child(2) {
    transform: translateY(1px) rotate(135deg);
  }

  .slider__control-line:after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: #e2e2e2;
    transition: background-color 0.3s;
  }

  .slider__control:hover .slider__control-line:after {
    background-color: #fff;
  }

  .slider__control.a--rotation:after {
    animation: arrowLineRotation 0.49s;
  }

  .slider__control.a--rotation:nth-child(1):after {
    animation: arrowLineRotationRev 0.49s;
  }

  @keyframes arrowLineRotation {
    to {
      transform: rotate(180deg);
    }
  }

  @keyframes arrowLineRotationRev {
    to {
      transform: rotate(-180deg);
    }
  }


  .slide {
    overflow: hidden;
    position: absolute;
    left: 50%;
    top: 50%;
    width: 200vmax;
    height: 200vmax;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    transition: clip-path 0s ease 0.6s;
    clip-path: circle(0% at 50% 50%);
  }

  .slide.s--active {
    z-index: 1;
    transition: clip-path 0.6s ease;
    clip-path: circle(100vmax at 50% 50%);
  }

  /*  .slide.s--prev {
    transition: clip-path 0s ease 0.8s;
    clip-path: circle(0px at 50px 50%);
  }

  .slide.s--active.s--active-prev {
    transition: clip-path 0.8s ease;
    clip-path: circle(120vmax at 50% 50%);
  } */

  .slide__inner {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 100vw;
    height: 100vh;
    margin-left: -50vw;
    margin-top: -50vh;
    background-size: cover;
    background-position: center center;
  }

  .slide__inner:before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
  }

  .slide__content__box {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .slide__content {
    position: absolute;
    left: 5%;
    top: 50%;
    margin-left: -30px;
    margin-top: 48px;
    max-width: 480px;
    color: #fff;
    background-color: #000000;
  }

  .slide__heading {
    margin-bottom: 20px;
    font-size: 60px;
  }

  .slide__text {
    font-size: 25px;


  }

  .slide__text a {
    color: inherit;
  }

  .slide__inner--video {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center center;
  }
</style>
