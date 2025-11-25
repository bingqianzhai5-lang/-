<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Plant Guard - Drone Operation System

A drone operation system dashboard for monitoring and controlling drone operations with real-time telemetry, flight data, and live feed visualization.

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deploy to GitHub Pages

### Option 1: Using GitHub Actions (Recommended)

1. **Fork this repository** to your GitHub account
2. **Enable GitHub Pages** in your repository settings:
   - Go to Settings → Pages
   - Under "Build and deployment", select "GitHub Actions" as the source
3. **Push to the main/master branch**
   - The GitHub Actions workflow will automatically build and deploy your site
   - After deployment, your site will be available at `https://[username].github.io/plant-guard-dos/`

### Option 2: Manual Deployment

1. **Install dependencies**:
   `npm install`
2. **Install gh-pages**:
   `npm install --save-dev gh-pages`
3. **Deploy**:
   `npm run deploy`
4. **Configure GitHub Pages**:
   - Go to Settings → Pages
   - Select "gh-pages branch" as the source
   - Click "Save"

## Configuration

The project is configured to work with GitHub Pages by default:
- Base path is set to `/plant-guard-dos/` in vite.config.ts
- All resource references use relative paths
- GitHub Actions workflow is set up for automated deployment

## Project Structure

- `App.tsx`: Main application component
- `components/`: UI components
- `types.ts`: TypeScript type definitions
- `vite.config.ts`: Vite build configuration
