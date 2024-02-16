# COMMANDS IN BASH

Typical inline commands in Bash.

## pwd
Print working directory 
(displays path to current directory (folder))  
```sh
$ pwd

/Users/pc
```

## ls
List file folder (prints a list of all files inside our directory)  
```sh
$ ls

Desktop
Documents
workspace
```

## ls -l
List file folder with details (prints a list of all visible files with attributes such as drwx)  
```sh
$ ls -l

drwxr-xr-x  4 pc staff  128  5 feb 16:42 helloworld
drwxr-xr-x  4 pc  staff  128  5 feb 13:42 isdi-bootcamp-202402
```
Explanation to `drwx`:  
-d: directory  
-r: readable  
-w: write  
-x: execute

## ls -a
List of hidden files folder (prints a list of HIDDEN files in the directory)

## mkdir
Make directory (creates a directory inside)
```sh
$ mkdir "folder-name"
```

## cd
Change directory (changes current working directory to the one provided)
```sh
$ cd "directory-name"
```

# mv
Move (changes name of a directory (in bash: moves a name to another))
```sh
$ mv document1.js files1/document1.js
```
Moves document1.js to files1 folder

## touch
Creates an empty file inside working directory

## code 
Open VScode with that directory
```sh
$ code "file-name or folder-name"
```

## cl
Clears the terminal
```sh
$ cl
```

## kill -9 <pid>    
Kills a process by its id
```sh
$ kill -9 "num-task"
```

## tree 
Show file folders structure in a tree mode
```sh
$ tree workspace

```

## rm
Remove an empty folder
```sh
$ rm "folder-name"
```

## rm -rf (route)
Remove folder and all its content (delete a whole directory)
```sh
$ rm -rf "folder-name"
```

## open
Open finder
```sh
$ open .
```

## top
Look at the processes that are working
```sh
$ top
```