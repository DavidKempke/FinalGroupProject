using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using SignalR.git;

namespace SignalRChat.Hubs
{
    
    public class ChatHub : Hub
    {
       static gitObj git = new gitObj();

        static TextItem a = new TextItem();


        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }
        public async Task Updater(string q)
        {

            await Clients.All.SendAsync("Hope", a.Owner,a.items);
        }

        public async Task getGroups(string q)
        {
            //await Clients.All.SendAsync("ReceiveMessage", "help", "me");
            await Clients.All.SendAsync("ReceiveGroups", git.getItemslist());
        }

    }
}