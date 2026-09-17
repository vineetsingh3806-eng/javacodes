import java.util.Scanner;
public class KthSmallest {
    public static void main(String[]args){
        Scanner sc = new Scanner(System.in);
        int k = sc.nextInt();
        int[]arr={7,10,4,3,20,15};
        for(int i=0;i<k-1;i++){
            int min = Integer.MAX_VALUE;
            int mindex=0;
            for(int j=i;j<arr.length;j++){
                if(arr[j]<min){
                    min=arr[j];
                    mindex=j;
                }
            }
            //swaping of minimum element with the first element(i) of the unsorted array...
            int temp=arr[i];
            arr[i]=arr[mindex];
            arr[mindex]=temp;
        }
        System.out.println(arr[k-1]);
    }
}
