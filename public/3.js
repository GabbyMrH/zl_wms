(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[3],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/bound/InBound.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/bound/InBound.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! util */ "./node_modules/util/util.js");
/* harmony import */ var util__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(util__WEBPACK_IMPORTED_MODULE_0__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      currentPage: 1,
      //默认显示页面为1
      pagesize: 10,
      //    每页的数据条数
      tableData: [],
      //需要data定义一些，tableData定义一个空数组，请求的数据都是存放这里面
      multipleSelection: [],
      textTitle: "",
      formType: "",
      //判断共用的对话框表单类型
      formSubUrl: "api/v1/inbounds/",
      dialogFormVisible: false,
      inboundDate: "",
      selectData: [],
      houseData: [],
      inboundHeadInput: "",
      inboundHeadSelect: "",
      axios_type: "",
      form: {
        id: "",
        item_name: "",
        spec: "",
        unit: "",
        item_qty: "",
        supplier: "",
        contact_man: "",
        contact_number: "",
        remarks: "",
        status: "1",
        operator: "",
        house_name: "",
        warehouse_id: ""
      },
      rules: {
        item_name: [{
          required: true,
          message: "请输入产品名称",
          trigger: "blur"
        }, {
          min: 2,
          message: "长度在 2 个字符以上",
          trigger: "blur"
        }],
        status: [{
          required: true,
          message: "请选中订单状态",
          trigger: "blur"
        }],
        house_name: [{
          required: true,
          message: "请输入仓库名称",
          trigger: "blur"
        }],
        operator: [{
          required: true,
          message: "请输入操作员",
          trigger: "blur"
        }]
      }
    };
  },
  mounted: function mounted() {
    // console.log(this.$router.name);
    this.getData();
    this.getHouse();
    var sum = 0.1 + 0.2; //console.log(sum.toFixed(2));

    console.log(0.1 + 0.2);
  },
  watch: {
    //监听头部搜索建议-下拉选择框
    inboundHeadInput: function inboundHeadInput() {
      //console.log(this.inboundHeadInput);
      //有值先判断是否选择select，若未选则提示需先选择
      if (this.inboundHeadInput) {
        if (!this.inboundHeadSelect) {
          this.$notify.warning({
            title: "消息",
            message: "请先选择内容！"
          });
          return;
        } //若已选获取下拉框所选内容并筛选当前数据
        //根据id返回不同值


        switch (this.inboundHeadSelect) {
          case "1":
            for (var index = 0; index < this.tableData.length; index++) {
              this.selectData.push({
                value: this.tableData[index].order_num
              });
            }

            break;

          case "2":
            for (var _index = 0; _index < this.tableData.length; _index++) {
              this.selectData.push({
                value: this.tableData[_index].item_name
              });
            }

            break;
        }
      }
    }
  },
  methods: {
    //获取关联数据
    getData: function getData() {
      var _this = this;

      axios.get("api/v1/inbounds").then(function (res) {
        _this.tableData = res.data["data"];
      })["catch"](function (err) {
        console.error(err);
      });
    },
    //获取仓库数据
    getHouse: function getHouse() {
      var _this2 = this;

      axios.get("api/v1/warehouse-list").then(function (res) {
        _this2.houseData = res.data["data"];
      })["catch"](function (err) {
        console.error(err);
      });
    },
    //时间查询-头部
    dateQuery: function dateQuery() {
      var _this3 = this;

      if (!this.inboundDate) {
        this.getData();
        return;
      }

      var start_time = this.inboundDate[0];
      var end_time = this.inboundDate[1];
      axios.get("api/v1/inbounds-date", {
        params: {
          start_time: start_time,
          end_time: end_time
        }
      }).then(function (res) {
        _this3.tableData = res.data["data"];
      })["catch"](function (err) {
        console.error(err);
      });
    },
    //输入建议-头部
    querySearch: function querySearch(queryString, cb) {
      var data = this.selectData;
      var results = queryString ? data.filter(this.createFilter(queryString)) : data; //调用 callback 返回建议列表的数据

      cb(results); //   console.log(results);
    },
    //输入建议-仓库名称
    houseSearch: function houseSearch(queryString, cb) {
      //循环将仓库名称插入变量模型内
      for (var index = 0; index < this.houseData.length; index++) {
        this.selectData.push({
          value: this.houseData[index].house_name,
          warehouse_id: this.houseData[index].id
        });
      }

      var data = this.selectData;
      var results = queryString ? data.filter(this.createFilter(queryString)) : data; //调用 callback 返回建议列表的数据

      cb(results);
    },
    //输入建议-过滤补全
    createFilter: function createFilter(queryString) {
      return function (data) {
        return (//value为固定返回格式(框架内定)
          data.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    handleSelect: function handleSelect(item) {
      this.form.warehouse_id = item.warehouse_id;
    },
    //点击搜索-头部
    handleItemQuery: function handleItemQuery() {
      var _this4 = this;

      //select_item值1为订单号，2为产品名称，依次传递到api查询对应结果
      var select_item = this.inboundHeadSelect;
      var item_data = this.inboundHeadInput; // console.log(select_item+'---'+item_data);

      if (!select_item || !item_data) {
        this.getData();
        return;
      }

      axios.get("api/v1/inbounds-item", {
        params: {
          select_item: select_item,
          item_data: item_data
        }
      }).then(function (res) {
        _this4.tableData = res.data["data"];
      })["catch"](function (err) {
        console.error(err);
      });
    },
    //数据清空的时候
    handleInputEmpty: function handleInputEmpty() {
      this.getData();
    },
    //状态查询
    handleStatusText: function handleStatusText(val) {
      //返回值为1和0，可用三元运算
      val.status === 1 ? this.statusText = "已入库" : this.statusText = "未入库";
    },
    //状态对应样式
    handleStatusStyle: function handleStatusStyle(val) {
      if (val.status === 1) {
        return "success";
      }

      return "info";
    },
    //每页下拉显示数据
    handleSizeChange: function handleSizeChange(size) {
      this.pagesize = size;
      /*console.log(this.pagesize) */
    },
    //点击第几页
    handleCurrentChange: function handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
    },
    //获取选中行
    handleCurrentRow: function handleCurrentRow(val) {
      this.currentRow = val;
      /* console.log(this.currentRow); */
    },
    //获取多选
    handleSelectionChange: function handleSelectionChange(val) {
      this.multipleSelection = val;
      /* console.log(this.multipleSelection); */
    },
    //删除
    dropMultiTable: function dropMultiTable(val, row) {
      var _this5 = this;

      //取出选中id
      var inbound_id = {
        id: []
      }; //循环id值压入对象数组内,多个字符串数字需转换为数字类型，否则会被当成一个字符串处理，用parseInt

      for (var index = 0; index < this.multipleSelection.length; index++) {
        inbound_id.id.push(parseInt(this.multipleSelection[index].id));
      } //若点击行内删除按钮


      if (val == "drop") {
        inbound_id.id.push(row.id);
      }

      if (inbound_id.id.length === 0) {
        this.$notify.info({
          title: "消息",
          message: "请至少选择一项！"
        });
        return;
      } //删除判断


      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function () {
        axios //ES6变量数据编写方式
        ["delete"]("".concat(_this5.formSubUrl).concat(inbound_id.id)).then(function (res) {
          switch (res.data["status"]) {
            case "4002":
              _this5.$notify.error({
                title: "错误",
                message: "操作失败"
              });

              break;

            case "2001":
              _this5.$notify.success({
                title: "成功",
                message: "操作成功",
                type: "success"
              }); //刷新数据


              _this5.getData();

              break;

            default:
              _this5.$notify.info({
                title: "消息",
                message: "请至少选择一项!"
              });

              break;
          }
        })["catch"](function (err) {
          console.error(err);
        });
      })["catch"](function () {});
    },
    //事件(编辑/新增)判断
    handleEvent: function handleEvent(type, row) {
      //console.log(val);
      //判断传递的是编辑还是新增
      if (type === "addNew") {
        this.textTitle = "新增入库";
        this.formType = "newBound"; //拷贝对象--解决切换有值问题

        this.form = Object.assign({}, row);
      } else {
        this.textTitle = "编辑订单";
        this.formType = "editBound"; //将值拷贝到表单
        //status值需转换为字符串类型

        this.form = Object.assign({}, row);
        this.form.status = row.status.toString();
        this.form.id = row.id;
      }
    },
    //提交表单
    submitForm: function submitForm(name) {
      var _this6 = this;

      //console.log(this.formType);
      //if (this.formType == "editBound")
      this.$refs[name].validate(function (valid) {
        //输入验证
        if (valid) {
          //新增入库
          if (_this6.formType == "newBound") {
            _this6.axios_type = "post";
          } //编辑订单


          if (_this6.formType == "editBound") {
            _this6.axios_type = "put";
          } //axios发送--灵活变换更新或新增所用的不同http方法


          axios({
            method: _this6.axios_type,
            url: _this6.axios_type == "put" ? _this6.formSubUrl + _this6.form.id : _this6.formSubUrl,
            data: _this6.form
          }).then(function (res) {
            switch (res.data.status) {
              case "4001":
                _this6.$notify.error({
                  title: "错误",
                  message: "输入数据有误"
                });

                break;

              case "4002":
                _this6.$notify.error({
                  title: "错误",
                  message: "数据写入失败"
                });

                break;

              default:
                _this6.$notify.success({
                  title: "成功",
                  message: "操作成功",
                  type: "success"
                }); //重置表单


                _this6.$refs[name].resetFields(); //关闭dialog


                _this6.dialogFormVisible = false; //刷新数据

                _this6.getData();

                break;
            }
          })["catch"](function (err) {
            console.log(err);
          });
        }
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/bound/InBound.vue?vue&type=template&id=0830236d&":
/*!****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/bound/InBound.vue?vue&type=template&id=0830236d& ***!
  \****************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "in-bound" },
    [
      _c(
        "div",
        { staticClass: "bread" },
        [
          _c(
            "el-breadcrumb",
            { attrs: { separator: "/" } },
            [
              _c("el-breadcrumb-item", [_vm._v("库存管理")]),
              _vm._v(" "),
              _c("el-breadcrumb-item", [_vm._v("商品入库")])
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "div",
        [
          _c(
            "el-row",
            { staticClass: "main" },
            [
              _c(
                "el-row",
                {
                  staticClass: "inbound-header-button",
                  attrs: { type: "flex" }
                },
                [
                  _c(
                    "el-row",
                    { staticClass: "inbound-date-select" },
                    [
                      _c(
                        "el-col",
                        { staticClass: "block", attrs: { span: 22 } },
                        [
                          _c("span", { staticClass: "demonstration" }, [
                            _vm._v("更新时间")
                          ]),
                          _vm._v(" "),
                          _c("el-date-picker", {
                            attrs: {
                              size: "small",
                              type: "daterange",
                              "value-format": "yyyy-MM-dd",
                              "range-separator": "至",
                              "start-placeholder": "开始日期",
                              "end-placeholder": "结束日期"
                            },
                            on: { change: _vm.handleInputEmpty },
                            model: {
                              value: _vm.inboundDate,
                              callback: function($$v) {
                                _vm.inboundDate = $$v
                              },
                              expression: "inboundDate"
                            }
                          })
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "el-col",
                        { attrs: { span: 2 } },
                        [
                          _c(
                            "el-button",
                            {
                              attrs: { type: "primary", size: "small" },
                              on: { click: _vm.dateQuery }
                            },
                            [_vm._v("查询")]
                          )
                        ],
                        1
                      )
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "el-row",
                    { staticClass: "inbound-header-search" },
                    [
                      _c(
                        "el-col",
                        [
                          _c(
                            "el-autocomplete",
                            {
                              staticClass: "inline-input",
                              attrs: {
                                size: "small",
                                placeholder: "输入关键字搜索",
                                "fetch-suggestions": _vm.querySearch,
                                "trigger-on-focus": false,
                                clearable: ""
                              },
                              on: { clear: _vm.handleInputEmpty },
                              model: {
                                value: _vm.inboundHeadInput,
                                callback: function($$v) {
                                  _vm.inboundHeadInput = $$v
                                },
                                expression: "inboundHeadInput"
                              }
                            },
                            [
                              _c(
                                "el-select",
                                {
                                  attrs: {
                                    slot: "prepend",
                                    size: "small",
                                    placeholder: "请选择"
                                  },
                                  slot: "prepend",
                                  model: {
                                    value: _vm.inboundHeadSelect,
                                    callback: function($$v) {
                                      _vm.inboundHeadSelect = $$v
                                    },
                                    expression: "inboundHeadSelect"
                                  }
                                },
                                [
                                  _c("el-option", {
                                    attrs: { label: "订单号", value: "1" }
                                  }),
                                  _vm._v(" "),
                                  _c("el-option", {
                                    attrs: { label: "产品名称", value: "2" }
                                  })
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c("el-button", {
                                attrs: {
                                  slot: "append",
                                  size: "small",
                                  icon: "el-icon-search"
                                },
                                on: { click: _vm.handleItemQuery },
                                slot: "append"
                              })
                            ],
                            1
                          )
                        ],
                        1
                      )
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "el-row",
                    { staticClass: "button-style" },
                    [
                      _c(
                        "el-button",
                        {
                          attrs: {
                            type: "primary",
                            icon: "el-icon-plus",
                            size: "small"
                          },
                          on: {
                            click: function($event) {
                              return _vm.handleEvent(
                                "addNew",
                                (_vm.dialogFormVisible = true)
                              )
                            }
                          }
                        },
                        [_vm._v("新增入库")]
                      ),
                      _vm._v(" "),
                      _c(
                        "el-button",
                        {
                          attrs: {
                            type: "danger",
                            icon: "el-icon-delete",
                            size: "small"
                          },
                          on: { click: _vm.dropMultiTable }
                        },
                        [_vm._v("删除数据")]
                      )
                    ],
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "el-row",
                { staticClass: "main-table" },
                [
                  _c(
                    "el-table",
                    {
                      staticStyle: { width: "100%" },
                      attrs: {
                        data: _vm.tableData.slice(
                          (_vm.currentPage - 1) * _vm.pagesize,
                          _vm.currentPage * _vm.pagesize
                        ),
                        "highlight-current-row": "",
                        "default-sort": {
                          prop: "updated_at",
                          order: "descending"
                        },
                        stripe: "",
                        border: "",
                        height: "450"
                      },
                      on: {
                        "current-change": _vm.handleCurrentRow,
                        "selection-change": _vm.handleSelectionChange
                      }
                    },
                    [
                      _c("el-table-column", {
                        attrs: { type: "expand" },
                        scopedSlots: _vm._u([
                          {
                            key: "default",
                            fn: function(props) {
                              return [
                                _c(
                                  "el-form",
                                  {
                                    staticClass: "inbound-table-expand",
                                    attrs: {
                                      "label-position": "left",
                                      inline: ""
                                    }
                                  },
                                  [
                                    _c(
                                      "el-form-item",
                                      { attrs: { label: "产品名称" } },
                                      [
                                        _c("span", [
                                          _vm._v(_vm._s(props.row.item_name))
                                        ])
                                      ]
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "el-form-item",
                                      { attrs: { label: "产品规格" } },
                                      [
                                        _c("span", [
                                          _vm._v(_vm._s(props.row.spec))
                                        ])
                                      ]
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "el-form-item",
                                      { attrs: { label: "单位" } },
                                      [
                                        _c("span", [
                                          _vm._v(_vm._s(props.row.unit))
                                        ])
                                      ]
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "el-form-item",
                                      { attrs: { label: "产品数量" } },
                                      [
                                        _c("span", [
                                          _vm._v(_vm._s(props.row.item_qty))
                                        ])
                                      ]
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "el-form-item",
                                      { attrs: { label: "供应商" } },
                                      [
                                        _c("span", [
                                          _vm._v(_vm._s(props.row.supplier))
                                        ])
                                      ]
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "el-form-item",
                                      { attrs: { label: "联系人" } },
                                      [
                                        _c("span", [
                                          _vm._v(_vm._s(props.row.contact_man))
                                        ])
                                      ]
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "el-form-item",
                                      { attrs: { label: "联系方式" } },
                                      [
                                        _c("span", [
                                          _vm._v(
                                            _vm._s(props.row.contact_number)
                                          )
                                        ])
                                      ]
                                    )
                                  ],
                                  1
                                )
                              ]
                            }
                          }
                        ])
                      }),
                      _vm._v(" "),
                      _c("el-table-column", {
                        attrs: { type: "selection", width: "55" }
                      }),
                      _vm._v(" "),
                      _c("el-table-column", {
                        attrs: {
                          type: "index",
                          width: "50",
                          align: "center",
                          label: "序号"
                        }
                      }),
                      _vm._v(" "),
                      _c("el-table-column", {
                        attrs: {
                          prop: "order_num",
                          align: "center",
                          label: "订单号"
                        }
                      }),
                      _vm._v(" "),
                      _c("el-table-column", {
                        attrs: {
                          prop: "house_name",
                          align: "center",
                          label: "所入仓库"
                        }
                      }),
                      _vm._v(" "),
                      _c("el-table-column", {
                        attrs: {
                          prop: "remarks",
                          align: "center",
                          label: "备注"
                        }
                      }),
                      _vm._v(" "),
                      _c("el-table-column", {
                        attrs: {
                          prop: "status",
                          align: "center",
                          label: "状态"
                        },
                        scopedSlots: _vm._u([
                          {
                            key: "default",
                            fn: function(scope) {
                              return [
                                _c(
                                  "div",
                                  {
                                    staticClass: "name-wrapper",
                                    attrs: { slot: "reference" },
                                    slot: "reference"
                                  },
                                  [
                                    _c(
                                      "el-tag",
                                      {
                                        attrs: {
                                          type: _vm.handleStatusStyle(
                                            scope.row
                                          ),
                                          statusText: _vm.handleStatusText(
                                            scope.row
                                          ),
                                          size: "medium"
                                        }
                                      },
                                      [_vm._v(_vm._s(_vm.statusText))]
                                    )
                                  ],
                                  1
                                )
                              ]
                            }
                          }
                        ])
                      }),
                      _vm._v(" "),
                      _c("el-table-column", {
                        attrs: {
                          prop: "operator",
                          align: "center",
                          label: "操作员"
                        }
                      }),
                      _vm._v(" "),
                      _c("el-table-column", {
                        attrs: {
                          prop: "updated_at",
                          width: "160",
                          align: "center",
                          label: "更新时间"
                        }
                      }),
                      _vm._v(" "),
                      _c("el-table-column", {
                        attrs: {
                          label: "操作",
                          fixed: "right",
                          width: "150",
                          align: "center"
                        },
                        scopedSlots: _vm._u([
                          {
                            key: "default",
                            fn: function(scope) {
                              return [
                                _c(
                                  "el-button",
                                  {
                                    attrs: { size: "mini" },
                                    on: {
                                      click: function($event) {
                                        return _vm.handleEvent(
                                          "edit",
                                          scope.row,
                                          (_vm.dialogFormVisible = true)
                                        )
                                      }
                                    }
                                  },
                                  [_vm._v("编辑")]
                                ),
                                _vm._v(" "),
                                _c(
                                  "el-button",
                                  {
                                    attrs: { size: "mini", type: "danger" },
                                    on: {
                                      click: function($event) {
                                        return _vm.dropMultiTable(
                                          "drop",
                                          scope.row
                                        )
                                      }
                                    }
                                  },
                                  [_vm._v("删除")]
                                )
                              ]
                            }
                          }
                        ])
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "el-row",
                    { staticClass: "pagination", attrs: { type: "flex" } },
                    [
                      _c("el-pagination", {
                        attrs: {
                          background: "",
                          "current-page": _vm.currentPage,
                          "page-sizes": [10, 20, 40],
                          "page-size": _vm.pagesize,
                          layout: "total, sizes,prev, pager, next",
                          total: _vm.tableData.length,
                          "prev-text": "上一页",
                          "next-text": "下一页"
                        },
                        on: {
                          "size-change": _vm.handleSizeChange,
                          "current-change": _vm.handleCurrentChange
                        }
                      })
                    ],
                    1
                  )
                ],
                1
              )
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "el-row",
        [
          _c(
            "el-dialog",
            {
              attrs: {
                title: _vm.textTitle,
                top: "10vh",
                visible: _vm.dialogFormVisible,
                center: "",
                width: "50%"
              },
              on: {
                "update:visible": function($event) {
                  _vm.dialogFormVisible = $event
                }
              }
            },
            [
              _c(
                "el-form",
                {
                  ref: "form",
                  attrs: {
                    model: _vm.form,
                    "status-icon": "",
                    rules: _vm.rules,
                    "label-width": "120px"
                  }
                },
                [
                  _c(
                    "el-row",
                    [
                      _c(
                        "el-col",
                        {
                          staticStyle: {
                            "border-right": "solid 1px #e5e9f2",
                            "padding-right": "30px"
                          },
                          attrs: { span: 12 }
                        },
                        [
                          _c(
                            "el-form-item",
                            { attrs: { label: "产品名称", prop: "item_name" } },
                            [
                              _c("el-input", {
                                attrs: { autocomplete: "off" },
                                model: {
                                  value: _vm.form.item_name,
                                  callback: function($$v) {
                                    _vm.$set(_vm.form, "item_name", $$v)
                                  },
                                  expression: "form.item_name"
                                }
                              })
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "el-form-item",
                            { attrs: { label: "产品规格", prop: "spec" } },
                            [
                              _c(
                                "el-tooltip",
                                {
                                  staticClass: "item",
                                  attrs: {
                                    effect: "dark",
                                    content: "只能输入数字哦!",
                                    placement: "top"
                                  }
                                },
                                [
                                  _c("el-input", {
                                    attrs: { autocomplete: "off" },
                                    model: {
                                      value: _vm.form.spec,
                                      callback: function($$v) {
                                        _vm.$set(_vm.form, "spec", $$v)
                                      },
                                      expression: "form.spec"
                                    }
                                  })
                                ],
                                1
                              )
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "el-form-item",
                            { attrs: { label: "产品单位", prop: "unit" } },
                            [
                              _c(
                                "el-tooltip",
                                {
                                  staticClass: "item",
                                  attrs: {
                                    effect: "dark",
                                    content: "只能输入数字哦!",
                                    placement: "top"
                                  }
                                },
                                [
                                  _c("el-input", {
                                    attrs: { autocomplete: "off" },
                                    model: {
                                      value: _vm.form.unit,
                                      callback: function($$v) {
                                        _vm.$set(_vm.form, "unit", $$v)
                                      },
                                      expression: "form.unit"
                                    }
                                  })
                                ],
                                1
                              )
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "el-form-item",
                            { attrs: { label: "产品数量", prop: "item_qty" } },
                            [
                              _c(
                                "el-tooltip",
                                {
                                  staticClass: "item",
                                  attrs: {
                                    effect: "dark",
                                    content: "只能输入数字哦!",
                                    placement: "top"
                                  }
                                },
                                [
                                  _c("el-input", {
                                    attrs: { autocomplete: "off" },
                                    model: {
                                      value: _vm.form.item_qty,
                                      callback: function($$v) {
                                        _vm.$set(_vm.form, "item_qty", $$v)
                                      },
                                      expression: "form.item_qty"
                                    }
                                  })
                                ],
                                1
                              )
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "el-form-item",
                            { attrs: { label: "供应商", prop: "supplier" } },
                            [
                              _c("el-input", {
                                attrs: { autocomplete: "off" },
                                model: {
                                  value: _vm.form.supplier,
                                  callback: function($$v) {
                                    _vm.$set(_vm.form, "supplier", $$v)
                                  },
                                  expression: "form.supplier"
                                }
                              })
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "el-form-item",
                            { attrs: { label: "联系人", prop: "contact_man" } },
                            [
                              _c("el-input", {
                                attrs: { autocomplete: "off" },
                                model: {
                                  value: _vm.form.contact_man,
                                  callback: function($$v) {
                                    _vm.$set(_vm.form, "contact_man", $$v)
                                  },
                                  expression: "form.contact_man"
                                }
                              })
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "el-form-item",
                            {
                              attrs: {
                                label: "联系方式",
                                prop: "contact_number"
                              }
                            },
                            [
                              _c("el-input", {
                                attrs: { autocomplete: "off" },
                                model: {
                                  value: _vm.form.contact_number,
                                  callback: function($$v) {
                                    _vm.$set(_vm.form, "contact_number", $$v)
                                  },
                                  expression: "form.contact_number"
                                }
                              })
                            ],
                            1
                          )
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "el-col",
                        { attrs: { span: 12 } },
                        [
                          _c(
                            "el-form-item",
                            {
                              attrs: { label: "仓库名称", prop: "house_name" }
                            },
                            [
                              _c("el-autocomplete", {
                                staticStyle: { width: "100%" },
                                attrs: {
                                  "fetch-suggestions": _vm.houseSearch,
                                  "trigger-on-focus": false
                                },
                                on: { select: _vm.handleSelect },
                                model: {
                                  value: _vm.form.house_name,
                                  callback: function($$v) {
                                    _vm.$set(_vm.form, "house_name", $$v)
                                  },
                                  expression: "form.house_name"
                                }
                              })
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "el-form-item",
                            { attrs: { label: "备注", prop: "remarks" } },
                            [
                              _c("el-input", {
                                attrs: { autocomplete: "off" },
                                model: {
                                  value: _vm.form.remarks,
                                  callback: function($$v) {
                                    _vm.$set(_vm.form, "remarks", $$v)
                                  },
                                  expression: "form.remarks"
                                }
                              })
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "el-form-item",
                            { attrs: { label: "订单状态", prop: "status" } },
                            [
                              _c(
                                "el-radio",
                                {
                                  attrs: { label: "1" },
                                  model: {
                                    value: _vm.form.status,
                                    callback: function($$v) {
                                      _vm.$set(_vm.form, "status", $$v)
                                    },
                                    expression: "form.status"
                                  }
                                },
                                [_vm._v("已入库")]
                              ),
                              _vm._v(" "),
                              _c(
                                "el-radio",
                                {
                                  attrs: { label: "-1" },
                                  model: {
                                    value: _vm.form.status,
                                    callback: function($$v) {
                                      _vm.$set(_vm.form, "status", $$v)
                                    },
                                    expression: "form.status"
                                  }
                                },
                                [_vm._v("未入库")]
                              )
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "el-form-item",
                            { attrs: { label: "操作员", prop: "operator" } },
                            [
                              _c("el-input", {
                                attrs: { autocomplete: "off" },
                                model: {
                                  value: _vm.form.operator,
                                  callback: function($$v) {
                                    _vm.$set(_vm.form, "operator", $$v)
                                  },
                                  expression: "form.operator"
                                }
                              })
                            ],
                            1
                          )
                        ],
                        1
                      )
                    ],
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "div",
                {
                  staticClass: "dialog-footer",
                  attrs: { slot: "footer" },
                  slot: "footer"
                },
                [
                  _c(
                    "el-button",
                    {
                      on: {
                        click: function($event) {
                          _vm.dialogFormVisible = false
                        }
                      }
                    },
                    [_vm._v("取 消")]
                  ),
                  _vm._v(" "),
                  _c(
                    "el-button",
                    {
                      attrs: { type: "primary" },
                      on: {
                        click: function($event) {
                          return _vm.submitForm("form")
                        }
                      }
                    },
                    [_vm._v("确 定")]
                  )
                ],
                1
              )
            ],
            1
          )
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/bound/InBound.vue":
/*!***************************************************!*\
  !*** ./resources/js/components/bound/InBound.vue ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _InBound_vue_vue_type_template_id_0830236d___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./InBound.vue?vue&type=template&id=0830236d& */ "./resources/js/components/bound/InBound.vue?vue&type=template&id=0830236d&");
/* harmony import */ var _InBound_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./InBound.vue?vue&type=script&lang=js& */ "./resources/js/components/bound/InBound.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _InBound_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _InBound_vue_vue_type_template_id_0830236d___WEBPACK_IMPORTED_MODULE_0__["render"],
  _InBound_vue_vue_type_template_id_0830236d___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/bound/InBound.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/bound/InBound.vue?vue&type=script&lang=js&":
/*!****************************************************************************!*\
  !*** ./resources/js/components/bound/InBound.vue?vue&type=script&lang=js& ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_InBound_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./InBound.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/bound/InBound.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_InBound_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/bound/InBound.vue?vue&type=template&id=0830236d&":
/*!**********************************************************************************!*\
  !*** ./resources/js/components/bound/InBound.vue?vue&type=template&id=0830236d& ***!
  \**********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_InBound_vue_vue_type_template_id_0830236d___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./InBound.vue?vue&type=template&id=0830236d& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/bound/InBound.vue?vue&type=template&id=0830236d&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_InBound_vue_vue_type_template_id_0830236d___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_InBound_vue_vue_type_template_id_0830236d___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);