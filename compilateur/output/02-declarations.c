#include "base.h"

int main() {
init(8192, 0, 8192);


push(iconst(2));
pop(globals[1]);

push(aconst("Hello, World!"));
pop(globals[2]);

push(iconst(1));
pop(globals[3]);


return 0;
}