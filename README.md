# GraceAI Chat Widget (Vue 3)

# Project Directory Structure

This section describes the folder structure and purpose of each directory and key files in the project.

```
project-root/
├── .yarn/                     # Yarn package management directory
├── demo                       # Html files n main.js
├── dist/                      # Production build output
├── node_modules/              # Installed dependencies
│
├── src/                       # Main source code directory
│   ├── assets/                # Static assets (images, icons, styles)
│   ├── components/            # Reusable Vue components (UI, widgets, layouts)
|   │   ├── Board/             # Includes -> Action.vue, Content.vue, Header.vue                   
|   │   ├── MessageBubble/     # Inlcudes -> ButtonOptions.vue, Main.vue, Single.vue, Typing        
|   │   ├── Outer/             # Includes -> AppStyle.vue, BotUi.vue, Homesection.vue
|   │   ├── AppStyle.vue                 
|   │   ├── HomePage.vue    
|   |   ├── BotUI.vue          
|   │   └── RegistrationForm.vue
|   |
│   ├── config/                # Configuration files (API endpoints, environment variables)
│   ├── helpers/               # Utility and helper functions
│   ├── App.vue                # Root Vue component
│   ├── main.js                # Main entry point that initializes the Vue app
│   └── vue-bot-ui.js          # Bot UI integration entry script
│
├── tests/
│   └── unit/                  # Unit tests for components and logic
│
├── .editorconfig              # Editor configuration for consistent coding styles
├── .env                       # Environment variables for local development
├── .example.env               # Example environment variable file
├── .eslintrc.js               # ESLint configuration for code linting
├── .gitignore                 # Git ignored files and folders
├── .yarnrc.yml                # Yarn configuration file
│
├── babel.config.js            # Babel transpiler configuration
├── changelog.md               # Project changelog (version history)
├── commitlint.config.js       # Commit message linting configuration
├── jest.config.js             # Jest testing configuration
│
├── LICENSE                    # License for the project
├── package.json               # Project metadata and dependencies
├── package-lock.json          # NPM lock file (for deterministic builds)
├── README.md                  # Project overview, setup, and usage guide
├── vue.config.js              # Vue CLI configuration
└── yarn.lock                  # Yarn lock file (dependency versions)
```



## Quick start

```bash
yarn
yarn serve
# open http://localhost:5173
```

## Build

```bash
yarn build
```

### Config
Set `VUE_APP_API_BASE` in `.env`.

### Embed (as a widget)
Serve `dist/` and include `vue-bot-ui.js` in your host page.
