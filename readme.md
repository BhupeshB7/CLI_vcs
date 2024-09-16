# VCS CLI

This is a basic command-line tool for version control, similar to Git. It helps you keep track of changes to your files. You can add files, commit changes, and see your commit history. You can also ignore files using a .vcsIgnore file.

## Features

- **Initialize Repository**: Create a new VCS repository.
- **Add Files**: Add files to the staging area so they’re ready to be committed.
- **Commit Changes**: Save the staged files with a message explaining the changes.
- **View History**: See a list of all commits.

## Installation
  
1. **Clone the Repository**:

```
git clone <repository-url>
```

2. Navigate to the Project Directory

```
 cd <project-directory>
```

# Commands

1. Initialize Repository

- Initialize a new VCS repository in your current directory.

```
node vcs.js init
```

2. Add Files

   - Add all files in the current directory to the staging area:

     ```
     node vcs.js add .
     ```

   - Add a specific file to the staging area:
     ```
     node vcs.js add <filename>
     ```

3. Commit Changes
   Commit the staged files with a commit message:

   ```
   node vcs.js commit "<commit message>"
   ```

4. View Commit History
   Display a list of all commits:
   ```
   node vcs.js history
   ```
