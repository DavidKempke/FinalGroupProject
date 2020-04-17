using System;
using System.Collections.Generic;
namespace SignalR.git
{
    public class Group
    {
        public List<TextItem> items;
        public string name;
        public Group()
        {
            name = "group1";
     
        }
        public Group(string name)
        {
            this.name = name;
        
        }
        public string[] getItemslist(string user)
        {
            string[] temp = new string[50];
            int tempIndex = 0;

            for (int i = 0; i < items.Count; i++)
            {
                if (items[i].Owner.Equals(user) || items[i].viewable == true)
                {
                    temp[tempIndex] = items[i].name;
                    tempIndex++;
                }
            }

            return temp;
        }

        public string getItem(string name)
        {
            TextItem item = items.Find(x => x.name == name);

            return item.name + "," + item.item + "," +
            item.viewable;
        }
        public string newItem(string owner, string name, string item)
        {
            if (items.Exists(x => x.name == name))
            {
                return "error an item with that name already exist in the group";
            }
            else
            {
                items.Add(new TextItem(owner, name, item));
                return "new Item created";
            }
        }
        public void updateItem(string name, string itemValue, bool visable)
        {
            int itemIndex = items.FindIndex(x => x.name == name);

            items[itemIndex].item = itemValue;


            items[itemIndex].viewable = visable;
        }



    }
}
