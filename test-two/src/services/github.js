
class GitHubService {
    constructor(baseUrl, http, apiAuthenticationToken) {
        this.baseUrl = baseUrl;
        this.http = http;
        this.apiAuthenticationToken = apiAuthenticationToken;
        this.authenticationQueryString = "";
        if (this.apiAuthenticationToken !== "") {
            this.authenticationQueryString = "access_token=" + this.apiAuthenticationToken;
        }
    }


    getUsersForOrganisation(organisationId) {
        // GET /orgs/:org/members
        let users = [];
        let p = new Promise((resolve, reject) => {
            let getPage = (page) => {
                this.http.get(this.baseUrl + "orgs/" + organisationId + "/members" + "?per_page=50&page=" + page + "&" + this.authenticationQueryString)
                    .then((result) => {
                        result.data.forEach((user) => {
                            users.push(user.login);
                        });

                        if (/rel="next"/.test(result.headers.link)) {
                             getPage(page + 1);
                        } else {
                            resolve(users);
                        }
                    }).catch((err) => {
                        reject(err)
                    });
            };

            getPage(1);
        });

        return p;
    }

    getRepositoriesForUser(userId) {
        // GET /users/:username/repos

        let repositories = [];
        let p = new Promise((resolve, reject) => {
            let getPage = (page) => {
                this.http.get(this.baseUrl + "users/" + userId + "/repos" + "?per_page=50&page=" + page + "&" + this.authenticationQueryString)
                    .then((result) => {
                        result.data.forEach((repository) => {
                            repositories.push(repository.name);
                        });

                        if (/rel="next"/.test(result.headers.link)) {
                            getPage(page + 1);
                        } else {
                            resolve(repositories);
                        }
                    }).catch((err) => {
                        reject(err)
                    });
            };

            getPage(1);
        });

        return p; 
    }
}

module.exports = GitHubService;