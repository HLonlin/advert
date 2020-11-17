<template>
  <div class="index">
    <div class="slider">
      <!-- slides -->
      <div class="slider__slides">
        <div class="slide" :class="{ 's--active': i==0, 's--prev': i==adlist.length-1 }" v-for="(item,i) in adlist"
          :key="i">
          <div class="slide__inner" :style="{backgroundImage: 'url(' + item.imgUrl + ')' }">
            <div class="slide__content__box">
              <div class="slide__content">
                <h2 class="slide__heading">{{item.heading}}</h2>
                <p class="slide__text">{{item.text}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- slides end -->
      <div class="slider__control slider__control--left" @click="controlClickHandler($event,false)">
        <div class="slider__control-line"></div>
        <div class="slider__control-line"></div>
      </div>
      <div class="slider__control slider__control--right" @click="controlClickHandler($event,true)">
        <div class="slider__control-line"></div>
        <div class="slider__control-line"></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        adlist: []
      };
    },
    beforeCreate() {},
    created() {
      this.getAdlist();
    },
    beforeMount() {},
    mounted() {
      this.silder();
    },
    beforeUpdate() {},
    updated() {
      this.silder();
    },
    beforeDestroy() {},
    destroyed() {},
    methods: {
      getAdlist() { // 获取广告列表
        let that = this;
        that.$axios.get(that.$api.adList, {
          device: '广告屏'
        }).then(res => {
          let testArr = [];
          for (let i = 0, imax = 6; i < imax; i++) {
            let testItem = {
              "indexNum": i,
              "endDate": "2020-11-06 18:57:21",
              "createTimeStamp": "",
              "creatorId": i,
              "creatorName": "系统管理员",
              "url": "https://1252326633.vod2.myqcloud.com/4d86cec3vodcq1252326633/1d04542e5285890809824326316/TXbgAgfaokkA.mp4",
              "imgUrl": "../assets/img/" + (i + 1) + ".jpg",
              "createTime": "16:40:55",
              "name": "广告",
              "linkType": "image",
              "id": i,
              "device": "设备",
              "startDate": "2020-11-06 18:57:20",
              "createDate": "2020-11-06",
              "status": 0
            };
            if (i == 5) {
              testItem.linkType = 'video';
            }
            testArr.push(testItem);
            res.data = testArr;
          }

          console.log('Handle the success event:', res.data);
          for (let i = 0, imax = res.data.length; i < imax; i++) {
            that.$set(that.adlist, i, res.data[i]);
          }

        });
      },
      silder() {
        let that = this;
          console.log(0);
        that.$nextTick(() => {
          let slides = document.getElementsByClassName('slide');
          let controls = document.getElementsByClassName('slider__control');
          let inner = document.getElementsByClassName('slide__inner');
          that.numOfSlides = slides.length;
          for (let i = 0, imax = slides.length; i < imax; i++) {
            let index = i + 1;
            slides[i].classList.add('slide-' + index);
            slides[i].dataset.slide = index;
          }
        });
      },
      controlClickHandler(event, isRight) { //点击翻页
        let that = this;
        if (that.slidingBlocked) return;
        that.slidingBlocked = true;
        let $control = event.target;
        let $curActive = document.querySelector('.slide.s--active');
        let index = +$curActive.dataset.slide;

        (isRight) ? index++ : index--;
        if (index < 1) index = that.numOfSlides;
        if (index > that.numOfSlides) index = 1;
        console.log(index);
        let $newActive = document.querySelector('.slide-' + index);

        $control.classList.add('a--rotation');
        $curActive.classList.remove('s--active', 's--active-prev');
        document.querySelector('.slide.s--prev').classList.remove('s--prev');

        $newActive.classList.add('s--active');
        if (!isRight) $newActive.classList.add('s--active-prev');


        let prevIndex = index - 1;
        if (prevIndex < 1) prevIndex = that.numOfSlides;

        document.querySelector('.slide-' + prevIndex).classList.add('s--prev');

        setTimeout(function() {
          $control.classList.remove('a--rotation');
          that.slidingBlocked = false;
        }, that.slidingAT);
      },
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
    position: relative;
    z-index: 1;
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

  .slider__control .a--rotation:after {
    animation: arrowLineRotation 0.49s;
  }

  .slider__control .a--rotation:nth-child(1):after {
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
    transition: clip-path 0s ease 1.3s;
    clip-path: circle(0% at 100% 50%);
  }

  .slide .s--prev {
    clip-path: circle(0 at 0 50%);
  }

  .slide .s--active {
    z-index: 1;
    transition: clip-path 1.3s ease;
    clip-path: circle(120vmax at 50% 50%);
  }

  .slide .s--active .s--active-prev {
    clip-path: circle(100% at 50% 50%);
  }

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
</style>
