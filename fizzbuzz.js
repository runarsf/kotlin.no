var str="",x,y,a;
for (a=1;a<=100;a++)
{
    x = a%3 ==0;
    y = a%5 ==0;
    if(x)
    {
        str+="fizz"
    }
    if (y)
    {
        str+="buzz"
    }
    if (!(x||y))
    {
        str+=a;
    }
    str+="\n"
}
console.log(str);