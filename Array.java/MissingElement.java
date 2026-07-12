public class MissingElement {
    public static void main(String[]args){
        int []arr={1,2,3,4,5,6,8};
        int N=arr.length + 1;  //1 to n numbers.. by this we find actual sum..
        int actualsum= N*(N+1)/2;  
        int sum=0;
        for(int i=0;i<arr.length;i++){
            sum+=arr[i];
        }
        int missingelement=actualsum - sum;
        System.out.println("missing element :"+ missingelement);
    }
}
