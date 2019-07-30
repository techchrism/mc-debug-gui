<template>
    <div>
        <div :class="[{'sidebar-open': !collapsed, 'content-slot': true}]">
            <slot></slot>
        </div>
        <sidebar-menu :menu="menu" @collapse="onCollapse">
            <fa-icon slot="collapse-icon" icon="arrows-alt-h"></fa-icon>
            <fa-icon slot="dropdown-icon" icon="angle-right"></fa-icon>
            <template slot="footer">
                <slot name="footer-if-open" v-if="!collapsed"></slot>
            </template>
        </sidebar-menu>
    </div>
</template>

<script>
    import {SidebarMenu} from 'vue-sidebar-menu'
    import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'

    export default {
        name: 'Sidebar',
        components: {SidebarMenu},
        props: ['menu'],
        data()
        {
            return {
                collapsed: false
            };
        },
        methods: {
            onCollapse(collapsed)
            {
                this.collapsed = collapsed;
            }
        }
    };
</script>

<style>
    .content-slot
    {
        margin-left: 50px;

        transition: margin-left 0.3s;
    }

    .sidebar-open
    {
        margin-left: 350px;
    }

    .vsm-icon
    {
        background-color: transparent !important;
    }

    .v-sidebar-menu .vsm-link
    {
        display: flex;
        align-items: center;
    }
</style>
