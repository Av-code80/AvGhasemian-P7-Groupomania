<template>
  <div id="AdminPanel">
    <v-card max-width="450" class="mx-auto">
      <v-toolbar color="secondary" dark>
        <v-app-bar-nav-icon @click="togglePanel"></v-app-bar-nav-icon>

        <v-toolbar-title>Admin Board</v-toolbar-title>

        <v-spacer></v-spacer>
      </v-toolbar>

      <v-list v-if="showPanel" three-line>
        <template v-for="(paginedMessage, index) in paginedMessages">
          <v-divider :key="index"></v-divider>

          <v-list-item :key="paginedMessage.created_at" @click="0">
            <v-list-item-avatar>
              <v-avatar
                class="message__avatar"
                color="success"
                size="30"
              >{{ avatar(paginedMessage.username) }}</v-avatar>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-html="paginedMessage.title"></v-list-item-title>
              <v-list-item-subtitle v-html="paginedMessage.content"></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </template>
        <button @click="nextMessages" v-if="hasNextMessages">Next</button>
      </v-list>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "AdminPanel",
  data: () => ({
    showPanel: false,
    panelSize: 5
  }),
  computed: {
    messages() {
      const allMessages = this.$store.state.message.messages;
      const messages = [];
      for (let i = 0; i < allMessages.length; i++) {
        const message = allMessages[i];
        if (allMessages[i].message_parent === true) {
          allMessages[i].title = "Commentaire";
        }
        messages.push(message);
      }
      return messages;
    },
    paginedMessages() {
      return this.messages.slice(0, this.panelSize);
    },
    hasNextMessages() {
      return this.panelSize < this.messages.length;
    }
  },
  methods: {
    togglePanel() {
      if (this.showPanel === false) {
        this.showPanel = true;
      } else {
        this.showPanel = false;
      }
    },
    avatar(messageUsername) {
      return messageUsername.charAt(0).toUpperCase();
    },
    nextMessages() {
      setTimeout(() => {
        this.panelSize += 5;
      }, 1000);
    }
  }
};
</script>