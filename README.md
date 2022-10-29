# svstudio-scripts-dev
this is the source repo that is built into the contents of my main svstudio-scripts repo (https://github.com/claire-west/svstudio-scripts).

## why?
having a dev/build repo allow users to download individual scripts in their finished, self-contained form from the main repo, while reserving all development tools and grunt files to remain in this repository. this has a few main benefits:
- dependencies can be managed within this repository and packaged inside each script, meaning the end user only needs one file
- lay users do not need to handle any files beyond the actual scripts they intend to use
- users don't have to download the release package in order to get the final/"compiled" script, they can just download the specific scripts they need
