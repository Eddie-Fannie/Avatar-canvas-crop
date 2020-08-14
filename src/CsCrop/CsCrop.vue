<template>
  <transition name="fade">
    <div class="ef-canvas__crop" v-if="visible">
        <i class="ef-icon--close" @click='efHandleClose'></i>
        <div class="ef-canvas__imageBox" ref='imageBox'>
          <div class="ef-canvas__thumbBox"></div>
          <div class="ef-canvas__spinner" style="display: none">Loading...</div>
        </div>
        <div class="ef-crop__action">
          <div class="ef-action__container">
            <span class="ef-button--out" style="float: left">
              <i class="ef-icon--minus"></i>
            </span>
            <input
              type="range"
              class="ef-range"
              step="1"
              min="0"
              @change="stepChange"
              :max="duration"
              v-model.number="stepradio"
              :style="styleObject"
            />
            <span class="ef-button--in" style="float: left">
              <i class="ef-icon--plus"></i>
            </span>
          </div>
          <div class="ef-button__container">
            <span class="ef-button__cancel">取消</span>
            <span class="ef-button__save">保存</span>
          </div>
      </div>
    </div>
  </transition>
</template>

<script>
import CropBox from './cropbox.js'
export default {
  name: 'CsCrop',  
  components: {},
  data() {
    return {
        visible: false,
        stepradio: 0,
        ratio: 1,
        duration: 300,
        img: {},
        // avatarDataUrl: '',
        // options: {
        //   imageBox: '.ef-canvas__imageBox',
        //   thumbBox: '.ef-canvas__thumbBox',
        //   spinner: '.ef-canvas__spinner',
        //   imageUrl: ''
        // },
        cropper: {}
    }
  },
  computed: {
    styleObject () {
      return {
        'background' : '-webkit-linear-gradient(top, #059CFA, #059CFA) 0% 0% / '+ this.stepradio*100/this.duration +'% 100% no-repeat'
      }
    }
  },
  watch: {
    
  },
  methods: {
    efHandleClose () {
      this.visible = false
    },
    getImage () {
      this.img = new Image()
      let _this = this
      this.img.onload = function () {
        console.log('图片加载完')
        console.log(_this.img.width)
        _this.setBackground()
      },
      this.img.src = this.avatarDataUrl  
    },
    setBackground () {
      let imageBox = document.getElementsByClassName('ef-canvas__imageBox')[0]
      const w = parseInt(this.img.width) * this.ratio
      const h = parseInt(this.img.height) * this.ratio
      const pw = (this.$refs.imageBox.clientWidth - w) / 2
      const ph = (this.$refs.imageBox.clientHeight - h) / 2
      console.log(this.$refs.imageBox.clientWidth)
      this.$refs.imageBox.setAttribute('style',
      `background-image:url('${this.img.src}');background-size:${w}px ${h}px;background-position: ${pw}px ${ph}px;background-repeat:no-repeat;`)
      // 'background-image: url(' + this.img.src + '); ' +
      // 'background-size: ' + w + 'px ' + h + 'px; ' +
      // 'background-position: ' + pw + 'px ' + ph + 'px; ' +
      // 'background-repeat: no-repeat')
    },
    // 滑动
    stepChange(e) {
      this.stepradio = e.target.value
      console.log(e.target.value)
    },
    getDataURL () {

    },
    initCropBox () {
      this.options.imageUrl = this.avatarDataUrl
      this.cropper = new CropBox(this.options)
      console.log(this.cropper)
    }
  },
  created() {
    this.getDataURL()
  },
  mounted() {
    // this.initCropBox()
    this.getImage()
    console.log(this.$refs.imageBox)

  }
}
</script>

