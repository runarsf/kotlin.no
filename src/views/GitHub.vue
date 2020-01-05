<template>
  <div>
    <div id='repos'>
      <div class='repo' v-for='repo in repos' v-bind:key='repo'>
        <img src='/octicons/repo.svg' alt='' />
        <a :href='repo.owner.url'>{{ repo.owner.login }}</a>
        <span> / </span>
        <b><a :href='repo.html_url'>{{ repo.name }}</a></b>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'github',
  data: function () {
    return {
      repos: []
    }
  },
  mounted: function () {
    this.getRepos()
  },
  methods: {
    getRepos: function () {
      fetch('https://api.github.com/users/runarsf/repos')
        .then((resp) => resp.json())
        .then((data) => {
          this.repos = data
          console.log(this.repos)
        })
    }
  }
}
</script>

<!-- FIXME: Why does this not work scoped -->
<style scoped lang='scss'>
#main {
  background-color: #F9FAFB;
  padding: 0;
  height: 100%;
  //margin: 0 auto;
  //margin-top: 25px;
  //border: 1px solid;
  //padding: 5px;
  #repos {
    padding: 10px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
    grid-gap: 10px;
    list-style-type: none;
  }
  .repo {
    padding: 5px;
    height: 6rem;

    background-color: #FFFFFF;
    border: 1px solid #EDEEF1;
    border-radius: 5px;
  }
  * {
    //margin: 0;
    //padding: 0;
    //box-sizing: border-box;
  }
  a {
    text-decoration: none;
    color: #4260D0;
  }
  span {
    color: #4260D0;
  }
}
/*#main {
  //width: 100%;
  height: 100%;
  //background-color: #F9FAFB;
  background-color: green;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  //justify-content: space-between;
  //align-items: flex-start;
  //margin-right: -1rem;
  .repo {
    //margin: 0 1rem 1rem 0;
    margin: 1rem;
    margin-top: -1+rem;
    //flex: 1 0 15rem;
    //width: 15rem;
    //height: 7rem;
    //background-color: #FFFFFF;
    //border: 1px solid #EDEEF1;
    //border-radius: 5px;
    //padding: 0.1rem;
    a {
      //text-decoration: none;
      //color: #4260D0;
    }
    span {
      //color: #4260D0;
    }
  }
}*/
</style>
