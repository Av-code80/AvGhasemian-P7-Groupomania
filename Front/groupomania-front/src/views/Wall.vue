<template>
  <div id="Wall" class="wall">
    <h2 class="wall__title">Vous êtes connecté(e) {{ currentUser.username }} !</h2>

    <div class="wall__panel">
      <div class="wall__panel__share" @click="toggleForm">
        <v-icon :x-large="true" color="secondary">mdi-pencil-circle</v-icon>
        <span>Partagez...</span>
      </div>
    </div>

    <v-overlay :value="overlay">
      <v-btn color="success" @click="overlay = false">{{feedbacks}}</v-btn>
      <v-btn icon @click="overlay = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-overlay>

    <!-- <transition name="slide"> -->

    <v-card class="wall__form" v-show="showForm">
      <v-icon class="wall__form__ico">mdi-triangle</v-icon>
      <Form @addFeedback="setFeedback" @toggleForm="toggleForm" :onSubmit="formMethod"></Form>
    </v-card>
    <!-- </transition> -->

    <AdminPanel class="wall__adminPanel" v-if="isAdmin"></AdminPanel>

    <div class="myWall">
      <v-btn fab color="secondary" class="myWall__scrollUp" @click="scrollUp">
        <v-icon>mdi-chevron-up</v-icon>
      </v-btn>

      <section>
        <post
          v-for="(paginedPost, index) in paginedPosts"
          :key="index"
          :title="paginedPost.title"
          :content="paginedPost.content"
          :messageId="paginedPost.idMESSAGES"
          :userId="paginedPost.idUSERS"
          :createdAt="paginedPost.created_at"
          :likes=" paginedPost.likes"
          :myLikes=" paginedPost.myLikes"
          :currentUser="currentUser.userId"
          :messageParent="paginedPost.message_parent"
          :username="paginedPost.username"
          @deleteFeedback="setFeedback"
          @modifyFeedback="setFeedback"
          @replyFeedback="setFeedback"
        >
          <div v-for="(reply, index) in replies" :key="index">
            <post
              v-if="reply.message_parent === paginedPost.idMESSAGES"
              :title="reply.title"
              :content="reply.content"
              :messageId="reply.idMESSAGES"
              :userId="reply.idUSERS"
              :createdAt="reply.created_at"
              :likes="reply.likes"
              :myLikes="reply.myLikes"
              :currentUser="currentUser.userId"
              :messageParent="reply.message_parent"
              :username="reply.username"
              @deleteFeedback="setFeedback"
              @modifyFeedback="setFeedback"
            ></post>
          </div>
        </post>
        <button @click="nextPosts" v-if="hasNextPosts">Next</button>
      </section>
    </div>
  </div>
</template>

<script>
import Form from "../components/Form";
import Post from "../components/Post";
import AdminPanel from "../components/AdminPanel.vue"

export default {
  name: "Wall",
  components: {
    Form,
    Post,
    AdminPanel
  },
  data() {
    return {
      showForm: false,
      feedbacks: null,
      formMethod: "postMyMessage",
      wallSize: 10,
      overlay: false
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    isAdmin() {
      if (this.$store.state.auth.user.privilege === 'admin') {
        return true
      } else {
        return false
      }
    },
    posts() {
      const allMessages = this.$store.state.message.messages;
      const posts = [];
      for (let i = 0; i < allMessages.length; i++) {
        const post = allMessages[i];
        if (post.message_parent == null) {
          posts.push(post);
        }
      }
      return posts;
    },
    paginedPosts() {
      return this.posts.slice(0, this.wallSize);
    },
    hasNextPosts() {
      return this.wallSize < this.posts.length;
    },
    replies() {
      const allMessages = this.$store.state.message.messages;
      const replies = [];
      for (let i = 0; i < allMessages.length; i++) {
        const post = allMessages[i];
        if (post.message_parent != null) {
          replies.push(post);
        }
      }
      replies.reverse();
      return replies;
    }
  },
  methods: {
    scrollUp() {
      window.scrollTo(0, 0);
    },
    toggleForm() {
      if (this.showForm === false) {
        this.showForm = true;
      } else {
        this.showForm = false;
      }
    },
    setFeedback(postFeedback) {
      this.feedbacks = postFeedback;
      this.showForm = false;
      this.overlay = true;
    },
    nextPosts() {
      setTimeout(() => {
        this.wallSize += 5;
      }, 1000);
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/login");
    }
    this.$store.dispatch("message/getAllMessage");
  }
};
</script>