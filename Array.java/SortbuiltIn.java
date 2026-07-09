import java.util.Arrays;
public class SortbuiltIn {
           //by using functions....

    /* public static void main(String[]args){
        int[] arr={1,2,6,0,-9,7};
        print(arr);
        Arrays.sort(arr);        //sort the array...
        print(arr);
    }
    public static void print(int[]arr){
        for(int i=0;i<arr.length;i++){
            System.out.print(arr[i]+" ");
        }
        System.out.println();
    }
} */
        //without using functions...
       
        public static void main(String[]args){
            int[]arr={1,2,6,0,-9,7};
            for(int i=0;i<arr.length;i++){
                System.out.print(arr[i]+" ");
            }
            System.out.println();
             Arrays.sort(arr);          //sort the array...
            for(int i=0;i<arr.length;i++){      //print the array...
                System.out.print(arr[i]+" ");
            }
            System.out.println();
        }
    }