import java.util.Scanner;
public class divisibleee {
    public static void main(String[]args){
        Scanner sc = new Scanner(System.in);
        int x = sc.nextInt();

        if(x%5==0 && x%3==0){
            System.out.println("aporva");
        }else if(x%3==0){
            System.out.println("banu");
        } else if(x%5==0){
            System.out.println("riya");
        }else {
            System.out.println("isha");
        }
    }
}
