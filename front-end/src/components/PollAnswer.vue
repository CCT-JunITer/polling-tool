<template>
  <v-col s12 class="poll-answer">
    <label class="radio">
      <input class="form-radio" type="radio" name="poll-answer" @change="checkedBox($event)">
      {{answer}}
    </label>
  </v-col>
</template>

<script>
export default {
  props: {
    answer: {
      type: String,
      default: 'nicht gesetzt.',
    },
  },
  methods: {
    checkedBox(event) {
      this.$emit('update-button', event.target.parentElement.innerText);
    },
  },
};
</script>

<style lang="scss">
.poll-answer {
  .form-radio {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    display: inline-block;
    position: relative;
    background-color: #f1f1f1;
    color: #666;
    top: 10px;
    height: 30px;
    width: 30px;
    border: 0;
    border-radius: 50px;
    cursor: pointer;
    margin-right: 7px;
    outline: none;
  }
  .form-radio:checked::before {
    position: absolute;
    font: 13px/1 'Open Sans', sans-serif;
    left: 11px;
    top: 7px;
    content: '\02143';
    transform: rotate(40deg);
    color: white;
  }
  .form-radio:hover {
    background-color: #f7f7f7;
  }
  .form-radio:checked {
    background-color: #3498db;
  }
  label {
    font: 15px/1.7 'Open Sans', sans-serif;
    font-weight: 900;
    color: #333;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    cursor: pointer;
  }
}
</style>
