<template>
  <div class="review">
    <p>This Works</p>
    <h1>Review Page</h1>
    <form @submit.prevent="addTicket">
      <input v-model="reviewName" placeholder="Name" />
      <textarea v-model="reviewStatement"></textarea>
      <br />
      <button type="submit">Submit</button>
    </form>

    <h3>Current Reviews</h3>
    <div v-for="review in reviews" :key="review.id">
      <hr />
      <div class="ticket">
        <div class="problem">
          <p>{{ review.reviewStatement }}</p>
          <p>
            <i>-- {{ review.reviewName }}</i>
          </p>
        </div>
        <div class="delete">
          <button @click="deleteTicket(ticket)" class="delete">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
</style>
