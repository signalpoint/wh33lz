window.localStorage.clear();

/* Specify DrupalGap Mobile Application Settings Here */

/****************************************|
 * Drupal Settings (provided by jDrupal) |
 ****************************************/
 
/* Drupal Paths */
 
// Site Path (do not use a trailing slash)
Drupal.settings.site_path = 'http://vision.tylerfrankenstein.com'; // e.g. http://www.example.com

// Default Services Endpoint Path
Drupal.settings.endpoint = 'drupalgap';

// Public Files Directory Path
Drupal.settings.file_public_path = 'sites/default/files';

// The Default Language Code
Drupal.settings.language_default = 'und';

/* Drupal Caching */

// Set to true to enable local storage caching.
Drupal.settings.cache.entity.enabled = false;
Drupal.settings.cache.views.enabled = false;

// Number of seconds before cached copy expires. Set to 0 to cache forever, set
// to 60 for one minute, etc.
Drupal.settings.cache.entity.expiration = 3600;
Drupal.settings.cache.views.expiration = 3600;


/*********************|
 * DrupalGap Settings |
 *********************/

/*************|
 * Appearance |
 *************/

// App Title
drupalgap.settings.title = 'DrupalGap';
 
// App Front Page
//drupalgap.settings.front = 'welcome';
drupalgap.settings.front = 'node/3';
//drupalgap.settings.front = 'node/4';

// Theme
drupalgap.settings.theme = 'wh33lz_theme';

// Logo
drupalgap.settings.logo = 'themes/easystreet3/images/drupalgap.jpg';

// Loader Animations - http://demos.jquerymobile.com/1.4.0/loader/
drupalgap.settings.loader = {
  loading: {
    text: 'Loading...',
    textVisible: true,
    theme: 'b'
  },
  saving: {
    text: 'Saving...',
    textVisible: true,
    theme: 'b'
  },
  deleting: {
    text: 'Deleting...',
    textVisible: true,
    theme: 'b'
  }
};

/*****************************************|
 * Modules - http://drupalgap.org/node/74 |
 *****************************************/

/** Contributed Modules - www/app/modules **/

Drupal.modules.contrib['addressfield'] = {};
Drupal.modules.contrib['link'] = {};
Drupal.modules.contrib['services_menu'] = {};
Drupal.modules.contrib['og_menu'] = {};

/** Custom Modules - www/app/modules/custom **/

Drupal.modules.custom['wh33lz'] = {};

/***************************************|
 * Menus - http://drupalgap.org/node/85 |
 ***************************************/
drupalgap.settings.menus = {}; // Do not remove this line.

// User Menu Anonymous
drupalgap.settings.menus['user_menu_anonymous'] = {
  links:[
    {
      title: 'Login',
      path: 'user/login',
      options: {
        attributes: {
          'data-theme': 'b'
        }
      }
    },
    {
      title: 'Register',
      path: 'user/register',
      options: {
        attributes: {
          'data-theme': 'b'
        }
      }
    }
  ]
};

// User Menu Authenticated
drupalgap.settings.menus['user_menu_authenticated'] = {
  links:[
    {
      title: 'My Account',
      path: 'user',
      options: {
        attributes: {
          'data-theme': 'b'
        }
      }
    },
    {
      title: 'Logout',
      path: 'user/logout',
      options: {
        attributes: {
          'data-theme': 'b'
        }
      }
    }
  ]
};

// Main Menu
drupalgap.settings.menus['main_menu'] = {
  links:[ ]
};

/****************************************|
 * Blocks - http://drupalgap.org/node/83 |
 ****************************************/
drupalgap.settings.blocks = {}; // Do not remove this line.

// The wh33lz_theme blocks.
drupalgap.settings.blocks.wh33lz_theme = {
  header: {
    title: {}
  },
  navigation: {
    main_menu: {}
  },
  sidebar: {
    /*og_single_menu_block: { }*/
  },
  content: {
    main: {}
  },
  footer: {
    dummy: {}
  }
};

/****************************************************|
 * Region Menu Links - http://drupalgap.org/node/173 |
 ****************************************************/
drupalgap.settings.menus.regions = {}; // Do not remove this line.

// Header Region Links
drupalgap.settings.menus.regions['header'] = {
  links:[
    /* Home Button */
    {
      title:'Home',
      path:'',
      options:{
        attributes:{
          "data-icon":"home",
          "class":"ui-btn-left"
        }
      },
      pages:{
        value:[''],
        mode:"exclude"
      }
    },
    /* Back Button */
    {
      title:'Back',
      options:{
        attributes:{
          "data-icon":"back",
          "class":"ui-btn-right",
          "onclick":"javascript:drupalgap_back();"
        }
      },
      pages:{
        value:[''],
        mode:"exclude"
      }
    }
  ]
};

drupalgap.settings.menus.regions['footer'] = {  
  links:[
    {
      title: '&nbsp;',
      path: 'welcome',
      options: {"attributes":{"data-icon":"gear", "class":"ui-btn-right"}},
      pages: {
        value: ['screen/*'],
        mode: 'include'
      }
    }
  ]
};

/*********|
 * Camera |
 **********/
drupalgap.settings.camera = {
  quality: 50
};

/**************|
 * Development |
 **************/

// Debug
//   PhoneGap 3.0.0 and above note, you must install a plugin to see console
//   log messages. See the 'Debug console' section here:
//   http://docs.phonegap.com/en/edge/guide_cli_index.md.html#The%20Command-line%20Interface
Drupal.settings.debug = true; /* Set to true to see console.log debug
                                  information. Set to false when publishing
                                  app! */

/***********************|
 * Performance Settings |
 ***********************/
drupalgap.settings.cache = {}; // Do not remove this line.

// Theme Registry - Set to true to load the page.tpl.html contents from cache.
drupalgap.settings.cache.theme_registry = true;

