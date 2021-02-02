<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Registrar</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="nombre"
                  label="Primer nombre*"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Segundo nombre"
                  hint="example of helper text only on focus"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Apellidos"
                  hint="example of persistent helper text"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="email" label="Email*"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="password"
                  label="Password*"
                  type="password"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="tipo_documento"
                  :items="['C.C', 'T.I', 'RC', 'CE']"
                  label="Tipo de documento*"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="num_documento"
                  label="Numero"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="direccion"
                  label="Direccion"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="telefono"
                  label="Telefono"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*Datos obligatorios</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn dark color="blue" small @click="guardar"
            >Registrarse</v-btn
          >
  
          <v-btn
            dark
            color="blue"           
            small
            :to="{ name: 'home' }"
            @click="close"
            >Cancelar</v-btn
          >
        
          <v-btn :to="{ name: 'sistem' }" color="secondary"  text x-small
            >Ya tengo una cuenta</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      dialog: true,
      headers: [
        { text: "Nombre", value: "nombre", sortable: true },
        { text: "Tipo Documento", value: "tipo_documento", sortable: true },
        { text: "Número Documento", value: "num_documento", sortable: false },
        { text: "Dirección", value: "direccion", sortable: false },
        { text: "Teléfono", value: "telefono", sortable: false },
        { text: "Email", value: "email", sortable: false },
      ],
      nombre: "",
      email: "",
      password: "",
      tipo_documento: "",
      num_documento: "",
      direccion: "",
      telefono: "",
      documentos: ["DNI", "RUC", "PASAPORTE", "CEDULA"],
    };
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
  },
  methods: {
    limpiar() {
      (this.nombre = ""),
        (this.email = ""),
        (this.password = ""),
        (this.tipo_documento = ""),
        (this.num_documento = ""),
        (this.direccion = ""),
        (this.telefono = "");
    },
    guardar() {
      let me = this;
      localStorage.removeItem("item");
      let header = { Token: this.$store.state.token };
      let configuracion = { headers: header };
      //Código para guardar
      axios
        .post(
          "usuario/add",
          {
            nombre: this.nombre,
            tipo_documento: this.tipo_documento,
            num_documento: this.num_documento,
            direccion: this.direccion,
            telefono: this.telefono,
            email: this.email,
            password: this.password,
          },
          configuracion
        )
        .then(function (response) {
          me.limpiar();
          me.close();
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    close() {
      this.dialog = false;
      this.$router.push({ name: "sistem" });
    },
  },
};
</script>
