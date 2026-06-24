
//input from user for radius

import java.util.Scanner;
public class Areaofsphere {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);  // inputs lene k liye bnaya h scanner...
        System.out.print("Enter radius :"+ " ");
        double r = sc.nextDouble();
        System.out.print("The area of sphere is - ");
        System.out.println(4*3.14*r*r);
    }
}
