<template>
  <v-container class="create-poll">
    <v-space />
    <LogoutButton />

    <h4>
      🙇‍ Ergebnisse
      <span v-if="admin">(<v-link c href="#modal">Teilnehmer</v-link>)</span>
    </h4>
    <v-divider short />

    <v-row>
      <h6 class="light">
        {{ question === 'undefined' ? "Es gibt momentan keine Umfrage." : question }}
      </h6>
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

    <v-modal large zoomOut title="Teilnehmer">
      <v-modal-body>
        <p>{{ whoVoted === '' ? "Noch hat keiner gevotet." : whoVoted }}</p>
      </v-modal-body>
    </v-modal>
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
      admin: false,
      whoVoted: '',
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

        this.whoVoted = '';
        response.data.whoVoted.forEach((whoVoted) => {
          this.whoVoted = this.whoVoted === '' ? whoVoted : `, ${whoVoted}`;
        });

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
    axios.post('http://localhost:3000/check', {
      token: this.$cookies.get('access_token'),
    }).then((res) => {
      if (res.data.success && res.data.admin) {
        this.admin = true;
      }
    });

    this.getData();
    setInterval(this.getData, 1500);
  },
};
</script>
