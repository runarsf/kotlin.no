<template>
  <div id='github'>
    <div id='repos'></div>
  </div>
</template>

<script>
export default {
  name: 'github',
  data: function () {
    return {
      repos: ''
    }
  },
  created: function () {
    this.getRepos()
  },
  methods: {
    getRepos: function () {
      fetch('https://api.github.com/users/runarsf/repos')
        .then((resp) => resp.json())
        .then((data) => {
          data.forEach((repo) => {
            this.repos += `
            <div class='repo'>
              <img src='/octicons/repo.svg' alt='' />
              <a href='${repo.owner.url}'>${repo.owner.login}</a>
              <span> / </span>
              <b><a href='${repo.html_url}'>${repo.name}</a></b>
            </div>
            `
          })
          document.getElementById('repos').innerHTML = this.repos
        })
    }
  }
}
</script>

<!-- FIXME: Why does this not work scoped -->
<style lang='scss'>
#repos {
  width: 100%;
  height: 100%;
  background-color: #F9FAFB;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  margin-right: -1rem;
  .repo {
    margin: 0 1rem 1rem 0;
    flex: 1 0 15rem;
    width: 15rem;
    height: 7rem;
    background-color: #FFFFFF;
    border: 1px solid #EDEEF1;
    border-radius: 5px;
    padding: 0.1rem;
    a {
      text-decoration: none;
      color: #4260D0;
    }
    span {
      color: #4260D0;
    }
  }
}
</style>
