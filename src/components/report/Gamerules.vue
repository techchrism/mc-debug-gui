<template>
    <b-table striped :items="rules" :fields="fields">
        <template v-slot:cell(value-bold)="data">
            <span :class="{'font-weight-bold': (data.item.hasOwnProperty('default') && data.item.value !== data.item.default)}">
                {{data.item.value}}
            </span>
        </template>
    </b-table>
</template>

<script>
    // As of 7/21/2019 (MC 1.14.4)
    const rulesData = {
        'announceAdvancements': {
            desc: 'Whether advancements should be announced in chat',
            default: 'true'
        },
        'commandBlockOutput': {
            desc: 'Whether command blocks should notify admins when they perform commands',
            default: 'true'
        },
        'disableElytraMovementCheck': {
            desc: 'Whether the server should skip checking player speed when the player is wearing elytra. Often helps with jittering due to lag in multiplayer, but may also be used to travel unfairly long distances in survival mode (cheating)',
            default: 'false'
        },
        'disableRaids': {
            desc: 'Whether raids are disabled',
            default: 'false'
        },
        'doDaylightCycle': {
            desc: 'Whether the day-night cycle and moon phases progress',
            default: 'true'
        },
        'doEntityDrops': {
            desc: 'Whether entities that are not mobs should have drops',
            default: 'true'
        },
        'doFireTick': {
            desc: 'Whether fire should spread and naturally extinguish',
            default: 'true'
        },
        'doLimitedCrafting': {
            desc: 'Whether players should only be able to craft recipes that they\'ve unlocked first',
            default: 'false'
        },
        'doMobLoot': {
            desc: 'Whether mobs should drop items',
            default: 'true'
        },
        'doMobSpawning': {
            desc: 'Whether mobs should naturally spawn. Does not affect monster spawners.',
            default: 'true'
        },
        'doTileDrops': {
            desc: 'Whether blocks should have drops',
            default: 'true'
        },
        'doWeatherCycle': {
            desc: 'Whether the weather will change',
            default: 'true'
        },
        'keepInventory': {
            desc: 'Whether the player should keep items in their inventory after death',
            default: 'false'
        },
        'logAdminCommands': {
            desc: 'Whether to log admin commands to server log',
            default: 'true'
        },
        'maxCommandChainLength': {
            desc: 'Determines the number at which the chain command block acts as a "chain"',
            default: '65536'
        },
        'maxEntityCramming': {
            desc: 'The maximum number of other pushable entities a mob or player can push, before taking 3 hearts suffocation damage per half-second. Setting to 0 disables the rule. Damage affects survival-mode or adventure-mode players, and all mobs but bats. Pushable entities include non-spectator-mode players, any mob except bats, as well as boats and minecarts.',
            default: '24'
        },
        'mobGriefing': {
            desc: 'Whether creepers, zombies, endermen, ghasts, withers, ender dragons, rabbits, sheep, villagers, and snow golems should be able to change blocks and whether mobs can pick up items',
            default: 'true'
        },
        'naturalRegeneration': {
            desc: 'Whether the player can regenerate health naturally if their hunger is full enough (doesn\'t affect external healing, such as golden apples, the Regeneration effect, etc.)',
            default: 'true'
        },
        'randomTickSpeed': {
            desc: 'How often a random block tick occurs (such as plant growth, leaf decay, etc.) per chunk section per game tick. 0 will disable random ticks, higher numbers will increase random ticks. Setting to a high integer results in high speeds of decay and growth',
            default: '3'
        },
        'reducedDebugInfo': {
            desc: 'Whether the debug screen shows all or reduced information; and whether the effects of F3+B (entity hitboxes) and F3+G (chunk boundaries) are shown',
            default: 'false'
        },
        'sendCommandFeedback': {
            desc: 'Whether the feedback from commands executed by a player should show up in chat. Also affects the default behavior of whether command blocks store their output text',
            default: 'true'
        },
        'showDeathMessages': {
            desc: 'Whether death messages are put into chat when a player dies. Also affects whether a message is sent to the pet\'s owner when the pet dies.',
            default: 'true'
        },
        'spawnRadius': {
            desc: 'The number of blocks outward from the world spawn coordinates that a player will spawn in when first joining a server or when dying without a personal spawnpoint.',
            default: '10'
        },
        'spectatorsGenerateChunks': {
            desc: 'Whether players in spectator mode can generate chunks',
            default: 'true'
        }
    };

    export default {
        name: 'Gamerules',
        data()
        {
            return {
                fields: [
                    {
                        key: 'name',
                        label: 'Name',
                        sortable: true
                    },
                    {
                        key: 'value-bold',
                        label: 'Value',
                    },
                    'description',
                    'default'
                ]
            }
        },
        computed: {
            rules()
            {
                let rules = [];
                for(let ruleName in this.$store.state.gamerules)
                {
                    let rule = {
                        name: ruleName,
                        value: this.$store.state.gamerules[ruleName]
                    };

                    let different = false;
                    if(rulesData.hasOwnProperty(ruleName))
                    {
                        rule.description = rulesData[ruleName].desc;
                        rule.default = rulesData[ruleName].default;
                    }
                    else
                    {
                        rule.description = rule.refault = '';
                    }

                    rules.push(rule);
                }
                return rules;
            }
        }
    };
</script>

<style scoped>

</style>
