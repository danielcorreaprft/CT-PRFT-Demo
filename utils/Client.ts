import Client from "../client/Client";

export function createClient(options) {
    const rootClient = new Client(options)
    this.apiRoot = rootClient.getApiRoot(
        rootClient.getClientFromOption(options)
    )
    this.projectKey = rootClient.getProjectKey()
}