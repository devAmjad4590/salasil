<template>
  <v-card height="85vh" class="maincontent">
    <div >
    <div class="video">
      <v-img 
      class=""
      aspect-ratio="4/3"
      height="30vh"
      width="30vw"
      cover
      rounded="lg"
      :src="this.course['الفيديوهات'][0]['صورة مصغرة']"
      ></v-img>
      <!-- <button>تابع المشاهدة</button> -->
    </div>
    <div class="details">
      <div class="Play-button">
        <h2>{{ this.course['الاسم'] }}</h2>
        <IconPlayerPlayFilled size="30" color="black" />
      </div>
      <p>
        {{ this.course['وصف مختصر'] }}
      </p>
      <p>
        <strong><span class="label">التصنيف:</span></strong>
        <span class="value">{{ this.course['التصانيف'] }}</span>
      </p>
      <p>
        <strong><span class="label">اللغة:</span></strong>
        <span class="value">{{this.course['اللغة']}}</span>
      </p>
      <p>
        <strong><span class="label">المقدم:</span></strong>
        <span class="value">{{ this.course['المقدمين'] }}</span>
      </p>
      <p>
        <strong><span class="label">المدة:</span></strong>
        <span class="value">{{ this.course['المدة الإجمالية (بالساعات)'] }}</span>
      </p>
      <p>
        <strong><span class="label">التاريخ:</span></strong>
        <span class="value">{{ formattedDate }}</span>
      </p>
    </div>
  </div>
  </v-card>
</template>

<script>
import { IconPlayerPlayFilled } from "@tabler/icons-vue";
import { components } from "vuetify/dist/vuetify-labs.js";
export default {
  name: "MainContent",
  created(){
    console.log(this.course)
  },
  computed: {
    formattedDate() {
      const date = new Date(this.course['تاريخ أول حلقة']);
      return new Intl.DateTimeFormat('ar-EG', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }).format(date);
    },
  },
  components: {
    IconPlayerPlayFilled,
  },
  props: {
    course: {
      type: Object,
      required: true,
      default: () => ({})
    },
    
  },

  
  
};
</script>

<style scoped>
.maincontent {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  padding: 17px 15px;
  border-radius: 8px;
  width: 78%;
  margin-left: 1px;
  margin-right: 40px;
  border: 3px solid #c0c0c0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1); /* Add shadow to the image */

}

.video {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}


.video button {
  background-color: red;
  color: white;
  border: none;
  padding: 10px 20px;
  margin-top: 10px;
  cursor: pointer;
  border-radius: 4px;
}

h2 {
  font-weight: bold;
  font-size: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  color: green;
  margin-right: 15px
}

.label {
  font-weight: bold;

  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.value {
  font-weight: bold;
  color: green;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.details h2 {
  margin-bottom: 10px;
  margin-right: 15px

}

.details p {
  margin-bottom: 7px;
  line-height: 1.6;
  width: 95%;
  margin-right: 15px

}

.details strong {
  display: inline-block;
  width: 100px;
}

.Play-button {
  display: flex;
  justify-content: space-between;
  margin-left: 25px;
}
</style>
