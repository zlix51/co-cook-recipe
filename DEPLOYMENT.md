# GitHub Pages Deployment Guide

This project is configured for automatic deployment to GitHub Pages.

## Setup Instructions

### 1. Configure GitHub Repository Settings

1. Go to your GitHub repository: `https://github.com/lizhiyuan/co-cook-recipe`
2. Click **Settings** → **Pages**
3. Under "Build and deployment":
   - **Source**: Select "GitHub Actions"
   - **Branch**: Should automatically detect `main`
4. Click **Save**

### 2. Automated Deployment

The repository includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that:
- Automatically triggers on every push to the `main` branch
- Installs dependencies
- Builds the project with Vite
- Deploys the built files to GitHub Pages

### 3. Access Your Site

Once deployed, your site will be available at:
```
https://lizhiyuan.github.io/co-cook-recipe/
```

## Key Configuration Files

- **`vite.config.ts`**: Contains `base: '/co-cook-recipe/'` to ensure assets load correctly on GitHub Pages
- **`package.json`**: Contains `"homepage"` field pointing to the GitHub Pages URL
- **`.github/workflows/deploy.yml`**: GitHub Actions workflow for automatic deployment

## Manual Deployment (Alternative)

If you prefer to deploy manually:

```bash
# Install dependencies (if not already done)
npm install

# Build the project
npm run build

# The 'build' folder is generated and ready for deployment
```

## Troubleshooting

### Issue: Assets not loading correctly
- Verify that `vite.config.ts` has `base: '/co-cook-recipe/'` set correctly
- Check that the repository name matches (should be lowercase)

### Issue: GitHub Actions workflow not running
- Ensure you have write permissions to the repository
- Check that the workflow file is in `.github/workflows/deploy.yml`
- Verify the workflow file has the correct syntax

### Issue: Deployment failed
- Check the GitHub Actions tab in your repository for error logs
- Verify that `npm run build` works locally
- Ensure the `build` folder is being created correctly

## More Information

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
