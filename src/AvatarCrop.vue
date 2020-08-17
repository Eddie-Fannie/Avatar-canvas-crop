<template>
  <div class="ef-avatarcrop__container" :style="styleObject ">
    <div class="ef-avatarcrop__image" :style="{'border-radius': borderRadius}">
        <img :src="avatarUrl" :style="{'border-radius': borderRadius}">
        <input type="file" name="avatar" id="file" @change="selectAvatar" accept="image/*" :style="{'border-radius': borderRadius}">
    </div>
    <div class="ef-avatarcrop__mask" v-if="avatarUrl" :style="{'border-radius': borderRadius}">
      <div class="ef-avatarcrop__icon--camera"></div>
      <span class="ef-avatarcrop__tip">修改头像</span>
    </div>
  </div>
</template>

<script>
import CsCrop from './CsCrop'
export default {
  name: 'AvatarCrop',  
  components: {},
  props: {
    avatarUrl: {
        type: String,
        required: true,
        // validator: function (value) {
        //     let arr = value.split('.')
        //     let type = arr[arr.length-1]
        //     return ['png', 'jpg', 'svg+xml'].indexOf(type) !== -1
        // }
    },
    width: {
        type: String,
        required: true,
        default: '100px'
    },
    height: {
        type: String,
        required: true,
        default: '100px'
    },
    borderRadius: {
      type: String,
      default: '50%'
    }
  },
  data() {
    return {

    }
  },
  computed: {
    styleObject () {
        return {
            width: this.width,
            height: this.height
        }
    }
  },
  watch: {},
  methods: {
    selectAvatar(e) {
        const file = e.target.files[0]
        let reader = new FileReader()
        this.$emit('efHandleChange', e)
        reader.onload = (e) => {
          console.log(e)
          let data
          if(e.target.result) {
            data = e.target.result
          }
          CsCrop.open(data)
        }
        reader.readAsDataURL(file)
       
    }
  },
  created() {

  },
  mounted() {}
}
</script>

<style lang='scss' scoped>
.ef-avatarcrop__container {
    position: relative;
    .ef-avatarcrop__image {
        position: relative;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        border: 1px solid rgba(151, 151, 151, 1);
        background-size: cover;
        >img{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 50%;
        }
        >input{
          position: absolute;
          top:0;
          left: 0;
          display: inline-block;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          z-index: 10;
          opacity: 0;
          cursor: pointer;
        }
    }
    .ef-avatarcrop__mask {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        position: absolute;
        transform: translate(0, -100%);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: rgba(0, 0, 0, 0.4);
        .ef-avatarcrop__icon--camera {
            width: 14%;
            height: 12.5%;
            background-size: cover;
            background-image: url("./assets/camera.png");
        }
         >.ef-avatarcrop__tip {
            text-align: center;
            font-size: 12px;
            font-family: MicrosoftYaHei;
            color: rgba(255, 255, 255, 1);
        }
    }
}
</style>
