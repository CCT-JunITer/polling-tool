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
      <h5 v-for="answer in answers" :key="answer.answer">
        {{ answer.answer }} <span class="light"> - {{ answer.votes }}</span>
      </h5>
    </v-row>

    <v-row v-if="question !== 'undefined'">
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
      this.$api.get('http://localhost:3000/poll').then((response) => {
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
        response.data.whoVoted.forEach((whoVoted) => {
          this.whoVoted = this.whoVoted === '' ? whoVoted : `, ${whoVoted}`;
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
    this.$api.post('http://localhost:3000/check', {
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
