<template>

  <v-container grid-list-md>
     <Barra
      :cart-amount="cartAmount">
     </Barra>
    <v-layout row wrap>
      <v-flex xs9 sm4 v-for="curso of datos" :key="curso.id">
        <v-card>
          <v-img
            :src="curso.image"
            height="150"
            width="300"
          ></v-img>
          <v-card-title style="overflow: auto; height: 100px">{{
            curso.nombre
          }}</v-card-title>
          <v-card-text style="overflow-y: scroll auto; height: 100px">
            {{ curso.descripcion }}</v-card-text
          >

          <v-row class="ma-2">
            <v-rating
              :value="4.5"
              color="amber"
              dense
              half-increments
              readonly
              size="14"
            ></v-rating>

            <div class="grey--text">4.5 (413)</div>
          </v-row>
          <v-row>
            <v-divider class="mx-4"></v-divider>
          </v-row>

          <v-card-text>
            <v-chip-group
              v-model="selection"
              active-class="deep-purple accent-4 white--text"
              column
            >
              <v-chip color="red lighten-1 white--text"
                >{{ curso.Metodologia }}-{{ curso.Horario }}</v-chip
              >
            </v-chip-group>
          </v-card-text>

          <v-card-actions>
            <v-btn
              color="info"
              elevation="2"
              plain
              depressed
              @click="addToCart(curso.id)"
              v-model="id"
            >
              {{ curso.precio }}
              <v-icon right>add_shopping_cart</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
