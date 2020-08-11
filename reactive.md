### ref reactive computed watch watchEffect 

* ref reactive computed(支持get&set)

* watchEffect(() => void) // 返回一个handler函数，执行它可以解除watch
* watchEffect((invalid: () => void) => void) // 消除副作用
* watchEffect(() => void, {
    flush: 'pre' | 'sync' | 'post' // 分别是在组件更新之前、同步、在组件更新之后执行,
    onTrack: e => void, // 这里的e是合成事件
    onTrigger: e => void,
})

* watch(ref, () => void)
* watch(() => ref, (val, preVal) => void) // watch可以拿到更新前后的数值，并可指定watch的源（第一个参数）
* watch(() => ref, ([val1, val2], [preVal1, preVal2]) => void)

### setup(props, context)

* use jsx `setup: (props, context) => () => jsx`

### lifeCycle hooks

onBeforeMount, onMounted
onBeforeUpdate, updated
onBeforeUnmount, onUnmounted
onActivated, activated
onDeactivated, deactivated
onErrorCaptured
[new] onRenderTracked, onRenderTriggered

### template refs

* `<div ref="divRef"></div> setup: () => { divRef }`
* `<div v-for="(item, i) in list" :ref="el => { divs[i] = el }">` // 多元素的ref

### unref toRef toRefs isRef isReactive

* unref => ref.value
* toRef => change reactive attribute to ref
* toRefs => change reactive object to ref
* isRef, isReactive

### customRef markRaw shallowReactive shadllowRef

they are less likely used

### inject, project


### focus

* reactive
* component
* compiler
* method & nexttick
* reusable (slot & comp)
* router
* state
