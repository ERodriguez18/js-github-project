
document.addEventListener("DOMContentLoaded", event => {

    form = document.getElementById("github-form");
    search = form.search;
    submit = form.submit;
  
    githubContainer = document.getElementById("github-container");
    userList = githubContainer.children[0];
    reposList = githubContainer.children[1];
  
    const handleSubmit = event => {
      event.preventDefault();
      userList.innerHTML = "";
     
      user = search.value;
      fetch(`https://api.github.com/search/users?q=${user}`)
        .then(resp => resp.json())
        .then(parsedSearch => handleSearch(parsedSearch));
    };
  
    const handleUserClick = event => {
      if ((event.target.tagName = "IMG")) {
        user = event.target.dataset.id;
        fetch(`https://api.github.com/users/${user}/repos`)
          .then(resp => resp.json())
          .then(parsedSearch =>
            handleAvatarClick(parsedSearch, event.target.dataset.id)
          );
      }
    };
   
    const handleSearch = searchData => {
      
      console.log("handleSearch", searchData);
      users = searchData.items;
      
      users.forEach(user => {
        avatar = user.avatar_url;
        name = user.login;
        link = user.html_url;
        repoList = user.repos_url;
        
        userContainer = document.createElement("LI");
        avatarContainer = document.createElement("IMG");
        nameContainer = document.createElement("H1");
        linkContainer = document.createElement("A");
        repoContainer = document.createElement("UL");
        
        userContainer.id = name;
        avatarContainer.src = avatar;
        avatarContainer.dataset.id = name;
        nameContainer.innerHTML = name;
        linkContainer.href = link;
        linkContainer.innerText = "Profile";
        repoContainer.id = `${name}-repo-container`;
       
        userList.append(userContainer);
        userContainer.append(
          avatarContainer,
          nameContainer,
          linkContainer,
          repoContainer
        );
      });
    };
  
    const handleAvatarClick = (allRepos, id) => {
      allRepos.forEach(repo => {
        console.log(id);
        
        name = repo.name;
        url = repo.html_url;
        
        singleRepoContainer = document.createElement("LI");
        repoLink = document.createElement("A");
        
        repoLink.href = url;
        repoLink.innerText = name;
       
        repoContainer = document.getElementById(`${id}-repo-container`);
        repoContainer.append(singleRepoContainer);
        singleRepoContainer.append(repoLink);
      });
    };
  
    form.addEventListener("submit", handleSubmit);
    userList.addEventListener("click", handleUserClick);

  });