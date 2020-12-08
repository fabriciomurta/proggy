using System;

namespace proggy
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Hello World!");
            if (args.Length > 0)
            {
                Console.WriteLine("Provided commandline arguments:");
                foreach (var arg in args)
                {
                    Console.WriteLine("- " + arg);
                }
            }
        }
    }
}
