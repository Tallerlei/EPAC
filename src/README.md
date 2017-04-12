# Purpose of the application
The application is supposed to load a xml file from a server when the user pushes a button.
The xml file contains structural information that shall be displayed on screen.

# Third-party-modules
I included PrimeNG + font-awesome for multiple reasons e.g. configurable drag'n'drop, messages and context menu. It is very handy and can be configured and extended to your needs.
Furthermore it comes with some styling I use to implement a good look and feel.

# Load file
In app.component's variable 'dataUrl' the file which shall be loaded can be specified. A local file is in this project for general testing.

# Selecting and moving items
User can move between items using arrow keys. Arrow-left selects parent node while arrow-right goes down to first child node.
When holding control key while using arrow keys items can be moved.

# Copy/Cut/Paste
For power users there are common key combinations to copy, cut and paste items.
Ctrl + x => cut
Ctrl + c => copy
Ctrl + v => paste
At the moment items with same IDs are allowed.

# Showing ID
When right-clicking a node a context menu opens up and gives user the option to show ID of current node.

# Detail-view and editing node
With a double-click on a node it can be opened in detail-view. In there is a button which enables editing editable parts (e.g. label)

# Requirements
1. Single page application - CHECK
2. AngularJS + TypeScript - CHECK
3. Use a git repository - CHECK
4. Working software - CHECK
5. README file with instructions - CHECK
6. Include testing - CHECK
7. Keep it simple - In Progress
8. Load xml file from server - CHECK
9. A load button - CHECK
10. Display XML structure - CHECK
11. Allow user to move XML DOM items - CHECK
12. Somehow allow the user to see item id - CHECK
13. Level may not be moved - CHECK
14. Units may be moved to other Level but may not be children of other units or even activities - CHECK
14. Activities may be moved to other units but may not be children of other activities or direct children of level - CHECK
