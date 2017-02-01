class GitHubService {
    constructor(baseUrl, http, apiAuthenticationToken) {
        this.baseUrl = baseUrl;
        this.http = http;
        this.apiAuthenticationToken = apiAuthenticationToken;
        this.authenticationQueryString = "";
        if (this.apiAuthenticationToken !== "") {
            this.authenticationQueryString = "?access_token=" + this.apiAuthenticationToken;
        }
    }

    getUsersForOrganisation(organisationId) {
        // GET /orgs/:org/members

        return this.http.get(this.baseUrl + "orgs/" + organisationId + "/members" + this.authenticationQueryString);
    }

    getRepositoriesForUser(userId) {
        // GET /users/:username/repos

        return this.http.get(this.baseUrl + "users/" + userId + "/repos" + this.authenticationQueryString);
    }
}

module.exports = GitHubService;