<template>
  <v-container class="create-poll">
    <v-space />
    <LogoutButton />
    <h4>Umfrage erstellen</h4>
    <v-divider short />

    <div v-if="currentQuestion !== 'undefined' && currentQuestion !== ''">
      <p>
        Momentan gibt es schon eine Umfrage:
        <b>{{ currentQuestion }}</b> (<v-link href="/poll" link>Zur Umfrage</v-link>)<br/>
      </p>
      <v-btn small danger @click="endPoll">Umfrage beenden</v-btn>
    </div>

    <v-row>
      <v-col c6>
        <div class="input-control">
          <label class="font-normal">🤨 Frage</label>
          <input type="text" @input="checkChange" v-model="question" placeholder="MP annehmen?">
        </div>
      </v-col>
    </v-row>

    <v-row>
      <v-col c6>
        <p>Antwortmöglichkeiten (leer lassen für Ja/Nein Antworten)</p>
        <div v-for="i in answerAmount" :key="i" class="input-control">
          <input
            v-if="i === answerAmount"
            :id="'answer' + i"
            type="text"
            placeholder="Antwort"
            @keyup.enter="handleEnter"
          >
          <input v-else :id="'answer' + i" type="text" placeholder="Antwort">
        </div>
        <p>
          <a href="#!" class="u u-C" @click="handleAddAnswer">
            <span style="font-size: 24px;">+</span>
          </a>
          <a href="#!" class="u u-C" @click="handleRemoveAnswer">
            <span style="font-size: 24px;">-</span>
          </a>
        </p>
      </v-col>
    </v-row>

    <v-row>
      <v-btn success :disabled="disabled" @click="handleSubmit">Umfrage stellen</v-btn>
    </v-row>

    <v-toast success id="feedback" style="visibility: hidden;">
      Du hast erfolgreich diese Umfrage gestellt!
      <v-link c href="/poll">Zur Umfrage</v-link>
    </v-toast>

    <v-snackbar topCenter v-model="feedbackSnackbar">Umfrage beendet!</v-snackbar>
  </v-container>
</template>

<script>
import LogoutButton from '@/components/LogoutButton.vue';

export default {
  components: {
    LogoutButton,
  },
  data: () => {
    return {
      feedbackSnackbar: false,
      disabled: true,
      question: '',
      currentQuestion: '',
      answerAmount: 1,
    };
  },
  mounted() {
    this.$api.get('poll').then((res) => {
      this.currentQuestion = res.data.question;
    });

    this.$api.post('check', {
      token: this.$cookies.get('access_token'),
    }).then((res) => {
      if (!res.data.success || !res.data.admin) {
        this.$router.push('/poll');
      }
    });
  },
  methods: {
    handleEnter() {
      this.handleAddAnswer();
      setTimeout(() => {
        document.getElementById(`answer${this.answerAmount}`).focus();
      }, 10);
    },
    handleAddAnswer() {
      if (this.answerAmount < 5) {
        this.answerAmount += 1;
      }
    },
    handleRemoveAnswer() {
      if (this.answerAmount > 1) {
        this.answerAmount -= 1;
      }
    },
    checkChange() {
      if (this.question.length !== 0) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    },
    handleSubmit() {
      if (!this.disabled) {
        let answers = [];
        if (this.answerAmount !== 1) {
          for (let i = 1; i <= this.answerAmount; i += 1) {
            const answerElement = document.getElementById(`answer${i}`);
            answers.push({ answer: answerElement.value, votes: 0 });
          }
        } else {
          answers = [
            {
              answer: 'Ja',
              votes: 0,
            },
            {
              answer: 'Nein',
              votes: 0,
            },
          ];
        }

        this.$api.post('poll', {
          question: this.question,
          answers,
        }).then(() => {
          document.getElementById('feedback').style.visibility = 'visible';
        });

        this.disabled = true;
        this.question = '';
      }
    },
    endPoll() {
      this.$api.post('poll/end');
      this.currentQuestion = '';
      this.feedbackSnackbar = !this.feedbackSnackbar;
    },
  },
};
</script>

<style>
.create-poll .col-6 {
  padding: 0;
}
</style>
