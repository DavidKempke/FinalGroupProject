using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using System;
using BuildGit.git;

namespace SignalRChat.Hubs
{
    public class ChatHub : Hub
    {
        static gitObj git = new gitObj();

        static TextItem a = new TextItem();
        
        Group currentGroup = git.groups[0];


        public async Task SendMessage(string user)
        {
            await Clients.All.SendAsync("ReceiveMessage", user);
        }
        public async Task Updater(string q)
        {

            await Clients.All.SendAsync("Hope", a.Owner, a.items);
        }

        public async Task getGroups(string q)
        {
            await Clients.Caller.SendAsync("ReceiveGroups", git.getGroupslist());
        }

        public async Task getItems(string group,string user)
        {
            currentGroup = git.groups[git.getGroupIndex(group)];
            Console.WriteLine(group + user);
            await Clients.Caller.SendAsync("ReceiveItems", currentGroup.getItemslist(user));
        }
        public async Task NewGroup(string name)
        {
            git.newgroup(name);
           
            await Clients.All.SendAsync("ReceiveGroups", git.getGroupslist());
        }

        public async Task NewItem(string group, string name, string user)
        {
            currentGroup = git.groups[git.getGroupIndex(group)];
            currentGroup.newItem(user,name);

            await Clients.Caller.SendAsync("ReceiveItems", currentGroup.getItemslist(user));
        }


        public async Task GetItem(string group, string name)
        {
            currentGroup = git.groups[git.getGroupIndex(group)];
            Console.WriteLine(group + name);

            await Clients.Caller.SendAsync("ReceiveItem", currentGroup.getItem(name));
        }



    }
}
