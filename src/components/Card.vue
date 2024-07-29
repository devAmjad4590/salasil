<template>
    <v-card
    :width="370"
    :height="360"
    class="card"
    rounded
    elevation="10"
    hover
    link
    >
    <div class="image-container">
        <v-img
        cover
        src="/maxresdefault.jpg"
        aspect-ratio="4/3"
        :width="350"
        :height="200"
        class="centered-img"
        rounded
        />
        <div class="overlay">
            <div class="rectangle">
                <span class="rectangle-text">٤ حلقات</span>
            </div>
        </div>

    </div>

    <h2 class="card-title">تذوق العبادات</h2>
    <p class="text-right"> سلسلة "تذوق العبادات" من بودكاست فاهم تهدف إلى تعميق فهم المستمعين للعبادات المختلفة وإبراز جمالها وتأثيرها الروحي والنفسي. </p>
    </v-card>
    
</template>

<script>
export default {
    name: 'Card',
    data(){
        return {
            title: '',
            fullText: '',
            img: '',
            ep: 0
        }
    },
    computed: {
        truncatedText(){
            const words = this.fullText.split(' ')
            return words.length > 30 ? words.slice(0, 30).join(' ') + '...' : this.fullText
        }
    }
}


</script>

<style scoped>
.image-container{
    position: relative;
}

.overlay{
    position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-end;
}

.rectangle {
  background-color: #990000;
  padding: 1.9px 14px;
  width: 85px;
  height: 29px;
}

.rectangle-text {
    font-family: "Zain", sans-serif;
  color: white;
  font-size: 18px;
}


.centered-img{
    display: block;
    margin: auto;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4), 0 6px 20px rgba(0, 0, 0, 0.1); /* Add shadow to the image */
}

.card{
    border: 3px solid #C0C0C0;
    padding: 9px 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1); /* Add shadow to the image */
    
}

.card-title{
    text-align: right;
    font-size: 20px;
    font-family: "Zain", sans-serif;
    font-weight: 800;
    font-style: normal;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    color: #157536;
    margin-top: 3%;
    margin-bottom: 3%;
    margin-right: 1%;
}

.text-right{
    text-align: right;
    font-size: 16px;
    font-family: "Zain", sans-serif;
    font-weight: 300;
    font-style: normal;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    margin-right: 1%;
}


</style>