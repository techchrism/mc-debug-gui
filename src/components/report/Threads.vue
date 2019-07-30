<template>
    <div>
        <toggle-card v-for="thread in threads" class="thread">
            <h6 slot="header" class="mb-0">
                {{thread.title}}
            </h6>

            <template v-if="thread.content">
                <div class="preserve">
                    {{thread.content}}
                </div>
            </template>
        </toggle-card>
    </div>
</template>

<script>
    import ToggleCard from '../ToggleCard';
    export default {
        name: 'Threads',
        components: {ToggleCard},
        computed: {
            threads()
            {
                return this.$store.state.threads.map((v) =>
                {
                    let parts = v.split('\n');
                    let title = parts.splice(0, 1)[0];
                    return {
                        title: title,
                        content: parts.join('\n')
                    };
                });
            }
        }
    };
</script>

<style scoped>
    .thread
    {
        margin: 10px;
    }

    .preserve
    {
        white-space: pre-wrap;
    }
</style>
