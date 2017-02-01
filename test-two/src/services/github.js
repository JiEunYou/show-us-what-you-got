import PromiseLoop from "promise-loop";

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

    paging (queryPromise) {
        var arr = [];

        var loopingPromise = function (page) {
            return new Promise(function (resolve, reject) {
                queryPromise(page)
                    .then((items) => {
                        arr = arr.concat(items);
                        if (items.length === 50) {
                            resolve(page + 1);
                        } else {
                            reject(arr);
                        }
                    });
            });
        };

        var loop = PromiseLoop(loopingPromise);

        return loop(1);
    }

    getUsersForOrganisation(organisationId) {
        // GET /orgs/:org/members

        return this.paging((page) => this.http.get(this.baseUrl + "orgs/" + organisationId + "/members" + "?per_page=50&page=" + page + "&" + this.authenticationQueryString));
    }

    getRepositoriesForUser(userId) {
        // GET /users/:username/repos

         return this.paging((page) => this.http.get(this.baseUrl + "users/" + userId + "/repos" + "?per_page=50&page=" + page + "&" + this.authenticationQueryString));
    }
}

module.exports = GitHubService;