public class OddEvenindex {
    public static void main(String[]args){
        int[]arr={1,2,3,4,5,7};
        for(int i=0;i<arr.length;i+=2){
              arr[i]+=10;       //multiply the even index by 10...
        }  
        for(int i=1;i<arr.length;i+=2){
            arr[i]*=2;        //multiply the odd index by 2...
        }
        for(int i=0;i<arr.length;i++){
            System.out.print(arr[i]+" ");
        }
        System.out.println();      //print the array...
    }
}
      //if else se bhi krskte h...