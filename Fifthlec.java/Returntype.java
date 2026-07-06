public class Returntype{
       public static int shravan(){          //if we wrote void instead of int then we cannot return anything in the function... 
        System.out.println("banu");
        System.out.println("agni");
        return 2;  //return k baad kuch bhi likh skte h(2,4.0) kuch bhi..
       }
       public static void main(String[]args){
        shravan();  //stand alone function call...   
        System.out.println(shravan());
        System.out.println(shravan()+3);
       }
}
