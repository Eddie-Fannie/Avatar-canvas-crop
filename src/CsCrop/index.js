import Vue from 'vue'
import CsCrop from './CsCrop.vue'
const csCropCreater = Vue.extend(CsCrop)
let csCropInstance

export default {
    open (avatarDataUrl, otherArguments) {
        return new Promise((resolve, reject) => {
            if (!csCropInstance) {
                csCropInstance = new csCropCreater({
                    el: document.createElement('div'),
                    data () {
                        return {
                            visible: true,
                            avatarDataUrl: avatarDataUrl,
                            optionObj: otherArguments,
                            resolve: resolve,
                            reject: reject
                        }
                    }
                })
                document.body.appendChild(csCropInstance.$el)
            }
        })
    }
}