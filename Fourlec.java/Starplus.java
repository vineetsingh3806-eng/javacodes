import java.util.Scanner;
public class Starplus {
    public static void main(String[]args){
        Scanner sc = new Scanner(System.in);
        System.out.print("enter n: ");
        int n=sc.nextInt();    //always take n=odd number...
        int mid=(n+1)/2;
        if(n%2==0){
            System.out.println("Please enter odd number");
        } else{ 
                for(int i=1;i<=n;i++){
                    for(int j=1;j<=n;j++){
                       if(i==mid || j==mid){
                         System.out.print("* ");
                        } else{
                                System.out.print("  ");
                        }
                    }
                }  System.out.println(); 
        }
    }
}    
