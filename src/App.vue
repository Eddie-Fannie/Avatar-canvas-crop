<template>
  <div id="app">
    <avatar-crop 
    avatarUrl = 'http://api.kingdee.com/kdrive/user/file/public?client_id=200547&file_id=142265450&scode=elNmekdEODZGck1DY245M3piK3Z6&sign=42afb99c7af5944db3cc6d679832fef71cdda0ed'
    width="200px" height="200px"
    @efHandleChange="selectAvatar"
    />
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      
    }
  },
  methods: {
    selectAvatar (data) {
      console.log(data)
      console.log(data.target.files[0])
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
