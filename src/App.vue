<template>
  <div id='app'>
    <div id='nav'>
      <router-link to='/'>Home</router-link>
      <router-link to='/about'>About</router-link>
      <router-link to='/github'>GitHub</router-link>
    </div>
    <router-view id='main' />
  </div>
</template>

<style lang='scss'>
$navsize: 10rem;

#app {
  font-family: 'Avenir', 'Ubuntu', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}

#nav {
  height: 100%; /* Full-height: remove this if you want "auto" height */
  width: $navsize; /* Set the width of the sidebar */
  position: fixed; /* Fixed Sidebar (stay in place on scroll) */
  z-index: 1; /* Stay on top */
  top: 0; /* Stay at the top */
  left: 0;
  background-color: #111; /* Black */
  overflow-x: hidden; /* Disable horizontal scroll */
  padding-top: 20px;
  a {
    padding: 6px 8px 6px 16px;
    text-decoration: none;
    font-size: 25px;
    color: #818181;
    display: block;
    transition: 0.3s;
    &.router-link-exact-active {
      color: #F1F1F1;
    }
    &:hover {
      color: #CDCDCD;
    }
  }
}

#main {
  margin-left: $navsize; /* Same as the width of the sidebar */
  padding: 0px 10px;
  //padding: 3rem 10rem;
}

@media screen and (max-height: 450px) {
  #nav {padding-top: 15px;}
  #nav a {font-size: 18px;}
}
</style>
