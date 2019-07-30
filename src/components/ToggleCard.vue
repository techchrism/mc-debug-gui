<template>
    <b-card :class="{'card-collapsed': !open}">
        <div slot="header" :class="{clickable: !buttonOnly && hasSlot, 'div-header': true}" @click="toggle('whole')">
            <div class="float-left">
                <slot name="header"></slot>
            </div>

            <div @click="toggle('button')"
                 :class="{'toggle-btn': true, 'float-right': true, 'collapsed': !open, 'clickable': buttonOnly}"
                 v-if="hasSlot"
            >
                <fa-icon icon="chevron-right"></fa-icon>
            </div>
        </div>

        <b-collapse :id="'collapse' + id" v-model="open">
            <slot></slot>
        </b-collapse>
    </b-card>
</template>

<script>
    export default {
        name: 'ToggleCard',
        props: {
            'button-only': {
                type: Boolean,
                default: false
            }
        },
        data()
        {
            return {
                id: 0,
                open: false
            };
        },
        computed: {
            hasSlot()
            {
                return !!this.$slots['default'] || !!this.$scopedSlots['default'];
            }
        },
        methods: {
            toggle(from)
            {
                if(!this.hasSlot)
                {
                    return;
                }

                if(this.buttonOnly && from === 'whole')
                {
                    return;
                }

                if(!this.buttonOnly && from === 'button')
                {
                    return;
                }

                this.open = !this.open;
            }
        },
        created()
        {
            this.id = Math.random();
        }
    };
</script>

<style scoped>
    .card-collapsed .card-body
    {
        padding-bottom: 0;
        padding-top: 0;
        transition: padding 0.5s ease;
    }

    .div-header
    {
        height: 100%;
        width: 100%;
    }

    .clickable
    {
        cursor: pointer;
    }

    .toggle-btn
    {
        padding-left: 5px;
        padding-right: 5px;

        transform: rotate(90deg);
        transition: transform 0.5s ease;
    }

    .collapsed
    {
        transform: none;
    }
</style>
