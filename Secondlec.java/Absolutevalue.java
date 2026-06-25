
// print the absolute value of a integer...

import java.util.Scanner;
public class Absolutevalue {
    public static void main(String[]args){
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter the number : ");
        int x = sc.nextInt();
        System.out.print("absolute value : ");
         if(x>=0){
            System.out.println(x);
         } else {
            System.out.println(-x);     //(x)*(-1) ye bhi likh skte thhe...
         }
    }
}
