import Vue from 'vue'
import CsCrop from './CsCrop.vue'
const csCropCreater = Vue.extend(CsCrop)
let csCropInstance

export default {
    open (avatarDataUrl, otherArguments, file, requestUrl) {
        return new Promise((resolve, reject) => {
            console.log(csCropInstance)
            if (csCropInstance) {
                csCropInstance = null
            }
            csCropInstance = new csCropCreater({
                el: document.createElement('div'),
                data () {
                    return {
                        visible: true,
                        avatarDataUrl: avatarDataUrl,
                        optionObj: otherArguments,
                        file: file,
                        uploadApi: requestUrl,
                        resolve: resolve,
                        reject: reject
                    }
                }
            })
            document.body.appendChild(csCropInstance.$el)
        })
    },
    close () {
        if(!csCropInstance) return 
        csCropInstance.visible = false
    }
}