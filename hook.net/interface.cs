namespace hook.net;

public interface IDataTypes {
    interface IUserInterface {
        void New();
        void Get();
        void Patch();
        void Delete();
    }
    interface IAirmailInterface {
        void Send();
        void Get();
        void Delete();
    }
    interface ISiteMailInterface {
        void Send();
    }
    interface IAircraftInterface {
        void New();
        void Get();
        void Patch();
        void Delete();
    }
    interface IPierpInterface {
        void New();
        void Delete();
        void Get();
    }
}