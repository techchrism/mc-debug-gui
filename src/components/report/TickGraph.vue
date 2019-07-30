<script>
    import {Line} from 'vue-chartjs';

    export default {
        name: 'TickGraph',
        extends: Line,
        mounted()
        {
            let tickTimes = this.$store.state.stats['tick_times'];

            let labels = [];
            for(let i = 0; i < tickTimes.length; i++)
            {
                labels.push((i + 1).toString());
            }

            this.renderChart({
                type: 'line',
                labels: labels,
                datasets: [{
                    backgroundColor: 'rgb(91, 192, 222)',
                    borderColor: 'rgb(91, 192, 222)',
                    data: tickTimes.map((v) =>
                    {
                        // Convert to milliseconds
                        return v / 1000000;
                    }),
                    label: 'Milliseconds per Tick',
                    fill: false
                }, {
                    backgroundColor: 'rgb(240, 173, 78)',
                    borderColor: 'rgb(240, 173, 78)',
                    borderCapStyle: 'square',
                    borderDash: [5, 15],
                    pointRadius: 0,
                    data: [{x: '1', y: 50, pointRadius: 0}, {x: '99', y: 50}],
                    label: '50 Milliseconds per Tick',
                    fill: false
                }]
            }, {
                responsive: true,
                title: {
                    display: true,
                    text: 'Tick Graph'
                },
                tooltips: {
                    mode: 'index',
                    intersect: false
                },
                hover: {
                    mode: 'nearest',
                    intersect: true
                },
                scales: {
                    xAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Ticks'
                        }
                    }],
                    yAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Time'
                        }
                    }]
                }
            })
        }
    };
</script>

<style scoped>

</style>
