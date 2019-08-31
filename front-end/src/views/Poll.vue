<template>
  <v-container class="poll">
    <v-space />
    <LogoutButton />
    <h4>🤨 Umfrage</h4>
    <v-divider short />
    <v-row>
      <span v-if="question !== 'undefined'">{{ question }}</span>
      <h6 class="font-light" v-else>Es gibt momentan keine Umfragen.</h6>
    </v-row>
    <v-space />
    <v-row v-if="question !== 'undefined' && !hasAlreadyVoted">
      <v-col>
        <PollAnswer
          v-for="answer in answers"
          :key="answer.answer"
          :answer="answer.answer"
          @update-button="updateButton($event)"
        />
      </v-col>
    </v-row>

    <v-space />
    <v-row v-if="question !== 'undefined' && !hasAlreadyVoted">
      <v-btn success :disabled="disabled" @click="handleSubmit">Absenden</v-btn>
    </v-row>

    <v-toast success v-if="hasAlreadyVoted">
      Du hast für diese Umfrage abgestimmt!
      <v-link c href="/result">Zum Resultat</v-link>
    </v-toast>
  </v-container>
</template>

<script>
import PollAnswer from '@/components/PollAnswer.vue';
import LogoutButton from '@/components/LogoutButton.vue';

export default {
  components: {
    PollAnswer,
    LogoutButton,
  },
  data: () => {
    return {
      disabled: true,
      question: 'undefind',
      answer: '',
      username: '',
      hasAlreadyVoted: false,
      answers: [],
    };
  },
  mounted() {
    this.$api.get('poll').then((response) => {
      this.question = response.data.question;
      this.answers = response.data.answers;
      const { whoVoted } = response.data;

      this.$api.post('check', {
        token: this.$cookies.get('access_token'),
      }).then((res) => {
        if (res.data.success) {
          this.username = res.data.email;

          const filteredWhoVoted = whoVoted
            .filter(who => who.toLowerCase() === this.username.toLowerCase());
          if (filteredWhoVoted.length !== 0) {
            this.hasAlreadyVoted = true;
          }
        }
      });
    });
  },
  methods: {
    updateButton(event) {
      this.answer = event;
      if (this.disabled) this.disabled = !this.disabled;
    },

    handleSubmit() {
      if (!this.disabled && !this.hasAlreadyVoted) {
        this.disabled = true;

        this.$api.post('poll/vote', {
          name: this.username,
          answer: this.answer,
        }).then(() => {
          this.hasAlreadyVoted = true;
        });
      }
    },
  },
};
</script>
