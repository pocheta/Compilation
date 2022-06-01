#include "base.h"

int main() {
init(8192, 0, 8192);


push(globals[0]);
push(iconst(0));
pop(r1); 
pop(r2); 
push(r1); 
pop(globals[0]);
push(globals[0]);
for_start1:
push(globals[0]);
push(iconst(10));
pop(r1); 
pop(r2); 
ilt(r1, r2, r1);
push(r1); 


pop(r1); 
lneg(r1,r1);
if(asbool(r1)) goto for_end1;

push(globals[0]);
push(iconst(1));
pop(r1);
pop(r2);
iadd(r1, r2, r1);
push(r1);
pop(globals[0]);
push(globals[0]);
// Ici ce trouve un print : le debug_reg fait office de print
push(globals[0]);
pop(r1); 
debug_reg(r1);
goto for_start1;
for_end1:

for_start2:
push(globals[0]);
push(iconst(20));
pop(r1); 
pop(r2); 
ilt(r1, r2, r1);
push(r1); 


pop(r1); 
lneg(r1,r1);
if(asbool(r1)) goto for_end2;

push(globals[0]);
push(iconst(2));
pop(r1); 
pop(r2); 
iadd(r1,r2,r1);
push(r1); 
pop(globals[0]);
push(globals[0]);
// Ici ce trouve un print : le debug_reg fait office de print
push(globals[0]);
pop(r1); 
debug_reg(r1);
goto for_start2;
for_end2:


return 0;
}