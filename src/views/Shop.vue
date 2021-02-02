<template>
  <div class="shope">
    <Barra/>

    <v-main>
      <v-container>
        <p class="font-weight-regular headline text-center">Tienda</p>
                 
        <v-divider></v-divider>
        <v-row>
          <v-col>
            <v-sheet min-height="100vh" rounded="lg">
              <!-- componentes principales card, cuerpo principal de la pagina -->
              <v-row class="d-flex justify-center my-15 ma-0" align="center">
                <Cartshop/>
              </v-row>
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
import Barra from "@/components/Barra.vue";
import Footer from "@/components/Footer.vue";
import Cartshop from "@/components/Cartshop.vue";


export default {
  name: "Shop",
  components: {
    Barra,
    Footer,
    Cartshop,
    
  },
 
};
</script>