<template lang="pug">

r-modal(v-if="promiseResolve" :title="question" ref="confirmModal" @close="no")

  p(v-if="desc") {{ desc }}

  template(v-slot:buttons="")

    r-button(primary :action="yes") {{ yesText }}

    r-button(:action="no") {{ noText }}

</template>
<script>

import Modal from "./Modal.vue";
import { modalConfirm } from "../global";

export default {
  name: "ModalConfirm",
  components: { Modal },
  data() {
    return {
      question: "",
      desc: false,
      yesText: "Yes",
      noText: "No",
      promiseResolve: null,
      promiseReject: null,
    };
  },
  beforeDestroy() {
    if (this.promiseReject) this.promiseReject(new Error("Component destroyed"));
  },
  created() {
    modalConfirm.value = this.confirm;
  },
  methods: {
    async confirm(question, yesText, noText, desc) {
      if (this.promiseResolve || this.promiseReject) {
        console.warn("! Already confirming");
        return Promise.reject();
      }
      this.question = question;
      if (desc) this.desc = desc;
      if (yesText) this.yesText = yesText;
      if (noText) this.noText = noText;

      setTimeout(() => {
        if (!this.$refs.confirmModal) {
          console.warn("! No confirmModal");
          this.promiseReject();
        } else {
          this.$refs.confirmModal.open();
        }
      }, 0);

      return new Promise((resolve, reject) => {
        this.promiseResolve = resolve;
        this.promiseReject = reject;
      });
    },
    no() {
      if (this.promiseResolve) {
        this.promiseResolve(false);
      } else {
        console.warn("! No promiseResolve");
      }
      this._cleanup();
    },
    yes() {
      if (this.promiseResolve) {
        this.promiseResolve(true);
      } else {
        console.warn("! No promiseResolve");
      }
      this._cleanup();
    },
    _cleanup() {
      this.$refs.confirmModal && this.$refs.confirmModal.modalOpen && this.$refs.confirmModal.close();
      this.question = "";
      this.desc = false;
      this.yesText = "Yes";
      this.noText = "No";
      this.promiseResolve = null;
      this.promiseReject = null;
    },
  },
};

</script>
