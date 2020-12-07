----------------- GIT and GitHub-------------------------
Install git window
Install gitbush

1.) git init inside my project directory
    git status to show current status
2.) git add . for all files at the first time
    git add 'file name path1' 'file name path2' for other times
    git reset 'file name path1' 'file name path2' 
3.) git commit -m 'my comment'
              
                                  GitHub
4.) Create "New reoisitory" in gitHub and then (These lines you can also be seen in GitHub): 
        a.) git remote add origin https://github.com/gitiklar/youre repository name.git
        b.) git branch -M main
        c.) git push -u origin main



git log to see all commits
git diff to show the differences beetween versions
ls -a .git to see .git files

git cat-file commit 'dscae...'
git cat-file blob 'dscae...'
git ls-tree 'abcfeg...'

git checkout <version>
git checkout <branch>

git branch 'name' - create new branch 
git checkout -b 'bigChanges'    ===    git branch 'bigChanges'   &&&    git checkout  'bigChanges'
git branch - show all brench and what is my now
git merge master

------------------------------------- heroku -------------------------------------

1.) Click "New" -> "Create new app" -> "Create app"
2.) In Deploy tab click "GitHub" search your repository name and click "Connect"
3.) click "Enable Automatic Deploys"

Now, after you will do the next push to your repository it will be updated automatic here in heroku.
You can see in Activity tab.
In Activity tab you can click "Open app" to see the app in browther and this is the url.





