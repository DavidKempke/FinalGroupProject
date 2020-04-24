using System;
using System.Collections.Generic;
namespace BuildGit.git
{
    public class Group
    {
        public List<TextItem> items;
        public string name;
        public Group()
        {
            items = new List<TextItem>();
            name = "group1";
            TextItem temp = new TextItem();
            items.Add(temp);

        }
        public Group(string name)
        {
            items = new List<TextItem>();
            this.name = name;
            TextItem temp = new TextItem("aa","item2");
            items.Add(temp);
        
        }
        public string[] getItemslist(string user)
        {
            string[] temp = new string[items.Count];
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

            if (item.viewable)
            {
                if (item.editable)
                {
                    return item.item + "," +
                    "1" + "," +
                    "1";
                }
                else
                {
                    return item.item + "," +
                    "1" + "," +
                    "0";
                }
            }
            else
            {
                if (item.editable)
                {
                    return item.item + "," +
                    "0" + "," +
                    "1";
                }
                else
                {
                    return item.item + "," +
                    "0" + "," +
                    "0";
                }
            }


        }
        public string newItem(string owner, string name)
        {
            if (items.Exists(x => x.name == name))
            {
                return "error an item with that name already exist in the group";
            }
            else
            {
                items.Add(new TextItem(owner, name));
                return "new Item created";
            }
        }
        public void updateItem(string name, string itemValue,bool editable , bool visable)
        {
            int itemIndex = items.FindIndex(x => x.name == name);

            items[itemIndex].item = itemValue;

            items[itemIndex].editable = editable;

            items[itemIndex].viewable = visable;
        }



    }
}
