import java.util.Scanner;
public class Twosum {
    public static void main(String[]args){
        Scanner sc = new Scanner(System.in);
        int[]arr={12,5,8,0};
        System.out.print("enter the target number: ");
        int Target= sc.nextInt();
        int a=0; //not have sum...
        int b=0;
        for(int i=0;i<arr.length;i++){
            for(int j=i+1;j<arr.length;j++){
                if(arr[i]+arr[j]==Target){
                    a=i; //means happen..
                    b=j;
                     System.out.print(arr[i]+" "+ arr[j]);
                     break;
                }
            }
        }
         if(a==0 && b==0){
            System.out.println(" nahi mila");
         }                
        
    }
}
