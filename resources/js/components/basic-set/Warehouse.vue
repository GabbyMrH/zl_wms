<template>
  <div class="warehouse-set">
    <div class="bread">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>基本设置</el-breadcrumb-item>
        <el-breadcrumb-item>仓库设置</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-row class="main">
      <el-row type="flex" justify="end" class="button-style">
        <el-button
          type="primary"
          @click="handleEdit('addNew',dialogFormVisible=true)"
          icon="el-icon-plus"
          size="small"
        >新增仓库</el-button>
        <el-button type="danger" @click="dropMultiTable" icon="el-icon-delete" size="small">删除数据</el-button>
      </el-row>
      <el-row class="main-table">
        <el-table
          :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
          highlight-current-row
          @current-change="handleCurrentRow"
          @selection-change="handleSelectionChange"
          :default-sort="{prop: 'updated_at', order: 'descending'}"
          stripe
          border
          height="450"
          style="width: 100%"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column type="index" width="50" align="center" label="序号"></el-table-column>
          <el-table-column prop="house_code" align="center" label="仓库代码"></el-table-column>
          <el-table-column prop="house_name" align="center" label="库名"></el-table-column>
          <el-table-column prop="position" align="center" label="地址"></el-table-column>
          <el-table-column prop="capacity" align="center" label="容量"></el-table-column>
          <el-table-column prop="remain_capacity" align="center" label="余量"></el-table-column>
          <el-table-column prop="storeman" align="center" label="负责人"></el-table-column>
          <el-table-column prop="storeman_contact" align="center" label="联系方式"></el-table-column>
          <el-table-column prop="warehouse_status" align="center" label="仓库状态">
            <template v-slot="scope">
              <div slot="reference" class="name-wrapper">
                <el-tag
                  :type="handleStatusStyle(scope.row)"
                  :statusText="handleStatusText(scope.row)"
                  size="medium"
                >{{statusText}}</el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="updated_at" width="160" align="center" label="更新时间"></el-table-column>
          <el-table-column label="操作" width="150" align="center">
            <template v-slot="scope">
              <el-button size="mini" @click="handleEdit('edit',scope.row,dialogFormVisible=true)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-row type="flex" class="pagination">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[5,10, 20, 40]"
            :page-size="pagesize"
            layout="total, sizes,prev, pager, next"
            :total="tableData.length"
            prev-text="上一页"
            next-text="下一页"
          ></el-pagination>
        </el-row>
      </el-row>
    </el-row>
    <!-- 弹出框- -->
    <el-row>
      <el-dialog :title="textTitle" top="10vh" :visible.sync="dialogFormVisible" center width="30%">
        <el-form :model="form" status-icon :rules="rules" ref="form" label-width="120px">
          <el-form-item label="仓库代码(拼音)" prop="house_code">
            <el-input v-model="form.house_code" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="仓库名称" prop="house_name">
            <el-input v-model="form.house_name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="地址" prop="position">
            <el-input v-model="form.position" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="仓库容量(数字)" prop="capacity">
            <el-input v-model="form.capacity" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="仓库余量(数字)" prop="remain_capacity">
            <el-tooltip class="item" effect="dark" content="余量不能大于容量哦!" placement="top">
              <el-input v-model="form.remain_capacity" autocomplete="off"></el-input>
            </el-tooltip>
          </el-form-item>
          <el-form-item label="仓库状态" prop="warehouse_status">
            <el-radio v-model="form.warehouse_status" label="1">已启用</el-radio>
            <el-radio v-model="form.warehouse_status" label="-1">未启用</el-radio>
          </el-form-item>
          <el-form-item label="负责人" prop="storeman">
            <el-input v-model="form.storeman" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="联系方式(数字)" prop="storeman_contact">
            <el-input v-model="form.storeman_contact" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('form')">确 定</el-button>
        </div>
      </el-dialog>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPage: 1, //默认显示页面为1
      pagesize: 5, //    每页的数据条数
      tableData: [], //需要data定义一些，tableData定义一个空数组，请求的数据都是存放这里面
      multipleSelection: [],
      textTitle: "",
      formSubUrl: "",
      dialogFormVisible: false,
      form: {
        id: "",
        house_code: "",
        house_name: "",
        position: "",
        capacity: "",
        remain_capacity: "",
        warehouse_status: "1",
        storeman: "",
        storeman_contact: ""
      },
      rules: {
        house_name: [
          { required: true, message: "请输入仓库名称", trigger: "blur" },
          { min: 2, message: "长度在 2 个字符以上", trigger: "blur" }
        ],
        warehouse_status: [
          { required: true, message: "请选中仓库状态", trigger: "blur" }
        ],
        position: [
          { required: true, message: "请输入仓库地址", trigger: "blur" }
        ]
      }
    };
  },
  mounted() {
    this.getData();
  },
  computed: {},
  methods: {
    //获取数据
    getData() {
      axios
        .get("api/v1/warehouse-list")
        .then(res => {
          this.tableData = res.data["data"];
        })
        .catch(err => {
          console.error(err);
        });
    },
    //状态查询
    handleStatusText(val) {
      //返回值为1和0，可用三元运算
      val.warehouse_status === 1
        ? (this.statusText = "已启用")
        : (this.statusText = "未启用");
    },
    //状态对应样式
    handleStatusStyle(val) {
      if (val.warehouse_status === 1) {
        return "success";
      }
      return "info";
    },
    //每页下拉显示数据
    handleSizeChange: function(size) {
      this.pagesize = size;
      /*console.log(this.pagesize) */
    },
    //点击第几页
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
    },
    //获取选中行
    handleCurrentRow: function(val) {
      this.currentRow = val;
      /* console.log(this.currentRow); */
    },
    //获取多选
    handleSelectionChange: function(val) {
      this.multipleSelection = val;
      /* console.log(this.multipleSelection); */
    },
    //新增仓库
    addWarehouse: function() {},
    //删除多选
    dropMultiTable: function() {
      //console.log(this.multipleSelection);
      //取出选中id
      var warehouse_id = {
        id: []
      };
      //循环id值压入对象数组内
      for (let index = 0; index < this.multipleSelection.length; index++) {
        warehouse_id.id.push(this.multipleSelection[index].id);
      }
      if (warehouse_id.id.length === 0) {
        this.$notify.info({
          title: "消息",
          message: "请至少选择一项！"
        });
        return;
      }
      //删除判断
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          axios
            .delete("api/v1/warehouse-dropMulti", { data: warehouse_id })
            .then(res => {
              switch (res.data["status"]) {
                case "4002":
                  this.$notify.error({
                    title: "错误",
                    message: "操作失败"
                  });
                  break;
                case "2001":
                  this.$notify.success({
                    title: "成功",
                    message: "操作成功",
                    type: "success"
                  });
                  //刷新数据
                  this.getData();
                  break;

                default:
                  this.$notify.info({
                    title: "消息",
                    message: "请至少选择一项!"
                  });
                  break;
              }
            })
            .catch(err => {
              console.error(err);
            });
        })
        .catch(() => {});
    },
    //编辑判断
    handleEdit(type, row) {
      //console.log(val);
      //判断传递的是编辑还是新增
      if (type === "addNew") {
        this.textTitle = "新增仓库";
        //拷贝对象--解决切换有值问题
        this.form = Object.assign({}, row);
        this.formSubUrl = "api/v1/warehouse-add";
      } else {
        this.textTitle = "编辑仓库";
        this.formSubUrl = "api/v1/warehouse-edit";
        //将值拷贝到表单
        //status值需转换为字符串类型
        this.form = Object.assign({}, row);
        this.form.warehouse_status = row.warehouse_status.toString();
        this.form.id = row.id;
      }
    },
    //提交表单
    submitForm(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          //提交表单信息
          axios
            .post(this.formSubUrl, this.form)
            .then(res => {
              switch (res.data.status) {
                case "4001":
                  this.$notify.error({
                    title: "错误",
                    message: "输入数据有误"
                  });
                  break;
                case "4002":
                  this.$notify.error({
                    title: "错误",
                    message: "数据写入失败"
                  });
                  break;

                default:
                  this.$notify.success({
                    title: "成功",
                    message: "操作成功",
                    type: "success"
                  });
                  //重置表单
                  this.$refs[name].resetFields();
                  //关闭dialog
                  this.dialogFormVisible = false;
                  //刷新数据
                  this.getData();
                  break;
              }
            })
            .catch(err => {
              console.error(err);
            });
        }
      });
    },
    //重置表单
    resetForm(name) {
      this.$refs[name].resetFields();
    },
    //删除
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          axios
            .delete("api/v1/warehouse-drop", {
              data: { id: row.id }
            })
            .then(res => {
              switch (res.data["status"]) {
                case "1001":
                  this.$notify.info({
                    title: "消息",
                    message: "参数不能为空"
                  });
                  break;
                case "1002":
                  this.$notify.error({
                    title: "错误",
                    message: "数据不存在"
                  });
                  break;

                default:
                  this.$notify.success({
                    title: "成功",
                    message: "操作成功",
                    type: "success"
                  });
                  //刷新数据
                  this.getData();
                  break;
              }
            })
            .catch(err => {
              console.error(err);
            });
        })
        .catch(() => {
          //   this.$notify.info({
          //     title: "消息",
          //     message: "取消删除"
          //   });
        });
    }
  }
};
</script>

<style>
</style>
