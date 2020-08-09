import {
    ref,
    computed
} from 'vue';

const Clock = {
    name: 'Clock',

    setup() {
        const now = ref(new Date());

        setInterval(() => {
            now.value = new Date();
        }, 1000)

        const timeInfo = computed(() => {
            return {
                hour: now.value.getHours(),
                minute: now.value.getMinutes(),
                second: now.value.getSeconds()
            }
        });

        const formatDigits = digit => digit < 10 ? '0' + digit : String(digit);

        return () => (
            <div>
                { formatDigits(timeInfo.value.hour) }:
                { formatDigits(timeInfo.value.minute) }:
                { formatDigits(timeInfo.value.second) }
            </div>
        )
    }
}

export default Clock;
