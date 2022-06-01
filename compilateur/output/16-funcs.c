#include "base.h"

int main() {
init(8192, 0, 8192);

push(iconst(10));
pop(globals[0]);

goto functend_externe;

function_externe:



// Ici ce trouve un print : le debug_reg fait office de print
push(undefined);
pop(r1); 
debug_reg(r1);


return 0;
}