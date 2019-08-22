<template>
  <v-container class="create-poll">
    <v-space />
    <LogoutButton />
    <h4>Umfrage erstellen</h4>
    <v-divider short />

    <v-row v-if="currentQuestion !== 'undefined'">
      <p>
        Momentan gibt es schon eine Umfrage: <b>{{ currentQuestion }}</b><br/>
        <v-link c href="/poll">Zur Umfrage</v-link>
        <!-- TODO: Change when new version of vue-cirrus is out -->
        <a href="" class="u u-C" @click="endPoll">Umfrage beenden</a>
      </p>
    </v-row>

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
          <input type="text" placeholder="Antwort">
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
      <v-btn class="submit" :disabled="disabled" :onClick="handleSubmit">Umfrage stellen</v-btn>
    </v-row>

    <v-toast success id="feedback" style="visibility: hidden;">
      Du hast erfolgreich diese Umfrage gestellt!
      <v-link c href="/poll">Zur Umfrage</v-link>
    </v-toast>
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
      disabled: true,
      question: '',
      currentQuestion: '',
      answerAmount: 1,
    };
  },
  mounted() {
    this.$api.get('http://localhost:3000/poll').then((res) => {
      this.currentQuestion = res.data.question;
    });

    this.$api.post('http://localhost:3000/check', {
      token: this.$cookies.get('access_token'),
    }).then((res) => {
      if (!res.data.success || !res.data.admin) {
        this.$router.push('/poll');
      }
    });
  },
  methods: {
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
      this.$api.post('http://localhost:3000/poll', {
        question: this.question,
      }).then(() => {
        document.getElementById('feedback').style.visibility = 'visible';
      });

      this.disabled = true;
      this.question = '';
    },
    endPoll() {
      this.$api.post('http://localhost:3000/poll/end');
    },
  },
};
</script>

<style>
.create-poll .col-6 {
  padding: 0;
}
</style>
