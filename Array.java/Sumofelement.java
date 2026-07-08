import java.util.Scanner;

public class Sumofelement {
    public static void main(String[]args){
        Scanner sc = new Scanner(System.in);
        System.out.print("enter the size: ");
        int n= sc.nextInt();
        int sum = 0;
        int []arr= new int[n]; //input...
           //intialize values...
        for(int i=0;i<arr.length;i++){
            arr [i] =sc.nextInt();
        }
        // print sum...
        for(int i=0;i<arr.length;i++){
            sum += arr[i];
        }
        System.out.print(sum);
    }
}
