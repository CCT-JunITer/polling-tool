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
      <v-col>
        <h6 class="font-light">
          {{ question === 'undefined' ? "Es gibt momentan keine Umfrage." : question }}
        </h6>
      </v-col>
    </v-row>

    <v-row v-if="question !== 'undefined'" level>
      <v-col c4>
        <h5 v-for="answer in answers" :key="answer.answer">
          {{ answer.answer }} <span class="light"> - {{ answer.votes }}</span>
        </h5>
      </v-col>
      <v-col c8 center>
        <pie-chart :chart-data="datacollection" />
      </v-col>
    </v-row>

    <v-modal large zoomOut title="Teilnehmer">
      <v-modal-body>
        <p>{{ whoVoted === '' ? "Noch hat keiner gevotet." : whoVoted }}</p>
      </v-modal-body>
    </v-modal>
  </v-container>
</template>

<script>
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
      answers: [],
      colors: [],
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
    makeRandomColor() {
      let c = '';
      while (c.length < 6) {
        c += (Math.random()).toString(16).substr(-6).substr(-1);
      }
      return `#${c}`;
    },

    getData() {
      this.$api.get('poll').then((response) => {
        this.question = response.data.question;
        this.yesVotes = response.data.yesVotes;
        this.noVotes = response.data.noVotes;
        this.answers = response.data.answers;

        if (this.colors.length === 0) {
          for (let i = 0; i < this.answers.length; i += 1) {
            this.colors.push(this.makeRandomColor());
          }
        }

        this.whoVoted = '';
        response.data.whoVoted.forEach((who) => {
          this.whoVoted = this.whoVoted === '' ? who : `${this.whoVoted}, ${who}`;
        });

        const labels = [];
        const votes = [];
        for (let i = 0; i < this.answers.length; i += 1) {
          labels.push(this.answers[i].answer);
          votes.push(this.answers[i].votes);
        }

        this.datacollection = {
          labels,
          datasets: [
            {
              label: '⚡️Votes',
              backgroundColor: this.colors,
              data: votes,
            },
          ],
        };
      });
    },
  },
  mounted() {
    this.$api.post('check', {
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

<style>
#modal .modal-content {
  min-width: 300px;
}
</style>
