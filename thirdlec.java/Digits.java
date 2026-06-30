import java.util.Scanner;

public class Digits {
    public static void main(String[]args){
    Scanner sc = new Scanner(System.in);
    System.out.print("Enter n:");
    int n = sc.nextInt();
    if(n==0){
        n=6;        //kyuki agar 0 input diya toh 0 he output aata esliye...
    }
    int count = 0;       //count ka use krenge...
    while(n!=0){
        n=n/10;
        count++;         //ye loop ki iterations btayega...
    } System.out.println(count);
}
}
