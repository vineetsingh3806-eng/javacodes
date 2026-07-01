import java.util.Scanner;
public class Reversealphabet {
    public static void main(String[]args){
        Scanner sc=new Scanner(System.in);
            System.out.print("enter n :");
            int n= sc.nextInt();
            for(int i=1;i<=n;i++){
                for(int j=1;j<=n+1-i;j++){     //j>=i and int j=n and j-- (toh bhi kaam chal jata pr kuc changes or hote)....
                    System.out.print((char)(j+96)+" "); 
                } System.out.println();

        }
    }
}
