<template>
  <div id="Form">
    <v-form class="form form--message" ref="form" v-model="valid">
      <v-container>
        <v-text-field
          label="Titre de votre message"
          v-model="message.title"
          v-show="onSubmit != 'replyMessage' 
        && isReply === false "
          :required="onSubmit != 'replyMessage' && isReply === false"
          :rules="titleRules"
        ></v-text-field>
        <v-textarea
          :auto-grow="true"
          label="Votre message"
          class="myMessageForm__textarea"
          required
          v-model="message.content"
          :rules="contentRules"
        ></v-textarea>
        <div class="formPanel">
          <v-btn :disabled="!valid" color="primary" @click="onSubmitMethod">Valider</v-btn>
          <v-btn color="secondary" @click="onCancelMethod">Annuler</v-btn>
        </div>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import Message from "../models/message";

export default {
  name: "Form",
  props: {
    onSubmit: String,
    title: String,
    content: String,
    userId: Number,
    messageId: Number,
    messageParent: Number,
    currentId: Number
  },
  data() {
    return {
      message: "",
      fromMessage: this.messageId,
      valid: false,
      contentRules: [v => !!v || "Votre message est vide !"]
    };
  },
  computed: {
    isReply() {
      if (this.messageParent === null || this.messageParent === undefined) {
        return false;
      } else {
        return true;
      }
    },
    titleRules() {
      if (
        this.onSubmit != "replyMessage" &&
        this.isReply === false &&
        this.messageParent === undefined
      ) {
        return [v => !!v || "Renseigner un titre"];
      } else {
        return [];
      }
    }
  },
  methods: {
    typeOfMessage() {
      if (this.onSubmit === "modifyMyMessage") {
        this.message = { title: this.title, content: this.content };
      }
      if (this.onSubmit === "postMyMessage") {
        this.message = new Message();
      }
      if (this.onSubmit === "replyMessage") {
        this.message = new Message("");
      }
    },
    onSubmitMethod(event) {
      if (this.onSubmit === "modifyMyMessage") {
        this.modifyMyMessage(event);
      }
      if (this.onSubmit === "postMyMessage") {
        this.postMyMessage(event);
      }
      if (this.onSubmit === "replyMessage") {
        this.replyMessage(event);
      }
    },
    modifyMyMessage() {
      let payload = {
        id: this.currentId,
        message: this.message
      };
      this.$store.dispatch("message/modifyMessage", payload).then(
        data => {
          this.$store.dispatch("message/getAllMessage");
          this.$emit("modifyFeedback", data.message);
          this.$emit("changeView", "onDisplay");
          console.log(data);
        },
        error => {
          console.log(error);
        }
      );
    },
    postMyMessage() {
      this.$store.dispatch("message/createMessage", this.message).then(
        data => {
          this.$store.dispatch("message/getAllMessage");
          this.$emit("addFeedback", data.message);
          this.$refs.form.reset();
          console.log(data);
        },
        error => {
          console.log(error);
        }
      );
    },
    replyMessage() {
      let payload = {
        id: this.currentId,
        message: this.message
      };
      this.$store.dispatch("message/replyMessage", payload).then(
        data => {
          this.$store.dispatch("message/getAllMessage");
          this.$emit("changeView", "onDisplay");
          this.$emit("replyFeedback", data.message);
          this.$refs.form.reset();
          this.message = new Message("");
          console.log(data);
        },
        error => {
          console.log(error);
        }
      );
    },
    onCancelMethod () {
      if (this.onSubmit === "postMyMessage") {
        this.$refs.form.reset()
        this.$emit("toggleForm")
      }
      if (this.onSubmit === "modifyMyMessage") {
        this.message = { title: this.title, content: this.content }
        this.$emit("changeView", "onDisplay")
      }
      if (this.onSubmit === "replyMessage") {
        this.$refs.form.reset()
        this.$emit("changeView", "onDisplay")
      }
    }
  },
  mounted() {
    this.typeOfMessage();
  }
};
</script>