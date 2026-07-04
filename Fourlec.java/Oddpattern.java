import java.util.Scanner;
public class Oddpattern {
    public static void main(String[]args){
     Scanner sc = new Scanner(System.in);
     int n=sc.nextInt();                      
 /*   for(int i=1;i<=n;i++){
        for(int j=1;j<=i;j++){
            System.out.print((2*j)-1+" ");            //chatgpt dekha ki kya print karna hai
        } System.out.println();
    }
}
}   */  

        //2nd method of this...
         int a=1;                                 //hum yhha extra vatriable lekr krrhe h...
     for(int i=1;i<=n;i++){
         a=1;
        for(int j=1;j<=i;j++){                
            System.out.print(a+" ");                  
            a=a+2;
        } System.out.println();
    }
}
}
