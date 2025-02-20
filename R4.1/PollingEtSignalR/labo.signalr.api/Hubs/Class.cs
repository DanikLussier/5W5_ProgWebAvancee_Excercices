using Microsoft.AspNetCore.SignalR;

namespace labo.signalr.api.Hubs
{
    public class HubTasks : Hub
    {

        public async Task FaireUnEcho(int value)
        {
            await Clients.Caller.SendAsync("Une fonction client", value);
        }

        public async Task EnvoyerAuxAutres(int value)
        {
            await Clients.All.SendAsync("Une fonction client", value);
        }

        public async Task EnvoyerAUneConnection(int value, string connectionId)
        {
            await Clients.Client(connectionId).SendAsync("UneFonctionClient", value);
        }

        public async Task EnvoyerAUnUsager(int value, string userId)
        {
            await Clients.User(userId).SendAsync("UneFonctionClient", value);
        }
    }
}
