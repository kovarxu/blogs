<template>
    <div>
        <div class="post-message" @click="request">{{ state.data || 'Post Message' }}</div>
    </div>
</template>

<script>
import {
  reactive,
//   toRefs,
//   watch,
  watchEffect
} from 'vue';

export default {
    name: 'Post',
    setup() {
        const state = reactive({
            data: null
        })

        const request = () => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    state.data = Math.random();
                    resolve();
                }, 2000);
            })
        }

        watchEffect(() => {
            console.log(state.data);
        })

        return {
            state,
            request
        }
    }
}
</script>

<style lang="scss">
.post-message {
    width: 200px;
    line-height: 40px;
    border-radius: 3px;
    background-color: #e25f23;
    color: #fff;
    text-align: center;
    font-size: 20px;
    margin: 10px auto;
    white-space: nowrap;
    overflow: hidden;
    padding: 0 5px;
}
</style>
