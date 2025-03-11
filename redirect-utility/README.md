# Redirect utility for persisting UTMs

## Overview

In Webflow Optimize, redirect experiences are often used for full page redesigns or significant changes to flows or landing pages. A common request is to persist UTMs (or other URL parameters) when redirecting users to a new URL. While Webflow Optimize doesn't support this feature out of the box, we have a simple and effective solution to ensure these parameters are preserved during redirects.

## How to use

1. In the Webflow Optimize dashboard, navigate to Account Settings.
2. Add the [redirect-utility.js](/redirect-utility/redirect-utility.js) script (included in this repository) to your Global JavaScript.
   1. This utility preserves UTMs and other URL parameters during redirects.
3. When creating a redirect experience, select **Redirect code editor (Advanced)** and use the following code, replacing the URL with your destination page:

```
window.wfTools.redirectTo('https://www.your-site.com/new-page');
```
