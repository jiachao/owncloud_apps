// Generated by CoffeeScript 1.4.0

/*

ownCloud - News

@author Bernhard Posselt
@copyright 2012 Bernhard Posselt nukeawhale@gmail.com

This library is free software; you can redistribute it and/or
modify it under the terms of the GNU AFFERO GENERAL PUBLIC LICENSE
License as published by the Free Software Foundation; either
version 3 of the License, or any later version.

This library is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU AFFERO GENERAL PUBLIC LICENSE for more details.

You should have received a copy of the GNU Affero General Public
License along with this library.  If not, see <http://www.gnu.org/licenses/>.
*/


(function() {

  describe('_Persistence', function() {
    var _this = this;
    beforeEach(module('News'));
    beforeEach(inject(function(_Persistence, $rootScope) {
      _this._Persistence = _Persistence;
      _this.$rootScope = $rootScope;
      _this.req = {
        post: jasmine.createSpy('POST'),
        get: jasmine.createSpy('GET').andCallFake(function(url, p1, p2, callback) {
          if (callback) {
            return callback();
          }
        })
      };
      _this.config = {
        itemBatchSize: 12
      };
      _this.active = {
        getType: function() {
          return 3;
        },
        getId: function() {
          return 1;
        }
      };
      return _this.loading = {
        increase: function() {},
        decrease: function() {}
      };
    }));
    it('should should show a loading sign when init', function() {
      var loading, pers;
      loading = {
        increase: jasmine.createSpy('loading'),
        decrease: jasmine.createSpy('finished loading')
      };
      pers = new _this._Persistence(_this.req, loading, _this.config, _this.active, _this.$rootScope);
      pers.init();
      expect(loading.increase).toHaveBeenCalled();
      return expect(loading.decrease).toHaveBeenCalled();
    });
    /*
    		FEED CONTROLLER
    */

    it('should get all feeds', function() {
      var pers;
      pers = new _this._Persistence(_this.req, _this.loading, _this.config, _this.active, _this.$rootScope);
      pers.getAllFeeds();
      return expect(_this.req.get).toHaveBeenCalledWith('news_feeds', {}, {}, angular.noop);
    });
    it('should get a feed by id', function() {
      var pers, url;
      url = {
        feedId: 1
      };
      pers = new _this._Persistence(_this.req, _this.loading, _this.config, _this.active, _this.$rootScope);
      pers.getFeedById(url.feedId);
      return expect(_this.req.get).toHaveBeenCalledWith('news_feed', url);
    });
    it('create a correct request for moving a feed', function() {
      var data, pers, url;
      data = {
        folderId: 4
      };
      url = {
        feedId: 3
      };
      pers = new _this._Persistence(_this.req, _this.loading, _this.config, _this.active, _this.$rootScope);
      pers.moveFeed(url.feedId, data.folderId);
      return expect(_this.req.post).toHaveBeenCalledWith('news_move_feed', url, data);
    });
    it('shoud send a correct request for marking all items read', function() {
      var data, pers, url;
      data = {
        highestItemId: 4
      };
      url = {
        feedId: 3
      };
      pers = new _this._Persistence(_this.req, _this.loading, _this.config, _this.active, _this.$rootScope);
      pers.setFeedRead(url.feedId, data.highestItemId);
      return expect(_this.req.post).toHaveBeenCalledWith('news_set_feed_read', url, data);
    });
    it('send a correct feed update request', function() {
      var pers, url;
      url = {
        feedId: 3
      };
      pers = new _this._Persistence(_this.req, _this.loading, _this.config, _this.active, _this.$rootScope);
      pers.updateFeed(url.feedId);
      return expect(_this.req.post).toHaveBeenCalledWith('news_update_feed', url);
    });
    it('send a correct get active feed request', function() {
      var pers, succs;
      succs = angular.noop;
      pers = new _this._Persistence(_this.req, _this.loading, _this.config, _this.active, _this.$rootScope);
      pers.getActiveFeed(succs);
      return expect(_this.req.get).toHaveBeenCalledWith('news_active_feed', {}, {}, succs);
    });
    it('send a correct feed delete request', function() {
      var pers, url;
      url = {
        feedId: 3
      };
      pers = new _this._Persistence(_this.req, _this.loading, _this.config, _this.active, _this.$rootScope);
      pers.deleteFeed(url.feedId);
      return expect(_this.req.post).toHaveBeenCalledWith('news_delete_feed', url);
    });
    it('send a correct feed create request', function() {
      var data, onerror, onsuccess, pers;
      data = {
        parentFolderId: 5,
        url: 'http://google.de'
      };
      onsuccess = angular.noop;
      onerror = angular.noop;
      pers = new _this._Persistence(_this.req, _this.loading, _this.config, _this.active, _this.$rootScope);
      pers.createFeed(data.url, data.parentFolderId, onsuccess, onerror);
      return expect(_this.req.post).toHaveBeenCalledWith('news_create_feed', {}, data, onsuccess, onerror);
    });
    /*
    		FOLDER CONTROLLER
    */

    it('should do a proper get all folders request', function() {
      var pers;
      pers = new _this._Persistence(_this.req, _this.loading, _this.config, _this.active, _this.$rootScope);
      pers.getAllFolders();
      return expect(_this.req.get).toHaveBeenCalledWith('news_folders', {}, {}, angular.noop);
    });
    it('should get a folder by id', function() {
      var pers, url;
      url = {
        folderId: 5
      };
      pers = new _this._Persistence(_this.req, _this.loading, _this.config, _this.active, _this.$rootScope);
      pers.getFolderById(url.folderId);
      return expect(_this.req.get).toHaveBeenCalledWith('news_folder', url);
    });
    it('send a correct collapse folder request', function() {
      var pers, url;
      url = {
        folderId: 3
      };
      pers = new _this._Persistence(_this.req, _this.loading, _this.config, _this.active, _this.$rootScope);
      pers.collapseFolder(url.folderId);
      return expect(_this.req.post).toHaveBeenCalledWith('news_collapse_folder', url);
    });
    it('send a correct open folder request', function() {
      var pers, url;
      url = {
        folderId: 3
      };
      pers = new _this._Persistence(_this.req, _this.loading, _this.config, _this.active, _this.$rootScope);
      pers.openFolder(url.folderId);
      return expect(_this.req.post).toHaveBeenCalledWith('news_open_folder', url);
    });
    it('should do a proper folder create request', function() {
      var data, onerror, onsuccess, pers;
      data = {
        folderName: 'check',
        parentFolderId: 4
      };
      onsuccess = function() {
        return 1;
      };
      onerror = function() {
        return 2;
      };
      pers = new _this._Persistence(_this.req, _this.loading, _this.config, _this.active, _this.$rootScope);
      pers.createFolder(data.folderName, data.parentFolderId, onsuccess, onerror);
      return expect(_this.req.post).toHaveBeenCalledWith('news_create_folder', {}, data, onsuccess, onerror);
    });
    it('should do a proper folder delete request', function() {
      var pers, url;
      url = {
        folderId: 2
      };
      pers = new _this._Persistence(_this.req, _this.loading, _this.config, _this.active, _this.$rootScope);
      pers.deleteFolder(url.folderId);
      return expect(_this.req.post).toHaveBeenCalledWith('news_delete_folder', url);
    });
    it('should do a proper folder rename request', function() {
      var data, pers, url;
      url = {
        folderId: 2
      };
      data = {
        folderName: 'host'
      };
      pers = new _this._Persistence(_this.req, _this.loading, _this.config, _this.active, _this.$rootScope);
      pers.renameFolder(url.folderId, data.folderName);
      return expect(_this.req.post).toHaveBeenCalledWith('news_rename_folder', url, data);
    });
    /*
    		ITEM CONTROLLER
    */

    it('should send a autopaging request', function() {
      var data, pers, success;
      data = {
        type: 2,
        id: 5,
        limit: _this.config.itemBatchSize,
        offset: 3
      };
      success = angular.noop;
      pers = new _this._Persistence(_this.req, _this.loading, _this.config, _this.active, _this.$rootScope);
      pers.getItems(data.type, data.id, data.offset, success, null);
      return expect(_this.req.get).toHaveBeenCalledWith('news_items', {}, data, success);
    });
    it('should send a load newest items request', function() {
      var data, pers, success;
      data = {
        type: 2,
        id: 5,
        updatedSince: 1333
      };
      success = angular.noop;
      pers = new _this._Persistence(_this.req, _this.loading, _this.config, _this.active, _this.$rootScope);
      pers.getItems(data.type, data.id, 0, success, data.updatedSince);
      return expect(_this.req.get).toHaveBeenCalledWith('news_items', {}, data, success);
    });
    it('send a correct get item by id request', function() {
      var pers, url;
      url = {
        itemId: 5
      };
      pers = new _this._Persistence(_this.req, _this.loading, _this.config, _this.active, _this.$rootScope);
      pers.getItemById(url.itemId);
      return expect(_this.req.get).toHaveBeenCalledWith('news_item', url);
    });
    it('send a correct get starred items request', function() {
      var pers, success;
      success = angular.noop;
      pers = new _this._Persistence(_this.req, _this.loading, _this.config, _this.active, _this.$rootScope);
      pers.getStarredItems(success);
      return expect(_this.req.get).toHaveBeenCalledWith('news_starred_items', {}, {}, success);
    });
    it('send a correct star item request', function() {
      var pers, url;
      url = {
        itemId: 2
      };
      pers = new _this._Persistence(_this.req, _this.loading, _this.config, _this.active, _this.$rootScope);
      pers.starItem(url.itemId);
      return expect(_this.req.post).toHaveBeenCalledWith('news_star_item', url);
    });
    it('send a correct unstar item request', function() {
      var pers, url;
      url = {
        itemId: 2
      };
      pers = new _this._Persistence(_this.req, _this.loading, _this.config, _this.active, _this.$rootScope);
      pers.unstarItem(url.itemId);
      return expect(_this.req.post).toHaveBeenCalledWith('news_unstar_item', url);
    });
    it('send a correct read item request', function() {
      var pers, url;
      url = {
        itemId: 2
      };
      pers = new _this._Persistence(_this.req, _this.loading, _this.config, _this.active, _this.$rootScope);
      pers.readItem(url.itemId);
      return expect(_this.req.post).toHaveBeenCalledWith('news_read_item', url);
    });
    it('send a correct unread item request', function() {
      var pers, url;
      url = {
        itemId: 2
      };
      pers = new _this._Persistence(_this.req, _this.loading, _this.config, _this.active, _this.$rootScope);
      pers.unreadItem(url.itemId);
      return expect(_this.req.post).toHaveBeenCalledWith('news_unread_item', url);
    });
    /*
    		EXPORT CONTROLLER
    */

    it('should have an export request', function() {
      var pers;
      pers = new _this._Persistence(_this.req, _this.loading, _this.config, _this.active, _this.$rootScope);
      pers.exportOPML();
      return expect(_this.req.get).toHaveBeenCalledWith('news_export_opml');
    });
    /*
    		USERSETTINGS CONTROLLER
    */

    it('should do a proper get user settings read request', function() {
      var pers;
      pers = new _this._Persistence(_this.req, _this.loading, _this.config, _this.active, _this.$rootScope);
      pers.userSettingsRead();
      return expect(_this.req.get).toHaveBeenCalledWith('news_user_settings_read', {}, {}, angular.noop);
    });
    it('should do a proper get user settings read req and call callback', function() {
      var callback, pers;
      callback = function() {
        return 1 + 1;
      };
      pers = new _this._Persistence(_this.req, _this.loading, _this.config, _this.active, _this.$rootScope);
      pers.userSettingsRead(callback);
      return expect(_this.req.get).toHaveBeenCalledWith('news_user_settings_read', {}, {}, callback);
    });
    it('should do a proper user settings read show request', function() {
      var pers;
      pers = new _this._Persistence(_this.req, _this.loading, _this.config, _this.active, _this.$rootScope);
      pers.userSettingsReadShow();
      return expect(_this.req.post).toHaveBeenCalledWith('news_user_settings_read_show');
    });
    return it('should do a proper user settings read hide request', function() {
      var pers;
      pers = new _this._Persistence(_this.req, _this.loading, _this.config, _this.active, _this.$rootScope);
      pers.userSettingsReadHide();
      return expect(_this.req.post).toHaveBeenCalledWith('news_user_settings_read_hide');
    });
  });

}).call(this);