// import lodash from "lodash";
import Swal from 'sweetalert2'
import Barra from "./Barra"
export default {
    components:{
    Barra
  },
  data() {
    return {
      datos: [
        {
          id: 1,
          nombre: "Desarrollo Web Frontend",
          descripcion:
            "Este curso parte desde un conocimiento cero de HTML y CSS. Incluye las etiquetas fundamentales de HTML hasta queris",
          precio: 46900,
          Metodologia: "Sincronica",
          Horario: "8:00 am",
          image:
            "https://danielrodriguez.info/wp-content/uploads/2015/12/habilidades-desarrollador-web.jpg",
        },
        {
          id: 2,
          nombre: "Layout web con CSS Grid",
          descripcion:
            "Descubre las nuevas retículas y otras formas de diseñar una web con CSS Shapes, variables y efectos parallax ",
          precio: 28900,
          Metodologia: "asincronica",
          Horario: "N.A",
          image: "https://i.ytimg.com/vi/n1Lnar9mTF8/maxresdefault.jpg",
        },
        {
          id: 3,
          nombre: "Diseño de interiores",
          descripcion:
            "Aprende a dar vida a los espacios arquitectónicos con sencillas técnicas DIY ",
          precio: 40900,
          Metodologia: "Sincronica",
          Horario: "6:00 pm",
          image:
            "https://cdn.domestika.org/c_limit,dpr_auto,f_auto,q_auto,w_820/v1562611296/content-items/003/106/927/1-Masquespacio-interior_d-10-original.jpg?1562611296",
        },
        {
          id: 4,
          nombre: "Creación de un logotipo",
          descripcion:
            "Aprende las claves para crear imágenes de marca que cuenten historias",
          precio: 28900,
          Metodologia: "Sincronica",
          Horario: "8:00 am",
          image: "https://i.servimg.com/u/f11/18/18/55/83/illust10.jpg",
        },
        {
          id: 5,
          nombre: "Creación de una marca ilustrada",
          descripcion:
            " Desarrolla un personaje ilustrado con su identidad visual para crear tu propia línea de productos",
          precio: 51900,
          Metodologia: "Sincronica",
          Horario: "6:00 am",
          image:
            "https://www.solveconsultoria.com/wp-content/uploads/2018/10/curso-merchandising-imagen.jpg",
        },
        {
          id: 6,
          nombre: "Gestión Empresarial",
          descripcion:
            "Desarrolla tu liderazgo y creatividad para dirigir, organizar y controlar procesos administrativos en cualquier organización.",
          precio: 200000,
          Metodologia: "Sincronica",
          Horario: "10:00 am",
          image:
            "https://cinarsistemas.edu.co/wp-content/uploads/2019/10/body-tecnico-en-gestion-empresarial-cinar-sistemas-pasto.jpg",
        },
        {
          id: 7,
          nombre: "Electrónica basica",
          descripcion:
            "Aprende a instalar, diagnosticar y mantener, equipos electrónicos y de telecomunicaciones.",
          precio: 100000,
          Metodologia: "asincronica",
          Horario: "N.A",
          image:
            "https://cinarsistemas.edu.co/wp-content/uploads/2019/10/body-tecnico-en-electronica-cinar-sistemas-pasto.jpg",
        },
        {
          id: 8,
          nombre: "Gestión Ambiental",
          descripcion:
            "Diplomado en Sistemas de Gestión Ambiental ISO 14001:2004 le proporcionará las habilidades para implementar un sist. gestión medioambiental.",
          precio: 900000,
          Metodologia: "Sincronica",
          Horario: "6:00 pm",
          image:
            "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAPEBAQDxAWDxUQFQ8PDxAVEBUVFRUXFRUWFhUSFRgYHSggGBolGxUWITEiJSkrLi4uGB8zODMvNygtLjcBCgoKDg0OGhAQGy0lHyUtLS0tListKystLS8tLS0tLS0tLS8tLS0tLSstKy0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAMMBAgMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAAAQIDBQYEBwj/xABKEAABAwEEBgUIBgcHBAMAAAABAAIDEQQSITEFBkFRYXETIjKBkSMzUnKhsbLBFDRCQ2LRFnOCkpOi8FNjdLPS4vEHJFThRIPC/8QAGQEAAwEBAQAAAAAAAAAAAAAAAAECAwQF/8QALhEAAgECBQEHAwUBAAAAAAAAAAECAxEEEiExQVETMmFxobHwFCKRQlKBwdEk/9oADAMBAAIRAxEAPwD1+icAgBOAXEkMAE4BACeArSAQBOASgJQFSQAAlASgJVQBRCEqYCISoTsAIQhFgBCEIAEIQgAQhCLACRKhFgERRKkSAbRIQnpCEgIyEhCeQkIU2AjITCFKQmEKWgGEJhCkITSoaEMohOohKwDwnAJAngLRIYoCUBACcAqQAAnAICVUAISoTAEIQmAjnUBO6pQxwIBGIIBB5pJey7kfcqzVi0dJZY97B0Z/Zy9lFLlaSiLktUjnAYkgczRQW+1tgjdI7JuwZknAAd6wmkrebS8vfVuxgvVa3hl7VlXxCpacilKx6GhecxaQmYGiOV7Q3ANDjQb8MjitZoHTf0guY8AODQ4EZEYA8iCVNLFwqPLsxKaZdIQqTTesAs7ujY2+6gLqmgbXLmVvOpGCvIpuxdoXnmk9IyWl9XHDANYD1R3c9q6dC6afZw8EdI0AFrS6lDeAwNDQY5LlWOg5Wtp1Izq5ukKr0NpplpqACxzRUtJrhvB2q0XXCcZq8S07ghCFQxEJUKQGkJCE5IUgGEJpCkITCFIEZCaQpCE0hS0BGlS0QpsIeE8JAE4LRDFCcAkATlQAlSJUwBCEKgBCE17w0EuIAGJJNAOJQAS9l3I+5ZXUi0YyRbw2Qd3VPvHgr626TiZE998PAGTXAk1wFMeK4NT44xAXN7RdSQkbRkBwofaVzT+6tCz2uS90WGmLD9IhdHW6TQtOyoNRXgsTpDRM0ADpG4E0vA1HDl3r0NI5oOBFeCK+GjV15CUbnnmjbJJaHFjNjTWp6ooMOWPzWo1e0G6zlz5HAuIugNrQCtTiczgFdRxNaKNaGjcAB7k5TRwkYWb1YlBIFjtatGyCUzNaXNeG1IFbpAAx4YDFbFNkYHAtcKhwII3g5ha1qSqxyscldHmnRkZ1Bwujbz5JJH7KjeaDb/XctVJqky9Vsrmtzu3QSOTq/Jd8er9ma4O6OpFM3EgneRl8l5ywVR+BnkZS6p2F/TGUghrWkV3lwHVHLGq1cj8DdLajChOFdgO5SUXLamtYemLbxY01O0NzJA2nP2r0adNUoWRolZC2S0l4Bc3o7wvNY49em8jZ7V0NcDkarhtQE0YeY3ODSJA2oDiBw4g5GlQaJ0Vr6ZhMFaUNx9AGEjZQ4kVwNB3q1LgZ2oUcAddF8guOdMgdw4KO3W1kDC+Q0GQ3k7gNpVNpK7A6EizrdbY72MTg3fUE+H/tX0EzZGtew3muFQVlCrCfdYJpjyE0p6QhWxkZTCFIQmkKWAyiROohIB6cEgCeFSAUIQlVACEITAEIQmAj3hoJJoACSTgABtKyekLTNb39HZ2nomnFxwBO9x3bhnt5aK2WITENkJuChMYwvH8Z3cF0xxhoDWgNAwAAoB3LGpB1PtvZerJauZqbQEUFnme7yjwx1HHJpIp1R8yqyGOWKGG0QFwJvsluio6rnULhtFMMdwWo1jdSyzcmjxcAufVE/wDbDg549tfmuaVGPaqEdNP7JaV7EGi9Z2Po2akbsr32Dz9Hvw4rQNIIqMa4gqC02GKXzkbX8S0V8c1FZdGth805zG7Y715ncDiO4rpgqkdJa+5audUkl0HAupiQMTTfRRGerL17o60ONCRXIEb8Rgopr0Z8lED0jmguBPVJoLzm0yA3HPmSm2mJpkiJjJcHEtkFAMjW8RjThTOittgdFndRrQ9wLzQOpleIqQ0Z0+QxU6jMDS4PoLwBaHbaGlR7EWidkTHPkcGNaKucTgFS0AkJSNcCAQag4gjI8V5vrNrPJag6OEFkIwcaGr917cD6PjuXoFgcBDEThSOMk/shRCopNpEqSb0OlCRrgQCDUHEEbUq0LBMiiawBrQGgYADIJ6EAZrWrS0kbmwxG5Vt57hniSAAdmXuWXkne4Uc4uxJqXE5038lqNbNGPeWzRguoLr2jE0BJDgNuZ9iyzInHZlmTgBzOxeNi8/aNPbgxne4l3CvGnL+vkV1x26WONjWSOZi91A4gUJFDTmHLmbgSWuoMqmuPcOVU01cdriaAba7AudNx2JNdq1pl8xMUuLgLzXUpUDAg8cQtAVldU7A4Svm+wA5jD6VTmOFB7Vql6+GcnTWY2je2o0phUhTCtmUNohKhKwDgnhNCcqQAlQEKkAIQhMAQhCABCEIAqdajSyycTGP5wufU0+QcN0jvhapNbnUsx4vYPefkufUo+SlH46+LR+S42/8ApXkR+o0SEIXYWIClWA0npSey260viJcDJCx0RaSx16IbdjsMKY+FFrdDaaitQN3qPbhJE7tNIwPMV2rONRN25IUk3Y6dI21lnifLJW6wVNBU50AHeQvPbTb5dJWmGOW9FFI4XGDIDEXqntOwIrzWy1x+oz8mfG1ZSyfWdFfqYvjkWVZtyUeNPcmpvYrIxSw2gf38I/ket/b7S2KwXnVoYWsFBtewNHtKwDPqU/8AiIfgkVvprSxnhgjhvXAGRygsFC+jSwA516pyWUZqEX5f6QpWX8Gt1ctLZLLCW1AYxsbq4YsAB7sFZgrBavaWNmZKye+I+tGwBmAk+0Cc68FZ6v6UdGWQvq5rrjWHawlseHFpL+7ktIYiNopmkZ3SNUsnpDSE0FqtDmOq1vROfG6tDUMbhuOIxWsWK09562+rD74kYttRTXzRjmaXRml458B1HjtRuwcKZ03qq01q6+R5kheOsamNxNATmWn5Ksc0fSA6mP0wtrwvNw963CmFq8XGfAL7tzKaP1Wcb3TuAByDDU12GpFBtwxVno/V2GF1+pkIyvUoOIAGfNXCZLK1oq4hoq0VJpi4gAd5IHetYYanHgaikPASJUFbFCFMKemlSwG0QlQkA4JUgSpoBUIQqAEIQmAIQhAAhQWe0X3ytpTo3NbWudWNdXh2lgJ9YraC6kzqDpyPJsp1HUH3eXf3hZyqKKuTKSRp9c3eQYN8jfhcufUk9WYcYz4h35Kin0jNNE4TPL7krLtWgEVjJOTW79yudST1pxwjPxLiU74pP5sQneRq0IVfbtNQQP6ORzg67foI3u6tSK9UcF6DaW5o3YwWtDK2y0G7Xy0Da3K5xDq1rw7O2meCdqsyltgwp5W0t7BblF2a12V7OyuZqufTs7J7RNLH1mvlgDXdGcfJ0piRtHZpjTMUU2rVGWuFzqMDZbUC4sugUiyqThSvZ2VzNVwXWe/j/Zz/AKjaa4/UZ+TPjasnZPrWiv1MXxyKw1s070sMkUQ6huhzzm7rAi6NgwzVdZPrWiv1MPxyrSVSM5/b4e5cneRWx/Upv8RD8EiLMyrAaV8pE2twnMOwrX+XbvwSRfUZf8RD/lyJbMyrAaV8pG2vR1zDsK14dnbvFFzz48jFj546Bxu0pM9tejLaUHZrXD1dm9XejvOQ+vF77OqS0R0DurSkz216O7kOzWuHq7N675ZnRsL2GjmNvtNAaECAg48Vle0i4HowWJ0/562+pD74lXN1htpIHTOxdA3zbfvGlx+5zwww5B2aZZ7W+aOeSV15zmNvOoBWkrAMAKZALpxNVSjZfNGW5pllK8NlBJoBbHEk4AAFtSVrodJQPcGsmjc45NEjSTtwAO5YfS/Zm/Xz/CE7QD62iwjoeju9N5SlOlq12NaCtMszmpoVHGTXWwZrOx6As/rppHoIG0ulzpIi1p2iNweaU4hvitAvOtdZC61SNc4kMa0saTg2sTiaC8My1uw5Dke2tLLHQubsj0KCZr2tewhzXAOaRkQciE9ZzUaVzoJAXFwZKWMBNQ1oYyjRicMd60aqLzRTKTuriJClQU2MYlQhSA4IQgKkAqEITAEIQmAJHvDQSTQAEk7gMylVPrNaHsjYGGnSPET6AElrgagV2+Cic8kXITdjj1f0jftNoa54IkcTGKDrUwFKfgaPBYe0Nxfh/wCTsHp+p8+8K2sznRESxkhzWlwN1pGLujOZyod2fDFUznVBJzLZyezmXc150KrlGz319TCT0O2HBrxl12nID7tu4Dfu/NaDVCdrJJb7g0FoxJAGfHms5C7FwG9p2eg3dhsTpDhTeW55Z7Vjny1riTtqel/T4f7aP+I381kdYrQHWtxjtDYx9GLS6ocHdZ1YuZVRMx30ylyEG+wXB5jIYerv70ljY7prQAyIkNtFQ7sNo7Ex8R9ldk6znpbkcp30KtrKjs18pE2tyuYd1a14dnbTMUU1nZR7erTyszfN0yDerUkjD0dlczVQhtR2a+UiFblc2u6ta7fR20zwU1nZR7cKeVmbW5dya3CtTl6Oyu2q533DNHXpHzTv2fR3u3f17F12T61ov9TD8cq5NInyTsfR2je7gpLLaoxadHOL2gRxRNkdeFGkOkqHHYcR4oof4XycUX1GX/EQ/wCXInWZlYwbtfKRNrcrmHYVr/LtpmKKKKVv0ORl4XjPC4NrjQRyAmm6pHipbMyrAbtfKRNr0dcw7Ctf5du/BOfHkQx88dGuN2lJntr0d2lB2a1NPV2b12WzzMnqH4YFxzx0DjdpSZ7a9Hdph2a1w9XZvXVbHDoZMfsHb+GH8j4LKW5UeSuYzrNwHbso7I2sP938sdzs116L8xL6g/zmLkYRebl5yyej6Brt/wDW+i6tGOHQSCubKDj5Vp+Surt+fYFuWGluzL+vm+ELnjltEP0OS+13nPo7TiG1N116gHpbyptJyAtloQayyuFDsIwPJVkjILsN1zi51fpApg3rCl3DHCu9TF6v5yOb1NMzTNuM7rPehvMrU3XXcBewOfsWXt2kH2h8kkhAc4DLqjCKQDC8N9NudNt09DYrL07mmR3Qitx93rHDCou7+CrmuwfjSv4qfdSD0hXPcc6bbrtnOT0b9SXJs3uoZrDMa18u/GtfsM21PvK0qzWoZrDNt8u/bX7Ee2pr4laVd9LuI6Yd0RBQUKmUNQlSJAOQEBCYCoQhUAIQhAAvK9etPm0TmKJxEcBLag0vPyc7DYMhyO9bbXXTH0SyuLTSSXyUXAkYu7hU86Lx5q568tMpjVlwdLZn+k794pwKSzQPk82x0nqtLvcrOz6vWx+Vmk/aZc+Ki5cr4RjZs4mPIyJHepg87ST3lW8Op9uOcQb60jPkSu2LUi17XRN/bcfc1HZTfAZJdDPBPC1Eeo022Zg5Bx/JTt1GdttA/hH/AFKfp6nQfZy6GTDRuTmtAyFFsG6kDbaD/C/3Jf0NjGdoP7rR80vpqnQfZyMlnnii4Nw8Atb+ikA/+T8H5pP0Ys//AJXtZ+an6ap8Y8jMqIxuHgE8NG4eC0/6MwbLWP5P9SczVNruxaa8mA+5yl4Wr09RqDMwGDcPBPotEdVd1paf2P8AckOqkmyVh8R+ah4Wr09h5WZ7om+iPAJwaBkKK8dqvaBkWH9o/MKB+r1qH3deT2/MqHQqreLHlZVUSXBuHgu6TRVobnC/ube91VyyRub2mlvNpHvWbjKO6FYjuDcPBIYm+iPAJ6FNxHfoXSbrK7AVY49dg+IcfetzZrQ2Roew3g7I/LmvN1Y6G0q6zP3sd22//ocfeu3C4pweWW3sXGVjdlCZDK17Q5pvBwqCE9eqaiJEIQAoSpAmzStY0ue4MaM3OIAHMlCAkQsvpLX7R8FQJuncPswtv/zYN9qzGkP+qMhqLNZms3OleXH91tKfvFDmkS5pHp6jmnYwXnuawb3OAHiV4pbdctITdq0uYD9mMCPwLet7U2zaAt9qN4WeWQn7b6trxvSEV8VPa9ER2vRHoGsNr0RO9j7VaRL0YLWRxvc5oqak+SFamg27AoLDp7Q8cjGRWcNvEN6UwNAbXIuc83qcVitMauWmxNjfOGgSFzRddeIIFaO2eBORVc1ZSqNPYzc2nsezay6RmssPSwRNlDD5QGvVb6VBmBt3ZrFv18thybE3kxx97l06n63BgbZrWer2Y5jsGQY/hx2bd6XWjVAsrPZBeYes+EYlv4o97eGzZhk5ylJZoMtttXiV79b7c774N5Rs+YKiOsVsdnaH91G+4KmapWLldSXUxzPqWJ0raTnaJT/9r/zXVovTc8EgffdIMnMe8kOG7HI8VUtUgWeeSd7iUmbbSFjh0kzprO4CVoAex2BPBw2Hc7L5ZGWzujcWPZcc3AtIoUWW0PicHxuLHDIj+sQtEzTNntbRHbWXHDBs7Blz2j2jkqk41d9H6Mu6l5mcATqK1t+gJIx0kRFojOIkZjhxA94qqsLnnBxdmKzQoC6bJaXxOvRuLDvHuIyPeucJ7Vndp3Q0XElugtP1lnRv/t4xWvrt29y5pdGuaLzKTM9OPGnrDNveuIJ8bi0gtJBGRBofEKpVM3eX8l3vuOa8jIkciVI21SDKR45PcPmh9oc7t0fxIFf3s/aoisr22YHU3SU4ymk/iOPvKlbpq0j753eGn3hcCFSqzWzf5C7Ox+k5Hdtsb/WhZ7wAoXzNOcTR6pePe4j2Is1lklNI2OfyGHecgrWzarzuxe5sffePgMParjGrU2Vx6spDw96FrYdVYh25HO5UaPmfau2PQFmb93Xm5x+a2WBqveyHkZndXtLdA648+Tcf3D6XLf4rZ1XK3RlnGULP3AukAAAAUAwAGQ4LvoU5045ZO5pFWBCELYYV7+C+etO6ZtFsldJaXEkONIiTdix7DW7KZb8MV9CBcFo0DY5X9LJZYZHnEvdCwuPEkjHvSauRKNzw/QugLVbD/wBvC54rQydmMb6vOHcMVvdD/wDTBoo62TFx2xxYN5F5xPcAvRGNAAAFAMAAKAcAnJqCEqaRW6M0DZLL5iBkZyv0q/ve6rj4qyQhaFlDrvoz6TY5GtFXR0mj5srUDiWlw714+xe/LyDXPQn0S0uuikUtXxbh6UfcT4ELnrx5MqseSlatJq3rVLZKMd5WL0Cesz1D8jhyWbapGrmUnF3Rim1qj0K26GsukmmexvayTN7cgT/eNzafxDPisfbLDLA/o5mFjhvyI3g5Eclz2Wd8bg+NxY4ZOaaH/haqy61NmZ0VvhEzf7RoAcONMMeLSOSbcJ76P0KbjLwZmgpAr2bV+OYF9gnbMMzC512QeNPaBzKpp4HxuuyNLHD7LgQfasJwcdyHFoAnBMCeFiwOqxW6WA1ieWbwDgeYOBVg/SUM/wBYhuuP30PVceLmnBypwnBNVJJW4KTZ3vsLTjDMyT8LvJv5Ufge4lQSROZg9pbzBHvUIUjHkCgJA3ArOTT4KFCcE0JwWbGhyFPYrHJM67G29vOwcSdi1mi9XY4qOk8q/iOqOQ28ytqOHnV226lKLZnNHaGmnoWtut9N2A7tpWksOrkEeLx0p/F2e5v51VyhepSwlOHi/E0UUhGtAFAKAZAYBKhC6igQUISYCJClTSpYCISISAAnhRhPCEA5KkQqAVCEKgBV+ndEx2yF0MmFesx+1jhk4f1iCVYISauI8Q0jo+SzSuimbdc3wcNjmnaCoQvYtPaEhtsdyQUc2pjkHaYeG8bx/wArzDTOg57G+kratJoyUdl35HgVxVaTjqtjmnBxOFqmaomqVq52ZkjDQgjAjI7VaR6anu3HuEzfQlaJB4nEdxVW1SNU5mtgTsdb5Y3fdXD+B5u+D7x9qiTQnBZt3GOCcE0JwUDQ4J4TAuuw2GSd12JpdvOwcSdimzbsikQhX2h9XXy0fNWNmYH2nf6QrnQ+r8cFHP8AKP3kdVvqj5n2K6XoUMFzU/BtGHUis1nZE0MjaGgbB7+JUqEL0EraI0BCEJgCEIQAJEIUgIU0pSmlSwEQkQkABOCYCnBCAkCVNBTgVQCoSJVQAhCEwBMmha9pa9oe12DmuAII3EFPQgDH6V1FjdV1mf0Rz6N1SzuObfastbdBWqDzkLqD7bRebzqMu+i9ZQsJ4eMvAylSTPGWlSNXrFp0bBL5yFjzvLAT45rgk1WsZ+6u8nvHzXPLCS4ZHYs85CeFvv0Ssnov/iFSx6r2Mfdk85H/AJqPo5+AuyZ58u2xaMnmp0cTnD0qUb+8cF6DZ9F2ePsQsad9wV8TiuxXHBfuf4LVLqZbR2qQFDaH3v7tlQO92fhRaWCBkbQ1jQwDIAUCkQuunShDuo0UUtgQhC0KBCEIAEIQgAQhIkAJClKaVLAQphTimEqWAITaoSAAnhCEAOCcEIVIByEIVAKhCE0AIQhMAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEJMBEIQkA0ppSoUgMKaUiFICIQhIR/9k=",
        },
      ],
      cart: [],
      id: "",
      erroM: 0,
    };
  },
  computed:{
    cartAmount(){
      return this.cart.length
    }
  },
  methods: {
    addToCart(id) {
      for (var i = 0; i < this.datos.length; i++) {
        if (this.datos[i].id === id) {  
          this.verifHorario(this.datos[i].Horario,id)
          const verf=this.cart.findIndex(i=>i.id===id)
          if(this.erroM===0 && verf===-1){
          this.cart.push({
            id: this.datos[i].id,
            nombre: this.datos[i].nombre,
            descripcion: this.datos[i].descripcion,
            precio: this.datos[i].precio,
            Metodologia: this.datos[i].Metodologia,
            Horario: this.datos[i].Horario,
            img: this.datos[i].image,
            cantidad: 1
          });  
          }
          else{
            this.cart[verf].cantidad=this.cart[verf].cantidad+1;
          }
        }
      }
      localStorage.setItem("item", JSON.stringify(this.cart));
    },
    verifHorario(hora,id) {
      for (var j = 0; j < this.cart.length; j++) {
        if (this.cart[j].Horario === hora && this.cart[j].id !=id) {
        Swal.fire("Advertencia", "Ya tiene en el carrito un curso con este horario", "warning");
        this.erroM=1;
        }
      }
    },
  },
};
</script>