<style lang='scss' scoped>
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 200ms linear;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.ef-canvas__crop {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 600px;
    height: 440px;
    background-color: #fff;
    border-radius: 4px;
    -webkit-box-shadow: 0 2px 8px rgba(0,0,0,.33);
    box-shadow: 0 2px 8px rgba(0,0,0,.33);
    z-index: 2100;
    >.ef-icon--close {
      position: absolute;
      top: 10px;
      right: 7px;
      cursor: pointer;
      width: 20px;
      height: 20px;
      background-size: cover;
      background-image: url('../assets/close.png');
    }
    >.ef-canvas__imageBox {
      position: relative;
      height: 300px;
      width: 550px;
      margin: 40px auto 20px;
      border: 1px solid #aaa;
      background: #fff;
      overflow: hidden;
      background-repeat: no-repeat;
      cursor: move;
      border-radius: 4px;
      >.ef-canvas__thumbBox {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 250px;
        height: 250px;
        transform: translate(-50%, -50%);
        box-sizing: border-box;
        border: 1px solid rgb(102, 102, 102);
        box-shadow: 0 0 0 1000px rgba(0, 0, 0, 0.5);
        background: none repeat scroll 0% 0% transparent;
        border-radius: 50%;
      }
      >.ef-canvas__spinner {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        text-align: center;
        line-height: 360px;
        background: rgba(0, 0, 0, 0.7);
      }
    }
    >.ef-crop__action {
      width: 100%;
      .ef-action__container {
        display: flex;
        justify-content: center;
        width: 100%;
        padding: 0 25px;
        span {
          display: flex;
          i {
            cursor: pointer;
            width: 20px;
            height: 20px;
            background-size: cover;
          }
          .ef-icon--minus {
            background-image: url('../assets/reduce.png');
          }
          .ef-icon--plus{
            background-image: url('../assets/add.png');
          }
        }
        input[type="range"] {
          display: block;
          margin: 5px auto 0;
          width: 80%;
          height: 8px;
          vertical-align: top;
          background: transparent;
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          cursor: pointer;
          float: left;
        }
        input[type="range"]:focus {
          outline: none;
        }
        input[type="range"]::-webkit-slider-thumb {
          -webkit-box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.18);
          box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.18);
          -webkit-appearance: none;
          appearance: none;
          margin-top: -3px;
          width: 12px;
          height: 12px;
          background-color: #0057ff;
          border-radius: 100%;
          border: none;
          -webkit-transition: 0.2s;
          transition: 0.2s;
        }
        input[type="range"]::-moz-range-thumb {
          box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.18);
          -moz-appearance: none;
          appearance: none;
          width: 12px;
          height: 12px;
          background-color: #0057ff;
          border-radius: 100%;
          border: none;
          -webkit-transition: 0.2s;
          transition: 0.2s;
        }
        input[type="range"]::-ms-thumb {
          box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.18);
          appearance: none;
          width: 12px;
          height: 12px;
          background-color: #0057ff;
          border: none;
          border-radius: 100%;
          -webkit-transition: 0.2s;
          transition: 0.2s;
        }
        input[type="range"]:active::-moz-range-thumb {
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.23);
          width: 14px;
          height: 14px;
        }
        input[type="range"]:active::-ms-thumb {
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.23);
          width: 14px;
          height: 14px;
        }
        input[type="range"]:active::-webkit-slider-thumb {
          -webkit-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.23);
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.23);
          margin-top: -4px;
          width: 14px;
          height: 14px;
        }
        input[type="range"]::-webkit-slider-runnable-track {
          -webkit-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12);
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12);
          width: 100%;
          height: 6px;
          cursor: pointer;
          border-radius: 2px;
          border: none;
          background-color: rgba(9, 45, 104, 0.3);
        }
        input[type="range"]::-moz-range-track {
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12);
          width: 100%;
          height: 6px;
          cursor: pointer;
          border-radius: 2px;
          border: none;
          background-color: rgba(0, 97, 255, 0.3);
        }
        input[type="range"]::-ms-track {
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12);
          width: 100%;
          cursor: pointer;
          background: transparent;
          border-color: transparent;
          color: transparent;
          height: 6px;
          border-radius: 2px;
          border: none;
        }
        // input[type="range"]::-ms-fill-lower {
        //   background-color: rgba(0, 97, 255, 0.3);
        // }
        // input[type="range"]::-ms-fill-upper {
        //   background-color: rgba(0, 97, 255, 0.15);
        // }
        // input[type="range"]:focus::-webkit-slider-runnable-track {
        //   background-color: rgba(0, 97, 255, 0.5);
        // }
        // input[type="range"]:focus::-moz-range-track {
        //   background-color: rgba(0, 97, 255, 0.5);
        // }
        // input[type="range"]:focus::-ms-fill-lower {
        //   background-color: rgba(0, 97, 255, 0.45);
        // }
        // input[type="range"]:focus::-ms-fill-upper {
        //   background-color: rgba(0, 97, 255, 0.25);
        // }
      }
      .ef-button__container {
        display: flex;
        justify-content: center;
        width: 100%;
        padding: 0 25px;
        margin-top: 20px;
        >span {
          width: 80px;
          height: 30px;
          line-height: 30px;
          border: 1px solid #ccc;
          border-radius: 20px;
          text-align: center;

        }
        .ef-button__save {
          margin-left: 20px;
          background-color: #059CFA;
          color: white;
        }
      }
    }
}
</style>
