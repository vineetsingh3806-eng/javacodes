import java.util.Scanner;
public class Greaterofthree {
public static void main(String[]args){
    Scanner sc = new Scanner(System.in);
    int a  = sc.nextInt();
    int b  = sc.nextInt();
    int c  = sc.nextInt();

    /*  if(a>=b && a>=c){
        System.out.println("a is greater");
    }else if(b>=c && b>=a){
        System.out.println("b is greater");
    }else if(c>=a && c>=b){
        System.out.println("c is greater");
    } 
}
} */




//using nested if else......

if(a>b){
    if(a>c){
        System.out.println("a is greater");
    } else {
        System.out.println("c is greater");
    }
}else{
    if(b>c){
        System.out.println("b is greater");
    } else{
        System.out.println("c is greater");
    }
}
}
}

