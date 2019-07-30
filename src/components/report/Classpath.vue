<template>
    <b-table striped :items="classpath"></b-table>
</template>

<script>
    function fileName(full)
    {
        return full.split('\\').pop().split('/').pop();
    }

    export default {
        name: 'Classpath',
        computed: {
            classpath()
            {
                return this.$store.state.classpath.map((v) =>
                {
                    return {
                        'File Name': fileName(v),
                        'Full Path': v
                    };
                });
            }
        }
    };
</script>

<style scoped>

</style>
