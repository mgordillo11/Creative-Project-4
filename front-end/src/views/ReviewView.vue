<template>
  <div class="review">
    <h1>Review Page</h1>
    <div class="form-container">
      <form @submit.prevent="addReview">
        <input v-model="reviewName" placeholder="Name" />
        <textarea v-model="reviewStatement"></textarea>
        <br />
        <button type="submit">Add Review</button>
      </form>
    </div>

    <hr />

    <h3>Current Reviews</h3>
    <div v-for="review in reviews" :key="review.id">
      <div class="ticket">
        <div class="problem">
          <p>{{ review.title }}</p>
          <p>
            <i>-- {{ review.description }}</i>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ReviewView",
  data() {
    return {
      test: "string",
      reviewName: "",
      reviewStatement: "",
      reviews: [],
    };
  },
  created() {
    this.getItems();
  },
  computed: {
    getUpdatedItems() {
      return this.reviews;
    },
  },
  methods: {
    async getItems() {
      try {
        let response = await axios.get("/api/items");
        this.reviews = [];
        for (let i = 0; i < response.data.length; i++) {
          if (response.data[i].price === "review") {
            this.reviews.push(response.data[i]);
          }
        }
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async addReview() {
      try {
        await axios.post("/api/items", {
          title: this.reviewName,
          path: "",
          description: this.reviewStatement,
          price: "review",
        });
        this.reviewName = "";
        this.reviewStatement = "";
        this.getItems();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
body {
  font-family: "Montserrat", sans-serif;
  font-size: 16px;
  padding: 20px 100px 0px 100px;
  background: #f3f3f3;
}

textarea {
  width: 100%;
  max-width: 500px;
  height: 100px;
}

input,
textarea,
select,
button {
  font-family: "Montserrat", sans-serif;
  font-size: 1em;
}

.form-container {
  display: flex;
  justify-content: center;
  flex-direction: row;
}

.ticket {
  display: flex;
  flex-direction: column;
}

.problem {
  flex: 5;
}

.delete {
  flex: 1;
}

h1,
h3 {
  color: white;
}

.ticket {
  color: white;
}
</style>
