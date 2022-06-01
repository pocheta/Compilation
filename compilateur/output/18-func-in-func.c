#include "base.h"

int main() {
init(8192, 0, 8192);

push(iconst(2));
pop(globals[0]);

goto functend_toto;

function_toto:
push(undefined);
pop(r1); 
iadd(r1,r2,r1);
push(r1); 
pop(undefined);
push(undefined);


// Ici ce trouve un print : le debug_reg fait office de print
push(undefined);
pop(r1); 
debug_reg(r1);


return 0;
}