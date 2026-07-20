public class BetterBubbleSorting {
    public static void main(String[]args){
        int[]arr={5,-2,6,7,2,0,7,2};
        int n=arr.length;
         for(int i=0;i<n-1;i++){
            // check after every pass that array is sorted or not..
            boolean flag=true;  //guess that array is sorted...
            //bubble sort starts from here...
            for(int j=0;j<n-1-i;j++){
                if(arr[j]>=arr[j+1]){
                     int temp=arr[j];
                    arr[j]=arr[j+1];
                    arr[j+1]= temp;   //bubble sort  starts from here..
                    flag=false;    //aray is not sorted....
                }          
            }
            if(flag==true){
                System.out.println("array is sorted");
                break;
            } 
        }
       for(int ele:arr){
        System.out.print(ele + " ");
       }
    }
}



