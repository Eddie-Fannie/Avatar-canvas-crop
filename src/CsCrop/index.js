import Vue from 'vue'
import CsCrop from './CsCrop.vue'
const csCropCreater = Vue.extend(CsCrop)
let csCropInstance

export default {
    open (avatarDataUrl) {
        console.log(avatarDataUrl)
        if (!csCropInstance) {
            csCropInstance = new csCropCreater({
                el: document.createElement('div'),
                data () {
                    return {
                        visible: true,
                        avatarDataUrl: avatarDataUrl
                    }
                }
            })
            document.body.appendChild(csCropInstance.$el)
        }
        // csCropInstance.visible = true
        // csCropInstance.$data.avatarDataUrl = avatarDataUrl
    }
}