<script>
import { Pie, mixins } from 'vue-chartjs';

const { reactiveProp } = mixins;

export default {
  extends: Pie,
  mixins: [reactiveProp],
  data() {
    return {
      options: {
        responsive: true,
        maintainAspectRatio: true,
      },
    };
  },
  mounted() {
    this.renderChart(this.chartData, this.options);
  },
};
</script>

<style>
@media only screen and (max-width: 600px) {
  #pie-chart {
    width: 250px !important;
    height: 250px !important;
  }
}
@media only screen and (min-width: 800px) {
  #pie-chart {
    width: 500px !important;
    height: 500px !important;
  }
}
</style>
