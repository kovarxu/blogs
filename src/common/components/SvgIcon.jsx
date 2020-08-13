import {computed} from 'vue';

export default {
  name: 'SvgIcon',
  setup(props) {
    const iconId = computed(() => {
      return `#icon-${props.iconName}`;
    })

    const finalClass = computed(() => {
      return `svg-icon ${props.iconClass}`;
    })

    return () => (
      <svg 
        class={finalClass.value}
        aria-hidden="true" 
        onClick={props.clickEvent}
      >
        <use xlinkHref={iconId.value} />
      </svg>
    )
  },
  props: {
    iconClass: {
      type: String
    },
    clickEvent: {
      type: Function
    },
    iconName: {
      type: String
    }
  }
}
