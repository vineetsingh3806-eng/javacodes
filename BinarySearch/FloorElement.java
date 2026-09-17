import java.util.Scanner;
public class FloorElement {
    public static void main(String[]args){
        Scanner sc = new Scanner(System.in);
        int[]arr={1,2,4,8,10};
        int tar=sc.nextInt();
        int n=arr.length;
        int index=-1;
        int i=0,j=n-1;
        while(i<=j){
            int mid=(i+j)/2;
            if(arr[mid]>tar){   
                j=mid-1;
            }else if(arr[mid]<=tar){   
                index=mid;
                i=mid+1;
            }
           
        }  System.out.print(arr[index]);  //if we have to find element...
        
    }
}