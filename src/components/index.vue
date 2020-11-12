<template>
  <div class="index">
    <div class="slider">
      <!-- slides -->
      <div class="slider__slides">
        <div class="slide" :class="{ 's--active': i==0, 's--prev': i==imageArr.length-1 }" v-for="(item,i) in imageArr"
          :key="i">
          <!-- <div class="slide__inner" :style="{backgroundImage: 'url(' + item.coverImgUrl?item.coverImgUrl:item.baseImg + ')' }"> -->
          <div class="slide__inner" :style="{backgroundImage: 'url(' + item.coverImgUrl + ')' }">
            <!-- <div class="slide__inner"> -->
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
      <div class="slider__control" @click="controlClickHandler($event,false)">
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
        slidingBlocked: false, // 阻止滑动
        numOfSlides: 0,
        slidingAT: 1300, // 动画时长 与scss变量同步
        imageArr: [{
            coverImgUrl: "https://img.zcool.cn/community/01a4775fa920b511013ee04d67653c.jpg@1280w_1l_2o_100sh.jpg",
            baseImg: "../assets/site/img/1.jpg",
            heading: "Clip-Path Revealing Slider",
            text: "Greetings, Traveler!"
          },
          {
            coverImgUrl: "https://img.zcool.cn/community/01a94f5fa920b511013ee04d43588d.jpg@1280w_1l_2o_100sh.jpg",
            baseImg: "../assets/site/img/2.jpg",
            heading: "Simple Animation",
            text: "Clip-path magic!"
          },
          {
            coverImgUrl: "https://img.zcool.cn/community/018c545fa920b611013ee04d07dfbd.jpg@1280w_1l_2o_100sh.jpg",
            baseImg: "../assets/site/img/3.jpg",
            heading: "Very Stylish Effect!",
            text: "It looks cool, isn't it?"
          },
          {
            coverImgUrl: "https://img.zcool.cn/community/01b63d5fa920b611013fdcc7633c35.jpg@1280w_1l_2o_100sh.jpg",
            baseImg: "../assets/site/img/4.jpg",
            heading: "Limited browser support",
            text: "Forget about IE/Edge and FF"
          },
          {
            coverImgUrl: "https://img.zcool.cn/community/010b415fa920b611013fdcc761c107.jpg@1280w_1l_2o_100sh.jpg",
            baseImg: "../assets/site/img/5.jpg",
            heading: "Check my other stuff!",
            text: "Other demos"
          }
          // ,
          // {
          //   coverImgUrl: "https://img.zcool.cn/community/0118be5fa920b611013fdcc767d548.jpg@1280w_1l_2o_100sh.jpg",
          //   baseImg: "../assets/site/img/6.jpg",
          //   heading: "Limited browser support",
          //   text: "Forget about IE/Edge and FF"
          // }
        ]
      };
    },
    beforeCreate() {},
    created() {},
    beforeMount() {},
    mounted() {
      this.silder();
    },
    beforeUpdate() {},
    updated() {},
    beforeDestroy() {},
    destroyed() {},
    methods: {
      silder() {
        let that = this;
        let slides = document.getElementsByClassName('slide');
        let controls = document.getElementsByClassName('slider__control');
        let inner = document.getElementsByClassName('slide__inner');
        that.numOfSlides = slides.length;

        // 相当于下代码块
        // for (let i = 0, imax = slides.length; i < imax; i++) {
        //   let index = i + 1;
        //   slides[i].classList.add('slide-' + index);
        //   slides[i].dataset.slide = index;
        // }
        new Array().slice.call(slides).forEach(function($el, index) {
          let i = index + 1;
          $el.classList.add('slide-' + i);
          $el.dataset.slide = i;
          // inner[index].style.backgroundImage='url(' + (that.imageArr[index].coverImgUrl ? that.imageArr[index].coverImgUrl : that.imageArr[index].baseImg) + ')'
        });

        // 相当于下代码块
        // for (let i = 0, imax = controls.length; i < imax; i++) {
        //   controls[i].addEventListener('click', controlClickHandler);
        // }
        // [].slice.call(controls).forEach(function($el,index) {
        //   $el.addEventListener('click', that.controlClickHandler);
        // });
      },
      controlClickHandler(event,isRight) { //
        let that = this;
        if (that.slidingBlocked) return;
        that.slidingBlocked = true;

        let $control = event.target;
        // let isRight = $control.classList.contains('m--right'); //是否右边按钮
        let $curActive = document.querySelector('.slide.s--active');
        let index = +$curActive.dataset.slide;
        (isRight) ? index++ : index--;
        if (index < 1) index = that.numOfSlides;
        if (index > that.numOfSlides) index = 1;
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
        }, that.slidingAT * 0.75);
      },
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  *,
  *:before,
  *:after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    overflow: hidden;
    font-family: Helvetica, Arial, sans-serif;
  }

  .index {
    overflow: hidden;
  }

  $numOfSlides: 5;
  $slidingAT: 1.3s;
  $controlSize: 60px;

  .slider {
    position: relative;
    height: 100vh;

    &__slides {
      z-index: 1;
      position: relative;
      height: 100%;
    }

    &__control {
      z-index: 2;
      position: absolute;
      top: 50%;
      left: 5%;
      width: $controlSize;
      height: $controlSize;
      margin-left: $controlSize/-2;
      margin-top: $controlSize/-2;
      border-radius: 50%;
      background: #fff;
      transition: background-color 0.3s;
      cursor: pointer;

      &--right {
        left: 95%;
      }

      &:hover {
        background-color: #2da6ff;
      }

      &-line {
        position: absolute;
        left: 23px;
        top: 50%;
        width: 3px;
        height: 14px;
        transform-origin: 50% 0;
        transform: rotate(-45deg);

        &:nth-child(2) {
          transform: translateY(1px) rotate(-135deg);
        }

        .slider__control--right & {
          left: 37px;
          transform-origin: 1px 0;
          transform: rotate(45deg);

          &:nth-child(2) {
            transform: translateY(1px) rotate(135deg);
          }
        }

        &:after {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          background-color: #e2e2e2;
          transition: background-color 0.3s;
        }

        .slider__control:hover &:after {
          background-color: #fff;
        }

        .slider__control.a--rotation & {

          &:after {
            animation: arrowLineRotation 0.49s;
          }

          &:nth-child(1):after {
            animation: arrowLineRotationRev 0.49s;
          }
        }
      }
    }
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
    transition: clip-path 0s $slidingAT*0.7;
    clip-path: circle(0% at 100% 50%);

    &.s--prev {
      clip-path: circle(0 at 0 50%);
    }

    &.s--active {
      z-index: 1;
      transition: clip-path $slidingAT;
      clip-path: circle(100% at 0 50%);

      &.s--active-prev {
        clip-path: circle(100% at 0 50%);
      }
    }

    @for $i from 1 through $numOfSlides {
      &:nth-child(#{$i}) {
        .slide__inner {
          background-image: url('../assets/site/img/#{$i}.jpg');
        }
      }
    }

    &__inner {
      position: absolute;
      left: 50%;
      top: 50%;
      width: 100vw;
      height: 100vh;
      margin-left: -50vw;
      margin-top: -50vh;
      background-size: cover;
      background-position: center center;

      &:before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.3);
      }
    }

    &__content__box {
      position: relative;
      width: 100%;
      height: 100%;
    }

    &__content {
      position: absolute;
      left: 5%;
      top: 50%;
      margin-left: $controlSize/-2;
      margin-top: $controlSize*0.8;
      max-width: 480px;
      color: #fff;
    }

    &__heading {
      margin-bottom: 20px;
      font-size: 60px;
    }

    &__text {
      font-size: 25px;

      a {
        color: inherit;
      }
    }
  }
</style>
