<template>
  <div>
    <v-app-bar app color="blue darken-2" flat>
      <v-container class="py-0 fill-height">
        <v-avatar class="mr-10" color="warning lighten-2" size="32">C</v-avatar>

        <v-btn :to="{name:'home'}" v-for="link in links" :key="link" text color="white">
          {{ link }}
        </v-btn>

        <v-spacer></v-spacer>

           <v-btn icon :to="{name:'shop'}" text color="white" plain depressed right fab> 
                <span class="amount">{{cartAmount}}</span>
                <v-icon>shopping_cart</v-icon>
              </v-btn>

         
            <v-btn icon :to="{ name: 'sistem' }" text color="white" plain depressed right fab>
              <v-icon>mdi-account</v-icon>
            </v-btn>
          
               
      </v-container>
    </v-app-bar>
  </div>
</template>


<script>
export default {
      props: {
        cartAmount: Number,
    },
  data: () => ({
    links: ["Home"],
    cartlegh : 0,
    cart:[],
    
  }),
};
</script>

<style>

.amount {
    color: #ffffff;
    position: absolute;
    left: 10px;
    top: -12px;
    text-align: center;
    min-width: 25px;
}
</style>