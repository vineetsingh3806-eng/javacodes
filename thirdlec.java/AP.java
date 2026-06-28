import java.util.Scanner;
public class AP {
public static void main(String[]args){
    Scanner sc = new Scanner(System.in);
    System.out.print("Enter n:");
    int n = sc.nextInt();
     //print ap= 2,5,8,11....
    for(int i=2; i<=3*n-1;i+=3){        //(n)th term = a+(n-1)*d= 2+(n-1)*3= 3*n-1...
    System.out.print(i+" ");        
    }
}
}  
        //2nd method...  smgh nhi aaya...

    /*  int a=2, d=3;
     for(int i=1;i<=n;i++){
        System.out.print(a+" ");
        a+=d;
     }
    }
} */
