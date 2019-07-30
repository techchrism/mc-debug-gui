<template>
    <div :class="{item: true, 'item-edit': !edit}" @click="select">
        <b-row>
            <b-col v-if="loading" md="1" class="align-self-center text-center">
                <b-spinner></b-spinner>
            </b-col>

            <b-col md="1" class="align-self-center text-center">
                <b-button :variant="starVariant" class="p-1" @click.stop="toggleStar">
                    <fa-icon icon="star"/>
                </b-button>
            </b-col>

            <b-col :md="edit ? 2 : 1" class="align-self-center text-center">
                <template v-if="!edit">
                    <color-square :color="meta.color"/>
                </template>

                <template v-if="edit">
                    <b-dropdown id="color-dropdown" variant="outline-secondary">
                        <template slot="button-content">
                            <template v-if="tempColor">
                                <color-square :color="tempColor"/>
                            </template>

                            <template v-else>
                                No Color
                            </template>
                        </template>

                        <b-dropdown-item v-for="(color, name) in colors"
                                         :key="color"
                                         class="align-middle"
                                         @click="setColor(color)"
                        >
                            <color-square :color="color"/>
                            {{name}}
                        </b-dropdown-item>
                    </b-dropdown>
                </template>

            </b-col>

            <b-col class="align-self-center">
                <template v-if="!edit">
                    <h5 class="given-name">{{name}}</h5>
                    <span v-if="hasName" class="font-weight-light">
                        {{meta.filename}}
                    </span>
                </template>

                <template v-if="edit">
                    <b-form-input placeholder="Name" v-model="nameModel"/>
                </template>
            </b-col>

            <b-col align-self="end" md="2" class="align-self-center">
                <b-button-group v-if="!edit" class="float-right">
                    <b-button variant="outline-info" title="Download" @click.stop="download">
                        <fa-icon v-if="downloadLoading" icon="circle-notch" spin/>
                        <fa-icon v-if="!downloadLoading" icon="file-download"/>
                    </b-button>

                    <b-button variant="outline-primary" title="Edit" @click.stop="startEdit">
                        <fa-icon icon="pen"/>
                    </b-button>
                </b-button-group>

                <b-button-group v-if="edit" class="float-right">
                    <b-button variant="outline-danger" title="Delete" @click.stop="remove">
                        <fa-icon icon="trash"/>
                    </b-button>

                    <b-button variant="outline-success" title="Save" @click.stop="save">
                        <fa-icon icon="save"/>
                    </b-button>
                </b-button-group>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    import parseZip from '../parsers/parseZip';
    import {getZip, removeZip, renameZip, setZipColor, starZip} from '../db';
    import {saveAs} from 'file-saver';
    import ColorSquare from './ColorSquare';

    export default {
        name: 'PreviousZip',
        components: {ColorSquare},
        props: ['meta', 'colors'],
        data()
        {
            return {
                downloadLoading: false,
                loading: false,
                edit: false,
                nameModel: '',
                tempColor: ''
            };
        },
        methods: {
            async select()
            {
                if(this.edit)
                {
                    return;
                }
                this.loading = true;

                parseZip(await getZip(this.meta.id), this.$store).then(() =>
                {
                    this.$store.commit('setLoadedID', this.meta.id);
                    this.$router.push({name: 'overview', params: {id: this.meta.id}});
                }, (err) =>
                {
                    console.log(err.message);
                    console.log(err);
                }).finally(() =>
                {
                    this.loading = false;
                });
            },
            download()
            {
                this.downloadLoading = true;
                getZip(this.meta.id).then((data) =>
                {
                    saveAs(data, this.meta.filename);
                }).finally(() =>
                {
                    this.downloadLoading = false;
                });
            },
            remove()
            {
                removeZip(this.meta.id);
            },
            async save()
            {
                if(this.nameModel === this.meta.filename.slice(0, -4))
                {
                    await renameZip(this.meta.id, '');
                }
                else
                {
                    await renameZip(this.meta.id, this.nameModel);
                }

                if(this.tempColor !== this.meta.color)
                {
                    await setZipColor(this.meta.id, this.tempColor);
                }

                this.edit = false;
            },
            startEdit()
            {
                this.edit = true;
                this.nameModel = this.name;
                this.tempColor = this.meta.color;
            },
            setColor(name)
            {
                this.tempColor = name;
            },
            toggleStar()
            {
                starZip(this.meta.id, !this.meta.starred);
            }
        },
        computed: {
            hasName()
            {
                return this.meta.givenName !== '';
            },
            name()
            {
                // If there's a given name, return that, otherwise return the file name without the ".zip"
                return (this.hasName ? this.meta.givenName : this.meta.filename.slice(0, -4));
            },
            starVariant()
            {
                // Return the variant of the star button depending on whether it's starred or not
                return this.meta.starred ? 'outline-primary' : 'outline-secondary';
            }
        }
    };
</script>

<style scoped>
    .item
    {
        border: 1px solid darkgray;
        border-radius: 0.25rem;
        padding: 5px;
        margin-bottom: 7px;

        transition: border-color 0.1s ease-in-out;
    }

    .item-edit:hover
    {
        border: 1px solid black;
        cursor: pointer;
    }

    .given-name
    {
        margin-bottom: 0px;
    }
</style>
