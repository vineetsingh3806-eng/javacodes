import java.util.Scanner;
  public class Printtable {
    public static void main(String[]args){
        Scanner sc = new Scanner(System.in);

       /*  for(int i=1;i<=10;i++){
          System.out.println(i*17);
        }
    }         
} */
           //one more method...

           /* for(int i=17; i<=170; i=i+17){
            System.out.println(i);
           }
          }
        } */

        //take user input and print that table...
        System.out.print("enter number:");
        int i = sc.nextInt();
        for(int n=1; n<=10; n++ ){
          System.out.println(i*n);
        }
      }
    }