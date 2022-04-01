<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/admin">Admin</router-link>
    </nav>
    <router-view />

    <div class="github-container">
      <ul class="social-links">
        <li>
          <a
            href="https://github.com/mgordillo11/Creative-Project-4"
            target="blank"
            ><i class="fab fa-github"></i
          ></a>
        </li>
      </ul>
    </div>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url(../../images/front-yard-background.jpeg);
  background-size: auto;
  background-size: cover;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.github-container {
  display: flex;
  justify-content: center;
  font-size: 100px;
}

.fab {
  color: white;
}

.github-container li {
  list-style: none;
}
</style>
