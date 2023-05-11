<script>
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        render: {
            type: Function,
            default: () => new Function()
        }
    },
    setup(props) {
        return ()=> props.render();
    },
});
</script>
