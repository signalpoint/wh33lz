/**
 * Implements hook_menu().
 */
function wh33lz_menu() {
  try {
    var items = {};
    items['welcome'] = {
      title: 'Welcome',
      page_callback: 'wh33lz_welcome_page'
    };
    items['dealerships'] = {
      title: 'Dealerships',
      page_callback: 'wh33lz_dealerships_page'
    }
    items['screens'] = {
      title: 'Screens',
      page_callback: 'wh33lz_screens_page'
    }
    return items;
  }
  catch (error) { console.log('wh33lz_menu - ' + error); }
}

/**
 *
 */
function wh33lz_welcome_page() {
  try {
    var content = {};
    if (Drupal.user.uid == 0) {
      content.welcome = {
        markup: '<p>Please login to get started!</p>'
      };
    }
    else {
      content.dealerships = {
        theme: 'button_link',
        text: 'Dealerships',
        path: 'dealerships'
      };
      content.screens = {
        theme: 'button_link',
        text: 'Screens',
        path: 'screens'
      };
    }
    return content;
  }
  catch (error) { console.log('wh33lz_welcome_page - ' + error); }
}


function wh33lz_dealerships_page() {
  try {
    var content = {};
    content['dealerships_listing'] = {
      theme: 'view',
      format: 'ul',
      path: 'drupalgap/dealerships', /* the path to the view in Drupal */
      row_callback: 'wh33lz_dealerships_page_row',
      empty_callback: 'wh33lz_dealerships_page_empty',
      attributes: {
        id: 'dealerships_listing_view'
      }
    };
    return content;
  }
  catch (error) { console.log('wh33lz_dealerships_page - ' + error); }
}

/**
 * The row callback to render a single row.
 */
function wh33lz_dealerships_page_row(view, row) {
  return l(row.title, 'node/' + row.nid);
}

/**
 *
 */
function wh33lz_dealerships_page_empty(view) {
  return 'Sorry, no dealerships were found.';
}

function wh33lz_screens_page() {
  try {
    var content = {};
    content['screens_listing'] = {
      theme: 'view',
      format: 'ul',
      path: 'drupalgap/screens', /* the path to the view in Drupal */
      row_callback: 'wh33lz_screens_page_row',
      empty_callback: 'wh33lz_screens_page_empty',
      attributes: {
        id: 'screens_listing_view'
      }
    };
    return content;
  }
  catch (error) { console.log('wh33lz_screens_page - ' + error); }
}

/**
 * The row callback to render a single row.
 */
function wh33lz_screens_page_row(view, row) {
  return l(row.title, 'node/' + row.nid);
}

/**
 *
 */
function wh33lz_screens_page_empty(view) {
  return 'Sorry, no screens were found.';
}
