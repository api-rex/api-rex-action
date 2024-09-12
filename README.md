# Usage

1. Create a document on [API-Rex](api-rex.com)
2. Add workflow file under `.github/workflows/API-Rex.yml`
3. On every pull request merged, new descriptions will be generated for fields that were modified, added and fields that were deleted will be removed

Add this workflow file under `.github/workflows/API-Rex.yml`
```
name: Update Documentation
on:
  push:
    branches:
      - main
jobs:
  update-doc:
    name: Update API-Rex Documentation
    runs-on: ubuntu-latest
    steps:
      - run: echo "The job was triggered by ${{ github.event_name }} event."
      - name: Checkout
        uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "18"              
      - name: API-Rex API Documentation Action      
        uses: api-rex/api-rex-action@v1.0.3
        with:
          FILE_PATH: doc/api-spec.yml
          SECRET_API_KEY: ${{secrets.API_REX_ACCOUNT_SECRET}}
          PROJECT_UID: <project_uid>
          IMPORT_METHOD: overwrite
          AUTO_PUBLISH: true
```

# Inputs
- `FILE_PATH` (required): The path to your API spec file. Modify this and the documentaitno will be updated immediately
- `SECRET_API_KEY` (required): The API Key found on [api-rex.com/settings](api-rex.com/settings)
- `PROJECT_UID` (required): The `project_uid` is found  `https://api-rex.com/editor/<project_uid>` when you are editing your document
- `IMPORT_METHOD` (required): Currently we support overwrite, which means that each time you add, modify fields, regardless of what is in your description, we will generate a new description and update the documentation.
- `AUTO_PUBLISH` (optional): auto_publish is enabled to true, and cannot be set to false for now
