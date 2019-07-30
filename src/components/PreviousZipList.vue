<template>
    <div v-if="previous !== null && previous.length > 0">
        <hr>

        <div class="text-center m-2">
            <h3 class="m-0">Previous Zips</h3>
            <div class="font-weight-light">Click to load</div>

            <b-dropdown id="select-color-dropdown" variant="outline-secondary" class="m-1">
                <template slot="button-content">
                    <template v-if="selected !== null">
                        <template v-if="selected === ''">
                            No Color
                        </template>
                        <template v-else>
                            <color-square :color="selected"/>
                        </template>
                    </template>

                    <template v-else>
                        All
                    </template>
                </template>

                <b-dropdown-item v-for="(color, name) in colors"
                                 :key="color"
                                 class="align-middle"
                                 @click="setColor(color)"
                >
                    <color-square :color="color"/>
                    {{name}}
                    <span v-if="counts[name] > 0" class="font-weight-light float-right">
                        {{counts[name]}}
                    </span>
                </b-dropdown-item>

                <b-dropdown-item class="align-middle" @click="setColor(null)">
                    <color-square color=""/>
                    All
                    <span class="font-weight-light float-right">
                        {{previous.length}}
                    </span>
                </b-dropdown-item>
            </b-dropdown>
        </div>


        <previous-zip v-for="item in previousStarred"
                      :key="item.id"
                      :colors="colors"
                      :meta="item"/>

        <previous-zip v-for="item in previousUnstarred"
                      :key="item.id"
                      :colors="colors"
                      :meta="item"/>
    </div>
</template>

<script>
    import ColorSquare from './ColorSquare';

    const colors = {
        'Blue': 'primary',
        'Light Gray': 'secondary',
        'Green': 'success',
        'Red': 'danger',
        'Yellow': 'warning',
        'Cyan': 'info',
        'Dark Gray': 'dark',
        'No Color': ''
    };

    import PreviousZip from './PreviousZip';
    export default {
        name: 'PreviousZipList',
        components: {PreviousZip, ColorSquare},
        data()
        {
            return {
                colors: colors,
                selected: null
            }
        },
        methods: {
            filter(list)
            {
                return list.filter((v) =>
                {
                    if(this.selected === null)
                    {
                        return true;
                    }

                    return v.color === this.selected;
                });
            },
            setColor(name)
            {
                this.selected = name;
            }
        },
        computed: {
            previous()
            {
                return this.$store.state.previous;
            },
            previousUnstarred()
            {
                return this.filter(this.previous.filter((v) =>
                {
                    return v.starred === false;
                }));
            },
            previousStarred()
            {
                return this.filter(this.previous.filter((v) =>
                {
                    return v.starred === true;
                }));
            },
            counts()
            {
                let counts = {};
                for(let colorName in this.colors)
                {
                    if(!this.colors.hasOwnProperty(colorName))
                    {
                        continue;
                    }

                    let count = 0;
                    for(let prev of this.previous)
                    {
                        if(prev.color === this.colors[colorName])
                        {
                            count++;
                        }
                    }
                    counts[colorName] = count;
                }
                return counts;
            }
        }
    };
</script>

<style scoped>

</style>
