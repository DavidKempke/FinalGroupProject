using System;
using System.Collections.Generic;
using System.Text;

namespace GameOfLife
{
   public class Square
    {
        public bool isAlive;
        public bool nextState;

        public int x;
        public int y;

        public int r;
        public int g;
        public int b;

        public Square(int x,int y, int r, int g, int b)
        {
            this.x = x;
            this.y = y;

            this.r = r;
            this.g = g;
            this.b = b;

            isAlive = false;
            nextState = false;

        }
        public Square(int x, int y)
        {
            this.x = x;
            this.y = y;

            r = 255;
            g = 255;
            b = 255;

            isAlive = false;
            nextState = false;

        }


    }
}
