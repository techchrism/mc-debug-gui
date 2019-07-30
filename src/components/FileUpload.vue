<template>
    <div>
        <form enctype="multipart/form-data" novalidate>
            <div :class="boxClass"
                 @dragenter="dragenter"
                 @dragexit="dragexit"
            >
                <input type="file" class="file-input" ref="fileInput" @change="filesChanged" accept=".zip">

                <div class="text-center padding no-click upload-msg">
                    <template v-if="!loading">
                        Drag or Click to Upload
                    </template>

                    <template v-if="loading">
                        <b-spinner></b-spinner>
                        Loading...
                    </template>
                </div>
            </div>
        </form>

        <b-alert v-if="error" variant="danger" show class="margin-top text-center">
            {{error}}
        </b-alert>
    </div>
</template>

<script>
    import parseZip from '../parsers/parseZip.js';
    import {addZip} from '../db';

    export default {
        name: 'FileUpload',
        data()
        {
            return {
                isHovering: false,
                loading: false,
                error: ''
            }
        },
        methods: {
            dragenter()
            {
                this.isHovering = true;
            },
            dragexit()
            {
                this.isHovering = false;
            },
            filesChanged(ev)
            {
                this.isHovering = false;
                this.loading = true;

                const file = ev.target.files[0];
                parseZip(file, this.$store).then(() =>
                {
                    this.error = '';

                    // Add the zip if it hasn't already been added
                    let foundID = -1;
                    for(let item of this.$store.state.previous)
                    {
                        if(item.filename === file.name)
                        {
                            foundID = item.id;
                            break;
                        }
                    }

                    if(foundID === -1)
                    {
                        addZip(file.name, this.$store.state.worldname, file).then((key) =>
                        {
                            this.$store.commit('setLoadedID', key);
                            this.$router.push({name: 'overview', params: {id: key}});
                        });
                    }
                    else
                    {
                        this.$router.push({name: 'overview', params: {id: foundID}});
                    }
                }, (err) =>
                {
                    if(err.message.startsWith('Can\'t find end of central directory'))
                    {
                        this.error = 'This doesn\'t seem to be a valid zip file';
                    }
                    else if(err.message === 'Missing required file!')
                    {
                        this.error = 'This zip file is missing required files. Perhaps it is from a newer version of Minecraft?'
                    }
                    else
                    {
                        this.error = 'Unknown error, please try again';
                        console.log(err.message);
                        console.log(err);
                    }
                }).finally(() =>
                {
                    this.loading = false;
                });
            }
        },
        computed: {
            boxClass()
            {
                return {
                    'upload-box': true,
                    'upload-hovering': this.isHovering
                };
            }
        }
    };
</script>

<style scoped>
    .padding
    {
        padding: 30px;
    }

    .no-click
    {
        pointer-events: none;
    }

    .margin-top
    {
        margin-top: 15px;
    }

    .file-input
    {
        height: 100%;
        width: 100%;
        position: absolute;
        opacity: 0;
        cursor: pointer;
    }

    .upload-box
    {
        margin-left: 20px;
        margin-right: 20px;
        border-color: #007bff;

        transition: border-color 0.5s ease-in-out, margin 0.5s ease-in-out;

        border-style: dashed;
        border-radius: 5px;

        position: relative;
    }

    .upload-msg
    {
        cursor: pointer;
    }

    .upload-hovering
    {
        margin: 0px;
        border-color: #28a745;
    }
</style>
