# Generating package-lock.json

Your GitHub Pages deployment workflow now expects a `package-lock.json` file for optimal CI/CD performance and reproducible builds.

## How to Generate It

### On a machine with Node.js installed:

1. Navigate to your repository root:
   ```bash
   cd /path/to/co-cook-recipe
   ```

2. Run npm install to generate the lockfile:
   ```bash
   npm install
   ```

3. Commit and push the generated file:
   ```bash
   git add package-lock.json
   git commit -m "Add package-lock.json for reproducible CI/CD builds"
   git push origin main
   ```

### Why This Matters

- **Reproducibility**: Ensures CI/CD environments install the exact same versions as your development machine
- **Security**: Locks dependencies to known-good versions
- **Performance**: GitHub Actions can cache dependencies based on the lockfile hash
- **Reliability**: Prevents "works on my machine" issues in production

## Current Status

Your workflow (`.github/workflows/deploy.yml`) is configured to:
- Use `npm ci` (clean install) for consistent, reproducible builds
- Cache dependencies when `package-lock.json` is present
- Fall back gracefully if the lockfile is missing (though not recommended)

## Once You Add package-lock.json

After committing `package-lock.json`:
- ✅ GitHub Actions will use dependency caching automatically
- ✅ Each run will be faster (~30-60% speedup depending on dependencies)
- ✅ Builds become fully reproducible

## Troubleshooting

If you can't generate the lockfile locally:
1. The workflow will still work without it (slower, but functional)
2. You can generate it in a GitHub Actions workflow if needed
3. Consider using a Docker container with Node.js pre-installed

## Related Files

- `.github/workflows/deploy.yml` - Updated to use `npm ci` with caching
- `package.json` - Your project dependencies
