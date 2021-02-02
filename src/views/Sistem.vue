<template>
  <div class="home">
    <!-- <Barra /> -->
    <Barra/>
    <v-main class="grey lighten-3">
      <v-container>
        <v-row>
          <v-col>
            <v-sheet min-height="85vh" rounded="lg" color="transparent" outlined class="pa-5">
              <Login />
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    
  </div>
</template>

<script>
// @ is an alias to /src

import Barra from "@/components/Barra.vue";
import Login from "@/components/Login.vue";

export default {
  name: "Sistem",
  components: {
    Barra,
    Login,
  },
};
</script>
