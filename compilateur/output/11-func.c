#include "base.h"

int main() {
init(8192, 0, 8192);

push(iconst(10));
pop(globals[0]);

goto functend_blob;

function_blob:
push(globals[0]);
push(globals[0]);
push(undefined);
pop(r1); 
pop(r2); 
pop(r3); 
iadd(r1,r2,r1); 
push(r1); 

pop(r1); 
push(r1); 
pop(globals[0]);
push(globals[0]);


// Ici ce trouve un print : le debug_reg fait office de print
push(undefined);
pop(r1); 
debug_reg(r1);

// Ici ce trouve un print : le debug_reg fait office de print
push(undefined);
pop(r1); 
debug_reg(r1);


return 0;
}