(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.LoadMore = factory());
}(this, function () { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  // https://remysharp.com/2010/07/21/throttling-function-calls
  function throttle(fn) {
    var threshhold = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 250;
    var last, deferTimer;
    return function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var now = Date.now();

      if (last && now < last + threshhold) {
        // hold on to it
        clearTimeout(deferTimer);
        deferTimer = setTimeout(function () {
          last = now;
          fn(args);
        }, threshhold);
      } else {
        last = now;
        fn(args);
      }
    };
  }

  var ThresholdUnits = {
    Pixel: 'Pixel',
    Percent: 'Percent'
  };
  var defaultThreshold = {
    unit: ThresholdUnits.Percent,
    value: 0.8
  };
  function parseThreshold(scrollThreshold) {
    if (typeof scrollThreshold === 'number') {
      return {
        unit: ThresholdUnits.Percent,
        value: scrollThreshold * 100
      };
    }

    if (typeof scrollThreshold === 'string') {
      if (scrollThreshold.match(/^(\d*(\.\d+)?)px$/)) {
        return {
          unit: ThresholdUnits.Pixel,
          value: parseFloat(scrollThreshold)
        };
      }

      if (scrollThreshold.match(/^(\d*(\.\d+)?)%$/)) {
        return {
          unit: ThresholdUnits.Percent,
          value: parseFloat(scrollThreshold)
        };
      }

      console.warn('scrollThreshold format is invalid. Valid formats: "120px", "50%"...');
      return defaultThreshold;
    }

    console.warn('scrollThreshold should be string or number');
    return defaultThreshold;
  }

  var doc = document;
  var win = window;

  function getElement(selector) {
    var element;

    if (typeof selector === 'string') {
      element = doc.querySelector(selector);
    } else if (selector && selector instanceof Element) {
      element = selector;
    }

    return element;
  } // 添加 class

  var LoadMore =
  /*#__PURE__*/
  function () {
    function LoadMore(_ref) {
      var _ref$scrollThreshold = _ref.scrollThreshold,
          scrollThreshold = _ref$scrollThreshold === void 0 ? '200px' : _ref$scrollThreshold,
          _ref$hasMore = _ref.hasMore,
          hasMore = _ref$hasMore === void 0 ? true : _ref$hasMore,
          _ref$loader = _ref.loader,
          loader = _ref$loader === void 0 ? function () {} : _ref$loader,
          pageContainer = _ref.pageContainer,
          listContainer = _ref.listContainer,
          _ref$loadPageData = _ref.loadPageData,
          loadPageData = _ref$loadPageData === void 0 ? function () {} : _ref$loadPageData,
          _ref$pageNum = _ref.pageNum,
          pageNum = _ref$pageNum === void 0 ? 1 : _ref$pageNum,
          _ref$pageSize = _ref.pageSize,
          pageSize = _ref$pageSize === void 0 ? 10 : _ref$pageSize,
          _ref$loadMoreMax = _ref.loadMoreMax,
          loadMoreMax = _ref$loadMoreMax === void 0 ? 50 : _ref$loadMoreMax;

      _classCallCheck(this, LoadMore);

      var _pageContainer = getElement(pageContainer);

      if (!_pageContainer) {
        return;
      }

      var _listContainer = getElement(listContainer);

      if (!_listContainer) {
        return;
      } // 是否在加载中


      this.loading = false; // 是否已初始化

      this.inited = false; // 是否有更多数据

      this._hasMore = hasMore; // 滑动到底部什么部分开始加载更多

      this.scrollThreshold = scrollThreshold; // 显示 loader 效果

      this.loader = loader; // 分页页码容器

      this.pageContainer = _pageContainer; // 列表容器

      this.listContainer = _listContainer; // 加载数据函数

      this.loadPageData = loadPageData; // 当前页，从1开始，默认1

      this.pageNum = pageNum; // 每页条数，默认10

      this.pageSize = pageSize; // 加载更多最大值

      this.loadMoreMax = loadMoreMax; // 滑动事件

      this.onScrollListener = this.onScrollListener.bind(this); // 防止抖动

      this.throttledOnScrollListener = throttle(this.onScrollListener, 150).bind(this);
      this.handleSwitchPage = this.handleSwitchPage.bind(this);
      this.init();
    }

    _createClass(LoadMore, [{
      key: "init",
      value: function init() {
        this.loadData();
        this.initEvent();
      }
    }, {
      key: "initEvent",
      value: function initEvent() {
        win.addEventListener('scroll', this.throttledOnScrollListener);
        this.pageContainer.addEventListener('click', this.handleSwitchPage);
      } // 滑轮滚动事件

    }, {
      key: "onScrollListener",
      value: function onScrollListener(event) {
        // 防止多次重复加载更多
        if (this.loading) {
          return;
        } // 如果没有初始化完成，则不滑动


        if (!this.inited) {
          return;
        }

        var deltaX = event.deltaX;
        var detail = deltaX;
        var direction = detail < -1; // 向上滑动不处理

        if (direction) {
          return;
        }

        var target = doc.documentElement.scrollTop ? doc.documentElement : doc.body; // 是否到底部

        var atBottom = this.isElementAtBottom(target); // 调用 loadData 方法加载更多

        if (atBottom && this.hasMore) {
          this.loading = true;
          this.loadData(this.pageNum + 1);
        }
      } // 加载数据

    }, {
      key: "loadData",
      value: function loadData() {
        var _this = this;

        var _pageNum = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

        if (this.loadPageData && typeof this.loadPageData === 'function') {
          if (typeof this.loader === 'function') {
            this.loader(true);
          }

          this.loadPageData(_pageNum, this.pageSize, !this.hasMore).then(function (json) {
            _this.loading = false;
            setTimeout(function () {
              _this.inited = true;
            }, 300);
            var _json$data = json.data,
                totalCount = _json$data.totalCount,
                totalPages = _json$data.totalPages;
            _this.totalPages = totalPages;
            _this.pageNum = _pageNum;
            _this.totalCount = totalCount;

            _this.renderPaging(); // 只处理一次，如果是最后一页数据，或者是超过最大可滑动展示的数据，则 this.hashMore 设为 true


            if (_this.hasMore && (_this.pageNum >= totalPages || _this.pageNum * _this.pageSize > _this.loadMoreMax)) {
              _this.hasMore = false;

              if (_this.pageNum * _this.pageSize > _this.loadMoreMax) {
                _this.pageContainer.classList.add('show');
              }
            }

            if (typeof _this.loader === 'function') {
              _this.loader(false);
            }
          }).catch(function () {
            _this.loading = false;
            setTimeout(function () {
              _this.inited = true;
            }, 300);

            if (typeof _this.loader === 'function') {
              _this.loader(false);
            }
          });
        }
      } // 切换页码

    }, {
      key: "handleSwitchPage",
      value: function handleSwitchPage(evt) {
        evt.preventDefault(); // 防止多次重复加载

        if (this.loading) {
          return;
        }

        var target = evt.target;
        var classList = target.classList;

        if (classList.contains('paging-item')) {
          // 切换下一页逻辑
          var pageNum = parseInt(target.dataset.pagenum, 10);

          if (this.totalPages === 1) {
            return;
          }

          if (pageNum <= 1) {
            pageNum = 1;
          }

          if (pageNum >= this.totalPages) {
            pageNum = this.totalPages;
          }

          this.loadData(pageNum);
        }
      }
    }, {
      key: "calculatePage",

      /**
       * 计算页码显示算法，返回一个页码数组
       * @returns {[]}
       */
      value: function calculatePage() {
        var pageArray = [];

        if (this.totalPages < 8) {
          for (var i = 1; i <= this.totalPages; i++) {
            pageArray.push(i);
          }
        } else {
          pageArray.push(1);

          if (this.pageNum > 4) {
            pageArray.push('...');
          }

          if (this.pageNum < 4) {
            for (var _i = 2; _i <= 6; _i++) {
              pageArray.push(_i);
            }
          } else if (this.pageNum >= 4 && this.totalPages - this.pageNum >= 3) {
            for (var _i2 = this.pageNum - 2; _i2 <= this.pageNum + 2; _i2++) {
              pageArray.push(_i2);
            }
          } else {
            for (var _i3 = this.totalPages - 4; _i3 < this.totalPages; _i3++) {
              pageArray.push(_i3);
            }
          } // 总页码 - 当前页 大于 3 显示


          if (this.totalPages - this.pageNum > 3) {
            pageArray.push('...');
          }

          pageArray.push(this.totalPages);
        }

        return pageArray;
      } // 渲染分页

    }, {
      key: "renderPaging",
      value: function renderPaging() {
        var _this2 = this;

        var pageArray = this.calculatePage();
        var html = '<ul class="paging-items">';
        html += "<li class=\"paging-item prev".concat(this.pageNum === 1 ? ' disabled' : '', "\" data-pagenum=\"").concat(this.pageNum - 1, "\"></li>");
        var pageItems = pageArray.map(function (item, index) {
          if (item === '...') {
            return '<li class="paging-item more"></li>';
          }

          return "<li class=\"paging-item".concat(_this2.pageNum === item ? ' active' : '', "\" data-pagenum=\"").concat(item, "\">").concat(item, "</li>");
        });
        html += pageItems.join('');
        html += "<li class=\"paging-item next".concat(this.pageNum === this.totalPages ? ' disabled' : '', "\" data-pagenum=\"").concat(this.pageNum + 1, "\"></li>");
        html += '</ul>';
        this.pageContainer.innerHTML = html;
      } // 是否滑动到底部

    }, {
      key: "isElementAtBottom",
      value: function isElementAtBottom(target) {
        var clientHeight = target === doc.body || target === doc.documentElement ? win.screen.availHeight : target.clientHeight;
        var threshold = parseThreshold(this.scrollThreshold);

        if (threshold.unit === ThresholdUnits.Pixel) {
          return target.scrollTop + clientHeight >= target.scrollHeight - threshold.value;
        }

        return target.scrollTop + clientHeight >= threshold.value / 100 * target.scrollHeight;
      }
    }, {
      key: "hasMore",
      set: function set(more) {
        this._hasMore = more;
      },
      get: function get() {
        return this._hasMore;
      }
    }]);

    return LoadMore;
  }();

  return LoadMore;

}));
//# sourceMappingURL=load-more.js.map
