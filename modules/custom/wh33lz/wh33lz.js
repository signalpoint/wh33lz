/**
 * Implements hook_install().
 */
function wh33lz_install() {
  try {
    var css_file_path = drupalgap_get_path('module', 'wh33lz') + '/wh33lz.css';
    drupalgap_add_css(css_file_path);
  }
  catch (error) {
    console.log('wh33lz_install - ' + error);
  }
}

/**
 * Implements hook_menu().
 */
function wh33lz_menu() {
  try {
    var items = {};
    items['welcome'] = {
      title: 'TrendX.tv',
      page_callback: 'wh33lz_welcome_page'
    };
    items['help'] = {
      title: 'Help',
      page_callback: 'wh33lz_help_page'
    };
    items['dealerships'] = {
      title: 'Dealerships',
      page_callback: 'wh33lz_dealerships_page'
    };
    items['screen/%'] = {
      title: 'Witt Lincoln - San Diego',
      page_callback: 'wh33lz_screen_page',
      pageshow: 'wh33lz_screen_pageshow',
      page_arguments: [1]
    };
    items['videos/%'] = {
      title: 'Videos',
      page_callback: 'wh33lz_videos_page',
      page_arguments: [1]
    }
    return items;
  }
  catch (error) { console.log('wh33lz_menu - ' + error); }
}

/**
 * BLOCKS
 */

/**
 * Implements hook_block_info().
 */
function wh33lz_block_info() {
  var blocks = {
    dealer: {
      delta: 'dealer',
      module: 'wh33lz'
    },
    dummy: {
      delta: 'dummy',
      module: 'wh33lz'
    }
  };
  return blocks;
}

/**
 * Implements hook_block_view().
 */
function wh33lz_block_view(delta) {
  var content = '';
  switch (delta) {
    case 'dealer':
      content = '<h2>Hi, ' + Drupal.user.name + '</h2>';
      break;
    case 'dummy':
      content = '&nbsp;';
      break;
  }
  return content;
}

/**
 * PAGES
 */
 
/**
 * The page callback to display the view.
 */
function wh33lz_videos_page(nid) {
  var content = {};
  content['wh33lz_videos'] = {
    theme: 'view',
    format: 'ul',
    path: 'drupalgap/videos/' + nid,
    row_callback: 'wh33lz_videos_page_row',
    empty_callback: 'wh33lz_videos_page_row_empty',
    attributes: {
      id: 'wh33lz_videos_view'
    }
  };
  return content;
}

/**
 * 
 */
function wh33lz_videos_page_row(view, row) {
  var image = {
    path: row.image
  };
  var image_html = theme('image', image);
  return l(image_html + '<h2>' + row.title + '</h2>', 'node/' + row.nid);
}

/**
 *
 */
function wh33lz_videos_page_row_empty(view) {
  return 'Sorry, no videos were found.';
}


/**
 *
 */
function wh33lz_welcome_page() {
  try {
    var content = {};
    if (Drupal.user.uid == 0) {
      content['login_button'] = {
        theme: 'button_link',
        text: 'Login',
        path: 'user/login',
        attributes: {
          'data-icon': 'cloud'
        }
      };
      content['help_button'] = {
        theme: 'button_link',
        text: 'Help',
        path: 'help',
        attributes: {
          'data-icon': 'info'
        }
      };
    }
    else {
      content['hello'] = {
        markup: '<p>Hi, <strong>' + Drupal.user.name + '</strong>.</p>'
      };
      content['screens'] = {
        theme: 'view',
        title: 'Manage Screens',
        format: 'ul',
        path: 'drupalgap/screens',
        row_callback: 'wh33lz_screens_row',
        empty_callback: 'wh33lz_screens_empty',
        attributes: {
          id: 'screens_listing_view'
        }
      };
    }
    return content;
  }
  catch (error) { console.log('wh33lz_welcome_page - ' + error); }
}

/**
 *
 */
