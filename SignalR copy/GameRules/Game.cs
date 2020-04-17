using System;
using System.Collections.Generic;
using System.Text;

namespace GameOfLife
{
   public class Game
    {
        Square[,] gameBoard = new Square[30,30];

     public  Game()
        {
         for (int i = 0; i < 30; i++)
           {
               for (int j = 0; j < 30; j++)
                {
                    gameBoard[i, j] = new Square(i,j);
                }
            }
        }
       public void nextStateBuilder(Square a)
        {
            int x = a.x;
            int y = a.y;
            int n = 0;

            for (int i = -1; i < 2; i++)
            {
                for (int j = -1; j < 2; j++)
                {
                    int c = i + x;
                    int b = j + y;

                   if(c>=0&&b>=0&&c<30&&b<30)
                    {
                        if (gameBoard[(i + x), (j + y)].isAlive) n++;
                    }
                }
            }

            if (a.isAlive)
            {
                n--;

                if (n < 2 || n > 3)
                {
                    a.nextState = false;
                }
                else
                {
                    a.nextState = true;
                }
            }
            else
            {
                if (n == 3)
                {
                    a.nextState = true;
                }
                else
                {
                    a.nextState = false;
                }
            }


        }

        public void printboard()
        {
            for (int i = 0; i < 30; i++)
            {
                string line = "";
                for (int j = 0; j < 30; j++)
                {
                    if(gameBoard[i, j].isAlive)
                    {
                        line = line + "* ";
                    }
                    else
                    {
                        line = line + "  ";
                    }
                }
                Console.WriteLine(line);
            }
        }
        public void moveState()
        {
            for (int i = 0; i < 30; i++)
            {
                for (int j = 0; j < 30; j++)
                {
                    nextStateBuilder(gameBoard[i, j]);
                }
            }

            for (int i = 0; i < 30; i++)
            {
                for (int j = 0; j < 30; j++)
                {
                    gameBoard[i, j].isAlive = gameBoard[i, j].nextState;
                }
            }
        }

        public void buildSquare()
        {
            for (int i = 14; i < 17; i++)
            {
                for (int j = 14; j < 17; j++)
                {
                    gameBoard[i, j].isAlive = true;
                }
            }
        }

        public void buildLine()
        {
            int i = 14;
                for (int j = 14; j < 17; j++)
                {
                    gameBoard[i, j].isAlive = true;
                }
            
        }
        public void next()
        {
            moveState();
            printboard();

        }

    }
}
