using System;
using System.Collections.Generic;
namespace SignalR.git
{
    public class gitObj
    {
        public List<Group> groups;

        public gitObj()
        {
            groups = new List<Group>();
            Group g = new Group();
            Group h = new Group("group2");
            groups.Add(g);
            groups.Add(h);
        }

        public string[] getItemslist()
        {
            string[] temp = new string[groups.Count];


            for (int i = 0; i < groups.Count; i++)
            {
                temp[i] = groups[i].name;

            }

            return temp;
        }
        public int getGroupIndex(string name)
        {
            int groupIndex = groups.FindIndex(x => x.name == name);

            return groupIndex;
        }
        public string newgroup(string owner, string name, string item)
        {
            if (groups.Exists(x => x.name == name))
            {
                return "error an group with that name already exist";
            }
            else
            {
                groups.Add(new Group(name));
                return "new Group created";
            }
        }
    }
}
