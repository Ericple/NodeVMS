namespace hook.net;
using MongoDB.Driver;
using MongoDB.Bson;
using System.Net.Http;
public class Account : IDataTypes.IDataActionInterface<SAccount> {
    private string ActionURI;
    private MongoClient MongoClient;
    private HttpClient HttpClient;
    private object dataTemplete;
    public Account(string ActionURI) {
        this.ActionURI = ActionURI;
        this.MongoClient = new MongoClient(this.ActionURI);
        this.HttpClient = new HttpClient();
        this.dataTemplete = this.HttpClient.GetAsync(ActionURI);
    }
    public void New(SAccount account) {
        this.MongoClient.GetDatabase(this.dataTemplete.ToJson());
    }
    public void Get(string identity) {

    }
    public void Patch(string identity, SAccount account) {

    }
    public void Delete(string identity) {

    }
    public bool Refresh() {
        this.dataTemplete = this.HttpClient.GetAsync(ActionURI);
        if (this.dataTemplete == null) {
            return false;
        } else {
            return true;
        }
    }
}