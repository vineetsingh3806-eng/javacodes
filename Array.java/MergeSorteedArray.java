import java.util.Scanner;
public class MergeSorteedArray {
     
    public static void main(String[]args){
        Scanner sc = new Scanner(System.in);
        System.out.print("enter 1st array size : ");
        int n1=sc.nextInt();
        int[]arr1 = new int[n1];  //give size of 1st array..
        System.out.print("enter 1st array elements: ");
        for(int i=0;i<n1;i++){
            arr1[i]=sc.nextInt();     //array elements..
        }
         System.out.print("enter 2nd array size : ");
        int n2=sc.nextInt();
        int[] arr2=new int[n2];   //give size of 2nd array..
        System.out.print("enter 2nd array elements: ");
        for(int i=0;i<n2;i++){
            arr2[i]=sc.nextInt();     //array elements...
        }
        //3rs array with their size..
        int[]arr3 = new int[arr1.length + arr2.length];
        int i=0,j=0,k=0;
        while(i<arr1.length && j< arr2.length){
            if(arr1[i]<=arr2[j]){
                arr3[k]=arr1[i];
                i++;
            } else {
                arr3[k]=arr2[j];
                j++;
            }
            k++;
        }
        while(i < arr1.length){
            arr3[k]=arr1[i];
            i++;
            k++;
        }
        while(j < arr2.length){
             arr3[k]=arr2[j];
             j++;
             k++;
        }
         //print 3rd array...
        for(int ele: arr3){
            System.out.print(ele + " ");
        }
        
    }
}
