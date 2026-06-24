public class Typecasting {
    public static void main(String[]args){

        // character into integer...

         char ch = 'A';
        int x = ch;         //implicit typecasting...
        System.out.println(x);

         char ch1 = '9';
        int y = (int)ch1;   //explicit typecasting...
        System.out.println(y); 

        
        char v = 'b';
        System.out.println((int)v);   //explicit typecasting...

        char ch2 = 'A';
        System.out.println(ch2+0);    //easy way to find ascii value or typecasting... 


        // integer into character...

        int c = 65;
        char ch4 = (char)c;     //Always use explicit typecasting....
        System.out.println(ch4);

    }
} 
