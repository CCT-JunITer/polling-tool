<template>
  <v-container class="create-poll">
    <v-space />
    <LogoutButton />
    <h4>🙇‍ Ergebnisse</h4>
    <v-divider short />

    <v-row>
      <h6>{{ question === 'undefined' ? "Es gibt momentan keine Umfrage." : question }}</h6>
    </v-row>

    <v-row v-if="question !== 'undefined'">
      <v-col c6>
        <h5>📈 Ja - <span class="light">{{ yesVotes }}</span></h5>
      </v-col>
      <v-col c6>
        <h5>📉 Nein - <span class="light">{{ noVotes }}</span></h5>
      </v-col>
    </v-row>
    <v-row center v-if="question !== 'undefined'">
      <pie-chart :chart-data="datacollection" />
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';
import LogoutButton from '@/components/LogoutButton.vue';
import PieChart from '@/components/PieChart.vue';

export default {
  components: {
    LogoutButton,
    PieChart,
  },
  data: () => {
    return {
      question: '',
      yesVotes: 0,
      noVotes: 0,
      datacollection: {
        labels: ['👍Ja', '👎Nein'],
        datasets: [
          {
            label: '⚡️Votes',
            data: [0, 0],
          },
        ],
      },
    };
  },
  methods: {
    getData() {
      axios.get('http://localhost:3000/poll').then((response) => {
        this.question = response.data.question;
        this.yesVotes = response.data.yesVotes;
        this.noVotes = response.data.noVotes;

        this.datacollection = {
          labels: ['👍Ja', '👎Nein'],
          datasets: [
            {
              label: '⚡️Votes',
              backgroundColor: ['#41B883', '#E46651'],
              data: [this.yesVotes, this.noVotes],
            },
          ],
        };
      });
    },
  },
  mounted() {
    this.getData();
    setInterval(this.getData, 1500);
  },
};
</script>
