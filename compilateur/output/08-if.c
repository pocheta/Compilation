#include "base.h"

int main() {
init(8192, 0, 8192);

push(iconst(10));
pop(globals[0]);

push(globals[0]);
push(iconst(0));
pop(r1); 
pop(r2); 
ieq(r1,r2,r1); 
lneg(r1,r1); 
push(r1); 


pop(r1); 
lneg(r1,r1);
if(asbool(r1)) goto else1;

push(globals[0]);
push(iconst(1));
pop(r1);
pop(r2);
iadd(r1, r2, r1);
push(r1);
pop(globals[0]);
push(globals[0]);
pop(r1); 
debug_reg(r1);
goto endif1;
else1:
endif1:

push(globals[0]);
push(iconst(2));
pop(r1); 
pop(r2); 
ieq(r1,r2,r1); 
push(r1); 


pop(r1); 
lneg(r1,r1);
if(asbool(r1)) goto else2;

push(globals[0]);
push(iconst(2));
pop(r1); 
pop(r2); 
isub(r1,r2,r1);
push(r1); 
pop(globals[0]);
push(globals[0]);
pop(r1); 
debug_reg(r1);
goto endif2;
else2:
push(globals[0]);
push(iconst(1));pop(r1);
pop(r2);
isub(r1, r2, r1);
push(r1);
pop(globals[0]);
push(globals[0]);
pop(r1); 
debug_reg(r1);
endif2:


return 0;
}