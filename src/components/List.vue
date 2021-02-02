<template>
  <v-col cols="3">
    <v-sheet rounded="lg">
      <v-card class="mx-auto" width="300">
        <v-list>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>

            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>

          <v-list-group :value="true" prepend-icon="mdi-account-circle">
            <template v-slot:activator>
              <v-list-item-title>Users</v-list-item-title>
            </template>

            <v-list-group :value="true" no-action sub-group>
              <template v-slot:activator>
                <v-list-item-content>
                  <v-list-item-title>Admin</v-list-item-title>
                </v-list-item-content>
              </template>

              <v-list-item :to="{ name: 'signin' }"> 
                <v-list-item-title>Registro</v-list-item-title>
              
                <v-list-item-icon>
                  <v-icon >mdi-account-multiple-outline</v-icon>
                </v-list-item-icon>
              
            
              </v-list-item>

                <v-list-item :to="{ name: 'sistem' }">
                <v-list-item-title>Plataforma</v-list-item-title>

                <v-list-item-icon>
                   <v-icon >mdi-cog-outline</v-icon>
                </v-list-item-icon>
              
            
              </v-list-item>
            </v-list-group>

        
          </v-list-group>
        </v-list>
      </v-card>
    </v-sheet>
  </v-col>
</template>


<script>
export default {
  data: () => ({
    admins: [
      ["Registro", "mdi-account-multiple-outline"],
      ["Plataforma", "mdi-cog-outline"],
    ],
    cruds: [
      ["Create", "mdi-plus-outline"],
      ["Read", "mdi-file-outline"],
      ["Update", "mdi-update"],
      ["Delete", "mdi-delete"],
    ],
  }),
};
</script>