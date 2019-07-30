<template>
    <div :class="classes">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'ColorSquare',
        props: ['color'],
        computed: {
            classes()
            {
                let cls = {
                    'color-square': true,
                    'text-white': true
                };

                if(this.color !== '')
                {
                    cls['bg-' + this.color] = true;
                }

                return cls;
            }
        }
    };
</script>

<style scoped>
    .color-square
    {
        padding: 5px;
        border-radius: 3px;

        height: 1rem;
        width: 1rem;

        display: inline-block;
    }
</style>
