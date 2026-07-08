import java.util.Scanner;
public class Negativeelement {
    public static void main(String[]args){
        Scanner sc = new Scanner(System.in);
        System.out.print("print size: ");
        int n= sc.nextInt();   
        int [] arr=new int[n];   //take size input..
        System.out.print("enter array element: ");
        for(int i=0;i<n;i++){
          arr[i]=sc.nextInt();
          }  //take array element as input...

          //pirnting negative element...

          for(int i =0;i<n;i++){
            if(arr[i]<0){
                System.out.println("the negative element is: " + arr[i]+" ");
            }
          }
    }
}

