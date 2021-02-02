<template>
  <v-footer dark padless>
    <v-card flat tile class="flex blue darken-2 white--text text-center">
      <v-card-text>
        <v-btn v-for="icon in icons" :key="icon" :href="icon.url" :target="icon.target" class="mx-4 white--text" icon>
          <v-icon size="24px">
            {{ icon.name }}
          </v-icon>
        </v-btn>
        <!-- <v-btn v-for="icon in icons" :key="icon" class="mx-1 white--text" icon>
          <a :href="icon.url" :target="icon.target"
            ><v-icon size="24px">{{ icon.name }}</v-icon></a
          >
        </v-btn> -->
      </v-card-text>

      <v-card-text class="white--text pt-0">
        Carlos Andrés Portillo B.<br />
        capb90@hotmail.com
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="white--text">
        {{ new Date().getFullYear() }} — <strong>San Juan de Pasto</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    icons: [
      {
        name: "mdi-facebook",
        url: "https://github.com/capb90",
        target: "_blank",
      },
      {
        name: "mdi-twitter",
        url: "https://github.com/capb90",
        target: "_blank",
      },
      {
        name: "mdi-github",
        url: "https://github.com/capb90",
        target: "_blank",
      },
      {
        name: "mdi-instagram",
        url: "https://github.com/capb90",
        target: "_blank",
      },
    ],
  }),
};
</script>