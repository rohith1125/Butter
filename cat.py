import os,atexit as a
p=print
a.register(p,"Hello World!")
def print(_):
 p(input())
 os._exit(0)
s='s=%r;print(s%%s)';print(s%s)
