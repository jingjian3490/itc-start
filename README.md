# ITC Drupal Candidate Assignment – Implementation

This repository contains my implementation of the ITC Drupal technical assignment.
The project reproduces the required page layout using Drupal 10, a custom Vite + TailwindCSS theme, and fully editable, structured content managed through the Drupal administration interface.

A live demo is also provided for quick visual review.

---

# 1. Live Demo

For reviewer convenience:
Live Preview: https://itc.itnowdo.com/

---

# 2. Features Implemented

- Desktop layout replication
- Editable sections: Hero, Pillars, Highlight, Core Values, Carousel
- Add / edit / delete / reorder page sections in the admin interface
- Multilingual support (EN + Simplified Chinese)
- Custom Drupal theme: Twig + Vite + TailwindCSS
- Demo database + required media files included
- Reproducible installation (DDEV or standard PHP environment)

---

# 3. Installation – DDEV (Recommended)

## 3.1 Start DDEV
```
git clone https://github.com/jingjian3490/itc-start.git
cd itc-start
ddev start
````

## 3.2 Install PHP dependencies
```
ddev composer install
```

## 3.3 Import demo database
```
ddev import-db --src=demo/demo.sql
```

## 3.4 Copy required media files
```
cp demo/files/* -r web/sites/default/files/
```

## 3.5 Build theme assets
```
ddev ssh
cd web/themes/custom/itc_theme
npm install
npm run build
exit
```

## 3.6 Clear cache
```
ddev drush cr
```

## 3.7 Launch site
```
ddev launch
```

## 3.8 Admin login
```
ddev drush uli
```

# 4. Installation – Without DDEV

### Prerequisites
- PHP 8.1+
- Composer 2.x
- MySQL / MariaDB
- Node.js 18+
- npm / yarn / pnpm

### Steps
```
git clone https://github.com/jingjian3490/itc-start.git
cd itc-start
composer install
```

Import SQL:
```
mysql -u root -p < demo/demo.sql
```

Copy media:
```
cp demo/files/* -r web/sites/default/files/
```

Build frontend assets:
```
cd web/themes/custom/itc_theme
npm install npm run build
```

# 5. Demo Database

The file:
```
demo/demo.sql
```

Contains only:
- Assignment-specific content
- Section + Media references
- One admin account

It ensures the page displays exactly as intended.

# 6. Media Files

Since the site uses **Drupal Media entities**, the corresponding image files must exist on disk.

Only the required images for the demo page are included under:
```
demo/files/
```

After installation, copy them into:
```
web/sites/default/files/
```

Example:
```
cp demo/files/* -r web/sites/default/files/
```
