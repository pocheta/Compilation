#include "base.h"

int main() {
init(8192, 0, 8192);

push(iconst(1));
pop(globals[0]);

goto functend_calcul;

funct_calcul:
push(iconst(2));
push(iconst(3));
push(iconst(32));
push(bp[4]);
pop(r1); 
pop(r2); 
imul(r1,r2,r1); 
push(r1); 

push(iconst(16));
push(bp[3]);
pop(r1); 
pop(r2); 
imul(r1,r2,r1); 
push(r1); 

push(iconst(8));
push(bp[-2]);
pop(r1); 
pop(r2); 
imul(r1,r2,r1); 
push(r1); 

push(iconst(4));
push(bp[-1]);
pop(r1); 
pop(r2); 
imul(r1,r2,r1); 
push(r1); 

push(iconst(2));
push(globals[0]);
pop(r1); 
pop(r2); 
imul(r1,r2,r1); 
push(r1); 

iadd(r1,r2,r1); 
push(r1); 

iadd(r1,r2,r1); 
push(r1); 

iadd(r1,r2,r1); 
push(r1); 

iadd(r1,r2,r1); 
push(r1); 

pop(r1);
drop(2);
ret(r1);
assert(0);

functend_calcul:

push(iconst(5));
push(iconst(4));
call(funct_calcul);
pop(r1); 
drop(2);
debug_reg(r1);


return 0;
}