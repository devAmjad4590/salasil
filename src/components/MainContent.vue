<template>
  <div class="maincontent">
    <div class="video">
      <img src="/maxresdefault.jpg" alt="Video Thumbnail" />
      <!-- <button>تابع المشاهدة</button> -->
    </div>
    <div class="details">
      <div class="Play-button">
        <h2>تذوق العبادات</h2>
        <IconPlayerPlayFilled size="30" color="black" />
      </div>
      <p>
        سلسلة "تذوق العبادات" من بودكاست فاهم تهدف إلى تعميق فهم المستمعين
        للعبادات المختلفة وإبراز جمالها وتأثيرها الروحي والنفسي. في هذه السلسلة،
        يناقش الدكتور أحمد العربي مواضيع متعددة تتعلق بالعبادات، مثل الصلاة
        والذكر والقرآن والدعاء، ويسعى إلى تقديمها بشكل يثري التجربة الروحية
        للمستمعين.
      </p>
      <p><strong>التصنيف:</strong> فقه</p>
      <p><strong>اللغة:</strong> العربية</p>
      <p><strong>المقدم:</strong> د. أحمد العربي</p>
      <p><strong>المدة:</strong> 7:19:19</p>
      <p><strong>التاريخ:</strong> الثلاثاء 28 مايو 2024</p>
    </div>
  </div>
</template>

<script>
import { IconPlayerPlayFilled } from "@tabler/icons-vue";
import { components } from "vuetify/dist/vuetify-labs.js";
export default {
  components: {
    IconPlayerPlayFilled,
  },
};
</script>

<style scoped>
.maincontent {
  display: flex;
  flex-direction: column;

  background-color: #fff;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 0 1px 1px black;
  width: 78%;
  margin-left: 30px;
  margin-right: 40px;
}

.video {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.video img {
  width: 100%;
  max-width: 800px;
  border-radius: 8px;
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

.details h2 {
  margin-bottom: 10px;
}

.details p {
  margin-bottom: 10px;
  line-height: 1.6;
  width: 100%;
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
