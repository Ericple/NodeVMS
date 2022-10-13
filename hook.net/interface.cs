namespace hook.net;

public interface IDataTypes {
    interface IDataActionInterface<T> {
        void New(T Dataobj);
        void Get(string identity);
        void Patch(string identity, T Dataobj);
        void Delete(string identity);
        bool Refresh();
    }
}