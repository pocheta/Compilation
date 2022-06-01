CC = gcc
CFLAGS = -Wall -Wextra -g

all: 01-expressions 02-declarations 03-while 04-if-while 05-fors 06-while-break 07-expressions-vicieuses 08-if glob-loc-arg 

01-expressions: base.o 01-expressions.o 
	$(CC) $(CFLAGS) -o $@ $^

02-declarations: base.o 02-declarations.o 
	$(CC) $(CFLAGS) -o $@ $^

03-while: base.o 03-while.o 
	$(CC) $(CFLAGS) -o $@ $^

04-if-while: base.o 04-if-while.o 
	$(CC) $(CFLAGS) -o $@ $^

05-fors: base.o 05-fors.o
	$(CC) $(CFLAGS) -o $@ $^

06-while-break: base.o 06-while-break.o
	$(CC) $(CFLAGS) -o $@ $^

07-expressions-vicieuses: base.o 07-expressions-vicieuses.o
	$(CC) $(CFLAGS) -o $@ $^

08-if: base.o 08-if.o 
	$(CC) $(CFLAGS) -o $@ $^

glob-loc-arg: base.o glob-loc-arg.o 
	$(CC) $(CFLAGS) -o $@ $^

%.o: %.c
	$(CC) $(CFLAGS) -c $<

base.o: hacks.h base.h
glob-loc-arg.o: hacks.h base.h
01-expressions.o: hacks.h base.h
02-declarations.o: hacks.h base.h
03-while.o: hacks.h base.h
04-if-while.o: hacks.h base.h
05-fors.o: hacks.h base.h
06-while-break.o: hacks.h base.h
07-expressions-vicieuses.o: hacks.h base.h
08-if.o: hacks.h base.h

.PHONY: all

clean:
	rm -f *.o *.exe
