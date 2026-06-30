import java.util.Scanner;
public class Alphabetpattern {
    public static void main(String[]args){
        Scanner sc = new Scanner(System.in);
        System.out.print("enter the number:");
        int n = sc.nextInt();
      if(n>26){
            System.out.println("invalid input");
        } else{
        for(int i=1;i<=n;i++){
            for(int j=1;j<=n;j++){
                System.out.print((char)(j+64) +" ");       
            }
            System.out.println();
        }
            }
        }
    }
