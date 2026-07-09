import java.util.Arrays;
public class Shallowcopydeepcopy {
    public static void main(String[]args){
        //shallow copy... = new copy + same data...
      /*   int[]arr={1,2,4,5,6};
        int [] x=arr;   //x is shallow copy...
        x[3]=9;
        System.out.println(arr[3]);
    }
} */
         //deep copy...= New copy + new data...
          int[]arr={1,2,5,4};
          int[] deep = Arrays.copyOf(arr,arr.length);
          deep[2]=9; 
          System.out.println(arr[2]);
    }
}