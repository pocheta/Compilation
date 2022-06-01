#include "base.h"

int main() {
init(8192, 0, 8192);

push(iconst(0));
pop(globals[0]);

push(globals[0]);
push(iconst(1));
pop(r1);
pop(r2);
iadd(r1, r2, r1);
push(r1);
pop(globals[0]);
push(globals[0]);
push(globals[0]);
push(iconst(1));
pop(r1);
pop(r2);
iadd(r1, r2, r1);
push(r1);
pop(globals[0]);
push(globals[0]);
iadd(r1,r2,r1); 
push(r1); 

pop(r1); 
debug_reg(r1);

push(iconst(0));
pop(globals[1]);

push(globals[1]);
push(iconst(1));
pop(r1);
pop(r2);
iadd(r1, r2, r1);
push(r1);
pop(globals[1]);
push(globals[1]);
push(globals[1]);
push(iconst(1));
pop(r1);
pop(r2);
iadd(r1, r2, r1);
push(r1);
pop(globals[1]);
push(globals[1]);
iadd(r1,r2,r1); 
push(r1); 

pop(r1); 
debug_reg(r1);


return 0;
}