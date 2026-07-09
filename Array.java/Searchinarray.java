import java.util.Scanner;
public class Searchinarray {
    public static void main(String[]args){
        Scanner sc = new Scanner(System.in); 
        System.out.print("enter search element: ");   
        int x=sc.nextInt();
        boolean flag=false;  //false means element is not present in array...
        int[]arr={1,2,3,4,5,7,1};
        for(int i=0;i<arr.length;i++){
            if(arr[i]==x){
              flag=true; //true means element is present in array...
             break;   //if element is present then break the loop...
            }  
        }   
        if(flag==true){
            System.out.print("element is present in array");
        }else{
            System.out.print("element is not present in array");
        }
    }
}
