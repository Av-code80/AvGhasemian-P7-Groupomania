<template >
  <div id="Message">
    <v-card
      :id="messageId"
      :outlined="outlinedPost"
      :class="classPost"
      v-show="view === 'onDisplay' || view === 'onReply'"
    >
      <v-row justify="space-between" align="center">
        <v-card-title>
          <v-avatar class="post__header__ico" v-if="!isReply()">
            <img src="../assets/Groupomania_Logos/icon--white.svg" alt />
          </v-avatar>
          <h3 class="post__header__title">{{title}}</h3>
          <span class="post__date--reply" v-if="isReply()">
            <v-icon>mdi-clock-outline</v-icon>
            {{ date }}
          </span>
        </v-card-title>

        <v-menu>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(menuItem, i) in menuItems"
              :key="i"
              @click="menuItem.click"
              :data-id="messageId"
              v-show="menuItem.show"
            >
              <v-list-item-title>{{ menuItem.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-row>

      <v-card-text>
        <p class="post__content" v-html="content" v-linkified>{{ content }}</p>
      </v-card-text>

      <v-card-actions>
        <v-list-item class="grow">
          <v-row align="center">
            <v-avatar class="post__sign__avatar" :color="avatarColor" size="28">{{ avatar }}</v-avatar>
            <v-list-item-content class="post__sign__name">{{ username }}</v-list-item-content>

            <span class="post__date" v-if="!isReply()">
              <v-icon>mdi-clock-outline</v-icon>
              {{ date }}
            </span>

            <v-row align="center" justify="end">
              <v-btn icon>
                <v-icon class="post__li" :color="likeColor" @click="likeUnlike">mdi-heart</v-icon>
              </v-btn>
              <span class="subheading mr-2">{{likes}}</span>
            </v-row>
          </v-row>
        </v-list-item>
      </v-card-actions>

      <Form
        v-if="view ==='onReply'"
        :title="title"
        :content="content"
        :messageId="messageId"
        :userId="userId"
        :onSubmit="formMethod.reply"
        :messageParent="messageParent"
        :currentId="currentId"
        @changeView="changeView"
        @modifyFeedback="passModifyFeedback"
        @replyFeedback="passReplyFeedback"
      />
      <v-container>
        <slot></slot>
      </v-container>
    </v-card>
    <v-card>
      <Form
        v-if="view ==='onModify'"
        :title="title"
        :content="content"
        :messageId="messageId"
        :userId="userId"
        :onSubmit="formMethod.modify"
        :messageParent="messageParent"
        :currentId="currentId"
        @changeView="changeView"
        @modifyFeedback="passModifyFeedback"
      />
    </v-card>
  </div>
</template>

<script>
import Form from "./Form";
import moment from "moment";

export default {
  name: "Message",
  components: { Form },
  props: {
    title: String,
    content: String,
    messageId: Number,
    userId: Number,
    createdAt: String,
    currentUser: Number,
    likes: Number,
    myLikes: Number,
    username: String,
    messageParent: Number,
    onModifyTitle: String,
    onModifyContent: String
  },
  data() {
    return {
      view: "onDisplay",
      currentId: null,
      message: {
        title: this.title,
        content: this.content
      },
      formMethod: { modify: "modifyMyMessage", reply: "replyMessage" }
    };
  },
  computed: {
    menuItems() {
      return [
        {
          title: "Modifier",
          click: this.modifyMessage,
          show:
            this.userId === this.currentUser ||
            this.$store.state.auth.user.privilege === "admin"
        },
        {
          title: "Commenter",
          click: this.replyMessage,
          show: this.isReply() === false
        },
        {
          title: "Supprimer",
          click: this.deleteMyMessage,
          show:
            this.userId === this.currentUser ||
            this.$store.state.auth.user.privilege === "admin"
        }
      ];
    },
    date() {
      moment.locale("fr");
      return moment(new Date(this.createdAt)).fromNow();
    },
    outlinedPost() {
      if (this.isReply()) {
        return true;
      } else {
        return false;
      }
    },
    classPost() {
      if (this.isReply()) {
        return "post post__reply";
      } else {
        return "post post__origin";
      }
    },
    avatar() {
      return this.username.charAt(0).toUpperCase();
    },
    avatarColor() {
      if (this.userId === this.currentUser) {
        return "success";
      } else {
        return "indigo";
      }
    },
    likeColor() {
      if (this.myLikes === 0) {
        return "";
      } else {
        return "secondary";
      }
    }
  },
  methods: {
    likeUnlike() {
      if (this.myLikes === 0) {
        let payload = this.messageId;
        this.$store.dispatch("message/addLike", payload).then(
          data => {
            this.$store.dispatch("message/getAllMessage");
            console.log(data.data.message);
          },
          error => {
            console.log(error);
          }
        );
      } else {
        let payload = this.messageId;
        this.$store.dispatch("message/removeLike", payload).then(
          data => {
            this.$store.dispatch("message/getAllMessage");
            console.log(data.data.message);
          },
          error => {
            console.log(error);
          }
        );
      }
    },
    addLike() {
      let payload = this.messageId;
      this.$store.dispatch("message/addLike", payload).then(
        data => {
          this.$store.dispatch("message/getAllMessage");
          console.log(data);
        },
        error => {
          console.log(error);
        }
      );
    },
    removeLike() {
      let payload = this.messageId;
      this.$store.dispatch("message/removeLike", payload).then(
        data => {
          this.$store.dispatch("message/getAllMessage");
          console.log(data);
        },
        error => {
          console.log(error);
        }
      );
    },
    isReply() {
      if (this.messageParent === null || this.messageParent === undefined) {
        return false;
      } else {
        return true;
      }
    },
    passModifyFeedback(formFeedback) {
      this.$emit("modifyFeedback", formFeedback);
    },
    passReplyFeedback(formFeedback) {
      this.$emit("replyFeedback", formFeedback);
    },
    changeView(View) {
      this.view = View;
    },
    replyMessage() {
      this.view = "onReply";
      this.currentId = this.messageId;
    },
    modifyMessage() {
      this.view = "onModify";
      this.currentId = this.messageId;
    },
    deleteMyMessage() {
      let payload = this.messageId;
      this.$store.dispatch("message/deleteMessage", payload).then(
        data => {
          this.$store.dispatch("message/getAllMessage");
          this.$emit("deleteFeedback", data.message);
          console.log(data);
        },
        error => {
          console.log(error);
        }
      );
    }
  }
};
</script>