import java.util.Scanner;

public class Sequence {
    public static void main(String[]args){
    Scanner sc = new Scanner(System.in);
    System.out.print("Enter number :");
    int n = sc.nextInt();
    for(int i=1;i<=n;i++){                      //hard lga mughe thoda...dimag lga thha...
        System.out.println(i);
        System.out.println(n);
        n--;
    }
}
}
