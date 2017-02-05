import Logger from './helpers/logger';
import GitHubService from './services/github';
import Http from './helpers/http';

const baseUrl = "https://api.github.com/";
const organisationId = "uber";
const gitHubApiAuthToken = process.env.GITHUB_KEY || ""; // I didn't want to put Api key in a public repository :)


let logger = new Logger();
let http = new Http();
let gitHubService = new GitHubService(baseUrl, http, gitHubApiAuthToken);

gitHubService.getUsersForOrganisation(organisationId).then((users) => {
    users.forEach((user) => {

        gitHubService.getRepositoriesForUser(user).then((repositories) => {
            let userWithRepos = {
                name: user,
                repositories: repositories
            };
            logger.log(userWithRepos);
        })
    });
}).catch((error) => {
    logger.log("Error: " + error);
});


