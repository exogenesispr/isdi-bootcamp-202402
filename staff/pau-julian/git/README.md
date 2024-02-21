# Git commands

### git log: 
Shows a history of commits in the repository
```sh
$ git log
commit 6d67838fd672afeb2610e98ef20fe26abcd09d46
Author: Estel <estel@MacBook-Air-de-Estel.local>
Date:   Wed Feb 14 12:53:08 2024 +0100
    add my folder #225
```
### git status:  
displays the current status of the repository
```sh
$ git status
estel@MacBook-Air-de-Estel git % git status
On branch feature/git
Untracked files:
  (use "git add <file>..." to include in what will be committed)
        ../../../.DS_Store
        ../../.DS_Store
        ./

nothing added to commit but untracked files present (use "git add" to track)
```

### git branch: 
manages branches in the repository
```sh
$ git branch
estel@MacBook-Air-de-Estel git % git branch
  develop
  feature/arrays
  feature/bash
  feature/complex-structure
* feature/git
  feature/playground
  feature/space-invaders
  feature/strings
  main
estel@MacBook-Air-de-Estel git % 
```
### git checkout: 
switch between branches or restore files from different commits
```sh
$ git checkout 
estel@MacBook-Air-de-Estel git % git checkout feature/bash
Switched to branch 'feature/bash'
```
### git checkout + "branch name": 
instructing Git to switch to that branch
```sh
$ git checkout feature/playground estel@MacBook-Air-de-Estel git % git checkout feature/playground
Switched to branch 'feature/playground'
```

### touch +  path + filename : 
creates an empty file in the directory path
```sh
$ touch
touch staff/estel-mora/.gitkeep
creates a file named "gitkeep" in staff/estel-mora's directory
```
### git add + path: 
to add changes for committing
```
$ git add 
git add staff/estel-mora/playground
```
### git commit -m : 
commit changes with a message 
```sh
$ git commit -m 'add changes in playground #issue number '
```
### git push: 
upload local repository changes to a remote repository
```sh
$ git push
$ estel@MacBook-Air-de-Estel git % git push
```
### git push -u:  
set up tracking between the local branch and the remote; happens the first time you push a branch to a remote repository
```sh
$ git push -u
```
### git push -f: 
forcefully pushes local commits to the remote repository overwriting
```sh
$ git push -f
```
### git log --all --decorate --oneline --graph: 
displays a compact, decorated, one-line representation of the commit history for all branches
```sh
$ git log --all --decorate --oneline --graph 
```
### git branch -D  + directory path: 
forcefully delete a branch, even if it has unmerged changes
```sh
$ git branch -D
git branch -D playground
```
### git commit --amend: 
modify the last commit in your repository
```sh
$ git  commit --amend
```

### git reset: 
move the current branch's HEAD to a different commit or to unstage changes
```sh
$ git reset
git reset "code number provided by the terminal"
```
### git show: 
displays commit changes & information
```sh
$ git show
```