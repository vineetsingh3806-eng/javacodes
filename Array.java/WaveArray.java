import java.util.Scanner;
public class WaveArray {
    public static void main(String[]args){
        Scanner sc = new Scanner(System.in);
        int[]arr={1,2,3,4,5};
        int n=arr.length;
        System.out.println(n);
        for(int i=0;i<n;i+=2){
          if(i==n-1) 
            break;        //also do without if statement..(n-1  in for loop).. 
            int temp=arr[i];
            arr[i]=arr[i+1];
            arr[i+1]=temp;
        }
        for(int ele:arr){
            System.out.print(ele +" ");
        }
    } 
}
