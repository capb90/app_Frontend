<template>
  <div class="home">
    <!-- <Barra /> -->

    <v-main class="grey lighten-3">
      <v-container>
        <v-row>
          <List />

          <v-col>
            <v-sheet min-height="150vh" rounded="lg">
              <!-- componentes principales card, cuerpo principal de la pagina -->
          
              <Cursos/>
                 
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <div>
    <Footer/>
    </div>


  </div>
</template>

<script>
// @ is an alias to /src

import Footer from "@/components/Footer.vue";
import List from "@/components/List.vue";
import Cursos from "@/components/Cursos.vue";


export default {
  name: "Home",
  components: {
    
    Footer,
    List,
    Cursos
  },
};
</script>
