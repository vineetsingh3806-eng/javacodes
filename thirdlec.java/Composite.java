import java.util.Scanner;
public class Composite {
    public static void main(String[]args){
        Scanner sc= new Scanner(System.in);
        System.out.print("enter the number :");
        int n=sc.nextInt();
        int x = 0;         //it is a prime number...
        if(n<=1){
            System.out.println("nither composite nor prime");
        } else{                                          // yaha ek or chiz krskte h.. jisse code optimize hojayega...
         for(int i=2; i<=n-1;i++){                    //for(int i=2; i<=math.sqrt(n);i++){}
            if(n%i==0){                              //ex-29 normally 2 se 28tak check hota lamba code chalta...
           x=1; //means composite number...       //in sqrt agar sqrt(29)=5.38 toh bs 2,3,4,5 check honge...
           break;                          // 2,3,4,5 m nhi aaye toh prime vrna composite...  (1:45:22)
            }
        }
    } 
    if(x==1){
        System.out.println("composite");
    } else{
        System.out.println("prime");
    }
    
    }
}

