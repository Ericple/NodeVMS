namespace hook.net;
using hook.net;

public class NodeVMS_Hook {
    private string uri;
    public
//constructor
    NodeVMS_Hook(string uri) {
        this.uri = uri;
    }
//get or set hook uri
    string URI(string uri) {
        if (uri == "") {
            return this.uri;
        } else {
            this.uri = uri;
            return this.uri;
        }
    }
} 