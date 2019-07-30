<template>
    <b-card header="Seed">
        <!-- Seed Value and Copy -->
        <b-input-group class="m-1">
            <b-form-input :value="seed" readonly></b-form-input>

            <b-input-group-append>
                <b-button :variant="copied ? 'success' : 'info'" @click="copy" @blur="blur">
                    <template v-if="copied">
                        <fa-icon icon="check"/>
                        Copied
                    </template>
                    <template v-else>
                        <fa-icon icon="copy"/>
                        Copy
                    </template>
                </b-button>
            </b-input-group-append>
        </b-input-group>

        <!-- Chunk Base Finders -->
        <div class="text-center" v-if="finderExists">
            <b-button-group class="m-2">
                <b-button variant="primary" :href="biomeFinderUrl" target="_blank" rel="noopener">
                    <fa-icon icon="external-link-alt"/>
                    Open in Chunk Base
                </b-button>

                <b-dropdown right :text="finder" id="chunk-target" variant="primary">

                    <b-dropdown-item v-for="(option, name) in finders" :key="option" @click="setFinder(name)">
                        {{name}}
                    </b-dropdown-item>
                </b-dropdown>
            </b-button-group>


            <b-button variant="primary" href="https://ko-fi.com/chunkbase" target="_blank" rel="noopener" class="m-2">
                <fa-icon icon="hand-holding-heart"/>
                Support Chunk Base
            </b-button>
        </div>
    </b-card>
</template>

<script>
    // Modified from https://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript
    function fallbackCopyTextToClipboard(text)
    {
        let textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try
        {
            document.execCommand('copy');
        }
        catch(err)
        {
            console.error('Fallback: Oops, unable to copy', err);
        }

        document.body.removeChild(textArea);
    }

    function copyTextToClipboard(text)
    {
        if(!navigator.clipboard)
        {
            fallbackCopyTextToClipboard(text);
        }
        else
        {
            navigator.clipboard.writeText(text);
        }
    }

    // Chunk Base finder apps by applicable dimension
    const apps = {
        'minecraft:overworld': {
            'Biome Finder': 'biome-finder',
            'Slime Finder': 'slime-finder',
            'Village Finder': 'village-finder',
            'Stronghold Finder': 'stronghold-finder',
            'Pillager Outpost Finder': 'pillager-outpost-finder',
            'Mansion Finder': 'mansion-finder',
            'Mineshaft Finder': 'mineshaft-finder',
            'Desert Temple Finder': 'desert-temple-finder',
            'Jungle Temple Finder': 'jungle-temple-finder',
            'Witch Hut Finder': 'witch-hut-finder',
            'Ocean Monument Finder': 'ocean-monument-finder',
            'Dungeon Finder': 'dungeon-finder',
            'Igloo Finder': 'igloo-finder',
            'Shipwreck Finder': 'shipwreck-finder',
            'Buried Treasure Finder': 'buried-treasure-finder'
        },
        'minecraft:the_nether': {
            'Nether Fortress Finder': 'nether-fortress-finder'
        },
        'minecraft:the_end': {
            'End City Finder': 'endcity-finder'
        }
    };

    export default {
        name: 'WorldSeed',
        data()
        {
            return {
                copied: false,
                finder: ''
            };
        },
        computed: {
            level()
            {
                return this.$store.state.levels[this.$route.params.world];
            },
            seed()
            {
                return this.level.crash.leveldetail['Level seed'];
            },
            dimension()
            {
                return this.level.crash.leveldetail['Level dimension'];
            },
            biomeFinderUrl()
            {
                return `https://chunkbase.com/apps/${this.finders[this.finder]}#${this.seed}`;
            },
            finderExists()
            {
                return apps.hasOwnProperty(this.dimension);
            },
            finders()
            {
                if(this.finderExists)
                {
                    return apps[this.dimension];
                }
                else
                {
                    return {};
                }
            }
        },
        methods: {
            copy()
            {
                copyTextToClipboard(this.seed);
                this.copied = true;
            },
            blur()
            {
                this.copied = false;
            },
            setFinder(name)
            {
                this.finder = name;
            }
        },
        watch: {
            '$route'(to, from)
            {
                // Update default selected finder based on applicable dimension
                if(this.finderExists)
                {
                    this.finder = Object.keys(this.finders)[0];
                }
            }
        },
        created()
        {
            // Set default selected finder based on applicable dimension
            if(this.finderExists)
            {
                this.finder = Object.keys(this.finders)[0];
            }
        }
    };
</script>

<style scoped>

</style>
