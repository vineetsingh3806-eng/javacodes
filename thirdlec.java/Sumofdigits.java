import java.util.Scanner;

public class Sumofdigits {
    public static void main(String[]args){
        Scanner sc = new Scanner(System.in);
        int n=sc.nextInt();
        if(n<0) n=-n;
        int sum=0;
        while (n!=0) {
           sum=sum+n%10;     //n%10 mtlb last digit...
           n=n/10;              // n/10 krne k baad automatically last digit hatt gai...(int)..
        }System.out.println(sum);
    }
}

