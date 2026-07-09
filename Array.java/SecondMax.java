public class SecondMax {
    public static void main(String[]args){
        int[]arr={1,2,5,6,6 };
        int Max=arr[0];
        int  SecondMax=arr[0];

          //first max...
        for(int i=0;i<arr.length;i++){
            if(arr[i]>Max){
                Max=arr[i];
            }
        }
             //Second max...
        for(int i=0;i<arr.length;i++){
            if(arr[i]>SecondMax && arr[i]!=Max ){
               SecondMax= arr[i];
            }
        }
        System.out.println("the second max element is: " + SecondMax +" ");
    }
}
