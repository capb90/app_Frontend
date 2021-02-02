  <template>
  <v-container grid-list-md>
    <v-layout>
      <v-flex>
        <v-data-table
          :headers="headers"
          :items="cart"
          sort-by="calories"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title
                ><v-icon size="30" color="blue">shopping_cart</v-icon
                >Carrito</v-toolbar-title
              >
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                  <v-card-title class="headline"
                    ><h5>
                      ¿Esta seguro que quiere eliminar este curso de su Carrito?
                    </h5></v-card-title
                  >
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeDelete"
                      >Cancel</v-btn
                    >
              
                    <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                      >OK</v-btn
                    >
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
          </template>
          <template v-slot:[`no-data`]>
            <v-btn :to="{ name: 'home' }" color="white" @click="initialize">
              Añadir
            </v-btn>
          </template>
        </v-data-table>
      </v-flex>
      <v-flex xs6 sm3>
        <v-card class="justify-end" max-width="344">
          <v-card-text>
            <div>Total</div>
            <p class="display-1 text--primary">{{ total | currency }} COP</p>
            <p>
              Pago 100% seguro Este certificado garantiza la seguridad de todas
              tus conexiones mediante cifrado.
            </p>
          </v-card-text>
          <v-card-actions>
            <v-btn :to="{ name: 'signin' }"  text color="red"> Comprar</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: "Nombre",
          align: "start",
          sortable: false,
          value: "nombre",
        },
        { text: "Descripcion", value: "descripcion" },
        { text: "Precio", value: "precio" },
        { text: "Cantidad", value: "cantidad" },
        { text: "Eliminar", value: "actions", sortable: false },
      ],
      desserts: [],
      editedIndex: -1,
      defaultItem: {
        nombre: "",
        descripcion: "",
        precio: 0,
        total: 0,
        cantidad: 0,
      },
      cart: [],
      total: 0,
    };
  },
  mounted() {
    this.cart = JSON.parse(localStorage.getItem("item"));
    for (var i = 0; i < this.cart.length; i++) {
      this.total = this.total + this.cart[i].precio * this.cart[i].cantidad;
    }
    console.log(this.cart.values);
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Procesando pago" : "Edit Item";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.cart = [];
      // this.mounted();
    },
    deleteItem(item) {
      this.editedIndex = this.cart.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      this.total =
        this.total -
        this.cart[this.editedIndex].precio *
          this.cart[this.editedIndex].cantidad;
      this.cart.splice(this.editedIndex, 1);
      this.closeDelete();
    },
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
  },
};
</script>