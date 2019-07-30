<template>
    <div>
        <b-container>
            <b-row class="justify-content-md-center">
                <b-col md="8">
                    <b-jumbotron class="intro">
                        <template slot="header">
                            MC Debug GUI
                        </template>

                        <template slot="lead">
                            A simple, online interface for the Minecraft 1.14+ debug format<br>
                            Made by Techdoodle.
                            Uses <b-link href="https://crafatar.com/" target="_blank" rel="noopener">Crafatar</b-link> and <b-link href="https://chunkbase.com/apps/" target="_blank" rel="noopener">Chunk Base</b-link>.<br>
                            Designed to be clientside-only for privacy and performance.
                        </template>

                        <hr>

                        <file-upload></file-upload>

                        <previous-zip-list></previous-zip-list>
                    </b-jumbotron>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    import FileUpload from '../components/FileUpload';
    import PreviousZipList from '../components/PreviousZipList';
    export default
    {
        name: 'home',
        components: {PreviousZipList, FileUpload}
    }
</script>

<style scoped>
    .intro
    {
        margin: 20px;
    }
</style>
