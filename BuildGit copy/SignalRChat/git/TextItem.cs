﻿using System;
namespace BuildGit.git
{
    public class TextItem { 

        public bool editable;
        public bool viewable;
        public string Owner;
        public string name;
        public string item;
        public string[] items = new string[100];

        public TextItem()
        {
            Owner = "user1";
            item = "help me build this.";
            name = "item1";
            editable = true;
            viewable = false;
            for (int i = 0; i < 100; i++)
            {
                items[i] = i.ToString();
            }
        }
        public TextItem(string owner, string name)
        {
            Owner = owner;
            this.item = "help me";
            this.name = name;
            editable = true;
            viewable = false;
            for (int i = 0; i < 100; i++)
            {
                items[i] = i.ToString();
            }
        }


    }
}
