#include "base.h"

int main() {
init(8192, 0, 8192);

push(iconst(1));
pop(r2); 
debug_reg(r2);

push(iconst(1));
push(iconst(2));
pop(r1); 
pop(r2); 
iadd(r1,r2,r1); 
push(r1); 

pop(r1); 
debug_reg(r1);

push(iconst(1));
push(iconst(2));
pop(r1); 
pop(r2); 
iadd(r1,r2,r1); 
push(r1); 

push(iconst(3));
pop(r1); 
iadd(r1,r2,r1); 
push(r1); 

pop(r1); 
debug_reg(r1);

push(iconst(2));
push(iconst(3));
pop(r1); 
pop(r2); 
imul(r1,r2,r1); 
push(r1); 

push(iconst(1));
pop(r1); 
iadd(r1,r2,r1); 
push(r1); 

pop(r1); 
debug_reg(r1);

push(iconst(1));
push(iconst(2));
pop(r1); 
pop(r2); 
iadd(r1,r2,r1); 
push(r1); 

push(iconst(3));
pop(r1); 
imul(r1,r2,r1); 
push(r1); 

pop(r1); 
debug_reg(r1);

push(iconst(1));
push(iconst(2));
pop(r1); 
pop(r2); 
imul(r1,r2,r1); 
push(r1); 

push(iconst(3));
pop(r1); 
iadd(r1,r2,r1); 
push(r1); 

pop(r1); 
debug_reg(r1);

push(iconst(2));
push(iconst(3));
pop(r1); 
pop(r2); 
imul(r1,r2,r1); 
push(r1); 

push(iconst(1));
pop(r1); 
iadd(r1,r2,r1); 
push(r1); 

push(iconst(4));
pop(r1); 
iadd(r1,r2,r1); 
push(r1); 

pop(r1); 
debug_reg(r1);


return 0;
}