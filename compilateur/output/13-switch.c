#include "base.h"

int main() {
init(8192, 0, 8192);

goto functend_testSwitch;

function_testSwitch:

push(iconst(123));
pop(globals[0]);

goto functend_neg;

function_neg:

goto functend_testSwitchEvil;

function_testSwitchEvil:


// Ici ce trouve un print : le debug_reg fait office de print
push(undefined);
pop(r1); 
debug_reg(r1);

// Ici ce trouve un print : le debug_reg fait office de print
push(undefined);
pop(r1); 
debug_reg(r1);

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