function wh33lz_screens_row(view, row) {
  return l(
    '<h2>' + row.title + '</h2>' +
    '<p>' + theme('addressfield', row) + '</p>',
    'node/' + row.nid
  );
}

/**
 *
 */
function wh33lz_screens_empty(view) {
  return 'Sorry, no screens were found.';
}

/**
 *
 */
function wh33lz_help_page() {
  try {
    var content = {};
    content.topics = {
      markup: '<p>Help Topics...</p>'
    };
    return content;
  }
  catch (error) { console.log('wh33lz_help_page - ' + error); }
}

/**
* Implements hook_entity_post_render_content().
*/
function wh33lz_entity_post_render_content(entity, entity_type, bundle) {
  try {
    if (entity_type != 'node' || bundle != 'screen') { return; }
    
    var html = '';
    
    // Add the 'Start Screen' button.
    html += theme('button_link', {
        text: 'Start Screen',
        attributes: {
          onclick: 'wh33lz_screen_start(' + entity.nid + ')',
          'data-icon': 'power',
          'data-icon-pos': 'left',
          'data-theme': 'b'
        }
    });
    
    // Prefix our html onto the entity's content.
    entity.content = html + entity.content;
  }
  catch (error) {
    console.log('wh33lz_entity_post_render_content - ' + error);
  }
}

/**
 *
 */
function wh33lz_screen_start(nid) {
  try {
    // Set the front page of the app to the screen page, then go to it.
    drupalgap.settings.front = 'screen/' + nid;
    drupalgap_goto(drupalgap.settings.front);
  }
  catch (error) { console.log('wh33lz_screen_start - ' + error); }
}

/**
 *
 */
function wh33lz_screen_page(nid) {
  try {
    var content = {};
    content['container'] = {
      markup: '<div id="' + wh33lz_screen_page_container_id(nid) + '"></div>'
    };
    return content;
  }
  catch (error) { console.log('wh33lz_screen_page - ' + error); }
}

/**
 *
 */
function wh33lz_screen_pageshow(nid) {
  try {
    node_load(nid, {
        success: function(node) {
          dpm(node);
          var html = '';
          // Determined organic group node id.
          var og_nid = node.og_group_ref[node.language][0]['target_id'];
          // Show videos button.
          html += theme('button_link', { text: 'Videos', path: 'videos/' + og_nid});
          // Show car listing in content area.
          var car_list = theme('jqm_item_list', { items: [], attributes: { id: 'car_listing_' + nid }});
          html += '<div class="screen_content">' + car_list + '</div>';
          views_datasource_get_view_result('drupalgap/cars/' + og_nid, {
              success: function(data) {
                dpm(data);
                if (data.nodes.length > 0) {
                  var items = [];
                  $.each(data.nodes, function(index, object){
                      var node = object.node;
                      var image = {
                        path: node.image
                      };
                      var image_html = theme('image', image);
                      var title_html = '<h2>' + node.title + '</h2>';
                      var item = l(image_html + title_html, 'node/' + node.nid);
                      items.push(item);
                  });
                  drupalgap_item_list_populate('#' + 'car_listing_' + nid, items);
                }
              }
          });
          // Show buttons in right side bar.
          /*html += '<div class="screen_sidebar_right">';
          $.each(node.field_screen_links[node.language], function(delta, link) {
              html += theme('button_link', {
                  text: link.title,
                  path: link.url,
                  options: {
                    InAppBrowser: true
                  }
              });
          });
          html += '</div>';*/
          var container_id = wh33lz_screen_page_container_id(nid);
          $('#' + container_id).html(html).trigger('create');
        }
    });
  }
  catch (error) { console.log('wh33lz_screen_pageshow - ' + error); }
}

/**
 *
 */
function wh33lz_screen_page_container_id(nid) {
  try {
    return 'screen_page_' + nid;
  }
  catch (error) { console.log('wh33lz_screen_page_container_id - ' + error); }
}

/**
 *
 */
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


